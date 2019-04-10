import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import {UserPointApi} from '@/api/UserPointApi';
import {UserPointModel} from '@/models/UserPointModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
/**
 * 积分管理
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
  private userPointAPI = new UserPointApi();

  // 入口
  protected async mounted() {
    this.initComponent();
    this.getUserPointList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "user_id",
        caption: '用户id',
        width: 80
      },
      {

        dataField: "activity_id",
        caption: '活动ID',
        width: 80,
      },
      {

        dataField: "points",
        caption: '积分',
        width: 80,
      },
      {

        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        dataField: "id",
        alignment: "center",
        fixed: true,
        fixedPosition: "right",
        caption: Lang.Operate,
        width: 200,
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });
    this.dxDataGrid1.option(options);
  }

  /**
 * 获取用户活动列表
 */
  private async getUserPointList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.userPointAPI.UserPointListPager(strWhere, pageSize, pageIndex));
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
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: '返回用户管理',
        icon: "back",
        onClick: this.onAddHandler
      }
    });
  }

  /**
   * 返回用户管理列表
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/user/list");
  }

  /**
* 刷新
* @param e 
*/
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }


}