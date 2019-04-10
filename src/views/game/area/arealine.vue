<template>
  <dx-popup :visible.sync="options.visible" :title="options.title" :toolbarItems="options.toolbarItems" :width="options.width" :height="options.height">
    <dx-scroll-view>
      <dx-form ref="dxForm1"></dx-form>
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
import { Lang } from "@/common/Lang";
import { dxMyPopuForm } from "@/components/dxMyPopuForm";
import { AreaApi } from "@/api/AreaApi";
import { LineApi } from "@/api/LineApi";
import { RespCode } from "@/common/RespCode";

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
export default class AreaLine extends BaseVue {
  /**
   * 选项
   */
  public options: {
    title?: string;
    visible?: boolean;
    toolbarItems?: any[];
    onHide?: (hasData?: boolean) => void;
    width?: number;
    height?: number;
  } = {
    title: "游戏区服与线路绑定关系",
    visible: false,
    toolbarItems: []
  };

  private areaApi = new AreaApi();
  private lineApi = new LineApi();
  private dxForm1: DevExpress.ui.dxForm;
  private dxTreeView1: DevExpress.ui.dxTreeView;

  private area_id: number;

  async mounted() {
    this.initComponents();
  }

  /**
   * 初始化控件
   */
  private async initComponents() {
    this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    let items1: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        itemType: "group",
        //caption: "绑定区服线路关系",
        items: [
          {
            label: {
              text: "线路列表"
            },
            dataField: "data_selected_all",
            editorType: "dxTreeView",
            editorOptions: {
              height: 500,
              displayExpr: "title",
              valueExpr: "id",
              showCheckBoxesMode: "selectAll",
              searchEnabled: true,
            }
          }
        ]
      }
    ];

    this.dxForm1.option({
      items: items1
    });

    this.dxTreeView1 = this.dxForm1.getEditor("data_selected_all");
    let d = await this.lineApi.getList();
    this.dxTreeView1.option({
      dataSource: d.data
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "提交",
        //icon: "save",
        type: "success",
        onClick: async () => {
          try {
            let nodes = this.dxTreeView1.getNodes();
            let selectedNodes: number[] = [];
            for (const n of nodes) {
              if (n.selected) {
                selectedNodes.push(n.key);
              }
            }
            if (selectedNodes.length < 1) {
              this.alert("请至少选择一个选项!再进行提交.");
              return;
            }
            let d = await this.areaApi.setAreaLineSelected(
              this.area_id,
              selectedNodes
            );
            if (
              d.code == RespCode.OK ||
              d.code == RespCode.isSame ||
              d.code == RespCode.isSameSaveData
            ) {
              this.alert("处理成功!").then(() => {
               this.hide(true);
              });
            } else {
              this.errorCodeMsg(d.code, d.msg);
            }
          } catch (error) {
            this.error(error);
          }
        }
      }
    });
    // this.options.toolbarItems.push({
    //   location: "after",
    //   toolbar: "bottom",
    //   widget: "dxButton",
    //   options: {
    //     text: "重置",
    //     //icon: "reset",
    //     type: "normal"
    //   }
    // });
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

  /**
   *显示
   */
  public async show(area_id: number = 0, config: any = null) {
    this.area_id = area_id;
    if (config) {
      Object.assign(this.options, config);
    }
    this.options.visible = true;
    this.dxTreeView1.option({
      searchValue:""
    });
    this.dxTreeView1.unselectAll();
    if (area_id > 0) {
      let d = await this.areaApi.getAreaLineSelected(area_id);
      let arr = d.data;
      for (const ele of arr) {
        this.dxTreeView1.selectItem(ele.line_id);
      }
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
</script>
