import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import {CardAbandonApi} from '@/api/CardAbandonApi';
import {CardAbandonModel} from '@/models/CardAbandonModel';
import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';

/**
 * 已废弃卡管理
 */
@Component({
  components: {
    DxDataGrid
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private cardAbandonAPI = new CardAbandonApi();

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "已废弃卡";
    this.initComponent();
    this.getDataList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);
    const cols: Array<DevExpress.ui.dxDataGridColumn> = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_no",
        caption: "卡号",
        width: 170,
      },
      {
        dataField: "recharge_type",
        caption: '卡充值类型',
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.card_recharge_type, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "minutes",
        caption: "分钟数",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_define_id",
        caption: "卡定义id",
        width: 100,
      },
      {
        dataField: "create_staff_name",
        caption: "创建员工",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "batch_no",
        caption: "批次号",
        width: 140,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_prefix",
        caption: "卡前缀",
        width: 100,
      },
      {
        dataField: "expired_time",
        caption: "超期时间",
        width: 180,
      },
      {
        dataField: "abandon_time",
        caption: "废弃时间",
        width: 180,
      },
      {
        dataField: "abandon_staff_name",
        caption: "废弃员工",
        width: 100,
      },
      {
        dataField: "abandon_reason",
        caption: "废弃原因",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "price",
        caption: "价格(分)",
        width: 150,
      },
      {
        dataField: "price_type",
        caption: "价格类型",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        }
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });

    this.dxDataGrid1.option(options);
  }

  /**
   * 获取列表
   */
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.cardAbandonAPI.getListPager(this.ID,strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 初始化工具条
   * @param e 
   */
  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent,
    element?: DevExpress.core.dxElement,
    model?: any,
    toolbarOptions?: DevExpress.ui.dxToolbarOptions
  }) {
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
        text: '返回充值卡列表',
        icon: "back",
        onClick: this.onAddHandler
      }
    });

      //创建搜索工具条
      this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
        this.getDataList();
      });
  }

  /**
   * 添加
   * @param sender 
   */
  private onAddHandler(sender) {
    this.redirect("/card/list");
  }

  /**
   * 刷新
   * @param sender 
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }
}