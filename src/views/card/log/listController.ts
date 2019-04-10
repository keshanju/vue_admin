import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {CardLogApi} from '@/api/CardLogApi';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 充值卡日志列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  private cardLogApi = new CardLogApi();

  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "充值卡日志";
    this.initComponent();
    this.getDataList();
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
        dataField: "card_no_prefix",
        caption: "卡号前缀",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_define_title",
        caption: "卡定义标题",
        width: 120
      },
      {
        dataField: "recharge_type",
        caption: '卡充值类型',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.card_recharge_type, option.value))
            .appendTo(cellElement);
        },
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "batch_no",
        caption: "批次号",
        width: 150
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_count",
        caption: "生成卡数量",
        width: 100
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width:160
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
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

    
    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getDataList();
    });
  }

  /**
  * 搜索
  * @param sender 
  */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
   * 数据列表
   */
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.cardLogApi.getPagerList(this.ID, strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}