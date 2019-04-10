import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { DomainBlackApi } from '@/api/DomainBlackApi';

/**
 * 黑名单列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private domainBlackApi = new DomainBlackApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "域名黑名单";
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
        allowFiltering: true,
        allowSorting: true,
        dataField: "domain",
        caption: "域名/IP",
        width: 180,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160,
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80,
      },
      {
        dataField: "change_time",
        caption: "修改时间",
        width: 160,
      },
      {
        dataField: "change_staff_name",
        caption: "修改人",
        width: 80,
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: "操作",
        width: 200,
        cellTemplate: this.cellEdit
      }
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
      this.redirect("/system/domainblack/edit/" + sender.key.id);
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
        this.DataDelete(Number(option.value));
      }
    });

    let aEdit = this.getCreateLink("编辑", (sender) => {
      this.redirect("/system/domainblack/edit/" + option.value);
    });
    
    $("<span>")
      .append(aEdit)
      .append(" | ")
      .append(aDel)
      .appendTo(cellElement);
  }

  /**
   * 数据删除
   * @param id 
   */
  private async DataDelete(id: number) {
    await this.domainBlackApi.setDelete(id);
    this.dxDataGrid1.refresh();
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
    this.redirect("/system/domainblack/edit");
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
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.domainBlackApi.getListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}