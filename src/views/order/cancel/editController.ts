import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { InvoiceApi } from '@/api/InvoiceApi';
import { InvoiceModel } from '@/models/InvoiceModel';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 订单取消编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: InvoiceModel = { id: 0 };
  private dxFormDataReset1: InvoiceModel = {};

  private invoiceAPI = new InvoiceApi();

  private cancelId: number = 0;
  /**
   * 入口
   */
  protected async mounted() {
    this.cancelId = Number(this.getParam("cancel_id"));
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
      caption: "更新",
      items: [{
        dataField: "cancel_desc",
        label: {
          text: "取消说明"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入取消说明，至少5个字符",
          height: 150
        },
        validationRules: [Validation.getRequired("取消说明不能为空!")]
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
    let d = await this.invoiceAPI.getModel(id);
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
      // let postData = this.joinFormParams(this.dxFormData1);

      let d = await this.invoiceAPI.setUpdateCancel(this.ID.toString(), this.cancelId, {
        account_token: this.dxFormData1.account_token,
        cancel_desc: this.dxFormData1.cancel_desc
      });

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/order/list");
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
    this.redirect("/order/list");
  }

}