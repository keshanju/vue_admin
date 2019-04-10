import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxTextArea
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { UserApi } from "@/api/UserApi";
import { UserModel } from "@/models/UserModel";
import { BaseModel } from "@/models/BaseModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";
import md5 from "js-md5";

import "@/assets/hplus/js/jquery.min.js";
import "@/assets/hplus/js/plugins/slimscroll/jquery.slimscroll.min.js";
import { UserVipLevelApi } from "@/api/UserVipLevelApi";
import { PackageApi } from "@/api/PackageApi";

/**
 * 用户编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;
  private dxSelectBox1: DevExpress.ui.dxSelectBox;

  private userAPI = new UserApi();

  private dxFormData1: UserModel = {
    id: 0,
    user_name: "",
    mobile_num: "",
    mail: "",
    group_id: 1,
    mobile_contact_type: 1,
    status: 0,
    sex: 0,
    lang_id: 0,
    //user_from: 1,
    stoped_remaining: 0,
    ver_type: 1,
    pause_status: 0,
    vip_level: 0
  };

  private dxFormDataReset1: UserModel = {};

  protected async mounted() {
    (this.$parent as any).content_title = "用户编辑";
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }

    if (this.ID !== RespCode.zero) {
      await this.getUserModel(this.ID);
    }

    this.initComponent();
    this.getUserGroupList();
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  private async initComponent() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

    //表单项
    const items2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];

    //账号
    items2.push({
      dataField: "user_name",
      label: {
        text: "账号"
      },
      editorOptions: {
        placeholder: "请输入4-16位的字母、数字、下划线!"
        //disabled: this.dxFormData1.user_name != "" ? true : false,
      },
      validationRules: [
        //Validation.getRequired("账号不能为空!"),
        Validation.getUserName("请输入4-16位的字母、数字、下划线!")
      ]
    });

    let mobile_num = [];
    let password = [];
    let nickname = [];
    let group_id = [];
    if (this.ID == RespCode.zero) {
      mobile_num = [Validation.getRequired("手机号不能为空!")];
      password = [
        Validation.getRequired("密码不能为空!"),
        Validation.getPassword2()
      ];
      nickname = [Validation.getRequired("名称不能为空!")];
      group_id = [Validation.getRequired("用户组不能为空！")];
    }
    //用户组
    items2.push({
      dataField: "group_id",
      editorType: "dxSelectBox",
      label: {
        text: "用户组"
      },
      editorOptions: {
        displayExpr: "title",
        valueExpr: "id"
      },
      validationRules: group_id
    });
    //手机号
    items2.push({
      dataField: "mobile_num",
      label: {
        text: "手机号"
      },
      editorOptions: {
        placeholder: "请输入手机号"
        //disabled: this.dxFormData1.mobile_num != "" ? true : false,
      },
      validationRules: mobile_num
    });
    //密码
    items2.push({
      dataField: "password",
      label: {
        text: "密码"
      },
      editorOptions: {
        mode: "password",
        placeholder: "密码必须6~20位字母+数字组合"
      },
      validationRules: password
    });
    //昵称
    items2.push({
      dataField: "nickname",
      label: {
        text: "昵称"
      },
      editorOptions: {
        placeholder: "请输入有效的昵称"
      },
      validationRules: nickname
    });
    //生日
    items2.push({
      dataField: "birthday",
      editorType: "dxDateBox",
      label: {
        text: "出生年月"
      },
      editorOptions: {
        placeholder: "出生年月",
        type: "datetime",
        displayFormat: "yyyy-MM-dd",
        dateSerializationFormat: "yyyy-MM-dd",
        showClearButton: true
      }
    });
    //邮箱
    items2.push({
      dataField: "mail",
      label: {
        text: "邮箱"
      },
      editorOptions: {
        placeholder: "有效邮箱"
        //disabled: this.dxFormData1.mail != "" ? true : false,
      },
      validationRules: [Validation.getEmail("不是有效的邮箱!")]
    });
    //即时通讯联系类型
    items2.push({
      dataField: "mobile_contact_type",
      editorType: "dxSelectBox",
      label: {
        text: "即时通讯联系类型"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.mobile_contact_type
      },
      validationRules: []
    });
    //联系号码
    items2.push({
      dataField: "mobile_contact_number",
      label: {
        text: "联系号码"
      },
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: "有效联系号码"
      },
      validationRules: [Validation.getTel("不是有效的电话号码")]
    });
    //地址
    items2.push({
      dataField: "address",
      label: {
        text: "地址"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "有效地址"
      },
      validationRules: []
    });
    //状态 0正常 1 无效 2 锁定
    items2.push({
      dataField: "status",
      editorType: "dxSelectBox",
      label: {
        text: "状态"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.user_status
      }
    });
    //是否提醒 0提醒 1关闭
    items2.push({
      dataField: "stoped_remaining",
      editorType: "dxSelectBox",
      label: {
        text: "是否提醒"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });

    //性别
    items2.push({
      dataField: "sex",
      editorType: "dxSelectBox",
      label: {
        text: "性别"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.user_sex
      }
    });
    //锁定IP
    items2.push({
      dataField: "locked_ip",
      editorType: "dxTextArea",
      label: {
        text: "锁定IP"
      },
      editorOptions: {
        placeholder: "锁定IP"
      }
    });
    //语言
    items2.push({
      dataField: "lang_id",
      editorType: "dxSelectBox",
      label: {
        text: "语言"
      },
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.user_lang
      }
    });
    //邮编
    items2.push({
      dataField: "postcode",
      // editorType: "dxSelectBox",
      label: {
        text: "邮编"
      },
      editorOptions: {
        placeholder: "邮编"
      },
      validationRules: [Validation.getPostCode("不是有效的邮编!")]
    });
    //管理员密码
    items2.push({
      dataField: "admin_password",
      // editorType: "dxSelectBox",
      label: {
        text: "管理密码"
      },
      editorOptions: {
        placeholder: "管理密码"
      }
    });
    //会员级别
    items2.push({
      dataField: "vip_level",
      editorType: "dxSelectBox",
      label: {
        text: "会员级别"
      },
      editorOptions: {
        placeholder: "请选择一个用户级别",
        displayExpr: "title",
        valueExpr: "id"
      },
      validationRules: [Validation.getRequired("请选择一个用户级别!")]
    });

    //套餐id
    items2.push({
      dataField: "package_id",
      editorType: "dxSelectBox",
      label: {
        text: "指定套餐"
      },
      editorOptions: {
        placeholder: "指定套餐",
        displayExpr: "title",
        valueExpr: "id"
      },
      validationRules: [Validation.getRequired("请指定一个套餐!")]
    });

    //套餐id
    items2.push({
      dataField: "refer_code",
      label: {
        text: "自定义推荐码"
      },
      editorOptions: {
        placeholder: "自定义推荐码,主要给特殊人群使用,比如主播",
      },
      validationRules: []
    });
    /**
     * 编辑更新
     */
    if (this.ID !== RespCode.zero) {
    }

    //按钮组
    const items3: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
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
    const group2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
    group2.push(
      {
        itemType: "group",
        //caption: Lang.Edit,
        items: items2
      },
      {
        itemType: "group",
        colCount: 3,
        items: items3
      }
    );

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.dxFormData1,
      items: group2,
      width: 500
    };
    this.dxForm1.option(options);
    this.dxSelectBox1 = this.dxForm1.getEditor("group_id");

    //用户等级
    let userVipLevelApi = new UserVipLevelApi();
    let d = await userVipLevelApi.getList();
    this.dxForm1.getEditor("vip_level").option({ dataSource: d.data });

    //用户套餐
    let userPackageApi = new PackageApi();
    let dPackage = await userPackageApi.getList();
    this.dxForm1.getEditor("package_id").option({ dataSource: dPackage.data });
  }
  /**
   * 重置
   */
  private onResetHandler(sender) {
    this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
    this.dxForm1.option("formData", this.dxFormData1);
  }

  /**
   * 会员信息提交
   */
  private async onClickDoHandler() {
    if (!this.validateForm(this.dxForm1)) {
      return;
    }

    this.dxFormData1.account_token = this.token;

    let aa = $.extend(true, {}, this.dxFormData1);
    if (aa.id == 0) {
      aa.password = md5(aa.password);
    } else {
      if (aa.password != null && aa.password != "") {
        aa.password = md5(aa.password);
      }
    }
    let f = this.joinFormParams(aa);

    let result: BaseModel;
    if (this.dxFormData1.id == RespCode.zero) {
      result = await this.userAPI.userAdd(f);
    } else {
      result = await this.userAPI.userUpdate(this.dxFormData1.id, f);
    }
    if (
      result.code == RespCode.OK ||
      result.code == RespCode.isSame ||
      result.code == RespCode.isSameSaveData
    ) {
      this.toast(() => {
        this.redirect("/user/list");
      });
    } else {
      this.errorCodeMsg(result.code, result.msg);
    }
  }

  /**
   * 获取角色组
   */
  private async getUserGroupList() {
    let d = await this.userAPI.getList();
    this.dxSelectBox1.option({
      dataSource: d.data
    });
  }

  /**
   * 返回
   */
  private onClickBackHandler() {
    this.redirect("/user/list");
  }

  /**
   * 获取会员模型
   * @param id
   */
  private async getUserModel(id: number) {
    let d = await this.userAPI.getUserModel(id);
    this.dxFormData1 = d.data;
    //this.dxForm1.option("formData", this.dxFormData1);
  }

  public testAlert() {
    this.alert("我是测试信息!");
  }
}
