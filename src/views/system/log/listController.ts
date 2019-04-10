import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {StaffLogApi} from '@/api/StaffLogApi';
/**
 * 系统日志列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  private staffLogApi = new StaffLogApi();
    /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "系统日志";
    this.initComponent();
    this.getPagerList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "staff_name",
        caption: "操作人",
        width: 80,
        filterOperations:["=","contains"]
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "ip",
        caption: "IP",
        width: 120,
        filterOperations:["=","contains"]
      },
      {
        dataField: "op_type_title",
        caption: "操作类型",
        width: 120,
        filterOperations:["=","contains"]
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "create_time",
        caption: "操作时间",
        width: 160,
        filterOperations:["=","contains"]
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "op_user_nickname",
        caption: "操作用户",
        width: 100,
        filterOperations:["=","contains"]
      },
      {
        dataField: "op_desc",
        caption: "操作说明",
        width: 180,
        filterOperations:["=","contains"]
      },
      {
        dataField: "op_staff_name",
        caption: "操作员工",
        width: 120,
        filterOperations:["=","contains"]
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });

    this.dxDataGrid1.option(options);
  }

  /**
   * 初始化工具条
   * @param e 
   */
  private onToolbarPreparingHandler(e: { component?: DevExpress.DOMComponent, element?: DevExpress.core.dxElement, model?: any, toolbarOptions?: DevExpress.ui.dxToolbarOptions }) {
    let dataGrid = e.component;
    let toolbarItems = e.toolbarOptions.items;

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });

  }

   /**
   * 搜索
   * @param e 
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

    /**
   * 数据列表
   */
  private getPagerList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.staffLogApi.getListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}