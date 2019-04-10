import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { GSettingApi } from '@/api/GSettingApi';
import { GSettingModel } from '@/models/GSettingModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
/**
 * 全局设置列表
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
  private gsettingAPI = new GSettingApi();

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "全局设置";
    this.initComponent();
    this.getGSettingList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "key",
        caption: '变量名称',
        width: 160,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "value",
        caption: '值',
        width: 160,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: '名称',
        width: 200,
      },
      {
        dataField: "key_type",
        caption: '变量类别',
        width: 160,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.setting_type, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
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
      this.redirect("/system/settings/edit/" + sender.key.id);
    });
  }
  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aEdit = this.getCreateLink("编辑", (sender) => {
      this.redirect("/system/settings/edit/" + option.value);
    });
    $("<div>")
      .append(aEdit)
      .appendTo(cellElement);
  }

  /**
 * 获取区服列表
 */
  private async getGSettingList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.gsettingAPI.GSettingListPager(strWhere, pageSize, pageIndex));
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
        onClick: this.onSearchHandler
      }
    });


    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getGSettingList();
    });
  }

  /**
   * 添加设置
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/system/settings/edit");
  }

  /**
   * 搜索设置
   * @param e 
   */
  private onSearchHandler(sender) {
    this.dxDataGrid1.refresh();
  }


}