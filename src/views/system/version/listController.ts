import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {VersionApi} from '@/api/VersionApi';
import { CommonUtils } from '@/common/CommonUtils';
/**
 * 版本列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  private versionApi = new VersionApi();
    /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "版本升级";
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
        dataField: "app_platform_type",
        caption: "平台类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.app_platform_type, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "lang_type",
        caption: "语言版本",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.user_lang, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_enterprise",
        caption: "企业版",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "buildnum",
        caption: "编译版本",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "gamelib_version",
        caption: "游戏库版本",
        width: 170,
      },
      {
        dataField: "upgrade_remark",
        caption: "更新说明",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "min_upgrade_app_version",
        caption: "最小可升级的版本",
        width: 170,
      },{
        allowFiltering: true,
        allowSorting: true,
        dataField: "not_upgrade_fail_url",
        caption: "不能升级的版本打开网页",
        width: 170,
      },{
        allowFiltering: true,
        allowSorting: true,
        dataField: "app_version",
        caption: "主程序版本",
        width: 170,
      },{
        dataField: "base_remote_url",
        caption: "打包路径基网址",
        width: 170,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160,
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick:this.onRowClickHandler
    });

    this.dxDataGrid1.option(options);
  }
  /**
    * 双击编辑
    * @param e 
    */
   private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/system/version/edit/" + sender.key.id);
    });
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
        text: "添加",
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
      this.getDataList();
    });

  }

    /**
   * 添加
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/system/version/edit");
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
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.versionApi.getListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}