import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserGroupApi } from '@/api/UserGroupApi';
import { UserGroupModel } from '@/models/UserGroupModel';
import { BaseModel } from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { UserVipLevelApi } from '@/api/UserVipLevelApi';

/**
 * 用户编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;
    private userGroupAPI = new UserGroupApi();

    private dxFormData1: UserGroupModel = {
        id: 0,
        user_type: 1,
        is_reg: 1,
        //default_vip_level: 0,
        default_free_points: 0,
        product_type: 0
    };
    private dxFormDataReset1: UserGroupModel = {};

    protected async mounted() {
        (this.$parent as any).content_title = "用户组编辑";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();

        let userVipLevel = new UserVipLevelApi();
        let userVipLevelData = await userVipLevel.getList();
        this.dxForm1.getEditor("default_vip_level").option({
            dataSource: userVipLevelData.data,
            displayExpr: "title",
            valueExpr: "id"
        });

        if (this.ID !== RespCode.zero) {
            await this.getUserGroupModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        let flagEdit = false;
        if (this.ID > 0) {
            flagEdit = true;
        }

        //表单项
        const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        let title = [];
        let desc = [];
        title = [
            Validation.getRequired("组名称不能为空!"),
            // Validation.getPassword("密码强度弱了至少一个字母!")
        ];
        desc = [
            Validation.getRequired("组描述不能为空!"),
            // Validation.getCompare(() => this.dxFormData1.staff_pwd, "两次输入的密码不一致!"),
        ];

        //组名称
        items2.push({
            dataField: "title",
            label: {
                text: "组名称"
            },
            editorOptions: {
                placeholder: "请输入组名称"
            },
            validationRules: title
        });

        //组描述
        items2.push({
            dataField: "desc",
            editorType: "dxTextArea",
            label: {
                text: "组描述"
            },
            editorOptions: {
                placeholder: "请输入合适的组描述",
                height: 100
            },
            validationRules: desc
        });

        //用户类型
        items2.push({
            dataField: "user_type",
            editorType: "dxSelectBox",
            label: {
                text: '用户类型'
            },
            editorOptions: {
                disabled: flagEdit,
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.user_type,
                hint: "用户类型添加后不可更改!"
            },
            validationRules: [Validation.getRequired("请选择用户类型!"),]
        });


        //用户产品
        items2.push({
            dataField: "product_type",
            editorType: "dxSelectBox",
            label: {
                text: '产品类型'
            },
            editorOptions: {
                disabled: flagEdit,
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.product_type,
                hint: "产品类型添加后不可更改!"
            },
            validationRules: [Validation.getRequired("请选择产品类型!"),]
        });

        //是否开放注册
        items2.push({
            dataField: "is_reg",
            editorType: "dxSelectBox",
            label: {
                text: '是否开放注册'
            },
            editorOptions: {
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.group_is_reg
            }
        });

        //默认用户级别
        items2.push({
            dataField: "default_vip_level",
            editorType: "dxSelectBox",
            label: {
                text: '默认用户级别'
            },
            editorOptions: {
                placeholder: "默认用户级别",
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.user_vip_level
            },
            validationRules: [
                Validation.getRequired("默认用户级别不能为空!")
            ]
        });

        //默认赠送积分
        items2.push({
            dataField: "default_free_points",
            label: {
                text: '默认赠送积分'
            },
            editorType: "dxNumberBox",
            editorOptions: {
                placeholder: "默认赠送积分"
            },
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
   * 用户组信息提交
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
                result = await this.userGroupAPI.userGroupAdd(f);
            } else {
                result = await this.userGroupAPI.userGroupUpdate(this.dxFormData1.id, f);
            }
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/user/group/list");
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
        this.redirect("/user/group/list");
    }

    /**
   * 获取用户组模型
   * @param id 
   */
    private async getUserGroupModel(id: number) {
        let d = await this.userGroupAPI.getUserGroupModel(id);
        this.dxFormData1 = d.data;
        this.dxForm1.option("formData", this.dxFormData1);
    }
}