import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup, DxTextArea } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserApi } from '@/api/UserApi';
import { UserModel } from '@/models/UserModel';
import { BaseModel } from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import md5 from "js-md5";

/**
 * 用户修改密码
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;

    private userAPI = new UserApi();

    private dxFormData1: UserModel = {
        id: 0,
    };

    private dxFormDataReset1: UserModel = {};

    protected async mounted() {
        
        (this.$parent as any).content_title = "重置密码";

        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        //表单项
        const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];

        //新密码
        items2.push({
            dataField: "new_password",
            label: {
                text: "新密码"
            },
            editorOptions: {
                mode: "password",
                placeholder: "密码必须6~20位字母+数字组合"
            },
            validationRules: [
                Validation.getRequired("密码不能为空!"),
                Validation.getPassword2("密码必须6~20位字母+数字组合!")
            ]
        });

        //重新输入新密码
        items2.push({
            dataField: "new_password_confirmation",
            label: {
                text: "确认新密码"
            },
            editorOptions: {
                mode: "password",
                placeholder: "密码必须6~20位字母+数字组合"
            },
            validationRules: [
                Validation.getRequired("确认密码不能为空!"),
                Validation.getCompare(() => this.dxFormData1.new_password, "两次输入的密码不一致!"),
            ]
        });

        //按钮组
        const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: this.ID > 0 ? Lang.Update : Lang.Add,
                type: "success",
                useSubmitBehavior: true,
                onClick: this.onClickDoHandler
            }
        });

        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: "重置",
                type: "normal",
                onClick: this.onResetHandler
            }
        });

        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: Lang.Back,
                type: "normal",
                useSubmitBehavior: true,
                onClick: this.onClickBackHandler
            }
        });

        //分组
        const group2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        group2.push(
            {
                itemType: "group",
                //caption: Lang.Edit,
                items: items2
            },
            {
                itemType: "group",
                colCount: 3,
                items: items3
            }
        );

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: group2,
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
   * 会员信息提交
   */
    private async onClickDoHandler() {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return;
            }
            this.dxFormData1.account_token = this.token;
            let aa = $.extend(true, {}, this.dxFormData1);
            aa.new_password = md5(aa.new_password);
            aa.new_password_confirmation = md5(aa.new_password_confirmation);

            let f = this.joinFormParams(aa);
            let result: BaseModel;
            result = await this.userAPI.userRePasswd(this.ID, f);
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/user/list");
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }

    /**
   * 返回
   */
    private onClickBackHandler() {
        this.redirect("/user/list");
    }
    
}