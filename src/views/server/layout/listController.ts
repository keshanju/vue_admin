import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { LayoutApi } from '@/api/LayoutApi';
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

    private layoutAPI = new LayoutApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "布局管理";
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
                dataField: "layout_code",
                caption: "布局编号",
                width: 120,
            },
            {
                dataField: "desc",
                caption: "布局描述",
                width: 300
            },
            {
                dataField: "is_enable",
                caption: "是否启用",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
                        .appendTo(cellElement);
                }
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
            }, {
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
            this.redirect("/server/layout/edit/" + sender.key.id);
        });
    }
    /**
  * 编辑
  * @param cellElement 
  * @param option 
  */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let aEdit = this.getCreateLink("编辑", (sender) => {
            this.redirect("/server/layout/edit/" + option.value);
        });
        let aLogs = this.getCreateLink("布局日志", (sender) => {
            this.redirect("/server/layout/" + option.value + "/log/list");
        });
        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aLogs)
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


        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getDataList();
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
        this.redirect("/server/layout/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.layoutAPI.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

}