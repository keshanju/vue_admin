import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {DomainWhiteApi} from '@/api/DomainWhiteApi';
import {DomainWhiteModel} from '@/models/DomainWhiteModel';

import { GameApi } from '@/api/GameApi';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 白名单编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: DomainWhiteModel = { id: 0 };
  private dxFormDataReset1: DomainWhiteModel = {};

  private domainWhiteAPI = new DomainWhiteApi();

  private dxSelectBoxGame1: DevExpress.ui.dxSelectBox;
  private gameApi = new GameApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "域名白名单编辑";
    this.initComponents();
    await this.getGameList();
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

    let domain: DevExpress.ui.dxFormSimpleItem;
    if (this.ID == RespCode.zero) {
      domain = {
        dataField: "domain",
        label: {
          text: "域名/IP"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入域名或者IP,多条请换行.",
          height: 200
        },
        validationRules: [
          Validation.getRequired("域名/IP不能为空!"),
        ]
      }
    } else {
      domain = {
        dataField: "domain",
        label: {
          text: "域名/IP"
        },
        editorOptions: {
          placeholder: "请输入域名或者IP"
        },
        validationRules: [
          Validation.getRequired("域名/IP不能为空!"),
        ]
      }
    }

    const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: this.ID > RespCode.zero ? "更新" : "添加",
      items: [domain, {
        dataField: "game_id",
        label: {
          text: "所属游戏"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择所属游戏",
          displayExpr: "title",
          valueExpr: "id",
          searchEnabled: true,
        },
        validationRules: [
          Validation.getRequired("所属游戏不能为空!")
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

    this.dxSelectBoxGame1 = this.dxForm1.getEditor("game_id");

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
    let d = await this.domainWhiteAPI.getModel(id);
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
      let d: any;
      if (this.dxFormData1.id == RespCode.zero) {
        d = await this.domainWhiteAPI.setAdd(postData);
      } else {
        d = await this.domainWhiteAPI.setUpdate(this.ID, postData);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(()=>{
          this.redirect("/system/domainwhite/list");
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
    this.redirect("/system/domainwhite/list");
  }

  /**
   * 获取游戏列表
   */
  private async getGameList() {
    let d = await this.gameApi.getListResult();
    this.dxSelectBoxGame1.option({
      dataSource: d.data
    })
  }
}