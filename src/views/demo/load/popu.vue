<template>
  <dx-popup :visible.sync="options.visible" :title="options.title" :toolbarItems="options.toolbarItems" width="600">
    <dx-data-grid ref="haha"></dx-data-grid>
  </dx-popup>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { DxDataGrid, DxForm, DxTreeList, DxPopup } from "devextreme-vue";
import DevExpress from "devextreme/bundles/dx.all";
import { StaffApi } from "@/api/StaffApi";
import BaseVue from "@/common/BaseVue";

@Component({
  components: {
    DxPopup,
    DxDataGrid
  }
})
export default class HomeController extends BaseVue {
  /**
   * 属性    内部尽量使用 this.$data.options 访问
   */
  private options: {
    title: string;
    visible: boolean;
    toolbarItems: any[];
  } = {
    title: "弹窗",
    visible: false,
    toolbarItems: []
  };

  mounted() {
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "保存",
        //icon: "save",
        type: "success"
      }
    });
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "充值",
        //icon: "reset",
        type: "normal"
      }
    });
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "取消",
        //icon: "cancel",
        type: "normal",
        onClick: sender => {
          this.hide();
        }
      }
    });
  }

  private getDataList() {}

  /**
   * 显示
   */
  public show(id: number = 0) {
    this.$data.options.visible = true;
  }

  /**
   * 隐藏
   */
  public hide() {
    this.$data.options.visible = false;
  }
}
</script>
