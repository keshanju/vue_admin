import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { DomainWhiteApi } from '@/api/DomainWhiteApi';
/**
 * 白名单列表
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class Home extends BaseVue {

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    private domainWhiteAPI = new DomainWhiteApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "域名白名单";
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
                dataField: "domain",
                caption: "白名单域名",
                width: 180,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "game_title",
                caption: "所属游戏",
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
            this.redirect("/system/domainwhite/edit/" + sender.key.id);
        });
    }
    /**
  * 编辑
  * @param cellElement 
  * @param option 
  */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {

        let aDel = this.getCreateLink("删除", async sender => {
            let a = await this.confirm("是否确定删除?");
            if (a) {
                this.DataDelete(Number(option.value));
            }
        });

        let aEdit = this.getCreateLink("编辑", sender => {
            this.redirect("/system/domainwhite/edit/" + option.value);
        });
        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aDel)
            .appendTo(cellElement);
    }

    private async DataDelete(id: number) {
        await this.domainWhiteAPI.setDelete(id);
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
   * 添加
   * @param e 
   */
    private onAddHandler(sender) {
        this.redirect("/system/domainwhite/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.domainWhiteAPI.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    /**
    * 搜索
    * @param e 
    */
    private onRefreshHandler(sender) {
        this.dxDataGrid1.refresh();
    }

}