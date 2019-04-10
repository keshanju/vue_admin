import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {UserWanipApi} from '@/api/UserWanipApi';
import {UserWanipModel} from '@/models/UserWanipModel';
import {BaseModel} from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 用户网吧IP编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private userWanipAPI = new UserWanipApi();

  private dxFormData1: UserWanipModel = { id: 0 };
  private dxFormDataReset1: UserWanipModel = {};

  private wanipid: number = 0;

  protected async mounted() {
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.wanipid = Number(this.getParam("wan_id"));
    this.initComponent();
    if (this.wanipid >= RespCode.zero) {
      await this.getUserWanipModel(this.wanipid);
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  private initComponent() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    //表单项
    const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
    let title = [];
    let desc = [];
    if (this.ID == RespCode.zero) {
      // title = [
      //     Validation.getRequired("组名称不能为空!"),
      //     // Validation.getPassword("密码强度弱了至少一个字母!")
      // ];
      // desc = [
      //     Validation.getRequired("组描述不能为空!"),
      //     // Validation.getCompare(() => this.dxFormData1.staff_pwd, "两次输入的密码不一致!"),
      // ];
    }

    // //用户ID
    // items2.push({
    //   dataField: "user_id",
    //   label: {
    //     text: "用户ID"
    //   },
    //   editorOptions: {
    //     placeholder: "用户ID"
    //   },
    //   validationRules: [
    //     Validation.getRequired("用户ID不能为空!"),
    //   ]
    // });

    //IP地址
    items2.push({
      dataField: "user_ip",
      label: {
        text: 'IP地址'
      },
      editorOptions: {
        placeholder: "IP地址"
      },
      validationRules: [
        Validation.getRequired("IP地址不能为空!"),
        Validation.getIP()
      ]
    });

    //IP掩码
    items2.push({
      dataField: "ip_mask",
      label: {
        text: 'IP掩码'
      },
      editorOptions: {
        placeholder: "IP掩码"
      },
      validationRules: [
        Validation.getRequired("IP掩码不能为空!"),
        Validation.getIP("掩码无效！")
      ]
    });

    
    //按钮组
    const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
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

      items3.push({
        itemType: "button",
        horizontalAlignment: "center",
        buttonOptions: {
          text: "重置",
          type: "normal",
          onClick: this.onResetHandler
        }
      });

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
    const group2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
    group2.push({
      itemType: "group",
      caption: Lang.Edit,
      items: items2
    }, {
        itemType: "group",
        colCount: 3,
        items: items3
      });

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.dxFormData1,
      items: group2,
      width: 500
    }
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

      let result: BaseModel;
      if (this.wanipid == RespCode.zero) {
        result = await this.userWanipAPI.userWanipAdd(this.ID, f);
      } else {
        result = await this.userWanipAPI.userWanipUpdate(this.ID, this.wanipid, f);
      }
      
      if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
        this.toast(()=>{
          this.redirect("/user/"+ this.ID +"/wanip/list");
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
    this.redirect("/user/"+ this.ID +"/wanip/list");
  }


  /**
 * 获取申诉模型
 * @param id 
 */
  private async getUserWanipModel(wanipId:number) {
    let d = await this.userWanipAPI.getUserWanipModel(this.ID,this.wanipid);
    this.dxFormData1 = d.data;
    this.dxForm1.option("formData", this.dxFormData1);
  }
}