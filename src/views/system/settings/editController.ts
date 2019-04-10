import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { GSettingApi } from '@/api/GSettingApi';
import { GSettingModel } from '@/models/GSettingModel';
import { BaseModel } from '@/models/BaseModel';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 全局设置
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;

    private gsettingAPI = new GSettingApi();

    private dxFormData1: GSettingModel = { id: 0 };
    private dxFormDataReset1: GSettingModel = {};

    protected async mounted() {
        (this.$parent as any).content_title = "全局设置编辑(重新登录后生效)";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();
        if (this.ID !== RespCode.zero) {
            await this.getGSettingModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        let flag = this.ID > 0 ? true : false;

        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            //caption: Lang.Edit + " (重新登录后生效)",
            items: [
                {
                    dataField: "key",
                    label: {
                        text: '变量Key'
                    },
                    editorOptions: {
                        placeholder: "请输入变量Key",
                        disabled: flag,
                        readOnly: flag
                    },
                    validationRules: [Validation.getRequired("变量Key不能为空!")]
                },
                {
                    dataField: "value",
                    label: {
                        text: '变量值'
                    },
                    editorOptions: {
                        placeholder: "请输入变量值"
                    },
                    validationRules: [Validation.getRequired("变量值不能为空!")]
                },
                {
                    dataField: "title",
                    label: {
                        text: '名称'
                    },
                    editorOptions: {
                        placeholder: "请输入变量标题"
                    },
                    validationRules: [Validation.getRequired("变量名称不能为空!")]
                },
                {
                    dataField: "key_type",
                    label: {
                        text: '变量类别'
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        disabled: flag,
                        readOnly: flag,
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.setting_type
                    },
                    validationRules: [Validation.getRequired("变量类别不能为空!")]
                }
            ]
        }, {
            itemType: "group",
            colCount: 3,
            items: [
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: this.ID > 0 ? Lang.Update : Lang.Add,
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
                        text: Lang.Back,
                        type: "normal",
                        onClick: this.onClickBackHandler
                    }
                }
            ]
        }];

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: items1,
            width: 500
        }
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
   * 全局设置信息提交
   */
    private async onClickDoHandler() {
        try {

            if (!this.validateForm(this.dxForm1)) {
                return;
            }

            this.dxFormData1.account_token = this.token;
            let f = this.joinFormParams(this.dxFormData1);
            let result: BaseModel;
            if (this.dxFormData1.id == RespCode.zero) {
                result = await this.gsettingAPI.gsettingAdd(f);
            } else {
                result = await this.gsettingAPI.gsettingUpdate(this.dxFormData1.id, f);
            }
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/system/settings/list");
                });
            } else {
                await this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }

    /**
   * 返回
   */
    private onClickBackHandler() {
        this.redirect("/system/settings/list");
    }


    /**
   * 获取全局设置模型
   * @param id 
   */
    private async getGSettingModel(id: number) {
        let d = await this.gsettingAPI.getGSettingModel(id);
        this.dxFormData1 = d.data;
        this.dxForm1.option("formData", this.dxFormData1);
    }
}