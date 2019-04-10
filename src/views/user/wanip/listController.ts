import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { UserWanipApi } from '@/api/UserWanipApi';
import { UserWanipModel } from '@/models/UserWanipModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';

/**
 * 用户外网ip列表
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
  private userWanipAPI = new UserWanipApi();
  private userwanipData1: UserWanipModel = {};

  // 入口
  protected mounted() {
    this.userwanipData1.id = 0;
    this.userwanipData1.account_token = this.token;
    this.initComponent();
    this.getUserWanipList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "user_id",
        caption: '用户id',
        width: 180
      },
      {
        dataField: "user_ip",
        caption: 'IP地址',
        width: 180,
      },
      {

        dataField: "ip_mask",
        caption: '掩码',
        width: 180,
      },
      {
        dataField: "id",
        alignment: "center",
        fixed: true,
        fixedPosition: "right",
        caption: Lang.Operate,
        width: 200,
        cellTemplate: this.cellEdit
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick: this.onRowClickHandler
    });
    this.dxDataGrid1.option(options);
  }

  /**
* 双击编辑
* @param e 
*/
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/user/" + this.ID + "/wanip/edit/" + sender.key.id);
    });
  }

  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aDel = this.getCreateLink("删除", async sender => {
      let a = await this.confirm("是否确定删除?");
      if (a) {
        this.userwanipData1.id = Number(option.value);
        await this.delWanip();
      }
    });

    let aEdit = this.getCreateLink("编辑", sender => {
      this.redirect("/user/" + this.ID + "/wanip/edit/" + option.value);
    });

    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append(aDel)
      .appendTo(cellElement);
  }

  /**
 * 当前网吧ip删除
 */
  private async delWanip() {
    this.userwanipData1.account_token = this.token;
    let f = this.joinFormParams(this.userwanipData1);
    let d = await this.userWanipAPI.userWanipDelete(this.ID, this.userwanipData1.id);
    this.dxDataGrid1.refresh();
  }

  /**
 * 获取外网ip列表
 */
  private async getUserWanipList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.userWanipAPI.getUserWanipListPager(this.ID));
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

  /**
 * 添加会员
 * @param e 
 */
  private onAddHandler(sender) {
    this.redirect("/user/" + this.ID + "/wanip/edit");
  }


}