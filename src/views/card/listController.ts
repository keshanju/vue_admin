import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { CardsApi } from '@/api/CardsApi';
import { CardsModel } from '@/models/CardsModel';
import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';

/**
 * 充值卡分类管理
 */
@Component({
  components: {
    DxDataGrid
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private cardAPI = new CardsApi();
  private cardData1: CardsModel = {};

  // 入口
  protected mounted() {
    (this.$parent as any).content_title = "充值卡管理";
    this.cardData1.id = 0;
    this.cardData1.account_token = this.token;

    this.initComponent();
    this.getCardsList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: '卡名称',
        width: 120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_prefix",
        caption: '卡前缀',
        width: 80
      },
      {
        dataField: "is_valid",
        caption: '是否有效',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
        width: 100
      },
      {
        dataField: "price_type",
        caption: '价格类型',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        },
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "price",
        caption: '单价(分)',
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "minutes",
        caption: '分钟数',
        width: 80
      },
      {
        dataField: "desc",
        caption: '卡描述',
        width: 150
      },
      {
        dataField: "create_staff_name",
        caption: '创建人',
        width: 80
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        width: 300,
        cellTemplate: this.cellEdit
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });

    this.dxDataGrid1.option(options);
  }

  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let validText = "失效";
    if (option.key.is_valid == 0) {
      validText = "有效";
    }
    let invalid = $("<a href='#' data=" + option.value + "> " + validText + " </a>");
    invalid.bind("click", async (sender) => {
      let id = $(sender.target).attr("data");
      this.cardData1.is_valid = this.cardData1.is_valid == 0 ? 1 : 0;
      this.cardData1.id = Number(id);
      await this.invalidCard();
    });

    //开卡
    let aOpen = this.getCreateLink("开卡", (sender) => {
      this.redirect("/card/" + option.value + "/open/edit");
    });
    //开卡列表
    let aOpenList = this.getCreateLink("开卡列表", (sender) => {
      this.redirect("/card/" + option.value + "/open/list");
    });
    //已废弃卡
    let aAbandon = this.getCreateLink("已废弃卡", (sender) => {
      this.redirect("/card/" + option.value + "/abandon/list");
    });
    //已使用卡
    let aUsed = this.getCreateLink("已使用卡", (sender) => {
      this.redirect("/card/" + option.value + "/used/list");
    });

    $("<div>")
      .append(aOpen)
      .append(" | ")
      .append(invalid)
      .append(" | ")
      .append(aOpenList)
      .append(" | ")
      .append(aAbandon)
      .append(" | ")
      .append(aUsed)
      .appendTo(cellElement);
  }

  /**
   * 充值卡类别失效
   */
  private async invalidCard() {
    this.cardData1.account_token = this.token;
    // this.cardData1.is_valid = 0;
    let f = this.joinFormParams(this.cardData1);
    let d = await this.cardAPI.cardsUpdate(this.cardData1.id, f);
    this.dxDataGrid1.refresh();

  }

  /**
 * 获取充值卡列表
 */
  private async getCardsList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.cardAPI.cardsListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }


  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent,
    element?: DevExpress.core.dxElement,
    model?: any,
    toolbarOptions?: DevExpress.ui.dxToolbarOptions
  }) {
    let dataGrid = e.component;
    let toolbarItems = e.toolbarOptions.items;



    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: Lang.Add,
        icon: "add",
        onClick: this.onAddHandler
      }
    });

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
      this.getCardsList();
    });
  }

  /**
   * 添加充值卡
   * @param sender 
   */
  private onAddHandler(sender) {
    this.redirect("/card/edit");
  }

  /**
* 刷新
* @param sender 
*/
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }
}