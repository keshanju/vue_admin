import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { RegionApi } from '@/api/RegionApi';
import { CommonUtils } from '@/common/CommonUtils';
/**
 * 布局列表
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class Home extends BaseVue {

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    private regionAPI = new RegionApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "地区字典";
        this.initComponents();
        this.getDataList();
    }

    /**
     * 初始化控件
     */
    private initComponents() {
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
                caption: "标题",
                width: 120,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "short",
                caption: "简称",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "longitude",
                caption: "经度",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "latitude",
                caption: "纬度",
                width: 100,
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: "操作",
                width: 200,
                cellTemplate: this.CellEdit
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
            this.redirect("/server/region/edit/" + sender.key.id);
        });
    }
    /**
  * 编辑
  * @param cellElement 
  * @param option 
  */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let aEdit = this.getCreateLink("编辑",(sender)=>{
            this.redirect("/server/region/edit/" + option.value);
        });
        $("<div>")
            .append(aEdit)
            .appendTo(cellElement);
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
                text: "刷新",
                icon: "refresh",
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
   * 添加
   * @param e 
   */
    private onAddHandler(sender) {
        this.redirect("/server/region/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.regionAPI.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

}