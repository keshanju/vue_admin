import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { RefundLogApi } from '@/api/RefundLogApi';
import { RefundLogModel } from '@/models/RefundLogModel';
import { RespCode } from '@/common/RespCode';
/**
 * 退款记录编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: RefundLogModel = { id: 0 };
  private dxFormDataReset1: RefundLogModel = {};

  private invoiceRefundApi = new RefundLogApi();

  /**
 * 入口
 */
  protected async mounted() {
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
      caption: this.ID > RespCode.zero ? "更新" : "添加",
      items: []
    }, {
      itemType: "group",
      colCount: 3,
      items: [
        {
          itemType: "button",
          horizontalAlignment: "center",
          buttonOptions: {
            text: this.submitText,
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
      width: 500,
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
    let d = await this.invoiceRefundApi.getModel(id);
    this.dxFormData1 = d.data;

    this.dxForm1.option({
      formData: this.dxFormData1
    });
  }

  /**
     * 添加 修改 事件
     * @param sender 
     */
  private async onClickDoHandler(sender) {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      this.dxFormData1.account_token = this.token;
      let postData = this.joinFormParams(this.dxFormData1);
      let d: any;
      if (this.dxFormData1.id == RespCode.zero) {
        d = await this.invoiceRefundApi.setAdd(postData);
      } else {
        d = await this.invoiceRefundApi.setUpdate(this.ID, postData);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/order/refund/list");
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
   * @param sender 
   */
  private async onClickBackHandler(sender) {
    this.redirect("/order/refund/list");
  }

}