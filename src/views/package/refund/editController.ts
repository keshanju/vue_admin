import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackageRefundConditionApi } from '@/api/PackageRefundConditionApi';
import { PackageRefundConditionModel, Result } from '@/models/PackageRefundConditionModel';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 套餐退款条件编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: PackageRefundConditionModel = { id: 0 };
  private dxFormDataReset1: PackageRefundConditionModel = {};

  private packageRefundConditionApi = new PackageRefundConditionApi();

  private refund_id: number = 0;
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐退款条件编辑";
    this.refund_id = Number(this.getParam("refund_id"));
    this.initComponents();
    if (this.refund_id > RespCode.zero) {
      await this.getDataModel(this.refund_id);
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
        dataField: "times",
        label: {
          text: "套餐消耗时间"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "包月(天)/计时(分钟)/网吧(分钟)",
          min: 0,
          hint: "包月(天)/计时(分钟)/网吧(分钟)"
        },
        validationRules: [
          Validation.getRequired("包月(天)/计时(分钟)/网吧(分钟)不能为空!")
        ]
      }, {
        dataField: "price",
        label: {
          text: "扣费价格(单位:分)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "请输入扣费价格(单位:分)",
          min: 0,
          hint: "请输入扣费价格(单位:分)"
        },
        validationRules: [
          Validation.getRequired("扣费价格不能为空!")
        ]
      }, {
        dataField: "label",
        label: {
          text: "标注"
        },
        editorOptions: {
          placeholder: "请输入标注"
        },
        validationRules: [
          Validation.getRequired("标注不能为空!")
        ]
      }]
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
    let d = await this.packageRefundConditionApi.getModel(this.ID, id);
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
        d = await this.packageRefundConditionApi.setAdd(this.ID, postData);
      } else {
        d = await this.packageRefundConditionApi.setUpdate(this.ID, this.refund_id, postData);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/package/" + this.ID + "/refund/list");
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
    this.redirect("/package/" + this.ID + "/refund/list");
  }

}