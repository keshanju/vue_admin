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
      <dx-form ref="dxSearchForm1"></dx-form>
      <br>
      <dx-data-grid ref="dxDataGrid1"></dx-data-grid>
    </dx-scroll-view>
  </dx-popup>
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
import { ServerApi } from "@/api/ServerApi";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class PassWord extends BaseVue {
  public mounted() {
    let form1: DevExpress.ui.dxForm = (this.$refs["dxSearchForm1"] as any)
      .instance;
    form1.option({});

    let dataSource = [
      {
        author: "D. Adams",
        title: "The Hitchhiker's Guide to the Galaxy",
        year: 1979,
        genre: "Comedy, sci-fi"
      },
      {
        author: "K. Vonnegut",
        title: "Cat's Cradle",
        year: 1963,
        genre: "Satire, sci-fi"
      },
      {
        author: "M. Mitchell",
        title: "Gone with the Wind",
        year: 1936,
        genre: "Historical fiction"
      }
    ];
    let grid1: DevExpress.ui.dxDataGrid = (this.$refs["dxDataGrid1"] as any)
      .instance;
    grid1.option({
      dataSource
    });
  }
}
</script>
