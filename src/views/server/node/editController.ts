import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { NodeModel,Result } from '@/models/NodeModel';
import { NodeApi } from '@/api/NodeApi';
import { CommonUtils } from '@/common/CommonUtils';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 节点编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: NodeModel = { id: 0, is_online: 1 };
  private dxFormDataReset1: NodeModel = {};

  private nodeAPI = new NodeApi();

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "服务器编辑";
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
      //caption: this.ID > RespCode.zero ? "更新" : "添加",
      items: [{
        dataField: "name",
        label: {
          text: "节点名称"
        },
        editorOptions: {
          placeholder: "请输入节点名称"
        },
        validationRules: [Validation.getRequired("节点名称不能为空!")]
      }, {
        dataField: "remark",
        label: {
          text: "节点备注"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入节点备注信息"
        },
        validationRules: [Validation.getRequired("节点备注不能为空")]
      }, 
      {
        dataField: "is_online",
        label: {
          text: "是否在线"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.flag
        },
        validationRules: [Validation.getRequired("是否在线不能为空!")]
      },
      {
        dataField: "node_type",
        label: {
          text: "节点类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.node_type
        },
        validationRules: [Validation.getRequired("是否在线不能为空!")]
      },
      //  {
      //   dataField: "min_vip_level",
      //   label: {
      //     text: "最小VIP级别"
      //   },
      //   editorType: "dxNumberBox",
      //   editorOptions: {
      //     value: 0,
      //     min: 0
      //   },
      //   validationRules: [Validation.getRequired("最小VIP级别不能为空!")]
      // }
    ]
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
    let d = await this.nodeAPI.getModel(id);
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
        d = await this.nodeAPI.setAdd(postData);
      } else {
        d = await this.nodeAPI.setUpdate(this.ID, postData);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/server/node/list");
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
    this.redirect("/server/node/list");
  }

}