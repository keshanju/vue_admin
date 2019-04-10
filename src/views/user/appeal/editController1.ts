import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { UserAppealApi } from "@/api/UserAppealApi";
import { UserAppealModel } from "@/models/UserAppealModel";
import { BaseModel } from "@/models/BaseModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";

/**
 * 申述编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;
  private dxForm2: DevExpress.ui.dxForm;

  private userappealAPI = new UserAppealApi();

  private dxFormData1: UserAppealModel = { id: 0 };
  private dxFormDataReset1: UserAppealModel = {};

  protected async mounted() {
    (this.$parent as any).content_title = "申述编辑";
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.initComponent();
    if (this.ID !== RespCode.zero) {
      await this.getUserAppealModel(this.ID);
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  private initComponent() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    //表单项
    const items2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
    let title = [];
    let desc = [];
    //申诉人ID
    items2.push({
      dataField: "user_id",
      label: {
        text: "申诉人"
      },
      editorOptions: {
        placeholder: "申诉人ID"
      },
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.user_nickname)
          .appendTo(aItemEle);
      }
    });

    //手机号
    items2.push({
      dataField: "mobile_num",
      editorType: "dxNumberBox",
      label: {
        text: "手机号"
      },
      editorOptions: {
        placeholder: "手机号"
      },
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.mobile_num.toString())
          .appendTo(aItemEle);
      }
    });

    //邮箱
    items2.push({
      dataField: "email",
      label: {
        text: "邮箱"
      },
      editorOptions: {},
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.email)
          .appendTo(aItemEle);
      }
    });

    //新邮箱
    items2.push({
      dataField: "new_email",
      label: {
        text: "新邮箱"
      },
      editorOptions: {},
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.new_email)
          .appendTo(aItemEle);
      }
    });

    //新手机号
    items2.push({
      dataField: "new_mobile_num",
      label: {
        text: "新手机号"
      },
      editorType: "dxNumberBox",
      editorOptions: {},
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.new_mobile_num.toString())
          .appendTo(aItemEle);
      }
    });

    //审核状态
    items2.push({
      dataField: "status",
      editorType: "dxSelectBox",
      label: {
        text: "审核状态"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.appeal_status
      },
      validationRules: [Validation.getRequired("审核状态不能为空!")]
    });

    //操作说明
    items2.push({
      dataField: "op_desc",
      editorType: "dxTextArea",
      label: {
        text: "操作说明"
      },
      editorOptions: {
        placeholder: "操作说明"
      },
      validationRules: [Validation.getRequired("操作说明不能为空!")]
    });

    //用户说明
    items2.push({
      dataField: "user_desc",
      editorType: "dxTextArea",
      label: {
        text: "用户说明"
      },
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        $("<div></div>")
          .html(this.dxFormData1.user_desc)
          .appendTo(aItemEle);
      }
    });

    //申诉来源
    items2.push({
      dataField: "appeal_source",
      editorType: "dxSelectBox",
      label: {
        text: "申诉来源"
      },
      editorOptions: {
        dataSource: CommonUtils.getDictonary().data.appeal_source
      },
      template: (
        data: {
          component: DevExpress.ui.dxForm;
          dataField: string;
          editorOptions: any;
          editorType?: string;
        },
        aItemEle: JQuery
      ) => {
        let dd = CommonUtils.getDicText(
          CommonUtils.getDictonary().data.appeal_source,
          this.dxFormData1.appeal_source
        );
        $("<div></div>")
          .html(dd)
          .appendTo(aItemEle);
      }
    });

    //申诉凭证1 截图最大为500k
    items2.push(
      this.createUploadFileFormItem(
        image => {},
        {
          dataField: "appeal_voucher1",
          label: {
            text: "申诉凭证1"
          }
          // validationRules: [Validation.getRequired("申诉凭证1")]
        },
        {}
      )
    );

    //申诉凭证2 截图最大为500k
    items2.push(
      this.createUploadFileFormItem(
        image => {},
        {
          dataField: "appeal_voucher2",
          label: {
            text: "申诉凭证2"
          }
          // validationRules: [Validation.getRequired("申诉凭证2")]
        },
        {}
      )
    );

    // //申诉凭证1 截图最大为500k
    // items2.push({
    //     dataField: "appeal_voucher1",
    //     // editorType: "dxSelectBox",
    //     label: {
    //         text: '申诉凭证1'
    //     },
    //     editorOptions: {
    //         // displayExpr: "name",
    //         // valueExpr: "id",
    //     }
    // });

    // //申诉凭证2 截图最大为500k
    // items2.push({
    //     dataField: "appeal_voucher2",
    //     // editorType: "dxSelectBox",
    //     label: {
    //         text: '申诉凭证2'
    //     },
    //     editorOptions: {
    //         // displayExpr: "name",
    //         // valueExpr: "id",
    //     }
    // });

    //按钮组
    const items3: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
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
    const group2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
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
    };
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
   * 申诉信息提交
   */
  private async onClickDoHandler() {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }

      this.dxFormData1.account_token = this.token;
      let f = this.joinFormParams(this.dxFormData1);

      let result = await this.userappealAPI.userAppealUpdate(this.ID, f);
      if (
        result.code == RespCode.OK ||
        result.code == RespCode.isSame ||
        result.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/user/appeal/list");
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
    this.redirect("/user/appeal/list");
  }

  /**
   * 获取申诉模型
   * @param id
   */
  private async getUserAppealModel(id: number) {
    let d = await this.userappealAPI.getUserAppealModel(id);
    this.dxFormData1 = d.data;
    this.dxForm1.option("formData", this.dxFormData1);
    //根据用户ID查询用户原始信息
    if (d.data && d.data.user_id && d.data.user_id > 0) {

    }
  }

  /**
   * 初始化老用户信息
   */
  private initOldUserControl() {
    this.dxForm2 = this.getDxInstanceByKey("dxFormKey2");
    this.dxForm2.option({
      caption: "原始信息",
      items: []
    });
  }
}
