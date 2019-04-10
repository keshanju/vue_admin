import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";

import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxTextArea
} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { GameApi } from "@/api/GameApi";
import { GameModel } from "@/models/GameModel";
import { BaseModel } from "@/models/BaseModel";

import { CommonUtils } from "@/common/CommonUtils";
import { UploadApi } from "@/api/UploadApi";
import { Lang } from "@/common/Lang";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";

/**
 * 游戏编辑
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

  private gameAPI = new GameApi();
  private dxFormData1: GameModel = {
    id: 0,
    game_type: 0,
    is_config_id: 0,
    is_hot: 0,
    is_support_android: 0,
    is_support_host_game: 0,
    is_support_ios: 0,
    is_support_mac: 0,
    is_support_windows: 1,
    is_valid: 1,
    is_hide_bandwidth: 0,
    android_dns_model: 0,
    sort_num: 0,
    is_free: 0,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: [],
    free_include_region_codes: "",
    free_include_region_codes_arr: [],
    free_exclude_region_codes: "",
    free_exclude_region_codes_arr: [],
    is_perset: 0,
    is_download_game:0,
  };
  private dxFormDataReset1: GameModel = {};

  protected uploadApi = new UploadApi();

  private j_game_background_url: JQuery;
  private j_big_background_image_url: JQuery;
  private j_game_pic_url: JQuery;

  protected async mounted() {
    (this.$parent as any).content_title = "游戏编辑";
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.initComponent();
    if (this.ID !== RespCode.zero) {
      await this.getGameModel(this.ID);
      this.j_game_background_url.attr(
        "src",
        this.uploadApi.getUploadHttp + this.dxFormData1.game_background_url
      );
      this.j_game_pic_url.attr(
        "src",
        this.uploadApi.getUploadHttp + this.dxFormData1.game_pic_url
      );
      this.j_big_background_image_url.attr(
        "src",
        this.uploadApi.getUploadHttp +
          this.dxFormData1.game_background_large_url
      );
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }

  private initComponent() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    //表单项
    const items2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
    //游戏名
    items2.push({
      dataField: "title",
      label: {
        text: "游戏名"
      },
      editorOptions: {
        placeholder: "请输入游戏名"
      },
      validationRules: [Validation.getRequired("游戏名不能为空!")]
    });

    //查询关键字
    items2.push({
      dataField: "keywords",
      label: {
        text: "查询关键字"
      },
      editorOptions: {
        placeholder: "请输入查询关键字."
      },
      validationRules: [Validation.getRequired("查询关键字不能为空!")]
    });
    //游戏信息
    items2.push({
      dataField: "game_info",
      label: {
        text: "游戏信息"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入游戏信息."
      },
      validationRules: [Validation.getRequired("游戏信息不能为空!")]
    });

    //游戏小图标
    items2.push(
      this.createUploadFileFormItem(
        image => {
          this.j_game_pic_url = image;
        },
        {
          dataField: "game_pic_url",
          label: {
            text: "游戏图标1"
          },
          validationRules: [Validation.getRequired("游戏图标1不能为空!")]
        },
        {
          name: "photo",
          uploadUrl: this.uploadApi.getUploadGamePicPath
        }
      )
    );
    //游戏背景图
    items2.push(
      this.createUploadFileFormItem(
        image => {
          this.j_game_background_url = image;
        },
        {
          dataField: "game_background_url",
          label: {
            text: "游戏图标2"
          },
          validationRules: [Validation.getRequired("游戏图标2不能为空!")]
        },
        {
          name: "photo",
          uploadUrl: this.uploadApi.getUploadGameBackGroundPath
        }
      )
    );

    //游戏大背景图
    items2.push(
      this.createUploadFileFormItem(
        image => {
          this.j_big_background_image_url = image;
        },
        {
          dataField: "game_background_large_url",
          label: {
            text: "游戏大背景图"
          },
          validationRules: [Validation.getRequired("游戏大背景图不能为空!")]
        },
        {
          name: "filename",
          uploadUrl: this.uploadApi.getUploadNormalPath("big_background")
        }
      )
    );
    //游戏分类
    items2.push({
      dataField: "game_type",
      label: {
        text: "游戏分类"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.game_area
      },
      validationRules: [Validation.getRequired("游戏分类不能为空!")]
    });

    //游戏h5页面标题
    items2.push({
      dataField: "game_h1_title",
      label: {
        text: "游戏h5页面标题"
      },
      editorOptions: {
        placeholder: "请输入游戏h5页面标题."
      }
    });
    //游戏ss规则
    items2.push({
      dataField: "game_ss_rules",
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入游戏ss规则.",
        height: 120
      },
      label: {
        text: "游戏ss规则"
      }
    });
    //游戏ios规则
    items2.push({
      dataField: "game_ios_rules",
      editorOptions: {
        placeholder: "请输入游戏ios规则.",
        height: 120
      },
      label: {
        text: "游戏ios规则"
      },
      editorType: "dxTextArea"
    });

    //游戏安卓规则
    items2.push({
      dataField: "game_android_rules",
      editorOptions: {
        placeholder: "请输入游戏安卓规则.",
        height: 120
      },
      editorType: "dxTextArea",
      label: {
        text: "游戏安卓规则"
      }
    });
    //主机游戏规则
    items2.push({
      dataField: "game_host_rules",
      editorOptions: {
        placeholder: "请输入主机游戏规则.",
        height: 120
      },
      editorType: "dxTextArea",
      label: {
        text: "主机游戏规则"
      }
    });
    //mac游戏规则
    items2.push({
      dataField: "game_mac_rules",
      editorOptions: {
        placeholder: "请输入游戏mac规则.",
        height: 120
      },
      editorType: "dxTextArea",
      label: {
        text: "mac游戏规则"
      }
    });
    //vpn规则
    items2.push({
      dataField: "game_vpn_rules",
      editorOptions: {
        placeholder: "请输入vpn规则.",
        height: 120
      },
      editorType: "dxTextArea",
      label: {
        text: "vpn规则"
      }
    });
    //是否支持windows
    items2.push({
      dataField: "is_support_windows",
      label: {
        text: "是否支持windows"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //是否支持ios
    items2.push({
      dataField: "is_support_ios",
      label: {
        text: "是否支持ios"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //是否支持安卓
    items2.push({
      dataField: "is_support_android",
      label: {
        text: "是否支持安卓"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //是否支持mac
    items2.push({
      dataField: "is_support_mac",
      label: {
        text: "是否支持mac"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //是否支持主机
    items2.push({
      dataField: "is_support_host_game",
      label: {
        text: "是否支持主机"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //Android包名
    items2.push({
      dataField: "android_package_name",
      label: {
        text: "Android包名"
      },
      editorOptions: {
        placeholder: "Android包名.格式为 com.app.xx"
      }
    });
    //带宽速度
    items2.push({
      dataField: "bandwidth",
      label: {
        text: "带宽速度"
      },
      editorOptions: {
        placeholder: "带宽速度,,例如:200k/200k 5000k/5000k 2000k/2000k 15k/15k"
      }
    });
    //是否有效
    items2.push({
      dataField: "is_valid",
      label: {
        text: "是否有效"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      }
    });
    //是否配置区服
    // items2.push({
    //     dataField: "is_config_id",
    //     label: {
    //         text: '是否启用游戏区服'
    //     },
    //     editorType: "dxSelectBox",
    //     editorOptions: {
    //         displayExpr: "name",
    //         valueExpr: "id",
    //         dataSource: CommonUtils.getDictonary().data.flag
    //     },
    //     validationRules: [Validation.getRequired()]
    // });
    //是否热门游戏
    items2.push({
      dataField: "is_hot",
      label: {
        text: "是否热门"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: [Validation.getRequired("请选择热门类型!")]
    });

    //DNS
    items2.push({
      dataField: "android_dns_model",
      label: {
        text: "安卓DNS"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.android_dns_model
      },
      validationRules: []
    });

    //Xml
    items2.push({
      dataField: "sort_num",
      label: {
        text: "Xml排序"
      },
      editorType: "dxNumberBox",
      editorOptions: {
        // displayExpr: "name",
        // valueExpr: "id",
        // dataSource: CommonHelper.getDictonary().data.flag
        min: 0
      },
      validationRules: [Validation.getRequired("Xml排序不能为空!")]
    });

    //是否限免
    items2.push({
      dataField: "is_free",
      label: {
        text: "是否限免"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择限免类型.",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: [Validation.getRequired("请选择限免类型!")]
    });

    //是否隐藏带宽
    items2.push({
      dataField: "is_hide_bandwidth",
      label: {
        text: "是否隐藏带宽"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择带宽类型.",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: [Validation.getRequired("请选择带宽类型!")]
    });
    //是否下载游戏
    items2.push({
      dataField: "is_download_game",
      label: {
        text: "是否下载游戏"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择下载游戏类型.",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: [Validation.getRequired("请选择下载游戏类型!")]
    });

    //包含
    items2.push({
      dataField: "include_region_codes_arr",
      label: {
        text: "包含地区"
      },
      editorType: "dxTagBox",
      editorOptions: {
        placeholder: "请选择包含地区.",
        displayExpr: "name",
        valueExpr: "id",
        showSelectionControls: true,
        applyValueMode: "useButtons",
        dataSource: CommonUtils.getDictonary().data.region_code,
        onValueChanged: sender => {
          let aa = sender.value as any[];
          if (aa && aa.length > 0) {
            (this.dxForm1.getEditor(
              "exclude_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: true
            });
          } else {
            (this.dxForm1.getEditor(
              "exclude_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: false
            });
          }
        }
      }
      //validationRules: [Validation.getRequired("请选择包含地区!")]
    });
    //排除
    items2.push({
      dataField: "exclude_region_codes_arr",
      label: {
        text: "排除地区"
      },
      editorType: "dxTagBox",
      editorOptions: {
        placeholder: "请选择排除地区.",
        displayExpr: "name",
        valueExpr: "id",
        showSelectionControls: true,
        applyValueMode: "useButtons",
        dataSource: CommonUtils.getDictonary().data.region_code,
        onValueChanged: sender => {
          let aa = sender.value as any[];
          if (aa && aa.length > 0) {
            (this.dxForm1.getEditor(
              "include_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: true
            });
          } else {
            (this.dxForm1.getEditor(
              "include_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: false
            });
          }
        }
      }
      //validationRules: [Validation.getRequired("请选择排除地区!")]
    });

    //限免包含
    items2.push({
      dataField: "free_include_region_codes_arr",
      label: {
        text: "限免包含地区"
      },
      editorType: "dxTagBox",
      editorOptions: {
        placeholder: "请选择包含地区.",
        displayExpr: "name",
        valueExpr: "id",
        showSelectionControls: true,
        applyValueMode: "useButtons",
        dataSource: CommonUtils.getDictonary().data.region_code,
        onValueChanged: sender => {
          let aa = sender.value as any[];
          if (aa && aa.length > 0) {
            (this.dxForm1.getEditor(
              "free_exclude_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: true
            });
          } else {
            (this.dxForm1.getEditor(
              "free_exclude_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: false
            });
          }
        }
      }
      //validationRules: [Validation.getRequired("请选择包含地区!")]
    });
    //限免排除
    items2.push({
      dataField: "free_exclude_region_codes_arr",
      label: {
        text: "限免排除地区"
      },
      editorType: "dxTagBox",
      editorOptions: {
        placeholder: "请选择排除地区.",
        displayExpr: "name",
        valueExpr: "id",
        showSelectionControls: true,
        applyValueMode: "useButtons",
        dataSource: CommonUtils.getDictonary().data.region_code,
        onValueChanged: sender => {
          let aa = sender.value as any[];
          if (aa && aa.length > 0) {
            (this.dxForm1.getEditor(
              "free_include_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: true
            });
          } else {
            (this.dxForm1.getEditor(
              "free_include_region_codes_arr"
            ) as DevExpress.ui.dxTagBox).option({
              disabled: false
            });
          }
        }
      }
      //validationRules: [Validation.getRequired("请选择排除地区!")]
    });
    //前置路由
    items2.push({
      dataField: "vpn_prefix_route",
      label: {
        text: "前置路由"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入前置路由.",
        height: 100
      }
    });
    //进程规则
    items2.push({
      dataField: "vpn_process_rule",
      label: {
        text: "进程规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入进程规则.",
        height: 100
      }
    });

    //国家代码
    items2.push({
      dataField: "country_code",
      label: {
        text: "国家代码"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "国家代码（eg:cn）"
      },
      validationRules: []
    });

    items2.push({
      dataField: "bundle_id",
      label: {
        text: "苹果Bundle_ID"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "苹果Bundle_ID"
      },
      validationRules: []
    });

    items2.push({
      dataField: "ios_appid",
      label: {
        text: "苹果iOS_AppID"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "苹果iOS_AppID"
      },
      validationRules: []
    });

    items2.push({
      dataField: "client_launch_config",
      label: {
        text: "游戏启动模板配置"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入游戏启动模板配置",
        height: 100
      },
      validationRules: []
    });

    items2.push({
      dataField: "acc_succ_hint",
      label: {
        text: "游戏加速成功提示"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder:
          "加速成功提示 多语言使用 LANG_XXX 代替  XXX是关键词(例如: LANG_Info)"
      },
      validationRules: []
    });
    //游戏是否预发布
    items2.push({
      dataField: "is_perset",
      label: {
        text: "游戏是否预发布"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择游戏预发布类型.",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: [Validation.getRequired("请选择游戏预发布类型!")]
    });
    //苹果唤起id
    items2.push({
      dataField: "ios_scheme",
      label: {
        text: "是否唤醒游戏"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择是否唤醒",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.flag
      },
      validationRules: []
    });
    //安卓游戏官方下载地址
    items2.push({
      dataField: "download_game_url",
      label: {
        text: "安卓游戏下载地址"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "请输入安卓游戏下载地址.",
      },
      validationRules: []
    });
    //iOS游戏唤起下载ID
    items2.push({
      dataField: "ios_app_id",
      label: {
        text: "iOS游戏唤起下载页面"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "请输入iOS游戏唤起ID.",
      },
      validationRules: []
    });
    //mac游戏唤起下载ID
    items2.push({
      dataField: "mac_app_id",
      label: {
        text: "Mac游戏唤起下载页面"
      },
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: "请输入Mac游戏唤起ID.",
      },
      validationRules: []
    });

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
      width: 800
    };
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
   * 用户信息提交
   */
  private async onClickDoHandler() {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      this.dxFormData1.account_token = this.token;
      //处理包含地区 排除地区
      this.dxFormData1.include_region_codes = this.dxFormData1.include_region_codes_arr.join(
        ","
      );
      this.dxFormData1.exclude_region_codes = this.dxFormData1.exclude_region_codes_arr.join(
        ","
      );

      //处理包含地区 排除地区
      this.dxFormData1.free_include_region_codes = this.dxFormData1.free_include_region_codes_arr.join(
        ","
      );
      this.dxFormData1.free_exclude_region_codes = this.dxFormData1.free_exclude_region_codes_arr.join(
        ","
      );

      let f = this.joinFormParams(this.dxFormData1);
      if (
        this.dxFormData1.include_region_codes &&
        this.dxFormData1.include_region_codes != ""
      ) {
        f += "&exclude_region_codes=";
      } else if (
        this.dxFormData1.exclude_region_codes &&
        this.dxFormData1.exclude_region_codes != ""
      ) {
        f += "&include_region_codes=";
      } else {
        f += "&include_region_codes=&exclude_region_codes=";
      }

      if (
        this.dxFormData1.free_include_region_codes &&
        this.dxFormData1.free_include_region_codes != ""
      ) {
        f += "&free_exclude_region_codes=";
      } else if (
        this.dxFormData1.free_exclude_region_codes &&
        this.dxFormData1.free_exclude_region_codes != ""
      ) {
        f += "&free_include_region_codes=";
      } else {
        f += "&free_include_region_codes=&free_exclude_region_codes=";
      }

      let result: BaseModel;
      if (this.dxFormData1.id == RespCode.zero) {
        result = await this.gameAPI.gameAdd(f);
      } else {
        result = await this.gameAPI.gameUpdate(this.dxFormData1.id, f);
      }
      if (
        result.code == RespCode.OK ||
        result.code == RespCode.isSame ||
        result.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/game/list");
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
    this.redirect("/game/list");
  }

  /**
   * 获取游戏模型
   * @param id
   */
  private async getGameModel(id: number) {
    let d = await this.gameAPI.getGameModel(id);
    this.dxFormData1 = d.data;

    //处理包含区域 排除区域
    this.dxFormData1.include_region_codes_arr = this.getRegionCode(
      this.dxFormData1.include_region_codes
    );
    this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
      this.dxFormData1.exclude_region_codes
    );

    //处理包含区域 排除区域
    this.dxFormData1.free_include_region_codes_arr = this.getRegionCode(
      this.dxFormData1.free_include_region_codes
    );
    this.dxFormData1.free_exclude_region_codes_arr = this.getRegionCode(
      this.dxFormData1.free_exclude_region_codes
    );

    this.dxForm1.option("formData", this.dxFormData1);
  }
}
