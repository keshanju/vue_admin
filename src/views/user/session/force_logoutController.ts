import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {UserSessionApi} from '@/api/UserSessionApi';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 强制下线编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: {
    account_token?: string,
    id?: number,
    user_id?: number,
    account_admin_desc?: string
  } = { id: 0 };

  private dxFormDataReset1: {
    account_token?: string,
    id?: number,
    user_id?: number,
    account_admin_desc?: string
  } = {};

  private userSessionApi = new UserSessionApi();

  private sessionId: number = 0;
  private userId: number = 0;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "强制下线";
    this.userId = Number(this.getParam("user_id"));
    this.sessionId = Number(this.getParam("session_id"));
    this.initComponents();
    // if (this.ID > RespCode.zero) {
    //   await this.getModel(this.ID);
    // }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  /**
   * 控件初始化
   */
  private initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: "强制下线",
      items: [{
        dataField: "account_admin_desc",
        label: {
          text: "描述"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入描述信息",
          height: 120
        },
        validationRules: [Validation.getRequired("描述信息不能为空!")]
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
        // {
        //   itemType: "button",
        //   alignment: "center",
        //   buttonOptions: {
        //     text: "重置",
        //     type: "normal",
        //     onClick: this.onResetHandler
        //   }
        // },
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
      let d = await this.userSessionApi.userSessionUpdateForce(this.sessionId, {
        account_token: this.token,
        db_id: this.ID,
        session_id: this.sessionId,
        user_id: this.userId,
        account_admin_desc: this.dxFormData1.account_admin_desc
      });

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/user/session/list");
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
    this.redirect("/user/session/list");
  }

  private async getModel(id: number) {
    let d = await this.userSessionApi.getUserSessionModel(id);
    this.dxFormData1 = d.data;
    this.dxForm1.option("formData", this.dxFormData1);
  }
}