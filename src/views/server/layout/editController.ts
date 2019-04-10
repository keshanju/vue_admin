import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { LayoutApi } from '@/api/LayoutApi';
import { LayoutModel, Result } from '@/models/LayoutModel';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { CommonUtils } from '@/common/CommonUtils';
/**
 * 布局编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxFormKey1";
    private dxForm1: DevExpress.ui.dxForm;

    private dxFormData1: LayoutModel = { id: 0, is_enable:1 };
    private dxFormDataReset1: LayoutModel = {};

    private packageAPI = new LayoutApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "布局编辑";
        this.initComponents();
        if (this.ID > RespCode.zero) {
            await this.getDataModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    /**
     * 控件初始化
     */
    private initComponents() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            //caption: this.ID > RespCode.zero ? "更新" : "添加",
            items: [{
                dataField: "layout_code",
                label: {
                    text: "线路布局Code"
                },
                editorOptions: {
                    placeholder: "请输入线路布局Code,格式为大小写字母以及下划线"
                },
                validationRules: [
                    Validation.getRequired("线路布局Code不能为空!"),
                    Validation.getLayoutCode("线路布局Code不正确!格式为大小写字母以及下划线")
                ]
            }, {
                dataField: "content",
                label: {
                    text: "布局内容"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    placeholder: "请输入布局内容",
                    height: 500
                },
                validationRules: [Validation.getRequired("布局内容不能为空!")]
            }, {
                dataField: "desc",
                label: {
                    text: "描述"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    placeholder: "请输入描述信息",
                    height: 120
                },
                validationRules: [Validation.getRequired("描述信息不能为空!")]
            }, {
                dataField: "is_enable",
                label: {
                    text: "是否开启"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择是否开启",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
                validationRules: [Validation.getRequired("开启信息不能为空!")]
            }]
        }, {
            itemType: "group",
            colCount: 3,
            items: [
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: this.ID > RespCode.zero ? "更新" : "添加",
                        type: "success",
                        useSubmitBehavior: true,
                        onClick: this.onClickDoHandler
                    }
                },
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "重置",
                        type: "normal",
                        onClick: this.onResetHandler
                    }
                },
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "返回",
                        type: "normal",
                        onClick: this.onClickBackHandler
                    }
                }
            ]
        }];

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: items1,
            width: 800,
            validationGroup: "customerData",
        };
        this.dxForm1.option(options);
    }
    /**
     * 重置
     */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
        this.dxForm1.option("formData", this.dxFormData1);
    }
    /**
     * 数据模型
     * @param id 
     */
    private async getDataModel(id: number) {
        let d = await this.packageAPI.getModel(id);
        this.dxFormData1 = d.data;

        this.dxForm1.option({
            formData: this.dxFormData1
        });
    }

    /**
     * 添加 修改 事件
     * @param e 
     */
    private async onClickDoHandler(sender) {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return;
            }
            this.dxFormData1.account_token = this.token;
            let postData = this.joinFormParams(this.dxFormData1);
            let d: Result;
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.packageAPI.setAdd(postData);
            } else {
                d = await this.packageAPI.setUpdate(this.ID, postData);
            }

            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/server/layout/list");
                });
            } else {
                this.errorCodeMsg(d.code, d.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }

    /**
     * 跳转
     * @param e 
     */
    private async onClickBackHandler(sender) {
        this.redirect("/server/layout/list");
    }

}