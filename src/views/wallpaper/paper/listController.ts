import {Component, Vue, Prop} from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import {DxDataGrid, DxForm} from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {WallpaperApi} from '@/api/WallpaperApi';
import {CommonUtils} from "@/common/CommonUtils";
import myEdit from './edit.vue';
import {RespCode} from "@/common/RespCode";

//注册组件
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
        (this.$parent as any).content_title = "壁纸管理";
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
                width: 50
            },
            {
                dataField: "title",
                caption: "壁纸名称",
                width: 120,
            },
            {
                dataField: "size",
                caption: "壁纸大小",
                width: 80,
            },
            {
                dataField: "pixel_x",
                caption: "壁纸像素宽",
                width: 80,
            },
            {
                dataField: "pixel_y",
                caption: "壁纸像素高",
                width: 80,
            },{
                dataField: "download_num",
                caption: "下载次数",
                width: 80,
            },
            {
                allowFiltering: false,
                allowSorting: false,
                dataField: "order",
                caption: "排序",
                width: 80,
            },
            {
                dataField: "is_free",
                caption: "是否免费",
                cellTemplate: (cellElement, option) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.flag,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                },
                width: 80,
            },
            {
                dataField: "is_top",
                caption: "是否置顶",
                cellTemplate: (cellElement, option) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.flag,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                },
                width: 80
            },
            {
                dataField: "is_hot",
                caption: "是否热门",
                cellTemplate: (cellElement, option) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.flag,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                },
                width: 80,
            },
            {
                dataField: "download_url",
                caption: "壁纸视频连接地址",
                width: 200,
            },
            {
                dataField: "type",
                caption: "壁纸类型",
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
            (this.$refs['myEdit'] as any).show({
                onHidden:(flag:boolean)=>{
                    if(flag){
                        this.dxDataGrid1.refresh();
                    }
                }
            },option.value);
        });
        let aDel = this.getCreateLink("删除", async (sender) => {
            await this.delWall(option.value);
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
    private async delWall(id: number) {
        if (await this.confirm('确认删除？')) {
            let d = await this.WallpaperApi.setWallDelete(id);
            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                }, d.msg);

            } else {
                this.errorCodeMsg(d.code, d.msg);
            }
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
        let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.WallpaperApi.getWallListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }
}