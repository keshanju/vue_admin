import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {GameLogApi} from '@/api/GameLogApi';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 游戏修改日志
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private gameLogApi = new GameLogApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "游戏修改日志";
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
        dataField: "title",
        caption: '游戏名',
        width: 180,
      },
      {
        dataField: "change_staff_name",
        caption: '修改人',
        width: 80
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
        dataField: "game_android_rules",
        caption: '安卓规则',
        width: 200
      },
      {
        dataField: "game_background_url",
        caption: '游戏背景图',
        width: 200,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<div>")
            .append(this.uploadApi.getUploadHttp +option.value)
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "game_h1_title",
        caption: '游戏h5页面标题',
        width: 200
      },
      {
        dataField: "game_host_rules",
        caption: '主机规则',
        width: 200
      },
      {
        dataField: "game_ios_rules",
        caption: 'ios规则',
        width: 200
      },
      {
        dataField: "game_mac_rules",
        caption: 'mac规则',
        width: 200
      },
      {
        dataField: "game_pic_url",
        caption: '游戏小图标',
        width: 200,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<div>")
            .append(this.uploadApi.getUploadHttp +option.value )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "game_ss_rules",
        caption: 'ss规则',
        width: 200
      },
      {
        dataField: "game_type",
        caption: '游戏分类',
        width: 200
      },
      {
        dataField: "game_vpn_rules",
        caption: 'vpn规则',
        width: 200
      },
      {
        dataField: "is_hot",
        width: 170,
        caption: '是否热门',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_support_android",
        width: 170,
        caption: '是否支持安卓',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_support_host_game",
        width: 170,
        caption: '是否支持主机游戏',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_support_ios",
        width: 170,
        caption: '是否支持ios',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_support_mac",
        width: 170,
        caption: '是否mac',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_support_windows",
        width: 170,
        caption: '是否windows',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_config_id",
        caption: '是否配置',
        width: 170,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_valid",
        width: 170,
        caption: '是否有效',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "android_dns_model",
        width: 170,
        caption: '安卓DNS',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.android_dns_model, option.value))
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "sort_num",
        width: 170,
        caption: 'Xml排序'
      },

      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "is_free",
        width: 80,
        caption: '是否限免',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      paging: {
        pageSize: 10
      },
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
        icon: "back",
        text: "返回游戏列表",
        onClick: (sender)=>{
          this.redirect("/game/list");
        }
      }
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
  private getPagerList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) =>{
      if(strWhere!=""){
        if(strWhere.indexOf("|")>-1){
          strWhere += "game_id__equal__" + this.ID;
        }else{
          strWhere += "|game_id__equal__" + this.ID;
        }
      }else{
        strWhere+="&search=game_id__equal__" + this.ID;
      }
      let d= await this.gameLogApi.getListPager(strWhere, pageSize, pageIndex);
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}