import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { GameApi } from "@/api/GameApi";
import { AreaApi } from "@/api/AreaApi";
import { AreaModel } from "@/models/AreaModel";
import { BaseModel } from "@/models/BaseModel";
import { Validation } from "@/common/Validation";
import { Lang } from "@/common/Lang";
import { RespCode } from "@/common/RespCode";
import { CommonUtils } from "@/common/CommonUtils";

/**
 * 区服编辑
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

  private dxSelectBoxGame: DevExpress.ui.dxSelectBox;
  private dxSelectBoxArea: DevExpress.ui.dxSelectBox;

  private areaAPI = new AreaApi();
  private gameAPI = new GameApi();

  private dxFormData1: AreaModel = {
    id: 0,
    order_id: 999,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: []
  };
  private dxFormDataReset1: AreaModel = {};
  private area_pic: JQuery;

  protected async mounted() {
    (this.$parent as any).content_title = "游戏区服编辑";
    this.submitText = Lang.Add;
    if (this.ID !== RespCode.zero) {
      this.submitText = Lang.Update;
    }
    this.initComponent();
    if (this.ID !== RespCode.zero) {
      await this.getGameModel(this.ID);
    }
    this.getGameList();
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
    //游戏id
    items2.push({
      dataField: "game_id",
      label: {
        text: "所属游戏"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择游戏",
        displayExpr: "title",
        valueExpr: "id",
        searchEnabled: true,
        onValueChanged: sender => {
          this.getAreaList(sender.value);
        }
      },
      validationRules: [Validation.getRequired("游戏不能为空!")]
    });
    //区服名
    items2.push({
      dataField: "title",
      label: {
        text: "区服名"
      },
      editorOptions: {
        placeholder: "请输入区服名"
      },
      validationRules: [Validation.getRequired("区服名不能为空!")]
    });
    items2.push(
      this.createUploadFileFormItem(
        image => {
          //this.dxFormData1.pic = image[0].src;
          this.area_pic = image;
        },
        {
          dataField: "pic",
          label: {
            text: "上传图片"
          }
        },
        {
          name: "filename",
          uploadUrl: this.uploadApi.getUploadNormalPath("area")
        },
        true
      )
    );
    // items2.push(
    //   this.createUploadFileFormItem(
    //     image => {
    //       //this.dxFormData1.pic = image[0].src;
    //       this.area_pic = image;
    //     },
    //     {
    //       dataField: "game_background_url",
    //       label: {
    //         text: "上传游戏小背景"
    //       }
    //     },
    //     {
    //       name: "filename",
    //       uploadUrl: this.uploadApi.getUploadNormalPath("area")
    //     },
    //     true
    //   )
    // );
    // items2.push(
    //   this.createUploadFileFormItem(
    //     image => {
    //       //this.dxFormData1.pic = image[0].src;
    //       this.area_pic = image;
    //     },
    //     {
    //       dataField: "game_background_large_url",
    //       label: {
    //         text: "上传游戏大背景"
    //       }
    //     },
    //     {
    //       name: "filename",
    //       uploadUrl: this.uploadApi.getUploadNormalPath("area")
    //     },
    //     true
    //   )
    // );

    //区服备注
    items2.push({
      dataField: "remark",
      label: {
        text: "区服备注"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "请输入区服备注"
      },
      validationRules: [Validation.getRequired("区服备注不能为空!")]
    });
    //排序id
    items2.push({
      dataField: "order_id",
      label: {
        text: "排序"
      },
      editorType: "dxNumberBox",
      editorOptions: {
        placeholder: "排序编号",
        min: 0
      }
    });
    //游戏ss规则
    items2.push({
      dataField: "game_ss_rules",
      label: {
        text: "游戏ss规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "游戏ss规则",
        height: 120
      }
    });
    //游戏ios规则
    items2.push({
      dataField: "game_ios_rules",
      label: {
        text: "游戏ios规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "游戏ios规则",
        height: 120
      }
    });
    //游戏android规则
    items2.push({
      dataField: "game_android_rules",
      label: {
        text: "游戏android规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "游戏android规则",
        height: 120
      }
    });
    //主机游戏规则
    items2.push({
      dataField: "game_host_rules",
      label: {
        text: "主机游戏规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "主机游戏规则",
        height: 120
      }
    });
    //mac游戏规则
    items2.push({
      dataField: "game_mac_rules",
      label: {
        text: "mac游戏规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "mac游戏规则",
        height: 120
      }
    });
    //vpn规则
    items2.push({
      dataField: "game_vpn_rules",
      label: {
        text: "vpn规则"
      },
      editorType: "dxTextArea",
      editorOptions: {
        placeholder: "vpn规则",
        height: 120
      }
    });
    //上级区服id
    items2.push({
      dataField: "parent_area_id",
      label: {
        text: "上级区服"
      },
      editorType: "dxSelectBox",
      editorOptions: {
        placeholder: "请选择上级区服",
        displayExpr: "title",
        valueExpr: "id",
        searchEnabled: true
      }
    });
    //玩家提醒
    items2.push({
      dataField: "hint",
      label: {
        text: "玩家提醒"
      },
      editorOptions: {
        placeholder: "玩家提醒"
      }
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
    this.dxSelectBoxGame = this.dxForm1.getEditor("game_id");
    this.dxSelectBoxArea = this.dxForm1.getEditor("parent_area_id");
  }
  /**
   * 重置
   */
  private onResetHandler(sender) {
    this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
    this.dxForm1.option("formData", this.dxFormData1);
  }
  /**
   * 区服信息提交
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
      let result: BaseModel;
      if (this.dxFormData1.id == RespCode.zero) {
        result = await this.areaAPI.areaAdd(f);
      } else {
        result = await this.areaAPI.areaUpdate(this.dxFormData1.id, f);
      }
      if (
        result.code == RespCode.OK ||
        result.code == RespCode.isSame ||
        result.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/game/area/list");
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
    this.redirect("/game/area/list");
  }

  /**
   * 获取区服模型
   * @param id
   */
  private async getGameModel(id: number) {
    let d = await this.areaAPI.getAreaModel(id);
    this.dxFormData1 = d.data;
    this.area_pic.attr(
      "src",
      this.uploadApi.getUploadHttp + this.dxFormData1.pic
    );
    //处理包含区域 排除区域
    this.dxFormData1.include_region_codes_arr = this.getRegionCode(
      this.dxFormData1.include_region_codes
    );
    this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
      this.dxFormData1.exclude_region_codes
    );

    this.dxForm1.option("formData", this.dxFormData1);
  }

  private async getGameList() {
    let d = await this.gameAPI.getListResult();
    this.dxSelectBoxGame.option({
      dataSource: d.data
    });
  }

  private async getAreaList(game_id: string) {
    let d = await this.areaAPI.getListResult("", game_id);
    this.dxSelectBoxArea.option({
      dataSource: d.data
    });
  }
}
