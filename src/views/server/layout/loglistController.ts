import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {LayoutLogApi} from '@/api/LayoutLogApi';

/**
 * 布局日志
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private layoutLogApi = new LayoutLogApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "布局日志";
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
        allowFiltering: true,
        allowSorting: true,
        dataField: "layout_code",
        caption: "布局编号",
        width: 120,
      },
      {
        dataField: "content",
        caption: "布局内容",
        width: 180,
      },
      {
        dataField: "desc",
        caption: "描述",
        width: 180,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80
      }, {
        dataField: "change_time",
        caption: "修改时间",
        width: 160
      },
      {
        dataField: "change_staff_name",
        caption: "修改人",
        width: 80
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

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "返回布局列表",
        onClick: ()=>{
          this.redirect("/server/layout/list");
        }
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
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.layoutLogApi.getListPager(this.ID,strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}