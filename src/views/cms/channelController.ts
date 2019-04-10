import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { CMSChannelApi } from '@/api/CMSChannelApi';
import { CMSChannelModel } from '@/models/CMSChannelModel';
import { Lang } from '@/common/Lang';
import { CommonUtils } from '@/common/CommonUtils';
import { BaseModel } from '@/models/BaseModel';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 员工列表
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
    private channelApi = new CMSChannelApi();

    // 入口
    protected async mounted() {
        (this.$parent as any).content_title = "频道列表";
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
                dataField: "project_title",
                caption: "所属项目",
                width: 140,
            },
            {
                dataField: "title",
                caption: "频道名称",
                width: 140,
            },
            // {
            //     dataField: "title",
            //     caption: "所属栏目",
            //     width: 140,
            // },
            {
                dataField: "seo_title",
                caption: "SEO标题",
                width: 100,
            },
            {
                dataField: "keyword",
                caption: "关键词",
                width: 100,
            },
            {
                dataField: "description",
                caption: "描述",
                width: 120,
            },
            {
                dataField: "dirname",
                caption: "目录名",
                width: 100,
            },
            {
                dataField: "sorts",
                caption: "排序",
                width: 100,
            },
            {
                dataField: "type",
                caption: "类型",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.cms_channel_type, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                dataField: "is_hidden",
                caption: "是否隐藏",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.cms_channel_hidden, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                dataField: "open_mode",
                caption: "打开方式",
                width: 100,
            },
            {
                dataField: "template_index_path",
                caption: "主页模板路径",
                width: 160
            },
            {
                dataField: "template_info_path",
                caption: "详细模板路径",
                width: 160,
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160,
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 160,
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 160,
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
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

        let aEdit = $("<a href='#' data=" + option.value + "> 编辑 </a>");
        aEdit.bind("click", (sender) => {
            let id = $(sender.target).attr("data");
            this.editForm(Number(id));
        });

        let aDel = this.getCreateLink("删除", async sender => {
            let a = await this.confirm("是否确定删除?");
            if (a) {
                this.setDelete(option.value);
            }
        });

        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aDel)
            .appendTo(cellElement);
    }

    /**
     * 编辑表单
     * @param id 
     */
    private async editForm(id: number) {
        let d = await this.channelApi.getModel(this.ID, id);
        this.createForm(id, d.data);
    }

    /**
     * 删除
     * @param id 
     */
    private async setDelete(id: number) {
        try {
            let result = await this.channelApi.setDelete(this.ID, id);
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
     * 获取列表
     */
    private getDataList() {
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
            let dd = await this.channelApi.getListPager(this.ID, strWhere, pageSize, pageIndex);
            let list_dest: CMSChannelModel[] = [];
            let aaaa = this.getChannel(dd.data.list, 0, list_dest);
            return {
                code: dd.code,
                msg: dd.msg,
                data: {
                    total: dd.data.total,
                    current_page: dd.data.current_page,
                    per_page: dd.data.per_page,
                    last_page: dd.data.last_page,
                    list: aaaa
                }
            };
        });

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

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                icon: "back",
                text: "返回项目管理",
                onClick: () => {
                    this.redirect("/cms/project")
                }
            }
        });

        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getDataList();
        });
    }

    /**
     * 添加
     * @param sender 
     */
    private onAddHandler(sender) {
        this.createForm(0, {
            sorts: 999,
            type: 1,
            is_hidden: 0,
            open_mode: 0,
            parent_id: 0,
        });
    }

    /**
     * 获取频道
     * @param list 
     * @param parent_id 
     */
    private getChannel(list: CMSChannelModel[], parent_id: number, list_dest: CMSChannelModel[], depath: number = 0) {

        let dd = list.filter((val, index) => {
            return val.parent_id == parent_id;
        });

        dd = dd.sort((a, b) => {
            return a.sorts - b.sorts;
        });

        for (const item of dd) {
            if (depath > 0) {
                for (let index = 0; index < depath; index++) {
                    item.title = "-" + item.title;
                }
            }
            list_dest.push(item);
            let cc = list.filter((val, index) => {
                return val.parent_id == parent_id;
            });
            if (cc && cc.length > 0) {
                let haha = depath + 1;
                this.getChannel(list, item.id, list_dest, haha);
            }
        }
        return list_dest;
    }

    private async createForm(id: number = 0, formData: CMSChannelModel = { parent_id: 0 }) {

        //获取所属栏目
        let d = await this.channelApi.getList(this.ID);
        let parentChannelDS = d.data;

        let list_dest: CMSChannelModel[] = [];
        let parent_channel = [{ id: 0, title: "顶级栏目" }, ...this.getChannel(parentChannelDS, 0, list_dest)];
        let items = this.createFormItems([
            {
                dataField: "title",
                label: {
                    text: "名称"
                },
                editorOptions: {
                    placeholder: "请输入频道名称."
                },
                validationRules: [
                    Validation.getRequired("名称不能为空!")
                ]
            },
            {
                dataField: "parent_id",
                label: {
                    text: "所属栏目"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择所属栏目.",
                    dataSource: parent_channel,
                    displayExpr: "title",
                    valueExpr: "id"
                },
                validationRules: [
                    Validation.getRequired("所属栏目不能为空!")
                ]
            },
            {
                dataField: "seo_title",
                label: {
                    text: "SEO标题"
                },
                editorOptions: {
                    placeholder: "请输入SEO标题."
                },
                validationRules: [
                    Validation.getRequired("SEO标题不能为空!")
                ]
            },
            {
                dataField: "keyword",
                label: {
                    text: "关键词"
                },
                editorOptions: {
                    placeholder: "请输入关键词."
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
                    placeholder: "请输入频道描述信息."
                },
                validationRules: [
                    Validation.getRequired("描述不能为空!")
                ]
            },
            {
                dataField: "dirname",
                label: {
                    text: "目录名"
                },
                editorOptions: {
                    placeholder: "请输入生成目录.例:qimiao"
                },
                validationRules: [
                    Validation.getRequired("目录名不能为空!")
                ]
            },
            {
                dataField: "sorts",
                label: {
                    text: "排序"
                },
                editorType: "dxNumberBox",
                editorOptions: {
                    placeholder: "频道排序，从小到大",
                    min: 1
                },
                validationRules: [
                    Validation.getRequired("排序不能为空!")
                ]
            },
            {
                dataField: "type",
                label: {
                    text: "类型"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择类型.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.cms_channel_type
                },
                validationRules: [
                    Validation.getRequired("类型不能为空!")
                ]
            },
            {
                dataField: "is_hidden",
                label: {
                    text: "是否隐藏"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.cms_channel_hidden
                },
                validationRules: [
                    Validation.getRequired("请选择一个操作!")
                ]
            },
            {
                dataField: "open_mode",
                label: {
                    text: "打开方式"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择打开方式.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.cms_channel_open_type
                },
                validationRules: [
                    Validation.getRequired("打开方式不能为空!")
                ]
            },
            {
                dataField: "template_index_path",
                label: {
                    text: "主页模板路径"
                },
                editorOptions: {
                    placeholder: "请输入主页模板路径.例如:cms/qimiao/cn/index/index",
                },
                validationRules: [
                    //Validation.getRequired("主页模板路径不能为空!")
                ]
            },
            {
                dataField: "template_info_path",
                label: {
                    text: "详细模板路径"
                },
                editorOptions: {
                    placeholder: "请输入详细模板路径.例如:cms/qimiao/cn/index/index",
                },
                validationRules: [
                    // Validation.getRequired("主页模板路径不能为空!")
                ]
            },
        ]);
        this.createPopForm(
            {
                title: id > 0 ? "编辑频道" : "创建频道",
                width: 800
            }, {
                formData: formData,
                items: items
            },
            {

            },
            async (form, poup) => {
                try {
                    let data = form.option("formData") as CMSChannelModel;
                    data.account_token = this.token;
                    let f = this.joinFormParams(data);
                    let result: BaseModel;
                    if (data.id == null || data.id == 0) {
                        result = await this.channelApi.setAdd(this.ID, f);
                    } else {
                        result = await this.channelApi.setUpdate(this.ID, data.id, f);
                    }
                    if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                        this.toast(() => {
                            this.dxDataGrid1.refresh();
                        });
                    } else {
                        this.errorCodeMsg(result.code, result.msg);
                        return false;
                    }
                    return true;
                } catch (error) {
                    this.error(error);
                    return false;
                }
            });
    }

    /**
     * 刷新
     * @param sender 
     */
    private onRefreshHandler(sender) {
        this.dxDataGrid1.refresh();
    }

}