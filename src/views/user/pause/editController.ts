import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {UserApi} from '@/api/UserApi';
import {UserModel} from '@/models/UserModel';
import { Validation } from '@/common/Validation';
import { RespCode } from '@/common/RespCode';

/**
 * 用户暂停编辑
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
    staff_desc?: string
  } = {};

  private dxFormDataReset1: {
    account_token?: string,
    staff_desc?: string
  } = {};

  private userAPI = new UserApi();

  private userId: number;
  /**
   * 入口
   */
  protected async mounted() {
    this.userId = Number(this.getParam("user_id"));
    let d = await this.userAPI.getUserModel(this.userId);
    if(d.data.pause_status==1){
      this.alert("用户已经暂停了!").then(()=>{
        this.redirect("/user/list");
      });
      return;
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
      caption: "用户暂停",
      items: [{
        dataField: "staff_desc",
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
            text: "更新",
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
      let d = await this.userAPI.userUpdatePause(this.ID, this.userId, {
        account_token: this.token,
        staff_desc: this.dxFormData1.staff_desc
      });
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

  /**
* 获取会员模型
* @param id 
*/
  private async getUserModel(id: number) {
    let d = await this.userAPI.getUserModel(id);
    this.dxFormData1 = d.data;
    this.dxForm1.option("formData", this.dxFormData1);
  }

}