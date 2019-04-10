import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxScrollView
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { dxMyPopuForm } from "@/components/dxMyPopuForm";
import { AreaModel } from "@/models/AreaModel";
import { BaseModel } from "@/models/BaseModel";
import { AreaApi } from "@/api/AreaApi";
import { GameApi } from "@/api/GameApi";
import { RespCode } from "@/common/RespCode";
import LogUtil from "@/utils/LogUtil";
/**
 * 区服编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class AreaEdit extends BaseVue {
  /**
   * 选项
   */
  public options: {
    title?: string;
    visible?: boolean;
    toolbarItems?: any[];
    onHide?: (hasData?: boolean) => void;
  } = {
    title: "弹窗",
    visible: false,
    toolbarItems: []
  };

  public dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: AreaModel = {
    id: 0,
    order_id: 999,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: []
  };

  private dxFormDataNew1: AreaModel = {
    id: 0,
    order_id: 999,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: []
  };

  private areaAPI = new AreaApi();
  private gameAPI = new GameApi();
  private dxSelectBoxArea: DevExpress.ui.dxSelectBox;

  mounted() {
    this.initToolbarItems();
  }

  /**
   * 初始化工具条
   */
  private initToolbarItems() {
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "保存",
        //icon: "save",
        type: "success",
        onClick: async () => {
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
                this.hide(true);
              });
            } else {
              this.errorCodeMsg(result.code, result.msg);
            }
          } catch (error) {
            this.error(error);
          }
        }
      }
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "重置",
        type: "normal",
        onClick: () => {}
      }
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "取消",
        type: "normal",
        onClick: sender => {
          this.hide();
        }
      }
    });
  }

  /**
   * 初始化组件
   */
  private async initWidgets() {
    let game_ds = await new GameApi().getListResult();

    this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    //表单项
    const items2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        dataField: "title",
        label: {
          text: "区服名"
        },
        editorOptions: {
          placeholder: "请输入区服名"
        },
        validationRules: [Validation.getRequired("区服名不能为空!")]
      },
      this.createUploadFileFormItem(
        image => {},
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
      ),
      {
        dataField: "remark",
        label: {
          text: "区服备注"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入区服备注"
        },
        validationRules: [Validation.getRequired("区服备注不能为空!")]
      },
      {
        dataField: "order_id",
        label: {
          text: "排序"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "排序编号",
          min: 0
        }
      },
      {
        dataField: "game_ss_rules",
        label: {
          text: "游戏ss规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "游戏ss规则",
          height: 120
        }
      },
      {
        dataField: "game_ios_rules",
        label: {
          text: "游戏ios规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "游戏ios规则",
          height: 120
        }
      },
      {
        dataField: "game_android_rules",
        label: {
          text: "游戏android规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "游戏android规则",
          height: 120
        }
      },
      {
        dataField: "game_host_rules",
        label: {
          text: "主机游戏规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "主机游戏规则",
          height: 120
        }
      },
      {
        dataField: "game_mac_rules",
        label: {
          text: "mac游戏规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "mac游戏规则",
          height: 120
        }
      },
      {
        dataField: "game_vpn_rules",
        label: {
          text: "vpn规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "vpn规则",
          height: 120
        }
      },
      {
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
      },
      {
        dataField: "background_game_id",
        label: {
          text: "选择所属背景游戏"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择所属背景游戏",
          dataSource: game_ds.data,
          displayExpr: "title",
          valueExpr: "id",
          searchEnabled: true
        }
      },
      {
        dataField: "hint",
        label: {
          text: "玩家提醒"
        },
        editorOptions: {
          placeholder: "玩家提醒"
        }
      },
      {
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
      },
      {
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
      },
      {
        dataField: "vpn_prefix_route",
        label: {
          text: "前置路由"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入前置路由.",
          height: 100
        }
      },
      {
        dataField: "vpn_process_rule",
        label: {
          text: "进程规则"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入进程规则.",
          height: 100
        }
      }
    ];

    //分组
    const group2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [];
    group2.push({
      itemType: "group",
      items: items2
    });

    let options: DevExpress.ui.dxFormOptions = {
      items: group2
      //formData: this.dxFormData1
    };
    this.dxForm1.option(options);

    this.dxSelectBoxArea = this.dxForm1.getEditor("parent_area_id");
  }

  /**
   * 获取游戏模型
   * @param id
   */
  private async getGameModel(id: number) {
    let d = await this.areaAPI.getAreaModel(id);
    this.dxFormData1 = d.data;

    //处理包含区域 排除区域
    this.dxFormData1.include_region_codes_arr = this.getRegionCode(
      this.dxFormData1.include_region_codes
    );
    this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
      this.dxFormData1.exclude_region_codes
    );

    //this.dxForm1.option("formData", this.dxFormData1);
    //this.dxForm1.updateData(this.dxFormData1);
  }
  /**
   *显示
   */
  public async show(
    data: {
      game_id?: number;
      area_id?: number;
    } = { game_id: 0, area_id: 0 },
    config: any
  ) {
    Object.assign(this.options, config);
    this.options.visible = true;
    //区服模型
    if (data.area_id > 0) {
      await this.getGameModel(data.area_id);
    } else {
      this.dxFormData1 = $.extend(true, {}, this.dxFormDataNew1);
    }

    this.initWidgets();

    this.dxForm1.option("formData", this.dxFormData1);

    //查找区服列表
    if (data.game_id > 0) {
      this.dxFormData1.game_id = data.game_id;
      let d = await this.areaAPI.getListResult("", data.game_id.toString());
      this.dxSelectBoxArea.option({
        dataSource: d.data
      });
    }
  }

  /**
   *隐藏
   */
  public hide(hasData: boolean = false) {
    this.options.visible = false;
    if (this.options.onHide) {
      this.options.onHide(hasData);
    }
  }
}
