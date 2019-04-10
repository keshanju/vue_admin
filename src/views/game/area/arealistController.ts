import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxPopup, DxScrollView } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import { AreaApi } from "@/api/AreaApi";

import AreaEdit from "./areaedit.vue";
import AreaLine from "./arealine.vue";
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { GameAreaRegionModel } from '@/models/GameAreaRegionModel';
import { GameAreaRegionApi } from '@/api/GameAreaRegionApi';
import { BaseModel } from '@/models/BaseModel';
import { RespCode } from '@/common/RespCode';

@Component({
    components: {
        DxDataGrid,
        DxPopup,
        AreaEdit,
        DxScrollView,
        AreaLine,
    }
})
export default class AreaList extends BaseVue {

    public options: {
        gameid?: number;
        title?: string;
        visible?: boolean;
        toolbarItems?: any[];
        onHide?: () => void;
        width?: number;
        height?: number;
    } = {
            gameid: 0,
            title: "弹窗",
            visible: false,
            toolbarItems: []
        };

    private dxDataGrid1: DevExpress.ui.dxDataGrid;
    private gameAPI = new AreaApi();
    private game_id = 0;

    mounted(){
        this.initWidgets();
    }

    /***
     * 初始化组件
     */
    private initWidgets() {
        //工具条
        let popup = this.getDxInstanceByKey("dxPopup1") as DevExpress.ui.dxPopup;
        popup.option({
            toolbarItems: [
                {
                    location: "after",
                    toolbar: "bottom",
                    widget: "dxButton",
                    options: {
                        text: "取消",
                        //icon: "cancel",
                        type: "normal",
                        onClick: sender => {
                            this.hide();
                        }
                    }
                }
            ]
        });
        //数据列表
        this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGrid1");
        const cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "game_title",
                caption: "所属游戏",
                width: 120
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "title",
                caption: "区服名称",
                width: 120
            },
            {
                dataField: "remark",
                caption: "备注",
                width: 200
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "order_id",
                caption: "排序",
                width: 80
            },
            {
                visible: false,
                dataField: "parent_area_title",
                caption: "上级区服",
                width: 120
            },
            {
                visible: false,
                allowFiltering: true,
                allowSorting: true,
                dataField: "hint",
                caption: "玩家提醒",
                width: 120
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 80
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
            columns: cols
        });
        this.dxDataGrid1.option(options);
    }

    /**
     * 操作
     * @param cellElement 
     * @param option 
     */
    private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let aLocal = $("<a href='javascript:void(0)'> 区域设置 </a>");
        aLocal.bind("click", sender => {
            this.regionAreaDataList(option.value, option.data.game_id);
        });
        let aEdit = this.getCreateLink("编辑", sender => {
            (this.$refs["AreaEdit1"] as any).show(
                {
                    area_id: option.value,
                    game_id: this.game_id
                },
                {
                    title: "编辑游戏区服",
                    onHide: (hasData: boolean) => {
                        if (hasData) {
                            this.dxDataGrid1.refresh();
                        }
                    }
                }
            );
        });

        let aBindLine = this.getCreateLink("绑定线路关系", sender => {
            let AreaLine = this.$refs["AreaLine"] as any;
            AreaLine.show(option.value, {
                title: "绑定游戏区服与线路关系",
                width: 500
            });
        });

        $("<div>")
            .append(aEdit)
            .append(" | ")
            .append(aLocal)
            .append(" | ")
            .append(aBindLine)
            .appendTo(cellElement);
    }

    /**
     * 工具条
     * @param e 
     */
    private onToolbarPreparingHandler(e: {
        component?: DevExpress.DOMComponent;
        element?: DevExpress.core.dxElement;
        model?: any;
        toolbarOptions?: DevExpress.ui.dxToolbarOptions;
    }) {
        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "添加",
                icon: "add",
                onClick: () => {
                    (this.$refs["AreaEdit1"] as any).show(
                        {
                            game_id: this.game_id
                        },
                        {
                            title: "增加游戏区服",
                            onHide: (hasData: boolean) => {
                                if (hasData) {
                                    this.dxDataGrid1.refresh();
                                }
                            }
                        }
                    );
                }
            }
        });

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                icon: "refresh",
                text: "刷新",
                onClick: () => {
                    this.dxDataGrid1.refresh();
                }
            }
        });

        //创建搜索工具条
        this.createSearchToolbars(
            toolbarItems,
            this.dxDataGrid1.option("columns"),
            () => {
                this.getGameList();
            }
        );
    }

    /**
     * 获取区服列表
     */
    private async getGameList() {
        //this.setSearchKeywords("&search=game_id__equal__" + this.game_id);
        // 数据源
        let ds = this.getDataGridPager(
            async (strWhere, pageSize, pageIndex) => {
                //console.log(strWhere);
                strWhere = strWhere + "&game_id=" + this.game_id;
                return await this.gameAPI.AreaListPager(strWhere, pageSize, pageIndex)
            }
        );
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    /**
     *显示
     */
    public show(game_id: number = 0, config: any) {
        Object.assign(this.options, config);
        this.options.visible = true;
        this.game_id = game_id;
        if (game_id > 0) {
            this.getGameList();
        }
    }

    /**
     *隐藏
     */
    public hide() {
        this.options.visible = false;
        if (this.options.onHide) {
            this.options.onHide();
        }
    }

    //#region  游戏区域本地化
    private gameAreaRegionApi = new GameAreaRegionApi();
    private grid_area: DevExpress.ui.dxDataGrid;
    private grid_form: DevExpress.ui.dxForm;
    private regionAreaDataList(area_id: number, game_id: number) {
        this.grid_area = this.createPopDataList({
            title: "游戏区服本地化列表"
        },
            {
                columns: [
                    {
                        dataField: "id",
                        caption: '编号',
                        width: 80,
                    },
                    {
                        dataField: "game_title",
                        caption: '所属游戏',
                        width: 100,
                    },
                    {
                        dataField: "area_title",
                        caption: '所属区服',
                        width: 100,
                    },
                    {
                        dataField: "region_code",
                        caption: '区域代码',
                        width: 100,
                        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                            $("<span>")
                                .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, option.value))
                                .appendTo(cellElement);
                        }
                    },
                    {
                        dataField: "title",
                        caption: '标题',
                        width: 160,
                    },
                    {
                        dataField: "remark",
                        caption: '备注',
                        width: 160,
                    },
                    {
                        dataField: "create_staff_name",
                        caption: '创建管理员',
                        width: 160,
                    },
                    {
                        dataField: "create_time",
                        caption: '创建时间',
                        width: 160,
                    },
                    {
                        dataField: "change_staff_name",
                        caption: '修改管理员',
                        width: 160,
                    },
                    {
                        dataField: "change_time",
                        caption: '修改时间',
                        width: 160,
                    },
                    {
                        fixed: true,
                        fixedPosition: "right",
                        dataField: "id",
                        alignment: "center",
                        caption: "操作",
                        width: 200,
                        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                            let aEdit = $("<a href='javascript:void(0)'> 编辑 </a>");
                            aEdit.bind("click", async (sender) => {
                                let d = await this.gameAreaRegionApi.getModel(option.value);
                                this.regionAreaDataEdit(d.data);
                            });
                            $("<div>")
                                .append(aEdit)
                                .appendTo(cellElement);
                        }
                    }
                ]
            }, (sender) => {
                let toolbarItems = sender.toolbarOptions.items;
                toolbarItems.push({
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        text: '添加',
                        icon: 'add',
                        onClick: sender => {
                            this.regionAreaDataEdit({
                                id: 0,
                                game_id: game_id,
                                area_id: area_id
                            });
                        }
                    }
                });

                toolbarItems.push({
                    location: 'before',
                    widget: 'dxButton',
                    options: {
                        text: '刷新',
                        icon: 'refresh',
                        onClick: sender => {
                            this.grid_area.refresh();
                        }
                    }
                });
            });
        this.setSearchKeywords("&area_id=" + area_id);

        let ds: any = this.getDataGridPager(
            async (strWhere, pageSize, pageIndex) =>
                await this.gameAreaRegionApi.getListPager(
                    strWhere,
                    pageSize,
                    pageIndex
                )
        );
        this.grid_area.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    private regionAreaDataEdit(model: GameAreaRegionModel) {
        let items = this.createFormItems([
            {
                dataField: "region_code",
                label: {
                    text: '区域代码'
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择区域代码",
                    dataSource: CommonUtils.getDictonary().data.region_code,
                    displayExpr: "name",
                    valueExpr: "id",
                },
                validationRules: [Validation.getRequired("区域代码不能为空!")]
            },
            {
                dataField: "title",
                label: {
                    text: '标题'
                },
                editorOptions: {
                    placeholder: "请选输入标题"
                },
                validationRules: [Validation.getRequired("标题不能为空!")]
            },
            {
                dataField: "remark",
                label: {
                    text: '信息'
                },
                editorType: "dxTextArea",
                editorOptions: {
                    placeholder: "请输入信息.",
                    height: 80
                },
                validationRules: [Validation.getRequired("信息不能为空!")]
            }
        ]);

        let form = this.createPopForm({
            title: "编辑游戏区服本地化",
            width: 400,
            height: 300
        }, {
                formData: model,
                items: items
            }, {}, async (v, p) => {
                try {
                    if (!this.validateForm(v)) {
                        return false;
                    }
                    let dxFormData1 = v.option("formData") as GameAreaRegionModel;
                    let result: BaseModel;
                    if (dxFormData1.id == RespCode.zero) {
                        result = await this.gameAreaRegionApi.setAdd(dxFormData1);
                    } else {
                        result = await this.gameAreaRegionApi.setUpdate(dxFormData1.id, dxFormData1);
                    }
                    if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                        await this.toast(() => {
                            this.grid_area.refresh();
                        });
                        return true;
                    } else {
                        this.errorCodeMsg(result.code, result.msg);
                    }
                } catch (error) {
                    this.error(error);
                }
                return false;
            });
    }
    //#endregion
}