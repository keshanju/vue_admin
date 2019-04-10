import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {UserPauseLogApi} from '@/api/UserPauseLogApi';
import {UserPauseLogModel} from '@/models/UserPauseLogModel';
import {BaseModel} from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 用户暂停日志
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;
  private userPauseAPI = new UserPauseLogApi();

  private dxFormData1: UserPauseLogModel = { id: 0 };
  private dxFormDataReset1: UserPauseLogModel = {};

  protected async mounted() {
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.initComponent();
    if (this.ID !== RespCode.zero) {
      await this.getUserPauseLogModel(this.ID);
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

    //用户ID
    items2.push({
      dataField: "user_id",
      label: {
        text: "用户ID"
      },
      editorOptions: {
        placeholder: "用户ID"
      },
      validationRules: [
        Validation.getRequired("用户ID不能为空!"),
      ]
    });

    //操作
    items2.push({
      dataField: "status",
      editorType: "dxSelectBox",
      label: {
        text: '操作'
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: [

        ],
        value: 0
      },
    });

    //暂停时间
    items2.push({
      dataField: "pause_time",
      editorType: "dxDateBox",
      label: {
        text: '暂停时间'
      },
      editorOptions: {
        placeholder: "暂停时间"
      }
    });

    //恢复时间
    items2.push({
      dataField: "resume_time",
      editorType: "dxDateBox",
      label: {
        text: '恢复时间'
      },
      editorOptions: {
        placeholder: "恢复时间"
      }
    });

    //暂停IP
    items2.push({
      dataField: "pause_ip",
      // editorType: "dxTextArea",
      label: {
        text: '暂停IP'
      },
      editorOptions: {
        placeholder: "暂停IP"
      }
    });

    //恢复ip
    items2.push({
      dataField: "resume_ip",
      // editorType: "dxTextArea",
      label: {
        text: '恢复ip'
      },
      editorOptions: {
        placeholder: "恢复ip"
      }
    });

    //后台操作人员
    items2.push({
      dataField: "staff_id",
      editorType: "dxSelectBox",
      label: {
        text: '后台操作人员'
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: [

        ],
        value: 0
      },
    });

    //操作描述
    items2.push({
      dataField: "staff_desc",
      label: {
        text: "操作描述"
      },
      editorOptions: {
        placeholder: "操作描述"
      },
      validationRules: [
        Validation.getRequired("操作描述不能为空!"),
      ]
    });

    //操作来源
    items2.push({
      dataField: "op_source",
      editorType: "dxSelectBox",
      label: {
        text: '操作来源'
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: [

        ],
        value: 0
      },
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

    if (this.ID == 0) {
      items3.push({
        itemType: "button",
        horizontalAlignment: "center",
        buttonOptions: {
          text: "重置",
          type: "normal",
          onClick: this.onResetHandler
        }
      });
    }

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
      if (this.dxFormData1.id == RespCode.zero) {
        result = await this.userPauseAPI.userPauseLogAdd(f);
      } else {
        result = await this.userPauseAPI.userPauseLogUpdate(this.dxFormData1.id, f);
      }
      if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
        this.toast(()=>{
          this.redirect("/user/user/list");
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
    this.redirect("/user/user/list");
  }


  /**
 * 获取申诉模型
 * @param id 
 */
  private async getUserPauseLogModel(id: number) {
    let d = await this.userPauseAPI.getUserPauseLogModel(id);
    this.dxFormData1 = d.data;
    this.dxForm1.option("formData", this.dxFormData1);
  }
}