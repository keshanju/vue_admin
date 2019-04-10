import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import $ from 'jquery';

import BaseVue from '@/common/BaseVue';

import {StaffApi} from '@/api/StaffApi';
import { Lang } from '@/common/Lang';

/**
 * 角色列表
 */
@Component({
  components: {
    DxDataGrid
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private staffAPI = new StaffApi();

  protected async mounted() {
    (this.$parent as any).content_title = "员工角色管理";
    this.initComponent();
    this.getRoleList();
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
        dataField: "name",
        caption: Lang.lang_role_name,
        width: 160,
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80
      },
      {
        dataField: "create_time",
        caption: Lang.lang_role_create_time,
        width: 170
      },
      {
        fixed:true,
        fixedPosition:"right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        width: 200,
        cellTemplate: this.CellEdit
      }
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

  }

  /**
 * 搜索
 * @param e 
 */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
   * 获取角色组列表
   */
  private async getRoleList() {
    let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.staffAPI.staffRoleGroupListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 编辑
   * @param cellElement 
   * @param option 
   */
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aEdit = this.getCreateLink("编辑菜单",(sender)=>{
      this.redirect("/staff/role/edit/" + option.value);
    });

    let aRoute = this.getCreateLink("编辑路由",(sender)=>{
      this.redirect("/staff/role/" + option.value + "/route/edit");
    });

    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append(aRoute)
      .appendTo(cellElement);
  }

  /**
   * 添加
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/staff/role/edit");
  }

}