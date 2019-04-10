<template>
  <dx-popup
    :visible.sync="options.visible"
    :title="options.title"
    :toolbarItems="options.toolbarItems"
    :width="options.width"
    :height="options.height"
    :onHidden="options.onHidden"
  >
    <dx-scroll-view>
      <dx-form ref="dxForm1"></dx-form>
    </dx-scroll-view>
  </dx-popup>
</template>
</template>
<script lang="ts">
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
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import md5 from "md5";
import { RespCode } from "@/common/RespCode";
import { LineLimitModel } from "@/models/LineLimitModel";
import { BaseResult2 } from "@/models/BaseModel";
import { LineLimitApi } from "@/api/LineApi";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class Game_Async_List extends BaseVue {
  public options: {
    visible: boolean;
    title: string;
    toolbarItems: DevExpress.ui.dxPopupToolbarItem[];
    width: number;
    height: number;
    onHidden: () => void;
  } = {
    visible: false,
    title: "线路节点限速配置",
    toolbarItems: [],
    width: 350,
    height: 220,
    onHidden: () => {}
  };

  private dxForm1: DevExpress.ui.dxForm;
  private _line_id: number = 0;

  public created() {
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "删除配置",
        type: "danger",
        onClick: async () => {
          let flag = await this.confirm(
            "你确定是否删除配置,删除配置不进行速度限制!"
          );
          if (flag) {
            let result = await new LineLimitApi().setDelete(this._line_id);
            if (
              result.code == RespCode.OK ||
              result.code == RespCode.isSame ||
              result.code == RespCode.isSameSaveData
            ) {
              this.options.visible = false;
              this.toast(() => {}, "操作信息成功.");
            } else {
              this.errorCodeMsg(result.code, result.msg);
            }
          }
        }
      }
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "确定保存",
        type: "success",
        onClick: async () => {
          if (!this.validateForm(this.dxForm1)) {
            return;
          }
          let formData: LineLimitModel = this.dxForm1.option("formData");
          formData.account_token = this.token;
          let result: BaseResult2;
          let ll = new LineLimitApi();
          if (formData.id == 0) {
            result = await ll.setPost(this._line_id, formData);
          } else if (formData.id > 0) {
            result = await ll.setPut(this._line_id, formData);
          }
          if (
            result.code == RespCode.OK ||
            result.code == RespCode.isSame ||
            result.code == RespCode.isSameSaveData
          ) {
            this.options.visible = false;
            this.toast(() => {}, "操作信息成功.");
          } else {
            this.errorCodeMsg(result.code, result.msg);
          }
        }
      }
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "取消",
        type: "normal",
        onClick: async () => {
          this.options.visible = false;
        }
      }
    });
  }

  public mounted() {
    this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    let items = this.createFormItems([
      {
        dataField: "max_bandwidth",
        label: {
          text: "最大带宽(KB)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "请输入最大带宽"
        },
        validationRules: [Validation.getRequired("最大带宽不能为空!")]
      },
      {
        dataField: "min_bandwidth",
        label: {
          text: "最小带宽(KB)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "请输入最小带宽"
        },
        validationRules: [Validation.getRequired("最小带宽不能为空!")]
      },
      {
        dataField: "total_bandwidth",
        label: {
          text: "总带宽(KB)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "请输入总带宽"
        },
        validationRules: [Validation.getRequired("总带宽不能为空!")]
      }
    ]);
    this.dxForm1.option({
      items: items
    });
  }

  public async Show(line_id: number) {
    this.options.visible = true;
    this._line_id = line_id;
    let formData: LineLimitModel = {
      id: 0
    };
    let d = await new LineLimitApi().getModel(this._line_id);
    if (d.data.id > 0) {
      formData = d.data;
    }
    this.dxForm1.option({
      formData: formData
    });
  }
}
</script>
