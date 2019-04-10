import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { CommonUtils } from "@/common/CommonUtils";

import { ApprovalApi } from "@/api/ApprovalApi";
import { ApprovalModel } from "@/models/ApprovalModel";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";
import { DictionaryModel } from "@/models/DictionaryModel";
/**
 * 审核编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: ApprovalModel = { id: 0 };
  private dxFormDataReset1: ApprovalModel = {};

  private approvalApi = new ApprovalApi();

  private stateSelected: number = 0;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "退款审核";
    if (this.ID > RespCode.zero) {
      await this.getDataModel(this.ID);
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    this.initControls();
  }

  /**
   * 控件初始化
   */
  private initControls() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    let state_dic: DictionaryModel[] = [];
    if (this.dxFormData1.state == 0) {
      state_dic = CommonUtils.getDictonary().data.approval_state.filter(
        (value: DictionaryModel, index: number) => {
          return value.id == 1 || value.id == -1;
        }
      );
    } else if (this.dxFormData1.state == 1 || this.dxFormData1.state == -1) {
      state_dic = CommonUtils.getDictonary().data.approval_state.filter(
        (value: DictionaryModel, index: number) => {
          return value.id == 2 || value.id == -2;
        }
      );
    } else if (this.dxFormData1.state == 2 || this.dxFormData1.state == -3) {
      state_dic = CommonUtils.getDictonary().data.approval_state.filter(
        (value: DictionaryModel, index: number) => {
          return value.id == 3;
        }
      );
    }

    let state: DevExpress.ui.dxFormSimpleItem = {
      dataField: "state",
      label: {
        text: "审核状态"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择审核状态",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: state_dic, // CommonUtils.getDictonary().data.approval_state,
        onValueChanged: e => {
          this.stateSelected = e.value;
        }
      },
      validationRules: [Validation.getRequired("审核状态不能为空!")]
    };

    let state_label: DevExpress.ui.dxFormSimpleItem = {
      label: {
        text: "当前状态"
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
          .html(
            CommonUtils.getDicText(
              CommonUtils.getDictonary().data.approval_state,
              this.dxFormDataReset1.state
            )
          )
          .appendTo(aItemEle);
      }
    };

    let first: DevExpress.ui.dxFormSimpleItem = {
      dataField: "first_approval_desc",
      label: {
        text: "初步审核备注"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入初步审核备注，至少5个字符",
        height: 150
      },
      validationRules: [
        Validation.getRequired("初步审核备注不能为空!"),
        {
          type: "stringLength",
          min: 5,
          max: 200,
          message: "备注必须在5~200之间!"
        }
      ]
    };

    let first_label: DevExpress.ui.dxFormSimpleItem = {
      dataField: "first_approval_desc",
      label: {
        text: "初步审核备注"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入初步审核备注，至少5个字符",
        height: 150
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
          .html(this.dxFormDataReset1.first_approval_desc)
          .appendTo(aItemEle);
      }
    };

    let confirm: DevExpress.ui.dxFormSimpleItem = {
      dataField: "confirm_approval_desc",
      label: {
        text: "确认审核备注"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入确认审核备注，至少5个字符",
        height: 150
      },
      validationRules: [
        Validation.getRequired("确认审核备注不能为空!"),
        {
          type: "stringLength",
          min: 5,
          max: 200,
          message: "备注必须在5~200之间!"
        }
      ]
    };

    let confirm_label: DevExpress.ui.dxFormSimpleItem = {
      dataField: "confirm_approval_desc",
      label: {
        text: "确认审核备注"
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
          .html(this.dxFormDataReset1.confirm_approval_desc)
          .appendTo(aItemEle);
      }
    };

    let refund: DevExpress.ui.dxFormSimpleItem = {
      dataField: "refund_desc",
      label: {
        text: "退款审核备注"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入退款审核备注，至少5个字符",
        height: 150
      },
      validationRules: [
        Validation.getRequired("退款审核备注不能为空!"),
        {
          type: "stringLength",
          min: 5,
          max: 200,
          message: "备注必须在5~200之间!"
        }
      ]
    };

    let refund_label: DevExpress.ui.dxFormSimpleItem = {
      dataField: "refund_desc",
      label: {
        text: "退款审核备注"
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
          .html(this.dxFormDataReset1.refund_desc)
          .appendTo(aItemEle);
      }
    };

    let approval_state_btn_flag = false;
    let pp: DevExpress.ui.dxFormSimpleItem[] = [];
    switch (this.dxFormDataReset1.state) {
      case 0:
        pp.push(state_label, state, first);
        break;
      case -1:
      case 1:
        pp.push(state_label, state, first_label, confirm);
        break;
      case -2:
      case 2:
        pp.push(state_label, state, first_label, confirm_label, refund);
        break;
      case 3:
        pp.push(state_label, first_label, confirm_label, refund_label);
        approval_state_btn_flag = true;
        break;
    }

    const items1: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        itemType: "group",
        //caption: '审核',
        items: pp
      },
      {
        itemType: "group",
        colCount: 3,
        items: [
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "审核",
              type: "success",
              useSubmitBehavior: true,
              disabled: approval_state_btn_flag,
              onClick: this.onClickDoHandler
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "重置",
              type: "normal",
              visible: !approval_state_btn_flag,
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
      }
    ];

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.dxFormData1,
      items: items1,
      width: 500,
      validationGroup: "customerData"
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
    let d = await this.approvalApi.getModel(id);
    if (d.code != RespCode.zero) {
      this.alert(d.msg).then(() => {
        this.redirect("/user/list");
      });
    }
    this.dxFormData1 = d.data;

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

      if (this.dxFormDataReset1.state == 0) {
        if (this.stateSelected != 1 && this.stateSelected != -1) {
          await this.alert("只能选择初步审核通过/初步审核不通过");
          return;
        }
      }

      if (
        this.dxFormDataReset1.state == 1 ||
        this.dxFormDataReset1.state == -1
      ) {
        if (this.stateSelected != 2 && this.stateSelected != -2) {
          await this.alert("只能选择确认审核通过/确认审核不通过");
          return;
        }
      }

      if (
        this.dxFormDataReset1.state == 2 ||
        this.dxFormDataReset1.state == -2
      ) {
        if (this.stateSelected != 3) {
          await this.alert("只能选择已退款");
          return;
        }
      }

      let desc: string = "";

      switch (this.dxFormDataReset1.state) {
        case 0:
          desc = this.dxFormDataReset1.first_approval_desc;
          break;
        case 1:
        case -1:
          desc = this.dxFormData1.confirm_approval_desc;
          break;
        case 2:
        case -2:
          desc = this.dxFormData1.refund_desc;
          break;
      }

      this.dxFormData1.account_token = this.token;
      //let postData = this.joinFormParams(this.dxFormData1);
      let d = await this.approvalApi.setUpdateApproval(this.ID, {
        account_token: this.dxFormData1.account_token,
        approval_id: this.ID,
        approval_state: this.dxFormData1.state,
        approval_desc: desc
      });

      if (
        d.code == RespCode.OK ||
        d.code == RespCode.isSame ||
        d.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/user/approval/list");
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
    this.redirect("/user/approval/list");
  }
}
