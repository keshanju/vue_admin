import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { VersionApi } from '@/api/VersionApi';
import { VersionModel, Result } from '@/models/VersionModel';
import { CommonUtils } from '@/common/CommonUtils';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { DateTimeUtils } from '@/utils/DateTimeUtils';

/**
 * 版本编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: VersionModel = { id: 0, is_enterprise: 0 };
  private dxFormDataReset1: VersionModel = {};

  private versionAPI = new VersionApi();

  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "版本添加";
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
        dataField: "app_platform_type",
        label: {
          text: "发布平台"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择发布平台",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.app_platform_type,
          onValueChanged: (sender) => {
            let val = sender.value;
            switch (val) {
              case 1:
                this.dxForm1.getEditor("not_upgrade_fail_url").option({ value: CommonUtils.GetSettingsVal("Ver_update_fail_url_pc") });
                this.dxForm1.getEditor("base_remote_url").option({ value: CommonUtils.GetSettingsVal("Ver_base_url_pc") });
                break;
              case 2:
                this.dxForm1.getEditor("not_upgrade_fail_url").option({ value: CommonUtils.GetSettingsVal("Ver_update_fail_url_and") });
                this.dxForm1.getEditor("base_remote_url").option({ value: CommonUtils.GetSettingsVal("Ver_base_url_and") });
                break;
              case 3:
                this.dxForm1.getEditor("not_upgrade_fail_url").option({ value: CommonUtils.GetSettingsVal("Ver_update_fail_url_ios") });
                this.dxForm1.getEditor("base_remote_url").option({ value: CommonUtils.GetSettingsVal("Ver_base_url_ios") });
                break;
              case 4:
                this.dxForm1.getEditor("not_upgrade_fail_url").option({ value: CommonUtils.GetSettingsVal("Ver_update_fail_url_mac") });
                this.dxForm1.getEditor("base_remote_url").option({ value: CommonUtils.GetSettingsVal("Ver_base_url_mac") });
                break;
            }
          }
        },
        validationRules: [
          Validation.getRequired("发布平台不能为空!")
        ]
      }, {
        dataField: "lang_type",
        label: {
          text: "语言平台"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择语言平台",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.user_lang
        },
        validationRules: [
          Validation.getRequired("语言平台不能为空!")
        ]
      }, {
        dataField: "is_enterprise",
        label: {
          text: "是否企业版"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择是否为企业版",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.flag
        },
        validationRules: [
          Validation.getRequired("请选择是否为企业版!")
        ]
      }, {
        dataField: "buildnum",
        label: {
          text: "编译版本"
        },
        editorOptions: {
          placeholder: "编译版本格式: yyyyMMddHHmmss",
          value: DateTimeUtils.getNow("yyyyMMddHHmmss")
        },
        validationRules: [
          Validation.getRequired("编译版本不能为空!")
        ]
      }, {
        dataField: "gamelib_version",
        label: {
          text: "编译库版本"
        },
        editorOptions: {
          value: DateTimeUtils.getNow("yyyyMMddHHmmss"),
          readOnly: true,
          disabled: true
        },
        validationRules: [
          Validation.getRequired("编译版本不能为空!")
        ]
      }, {
        dataField: "upgrade_remark",
        label: {
          text: "更新说明"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "更新说明信息",
          height: 100
        },
        validationRules: [
          Validation.getRequired("更新说明不能为空!")
        ]
      }, {
        dataField: "min_upgrade_app_version",
        label: {
          text: "最小可升级的版本"
        },
        editorOptions: {
          placeholder: "最小可升级的版本,格式为: 1.0.0.2"
        },
        validationRules: [
          Validation.getRequired("最小可升级的版本不能为空!")
        ]
      }, {
        dataField: "not_upgrade_fail_url",
        label: {
          text: "不能升级的版本打开网页"
        },
        editorOptions: {
          placeholder: "格式为: http://xxx"
        },
        validationRules: [
          Validation.getRequired("不能升级的版本打开页面不能为空!"),
          Validation.getHttp("不能升级的版本打开网页不正确!")
        ]
      }, {
        dataField: "app_version",
        label: {
          text: "主程序版本"
        },
        editorOptions: {
          placeholder: "格式为: 1.0.0.1"
        },
        validationRules: [
          Validation.getRequired("主程序不能为空!")
        ]
      }, {
        dataField: "base_remote_url",
        label: {
          text: "基本网址路径"
        },
        editorOptions: {
          placeholder: "格式为: http://xxx"
        },
        validationRules: [
          Validation.getRequired("基本路径不能为空!"),
          Validation.getHttp("基本网址路径不正确!")
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
    let d = await this.versionAPI.getModel(id);
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
        d = await this.versionAPI.setAdd(postData);
      } else {
        d = await this.versionAPI.setUpdate(this.ID, postData);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        // let al = await this.alert("处理成功!");
        // if (al) {
        //   this.redirect("/system/version/list");
        // }
        this.toast(() => {
          this.redirect("/system/version/list");
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
    this.redirect("/system/version/list");
  }

}