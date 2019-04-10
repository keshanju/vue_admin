import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxForm,
  DxTextBox,
  DxButton,
  DxValidationGroup,
  DxValidator,
  DxPopup
} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { StaffApi } from "@/api/StaffApi";
import { StaffModel, StaffLoginModel } from "@/models/StaffModel";
import { DictionaryApi } from "@/api/DictionaryApi";
import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { Validation } from "@/common/Validation";
import { RespCode } from "@/common/RespCode";

import md5 from "md5";
import { GSettingApi } from "@/api/GSettingApi";
import { ToolsApi } from "@/api/ToolsApi";
/**
 * 登录
 */
@Component({
  components: {
    DxForm,
    DxTextBox,
    DxButton,
    DxValidationGroup,
    DxPopup
  }
})
export default class IndexController extends BaseVue {
  // dev 控件引用
  private dxFormKey1: string = "dxForm_Key_1";
  // dev 控件
  private dxForm1: DevExpress.ui.dxForm;
  private dxGallery1: DevExpress.ui.dxGallery;
  private dxButton1: DevExpress.ui.dxButton;
  // 表单数据
  private formLoginData: StaffLoginModel = { password: "" };
  private dxFormDataReset1: StaffLoginModel = { password: "" };
  // 访问api
  private staffAPI = new StaffApi();
  //字典Api
  private dicApi = new DictionaryApi();

  private imgBase64 = "";

  // 入口
  protected async mounted() {
    this.initComponent();
    this.onCaptchaClickHandler({});

    this.dxForm1.registerKeyHandler("enter", async sender => {
      await this.onClickHandler();
    });
  }

  /**
   * 初始化组件
   */
  protected initComponent() {
    // 查找控件实例
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

    // 初始化表单项
    const items1: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        itemType: "group",
        caption: CommonUtils.siteName + " - " + Lang.lang_login_login_button,
        items: [
          {
            label: {
              text: Lang.lang_login_username
            },
            dataField: "username",
            editorType: "dxTextBox",
            editorOptions: {
              width: "90%"
            },
            validationRules: [Validation.getRequired("用户名不能为空!")]
          },
          {
            label: {
              text: Lang.lang_login_password
            },
            dataField: "password",
            editorType: "dxTextBox",
            editorOptions: {
              mode: "password",
              width: "90%"
            },
            validationRules: [Validation.getRequired("密码不能为空!")]
          },
          {
            label: {
              text: Lang.lang_login_captcha
            },
            dataField: "captcha",
            editorType: "dxTextBox",
            editorOptions: {
              width: "90%",
              onKeyUp: sender => {
                if (sender.keyCode == 13) {
                  this.onClickHandler();
                }
              }
            },
            validationRules: [Validation.getRequired("验证码不能为空!")]
          },
          {
            label: {
              text: Lang.lang_login_captcha_key,
              horizontalAlignment: "center"
            },
            dataField: "captcha_key",
            editorType: "dxGallery",
            editorOptions: {
              height: 40,
              width: 100,
              showIndicator: false,
              onItemClick: this.onCaptchaClickHandler
            }
          },
          {
            name: "btnLogin",
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: Lang.lang_login_login_button,
              type: "success",
              useSubmitBehavior: true,
              onClick: this.onClickHandler,
              width: "100%"
            }
          }
        ]
      }
    ];

    const options: DevExpress.ui.dxFormOptions = {
      formData: this.formLoginData,
      items: items1
    };
    this.dxForm1.option(options);
    this.dxGallery1 = this.dxForm1.getEditor("captcha_key");
  }

  /**
   * 登录处理
   * @param e
   */
  private async onClickHandler() {
    if (!this.validateForm(this.dxForm1)) {
      return;
    }
    let loginData = $.extend(true, {}, this.formLoginData);
    loginData.password = md5(this.formLoginData.password);
    const result = await this.staffAPI.loginCheck(loginData);
    if (result.code === RespCode.OK) {
      //用户登录信息
      CommonUtils.setStaffLoginInfo(result);
      //加载菜单信息

      //加载字典信息
      let resultDic = await this.dicApi.getList();
      CommonUtils.setDictionary(resultDic);
      //加载全局设置信息
      let resultSettings = await new GSettingApi().GSettingListPager(
        "",
        2000,
        1
      );
      CommonUtils.SetSettings(resultSettings.data.list);
      //加载国家代码

      let ds_country_code = await new ToolsApi().getCountryCodeList();
      //转换国家代码为数组
      let arr_country_code: { name: string; id: number }[] = [];
      for (const key in ds_country_code.data.list_country) {
        let val = ds_country_code.data.list_country[key];
        arr_country_code.push({
          name: key,
          id: val
        });
      }
      CommonUtils.setCountryCode(arr_country_code);
      //存储语言字典
      
      this.redirect("/dashboard");
    } else {
      let r = this.errorCodeMsg(result.code, result.msg);
      if (r) {
        this.onCaptchaClickHandler({});
      }
    }
  }

  /**
   * 加载验证码
   * @param sender
   */
  private async onCaptchaClickHandler(sender) {
    const result = await this.staffAPI.getCaptcha();
    this.formLoginData.captcha_key = result.data.key;
    this.dxGallery1.option({
      dataSource: [result.data.img]
    });
  }

  async loginInit() {
    const result = await this.staffAPI.getCaptcha();
    this.formLoginData.captcha_key = result.data.key;
    this.imgBase64 = result.data.img;
  }

  validate(params) {
    const result = params.validationGroup.validate();
    if (result.isValid) {
      params.validationGroup.reset();
    }
  }
}
