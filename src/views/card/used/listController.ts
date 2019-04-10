import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import {CardUsedApi} from '@/api/CardUsedApi';
import {CardUsedModel} from '@/models/CardUsedModel';
import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 已使用卡管理
 */
@Component({
  components: {
    DxDataGrid,dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private cardUsedAPI = new CardUsedApi();

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "已使用卡";
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
        dataField: "user_mobile_num",
        caption: "手机号",
        width: 150,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let $span = $("<span>");
          if (option.value && option.value.toString() != "") {
            if (option.data.country_code && option.data.country_code.toString() != "") {
              $span.append("(+" + option.data.country_code + ")");
            }
          }
          $span.append(option.value);
          $span.appendTo(cellElement);
        }
      },
      {
        dataField: "user_mail",
        caption: '邮箱',
        width: 150
      },
      {
        dataField: "user_name",
        caption: '账号',
        width: 100
      },
      {
        dataField: "user_nickname",
        caption: '昵称',
        width: 100
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
        dataField: "card_define_title",
        caption: "卡名称",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_no",
        caption: "卡号",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "minutes",
        caption: "分钟数",
        width: 100,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width:160,
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
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_prefix",
        caption: "卡前缀",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "expired_time",
        caption: "超期时间",
        width: 180,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "charge_time",
        caption: "充值时间",
        width: 180,
      },
      {
        dataField: "charge_source",
        caption: "充值来源",
        width: 140,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.card_charge_source, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "source_ref",
        caption: "充值相关的流水id",
        width: 140,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "price",
        caption: "价格(分)",
        width: 150
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
      },
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
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.cardUsedAPI.getListPager(this.ID, strWhere, pageSize, pageIndex));
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

  private onSearch(dic, user_id, db_num) {
    //this.db_num = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getDataList();
  }
}