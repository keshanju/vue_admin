import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackageRefundConditionApi } from '@/api/PackageRefundConditionApi';

/**
 * 套餐退款条件列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private packageRefundConditionApi = new PackageRefundConditionApi();
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐退款条件";
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
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "package_title",
        caption: "所属套餐",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "label",
        caption: "标注",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "times",
        caption: "时间",
        width: 170,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "price",
        caption: "价格(分)",
        width: 170,
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
    });

    this.dxDataGrid1.option(options);
  }
  /**
   * 编辑
   * @param container 
   * @param option 
   */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aEdit = this.getCreateLink("编辑", sender => {
      this.redirect("/package/" + this.ID + "/refund/edit/" + option.value);
    });

    let aDel = this.getCreateLink("删除", async sender => {
      let r = await this.confirm("确定要删除数据吗?");
      if (r) {
        this.DataDelete(option.value);
      }
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
    await this.packageRefundConditionApi.setDelete(this.ID, id);
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
 * 添加
 * @param e 
 */
  private onAddHandler(sender) {
    this.redirect("/package/" + this.ID + "/refund/edit");
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
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.packageRefundConditionApi.getListPager(this.ID, strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

}