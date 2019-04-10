import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { CMSProjectApi } from '@/api/CMSProjectApi';
import { CMSProjectModel } from '@/models/CMSProjectModel';
import { Lang } from '@/common/Lang';
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { RespCode } from '@/common/RespCode';
import { BaseModel } from '@/models/BaseModel';

/**
 * CMS项目列表
 */
@Component({
    components: {
        DxDataGrid
    }
})
export default class Home extends BaseVue {
    // 控件初始化
    private dxDataGridKey1: string = "dxDataGrid_Key_1";
    private dxDataGrid1: DevExpress.ui.dxDataGrid;
    private projectApi = new CMSProjectApi();

    // 入口
    protected async mounted() {
        (this.$parent as any).content_title = "项目管理";
        this.initComponent();
        this.getDataList();
    }

    // 初始化组件
    private initComponent() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);
        const cols: Array<DevExpress.ui.dxDataGridColumn> = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                dataField: "title",
                caption: "名称",
                width: 140,
            },
            {
                dataField: "domain",
                caption: "域名",
                width: 180,
            },
            // {
            //     dataField: "logo",
            //     caption: "LOGO",
            //     width: 100,
            // },
            {
                dataField: "keyword",
                caption: "关键字",
                width: 150,
            },
            {
                dataField: "powerby",
                caption: "版权信息",
                width: 200,
            },
            // {
            //     dataField: "ico",
            //     caption: "图标",
            //     width: 100,
            // },
            {
                dataField: "dirname",
                caption: "生成目录名",
                width: 100,
            },
            // {
            //     dataField: "description",
            //     caption: "描述",
            //     width: 100,
            // },
            // {
            //     dataField: "content",
            //     caption: "内容",
            //     width: 100,
            // },
            {
                dataField: "beian",
                caption: "备案号",
                width: 160
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 160,
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160,
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 160,
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 160,
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: Lang.Operate,
                width: 200,
                cellTemplate: this.cellEdit
            }
        ];

        let options = this.getDataGridOption({
            onToolbarPreparing: this.onToolbarPreparingHandler,
            columns: cols,
        });

        this.dxDataGrid1.option(options);
    }

    /**
     * 编辑
     * @param container 
     * @param option 
     */
    private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

        let aDel = this.getCreateLink("删除", async sender => {
            let a = await this.confirm("是否确定删除?");
            if (a) {
                this.setDelete(option.value);
            }
        });

        let aEdit = $("<a href='#' data=" + option.value + "> 编辑 </a>");
        aEdit.bind("click", (sender) => {
            let id = $(sender.target).attr("data");
            this.editForm(Number(id));
        });

        let aChannel = this.getCreateLink("频道", sender => {
            this.redirect("/cms/channel/" + option.value);
        });

        $("<div>")
            .append(aChannel)
            .append(" | ")
            .append(aEdit)
            .append(" | ")
            .append(aDel)
            .appendTo(cellElement);
    }

    /**
     * 获取列表
     */
    private getDataList() {
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.projectApi.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    /**
     * 初始化工具条
     * @param e 
     */
    private onToolbarPreparingHandler(e: {
        component?: DevExpress.DOMComponent,
        element?: DevExpress.core.dxElement,
        model?: any,
        toolbarOptions?: DevExpress.ui.dxToolbarOptions
    }) {

        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: Lang.Add,
                icon: "add",
                onClick: this.onAddHandler
            }
        });

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                icon: "refresh",
                text: "刷新",
                onClick: this.onRefreshHandler
            }
        });


        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getDataList();
        });
    }

    /**
     * 删除数据
     * @param id 
     */
    private async setDelete(id: number) {
        try {
            let result = await this.projectApi.setDelete(id);
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.dxDataGrid1.refresh();
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
                return false;
            }
        } catch (error) {
            this.error(error);
            return false;
        }
    }
    /**
     * 编辑表单
     * @param id 
     */
    private async editForm(id: number) {
        let d = await this.projectApi.getModel(id);
        this.createForm(id, d.data);
    }

    /**
     * 创建表单
     * @param id 
     * @param formData 
     */
    private createForm(id: number = 0, formData: CMSProjectModel = {}) {
        let items = this.createFormItems([
            {
                dataField: "title",
                label: {
                    text: "名称"
                },
                editorOptions: {
                    placeholder: "请输入项目名称.例：奇妙网游加速器"
                },
                validationRules: [
                    Validation.getRequired("名称不能为空!")
                ]
            },
            {
                dataField: "dirname",
                label: {
                    text: "生成目录名"
                },
                editorOptions: {
                    placeholder: "请输入项目生成目录.例：qimiao"
                },
                validationRules: [
                    Validation.getRequired("生成目录不能为空!")
                ]
            },
            // {
            //     dataField: "logo",
            //     label: {
            //         text: "LOGO"
            //     },
            //     editorOptions: {
            //         placeholder: "请输入LOGO地址.例：http://xxx.xxx.xxx/logo.img"
            //     },
            //     validationRules: [
            //         Validation.getRequired("LOGO不能为空!")
            //     ]
            // },
            this.createUploadFileFormItem(
                (image) => {
                    formData.logo = image[0].src;
                },
                {
                    dataField: "logo",
                    label: {
                        text: 'LOGO地址'
                    },
                    validationRules: [Validation.getRequired("LOGO地址不能为空!")]
                },
                {
                    name: "filename",
                    uploadUrl: this.uploadApi.getUploadNormalPath("images"),
                }
            ),
            this.createUploadFileFormItem(
                (image) => {
                    formData.ico = image[0].src;
                },
                {
                    dataField: "ico",
                    label: {
                        text: '图标'
                    },
                    validationRules: [Validation.getRequired("图标地址不能为空!")]
                },
                {
                    name: "filename",
                    uploadUrl: this.uploadApi.getUploadNormalPath("images"),
                }
            ),
            // {
            //     dataField: "ico",
            //     label: {
            //         text: "图标"
            //     },
            //     editorOptions: {
            //         placeholder: "请输入图标地址.例：http://xxx.xxx.xxx/logo.ico"
            //     },
            //     validationRules: [
            //         Validation.getRequired("图标不能为空!")
            //     ]
            // },
            {
                dataField: "domain",
                label: {
                    text: "域名"
                },
                editorOptions: {
                    placeholder: "请输入域名信息.例：www.qimiao.com"
                },
                validationRules: [
                    Validation.getRequired("域名不能为空!")
                ]
            },
            {
                dataField: "powerby",
                label: {
                    text: "版权信息"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    height: 80,
                    placeholder: "请输入版权信息.例：奇妙科技有限公司版权所有 并保留所有权利"
                },
                validationRules: [
                    Validation.getRequired("版权信息不能为空!")
                ]
            },
            {
                dataField: "keyword",
                label: {
                    text: "关键词"
                },
                editorOptions: {
                    placeholder: "请输入关键词信息.例：免费加速器,网游加速器,游戏加速器,加速器"
                },
                validationRules: [
                    Validation.getRequired("关键词不能为空!")
                ]
            },
            {
                dataField: "description",
                label: {
                    text: "描述"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    height: 80,
                    placeholder: "请输入描述信息.例：奇妙加速器是专业端游、外服国服网游加速器，致力解决玩家在网络游戏中掉线、延迟、卡顿等网络问题，同时也是手游加速器首选app"
                },
                validationRules: [
                    Validation.getRequired("描述不能为空!")
                ]
            },
            {
                dataField: "beian",
                label: {
                    text: "备案信息"
                },
                editorOptions: {
                    placeholder: "请输入备案信息. 例：鄂ICP备18012317号-2"
                },
                validationRules: [
                    Validation.getRequired("备案信息不能为空!")
                ]
            },
            {
                dataField: "content",
                label: {
                    text: "内容"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    height: 150,
                    placeholder: "请输入内容信息."
                },
                validationRules: [
                    Validation.getRequired("内容不能为空!")
                ]
            },
        ]);
        this.createPopForm(
            {
                title: id > 0 ? "编辑项目" : "创建项目",
                width: 800
            }, {
                formData: formData,
                items: items
            },
            {

            },
            async (form, poup) => {
                try {
                    let data = form.option("formData") as CMSProjectModel;
                    data.account_token = this.token;
                    //let f = this.joinFormParams(data);
                    let result: BaseModel;
                    if (data.id == null || data.id == 0) {
                        result = await this.projectApi.setAdd(data);
                    } else {
                        result = await this.projectApi.setUpdate(data.id, data);
                    }
                    if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                        this.toast(() => {
                            this.dxDataGrid1.refresh();
                        });
                    } else {
                        this.errorCodeMsg(result.code, result.msg);
                        return false;
                    }
                } catch (error) {
                    this.error(error);
                    return false;
                }
                return true;
            });
    }

    /**
     * 添加
     * @param sender 
     */
    private onAddHandler(sender) {
        this.createForm();
    }

    /**
     * 刷新
     * @param sender 
     */
    private onRefreshHandler(sender) {
        this.dxDataGrid1.refresh();
    }

}