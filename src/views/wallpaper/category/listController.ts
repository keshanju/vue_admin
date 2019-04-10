import {Component, Vue, Prop} from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import {DxDataGrid, DxForm} from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';
import myEdit from './edit.vue';

import {WallpaperApi} from '@/api/WallpaperApi';
import {RespCode} from "@/common/RespCode";
import {BaseModel2, BaseResult2} from "@/models/BaseModel";

/**
 * 壁纸分类列表
 */
@Component({
    components: {
        DxDataGrid, DxForm,myEdit
    }
})
export default class Home extends BaseVue {

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    private WallpaperApi = new WallpaperApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "壁纸分类管理";
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
                dataField: "name",
                caption: "分类名称",
                width: 120,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "name_en",
                caption: "分类英文名称",
                width: 120,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "order",
                caption: "排序",
                width: 80,
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
            // option.value
            (this.$refs['myEdit'] as any).show({
                onHidden:(flag:boolean)=>{
                    if(flag){
                        this.dxDataGrid1.refresh();
                    }
                }
            },option.value);
        });
        let aDel = this.getCreateLink("删除", async (sender) => {
          await this.delCate(option.value);
          this.getDataList();
        });


        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aDel)
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
        (this.$refs['myEdit'] as any).show({
            onHidden:(flag:boolean)=>{
                if(flag){
                    this.dxDataGrid1.refresh();
                }
            }
        });
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.WallpaperApi.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    private async delCate(id:number){
        if (await this.confirm('确认删除？')) {
            let d = await this.WallpaperApi.setDelete(id);
            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                }, d.msg);

            } else {
                this.errorCodeMsg(d.code, d.msg);
            }
        }
    }
}