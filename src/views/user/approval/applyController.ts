import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { ApprovalApi } from '@/api/ApprovalApi';
import { ApprovalModel, RefundInfoModel } from '@/models/ApprovalModel';
import { CommonUtils } from '@/common/CommonUtils';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 申请退款
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: RefundInfoModel = { id: 0 };
  private dxFormDataReset1: RefundInfoModel = {};

  private approvalApi = new ApprovalApi();

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "申请退款";
    if (this.ID > RespCode.zero) {
      await this.getDataModel(this.ID);
    }

    this.initComponents();

    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  /**
   * 控件初始化
   */
  private initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: "申请退款",
      items: [
        {
          dataField: "refund_explain",
          label: {
            text: "退费说明"
          },
          template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {

            let a = "";
            if (this.dxFormData1.refund_explain != null && this.dxFormData1.refund_explain.length > 0) {
              a = this.dxFormData1.refund_explain.join("<br/><br/>");
            }
            $("<div style='border:1px dashed #ccc;padding:10px;'></div>").html(a).appendTo(aItemEle);
          }
        },
        {
          dataField: "refund_explain",
          label: {
            text: "退费金额(分)"
          },
          template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {
            $("<div></div>").html(this.dxFormData1.refund_money).appendTo(aItemEle);
          }
        },
        {
          dataField: "refund_explain",
          label: {
            text: "价格类型"
          },
          template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {
            let typeStr = CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, this.dxFormData1.price_type);
            $("<div></div>").html(typeStr).appendTo(aItemEle);
          }
        },
        {
          dataField: "refund_reason",
          label: {
            text: "会员退款说明信息"
          },
          editorType: "dxTextArea",
          editorOptions: {
            placeholder: "请输入会员退款说明信息，至少5个字符",
            height: 150
          },
          validationRules: [Validation.getRequired("会员退款说明信息不能为空!")]
        }, {
          dataField: "first_approval_desc",
          label: {
            text: "初步审核说明"
          },
          editorType: "dxTextArea",
          editorOptions: {
            placeholder: "请输入初步审核说明，至少5个字符",
            height: 150
          },
          validationRules: [Validation.getRequired("初步审核说明不能为空!")]
        }]
    }, {
      itemType: "group",
      colCount: 3,
      items: [
        {
          itemType: "button",
          horizontalAlignment: "center",
          buttonOptions: {
            text: "提交",
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
    let d = await this.approvalApi.getModelRefundInfo(id);

    if (d.code != RespCode.zero) {
      this.alert(d.msg).then(() => {
        this.redirect("/user/list");
      });
    }

    this.dxFormData1 = d.data;

    // this.dxForm1.option({
    //     formData: this.dxFormData1
    // });
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
      let d = await this.approvalApi.setAddRefundInfo(this.ID, postData);
      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/user/list");
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
    this.redirect("/user/list");
  }

}