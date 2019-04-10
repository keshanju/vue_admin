import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import { CardOtherDefineApi } from "@/api/CardOtherApi";
import DefineEdit from "./edit.vue";
import Import from "./tools/import.vue";
import UnUsedList from "./unused/list.vue";
import UsedList from "./used/list.vue";
import AbandonList from "./abandon/list.vue";
import { CommonUtils } from "@/common/CommonUtils";
/**
 * 第三方充值卡
 */
@Component({
  components: {
    DxDataGrid,
    Import,
    UnUsedList,
    UsedList,
    AbandonList,
    DefineEdit
  }
})
export default class ListController extends BaseVue {
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private cardOtherDefineApi = new CardOtherDefineApi();

  private define_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.define_dialog.visible = false;
    }
  };

  private import_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.import_dialog.visible = false;
    }
  };

  private unused_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.unused_dialog.visible = false;
    }
  };

  private used_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.used_dialog.visible = false;
    }
  };

  private abandon_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.abandon_dialog.visible = false;
    }
  };

  mounted() {
    this.setTitle("第三方充值卡管理");

    this.dxDataGrid1 = this.getDxInstanceByKey("dx-data-grid-ref1");
    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "title",
        caption: "卡名称"
      },
      {
        dataField: "type",
        caption: "类型",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.other_card_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "price",
        caption: "单价",
        width: 80
      },
      {
        dataField: "price_type",
        caption: "价格类型",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.price_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_valid",
        caption: "是否有效",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.flag,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 100
      },
      {
        dataField: "change_time",
        caption: "修改时间",
        width: 160
      },
      {
        dataField: "change_staff_name",
        caption: "修改人",
        width: 100
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        caption: "操作",
        width: 320,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let aDefine = this.getCreateLink("编辑", sender => {
            this.define_dialog.visible = true;
            this.define_dialog.id = option.value;
          });

          let aImport = this.getCreateLink("导入卡", sender => {
            this.import_dialog.visible = true;
            this.import_dialog.id = option.value;
          });

          let aUnUsed = this.getCreateLink("未使用卡列表", sender => {
            this.unused_dialog.visible = true;
            this.unused_dialog.id = option.value;
          });

          let aUsed = this.getCreateLink("已使用卡列表", sender => {
            this.used_dialog.visible = true;
            this.used_dialog.id = option.value;
          });

          let aAbondon = this.getCreateLink("废弃卡列表", sender => {
            this.abandon_dialog.visible = true;
            this.abandon_dialog.id = option.value;
          });

          $("<div>")
            .append(aDefine)
            .append(" | ")
            .append(aImport)
            .append(" | ")
            .append(aUnUsed)
            .append(" | ")
            .append(aUsed)
            .append(" | ")
            .append(aAbondon)
            .appendTo(cellElement);
        }
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols
    });

    this.dxDataGrid1.option(options);

    this.getDataListPager();
  }

  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent;
    element?: DevExpress.core.dxElement;
    model?: any;
    toolbarOptions?: DevExpress.ui.dxToolbarOptions;
  }) {
    let dataGrid = e.component;
    let toolbarItems = e.toolbarOptions.items;

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "添加卡类别",
        icon: "add",
        onClick: () => {
          this.define_dialog.visible = true;
          this.define_dialog.id = 0;
          this.define_dialog.onHide = (flag: boolean) => {
              this.define_dialog.visible=false;
              if(flag){
                  this.dxDataGrid1.refresh();
              }
          };
        }
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: () => {
          this.dxDataGrid1.refresh();
        }
      }
    });

    //创建搜索工具条
    this.createSearchToolbars(
      toolbarItems,
      this.dxDataGrid1.option("columns"),
      () => {
        this.getDataListPager();
      }
    );
  }

  /**
   * 获取充值卡列表
   */
  private async getDataListPager() {
    // 数据源
    let ds = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.cardOtherDefineApi.getListPager(
          strWhere,
          pageSize,
          pageIndex
        )
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
