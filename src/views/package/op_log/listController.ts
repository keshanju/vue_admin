import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackageOpLogApi } from '@/api/PackageOpLogApi';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 套餐日志列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private packageOpLogApi = new PackageOpLogApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐操作日志";
    this.initComponent();
    this.getPagerList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_no",
        caption: "套餐编号",
        width: 120,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_title",
        caption: "套餐名称",
        width: 120,
      },
      {
        dataField: "package_is_valid",
        caption: "有效状态",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.valid, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "package_billing_type",
        caption: "计费方式",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.billing_type, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "package_price_type",
        caption: "价格类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        },
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_order_position",
        caption: "排序类型",
        width: 80,
      }, {
        dataField: "package_short_desc",
        caption: "简介",
        width: 150,
      }, {
        dataField: "package_desc",
        caption: "备注",
        width: 150,
      }, {
        dataField: "package_create_staff_name",
        caption: "创建人",
        width: 80,
      }, {
        dataField: "package_change_staff_name",
        caption: "修改人",
        width: 80,
      }, ,
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_short_points",
        caption: "短期活动积分",
        width: 80,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_short_ref_points",
        caption: "短期活动推荐人积分",
        width: 80,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_short_activity_id",
        caption: "活动",
        width: 80,
      }, {
        dataField: "package_is_order_connects",
        caption: "是否允许用户自定义连接数",
        width: 180,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_total_max_connects",
        caption: "最大连接数",
        width: 90,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_pc_max_connects",
        caption: "PC连接数",
        width: 80,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_mobile_max_connects",
        caption: "手机连接数",
        width: 80,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_up_speed_rate",
        caption: "上传速度(KB)",
        width: 90,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_down_speed_rate",
        caption: "下载速度(KB)",
        width: 90,
      }, {
        dataField: "package_change_time",
        caption: "修改时间",
        width: 160,
      }, {
        dataField: "package_create_time",
        caption: "创建时间",
        width: 160
      }, {
        dataField: "is_own_all_lines",
        caption: "是否拥有全部线路",
        width: 170,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        },
      }, {
        dataField: "is_own_all_games",
        caption: "是否拥有全部游戏",
        width: 170,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        },
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_version_no",
        caption: "版本号",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_refund_allow_days",
        caption: "允许全额退款天数",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_gateway_fee",
        caption: "手续费",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_version",
        caption: "套餐版本号",
        width: 170,
      }, 
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_title",
        caption: "套餐价格名称",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_order_num",
        caption: "套餐价格排序",
        width: 170,
      }, {
        dataField: "package_price_short_desc",
        caption: "套餐价格简介",
        width: 170,
      }, {
        dataField: "package_price_desc",
        caption: "套餐价格说明",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_points",
        caption: "套餐价格购买积分",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_ref_points",
        caption: "套餐价格购买积分",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_free_add_time",
        caption: "套餐价格赠送分钟数",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_price",
        caption: "套餐价格价格(分)",
        width: 170,
      }, {
        dataField: "package_price_create_time",
        caption: "套餐价格创建时间",
        width: 170,
      }, {
        dataField: "package_price_change_time",
        caption: "套餐价格修改时间",
        width: 170,
      }, {
        dataField: "package_price_create_staff_name",
        caption: "套餐价格创建人",
        width: 80,
      },
      {
        dataField: "package_change_staff_name",
        caption: "套餐价格修改人",
        width: 80,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_version",
        caption: "套餐价格版本号",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_extend_time",
        caption: "套餐价格延长时间(月/分钟)",
        width: 170,
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_price_extend_type",
        caption: "套餐价格延长类型",
        width: 170,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.duration_date_type, option.value))
            .appendTo(cellElement);
        },
      }, {
        dataField: "paacage_price_is_sale",
        caption: "套餐价格是否销售",
        width: 170,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      }, {
        dataField: "create_time",
        caption: "数据添加时间",
        width: 170,
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
        text: "返回套餐列表",
        icon: "back",
        onClick: this.onBackListHandler
      }
    });
  }

  /**
   * 返回
   * @param e 
   */
  private onBackListHandler(sender) {
    this.redirect("/package/list");
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
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      if(strWhere!=""){
        if(strWhere.indexOf("|")>-1){
          strWhere += "package_id__equal__" + this.ID;
        }else{
          strWhere += "|package_id__equal__" + this.ID;
        }
      }else{
        strWhere+="&search=package_id__equal__" + this.ID;
      }
      
      let d = await this.packageOpLogApi.getListPager(strWhere, pageSize, pageIndex);
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}