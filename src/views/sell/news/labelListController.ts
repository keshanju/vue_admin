import {Component, Vue, Prop} from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import {DxDataGrid, DxForm, DxChart} from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {NewsApi} from '@/api/NewsApi';
import CreateHtml from "./createHtml.vue";

/**
 * 标签列表
 */
@Component({
    components: {
        DxDataGrid, DxForm,
        CreateHtml, DxChart
    }
})
export default class Home extends BaseVue {

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    private newsAPI = new NewsApi();

    private show_create_html = false;

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "标签管理";
        this.initComponents();
        this.getDataList();
    }

    /**
     * 初始化控件
     */
    private initComponents() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

        let chart: DevExpress.viz.dxChart = this.getDxInstanceByKey("DxChartHtml");


        chart.option({
            dataSource: this.aaa(),
            series: {
                // See details in the "Bind Series to Data" topic
                argumentField: 'people_num',
                valueField: 'count',
                negativesAsZeroes: true,
            }
        });

        let cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "group",
                caption: "标签组",
                width: 120,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "label",
                caption: "标签",
                width: 120,
            },
            {
                dataField: "desc",
                caption: "描述",
                width: 200,
            },
            {
                dataField: "label_sort",
                caption: "排序",
                width: 50,
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
                caption: "更新时间",
                width: 160,
            },
            {
                dataField: "change_staff_name",
                caption: "更新人",
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
            onRowClick: this.onRowClickHandler,
            // height: () => {
            //   return window.innerHeight - 20;
            // }
        });

        this.dxDataGrid1.option(options);
    }

    private aaa() {
        let a= [
            {people_num: 'Apples', count: 1},
            {people_num: 'Oranges', count: 2},
            {people_num: 'Lemons', count: 3},
            {people_num: 'Pears', count: 4},
            {people_num: 'Pineapples', count: 1000},
            {people_num: '1', count: 5},
            {people_num: '2', count: 4},
            {people_num: '3', count: 3},
            {people_num: '4', count: 2},
            {people_num: '5', count: 1},
        ];
        console.log(a);
        return a;
    }

    /**
     * 编辑
     * @param e
     */
    private onRowClickHandler(sender) {
        this.dbClick(() => {
            this.redirect("/sell/news/label/edit/" + sender.key.id);
        });
    }

    /**
     * 编辑
     * @param cellElement
     * @param option
     */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {

        let aEdit = this.getCreateLink("编辑", sender => {
            this.redirect("/sell/news/label/edit/" + option.value);
        });
        let aDel = this.getCreateLink("删除", async (sender) => {
            await this.delLabel(option.value);
            this.getDataList();
        });


        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aDel)
            .appendTo(cellElement);
    }

    /**
     * 删除
     * @param {number} id
     */
    private async delLabel(id: number) {
        if (await this.confirm('确认删除？')) {
            await this.newsAPI.deleteNewsLabel(id);
        }
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
        this.redirect("/sell/news/label/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.newsAPI.getLabelList(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }
}