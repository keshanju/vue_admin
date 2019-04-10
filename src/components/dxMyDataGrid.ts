
import data_grid from 'devextreme/ui/data_grid';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
/**
 * 数据列表
 */
class dxMyDataGrid extends data_grid {

    /**
     * 构造函数
     * @param element 
     * @param options 
     */
    constructor(element: Element, options?: DevExpress.ui.dxDataGridOptions) {
        super(element, options);
    }


    /**
     * 覆盖操作
     */
    public option_dx(options?: DevExpress.ui.dxDataGridOptions) {
        let oo: DevExpress.ui.dxDataGridOptions = {
            paging: {
                enabled: true,
                pageSize: 20
            },
            showRowLines: true,
            showBorders: true,
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50],
                showInfo: true,
                showNavigationButtons: true,
                visible: true
            },
            hoverStateEnabled: true,
            columns: [
            ],
            //onToolbarPreparing: this.onToolbarPreparingHandler,
            //columns: cols,
            scrolling: {
                columnRenderingMode: "virtual"
            },
            rowAlternationEnabled: true,
            allowColumnResizing: true,
            filterRow: {
                visible: true,
                applyFilter: "onClick"
            },
            //focusStateEnabled:true,
            // filterPanel:{
            //     visible: true
            // },
            //filterSyncEnabled:false,
            columnResizingMode: "widget",
        };
        oo = $.extend(oo, options);
        super.option(oo);
    }


}