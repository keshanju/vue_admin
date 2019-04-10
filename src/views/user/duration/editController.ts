import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserDurationApi } from '@/api/UserDurationApi';
import { UserDurationModel } from '@/models/UserDurationModel';
import { BaseModel } from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import value from '*.json';

/**
 * 时长编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private userdurationAPI = new UserDurationApi();

  private dxFormData1: UserDurationModel = {};
  private dxFormDataReset1: UserDurationModel = {};

  protected async mounted() {
    (this.$parent as any).content_title = "赠送时长";
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.initComponent();
    // if (this.ID !== RespCode.zero) {
    //   await this.getUserDurationModel(this.ID);
    // }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  private initComponent() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    //表单项
    const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
    items2.push({
      dataField: "minutes_type",
      editorType: "dxSelectBox",
      label: {
        text: "赠送时长类型"
      },
      editorOptions: {
        placeholder: "请选择赠送时长类型",
        displayExpr: "text",
        valueExpr: "id",
        dataSource: [
          {
            text: "一天",
            id: 1
          },
          {
            text: "一个月(30天)",
            id: 2
          },
          {
            text: "二个月",
            id: 3
          },
          {
            text: "三个月",
            id: 4
          },
          {
            text: "四个月",
            id: 5
          },
          {
            text: "五个月",
            id: 6
          },
          {
            text: "六个月",
            id: 7
          },
          {
            text: "十二个月(一年)",
            id: 8
          },
          {
            text: "指定时长",
            id: 9
          }
        ],
        value: 9,
        onValueChanged: (e: any) => {
          //计算分钟数
          let minutesCount = 0;
          switch (e.value) {
            case 1:
              minutesCount = 1 * 24 * 60;
              break;
            case 2:
              minutesCount = 30 * 24 * 60 * 1;
              break;
            case 3:
              minutesCount = 30 * 24 * 60 * 2;
              break;
            case 4:
              minutesCount = 30 * 24 * 60 * 3;
              break;
            case 5:
              minutesCount = 30 * 24 * 60 * 4;
              break;
            case 6:
              minutesCount = 30 * 24 * 60 * 5;
              break;
            case 7:
              minutesCount = 30 * 24 * 60 * 6;
              break;
            case 8:
              minutesCount = 30 * 24 * 60 * 12;
              break;
          }

          this.dxForm1.getEditor("minutes").option({
            value: minutesCount
          });

        }
      },
      validationRules: [
        Validation.getRequired("赠送时长类型不能为空!"),
      ]
    });
    //分钟数
    items2.push({
      dataField: "minutes",
      editorType: "dxNumberBox",
      label: {
        text: "分钟数"
      },
      editorOptions: {
        placeholder: "请填写分钟数!",
        value: 0
      },
      validationRules: [
        Validation.getRequired("分钟数不能为空!"),
      ]
    });

    //按钮组
    const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
    items3.push({
      itemType: "button",
      horizontalAlignment: "center",
      buttonOptions: {
        text: "赠送时长",
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
      //caption: Lang.Edit,
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

  }

  /**
   * 重置
   */
  private onResetHandler(sender) {
    this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
    this.dxForm1.option("formData", this.dxFormData1);
  }

  /**
 * 信息提交
 */
  private async onClickDoHandler() {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      this.dxFormData1.account_token = this.token;
      let f = this.joinFormParams(this.dxFormData1);

      let result = await this.userdurationAPI.userDurationUpdate(this.ID, f);
      if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/user/list");
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
    this.redirect("/user/list");
  }

}