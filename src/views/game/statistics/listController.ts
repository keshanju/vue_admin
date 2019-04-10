import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { GameHotApi } from "@/api/GameHotApi";
import { GameHotModel } from "@/models/GameHotModel";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { Validation } from "@/common/Validation";

/**
 * 游戏热度列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private gamehotAPI = new GameHotApi();

  private dxForm1: DevExpress.ui.dxForm;
  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "游戏热度";
    this.initComponent();
    //
    await this.getGameHotList("","");
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols_list: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "game_title",
        caption: "所属游戏",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "day_value",
        caption: "时间",
        width: 120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "value",
        caption: "玩的次数",
        width: 100
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols_list
    });
    this.dxDataGrid1.option(options);
    //搜索表单
    this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    let items_search = this.createFormItems([
      {
        dataField: "start_time",
        label: {
          text: "开始时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          type: "datetime",
          displayFormat: "yyyy-MM-dd 00:00:00",
          dateSerializationFormat: "yyyy-MM-dd 00:00:00",
          value: DateTimeUtils.getNow("yyyy-MM-dd 00:00:00")
        },
        validationRules: [Validation.getRequired("请选择开始时间!")]
      },
      {
        dataField: "end_time",
        label: {
          text: "结束时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          type: "datetime",
          displayFormat: "yyyy-MM-dd 23:59:59",
          dateSerializationFormat: "yyyy-MM-dd 23:59:59",
          value: DateTimeUtils.getNow("yyyy-MM-dd 23:59:59")
        },
        validationRules: [Validation.getRequired("请选择结束时间!")]
      },
      {
        itemType: "button",
        horizontalAlignment: "left",
        buttonOptions: {
          text: "查询",
          icon: "search",
          type: "success",
          onClick: async () => {
            let formData: {
              start_time: string;
              end_time: string;
            } = this.dxForm1.option("formData");
            console.log(formData);
            this.getGameHotList(formData.start_time,formData.end_time);
          }
        }
      }
    ]);
    this.dxForm1.option({
      colCount: 6,
      items: items_search
    });
  }

  /**
   * 获取游戏热点列表
   */
  private async getGameHotList(start_time: string, end_time: string) {
    // 数据源
    let ds = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.gamehotAPI.gamehotListPager(
          start_time,
          end_time,
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
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });
  }

  /**
   * 刷新
   * @param sender
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }
}
