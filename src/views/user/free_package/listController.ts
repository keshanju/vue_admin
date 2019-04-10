import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { UserFreePackageApi } from '@/api/UserFreePackageApi';
import { UserFreePackageModel } from '@/models/UserFreePackageModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
/**
 * 免费套餐列表
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
  private userFreePackageAPI = new UserFreePackageApi();

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "赠送套餐";
    this.initComponent();
    this.getUserFreePackageList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "user_nickname",
        caption: '用户id',
        width: 140
      },
      {
        dataField: "package_id",
        caption: '套餐Id',
        width: 140,
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        dataField: "cancel_type",
        caption: '取消原因',
        width: 180
      },
      {
        dataField: "cancel_reason",
        caption: '取消说明',
        width: 180
      },
      {
        dataField: "cancel_time",
        caption: '取消时间',
        width: 180
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });
    this.dxDataGrid1.option(options);
  }


  /**
 * 获取免费套餐列表
 */
  private async getUserFreePackageList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.userFreePackageAPI.getUserFreePackageModel(this.ID));
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
        onClick: this.onBackListHandler
      }
    });
  }

  /**
   * 返回用户管理列表
   * @param e 
   */
  private onBackListHandler(sender) {
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