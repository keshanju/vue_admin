import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {ForceLogoutLogApi} from '@/api/ForceLogoutLogApi';
import {ForceLogoutLogModel} from '@/models/ForceLogoutLogModel';
import {BaseModel} from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';

/**
 * 强制下线编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;

    private forceLogoutLogAPI = new ForceLogoutLogApi();

    private dxFormData1: ForceLogoutLogModel = { id: 0 };
    private dxFormDataReset1: ForceLogoutLogModel = { };

    protected async mounted() {
        (this.$parent as any).content_title = "强制下线";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();
        if (this.ID !== RespCode.zero) {
           await this.ForceLogoutLogModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true,{},this.dxFormData1);
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        //表单项
        const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        let title = [];
        let desc = [];
        if (this.ID == RespCode.zero) {
            // title = [
            //     valid.Validation.getRequired("组名称不能为空!"),
            //     // valid.Validation.getPassword("密码强度弱了至少一个字母!")
            // ];
            // desc = [
            //     valid.Validation.getRequired("组描述不能为空!"),
            //     // valid.Validation.getCompare(() => this.dxFormData1.staff_pwd, "两次输入的密码不一致!"),
            // ];
        }

        //用户ID
        items2.push({
            dataField: "user_id",
            label: {
                text: "用户ID"
            },
            editorOptions: {
                placeholder: "用户ID"
            },
            // validationRules: title
        });

        //管理员IP
        items2.push({
            dataField: "account_admin_ip",
            // editorType: "dxTextArea",
            label: {
                text: "管理员IP"
            },
            editorOptions: {
                placeholder: "管理员IP"
            },
            // validationRules: desc
        });

        //用户IP
        items2.push({
            dataField: "user_ip",
            // editorType: "dxSelectBox",
            label: {
                text: '用户IP'
            },
            editorOptions: {
                // displayExpr: "name",
                // valueExpr: "id",
                // dataSource: common.CommonHelper.getDictonary().data.user_user_from
            }
        });

        //下线类型
        items2.push({
            dataField: "force_logout_type",
            // editorType: "dxSelectBox",
            label: {
                text: '下线类型'
            },
            editorOptions: {
                // displayExpr: "name",
                // valueExpr: "id",
                // dataSource: common.CommonHelper.getDictonary().data.group_is_reg
            }
        });

        //下线说明
        items2.push({
            dataField: "account_admin_desc",
            editorType: "dxTextArea",
            label: {
                text: '下线说明'
            },
            editorOptions: {
                // displayExpr: "name",
                // valueExpr: "id",
            }
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

        if (this.ID == 0) {
            items3.push({
                itemType: "button",
                horizontalAlignment: "center",
                buttonOptions: {
                    text: "重置",
                    type: "normal",
                    onClick: this.onResetHandler
                }
            });
        }

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
        group2.push({
            itemType: "group",
            //caption: Lang.Edit,
            items: items2
        }, {
                itemType: "group",
                colCount: 3,
                items: items3
            });

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: group2,
            width: 500
        }
        this.dxForm1.option(options);
        // this.dxSelectBox1 = this.dxForm1.getEditor("role_id");
    }
    /**
     * 重置
     */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
        this.dxForm1.option("formData", this.dxFormData1);
    }
    /**
   * 强制下线信息提交
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
                result = await this.forceLogoutLogAPI.setAdd(f);
            } else {
                result = await this.forceLogoutLogAPI.setUpdate(this.dxFormData1.id, f);
            }
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(()=>{
                    this.redirect("/user/forceloginout/list");
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
        this.redirect("/user/forceloginout/list");
    }


    /**
   * 获取强制下线模型
   * @param id 
   */
    private async ForceLogoutLogModel(id: number) {
        let d = await this.forceLogoutLogAPI.getModel(id);
        this.dxFormData1 = d.data;
        this.dxForm1.option("formData", this.dxFormData1);
    }
}