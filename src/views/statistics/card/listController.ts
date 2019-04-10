import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { LayoutApi } from "@/api/LayoutApi";
import { CommonUtils } from "@/common/CommonUtils";
/**
 * 布局列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;

  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private layoutAPI = new LayoutApi();

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "充值卡统计";
    this.initComponents();
    //this.getDataList();
    this.alert("该功能正在开发中...");
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "卡分类",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "layout_code",
        caption: "生成卡数量",
        width: 120
      },
      {
        dataField: "desc",
        caption: "废弃卡数量",
        width: 300
      },
      {
        dataField: "is_enable",
        caption: "使用卡数量",
        width: 100
      }
    ];

    let options = this.getDataGridOption({
      columns: cols,
      filterRow: {
        visible: false
      },
      paging: {
        enabled: false
      },
      columnChooser: {
        enabled: false
      }
    });

    this.dxDataGrid1.option(options);

    this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    this.dxSearchForm1.option({
      width: 800,
      colCount: 12,
      items: [
        {
          colSpan: 2,
          dataField: "开始时间",
          editorType: "dxDateBox",
          editorOptions: {
            placeholder: "开始时间"
          }
        },
        {
          colSpan: 2,
          dataField: "结束时间",
          editorType: "dxDateBox",
          editorOptions: {
            placeholder: "结束时间"
          }
        },
        {
          colSpan: 1,
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "统计订单",
            icon: "search",
            type: "success"
          }
        }
      ]
    });
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.layoutAPI.getListPager(strWhere, pageSize, pageIndex)
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
