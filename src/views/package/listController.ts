import {Component} from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import {DxDataGrid, DxForm} from 'devextreme-vue';
import menu from "devextreme/ui/menu";
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {PackageApi} from '@/api/PackageApi';
import {CommonUtils} from '@/common/CommonUtils';
import {DiscountApi} from '@/api/DiscountApi';
import {RespCode} from '@/common/RespCode';
import {LangUtils} from '@/common/LangUtils';
import {PackagePriceApi} from '@/api/PackagePriceApi';

/**
 * 套餐列表
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class PackageIndex extends BaseVue {

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;
    private packageAPI = new PackageApi();
    private discountApi = new DiscountApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "套餐管理";
        this.dsLang = await LangUtils.getLangResourceDic();
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
                caption: "套餐名称",
                width: 100,
                cellTemplate: async (cellElement: DevExpress.core.dxElement, option: any) => {
                    let title = await LangUtils.getLangResourceTitle(this.dsLang, option.value);
                    $("<span></span>")
                        .append(title)
                        .appendTo(cellElement);
                }
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "package_no",
                caption: "套餐编号",
                width: 180,
            },
            {
                dataField: "is_valid",
                caption: "有效状态",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.valid, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                dataField: "billing_type",
                caption: "计费方式",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.billing_type, option.value))
                        .appendTo(cellElement);
                },
            },
            // {
            //     dataField: "price_type",
            //     caption: "价格类型",
            //     width: 100,
            //     cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
            //         $("<span>")
            //             .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            //             .appendTo(cellElement);
            //     },
            // },
            {
                dataField: "order_position",
                caption: "排序位置",
                width: 100,
            },
            {
                dataField: "short_desc",
                caption: "简介",
                width: 180,
                cellTemplate: async (cellElement: DevExpress.core.dxElement, option: any) => {
                    let title = await LangUtils.getLangResourceTitle(this.dsLang, option.value);
                    $("<span></span>")
                        .append(title)
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 80,
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 80,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "short_points",
                caption: "短期活动积分",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "short_ref_points",
                caption: "短期推荐人积分",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "short_activity_id",
                caption: "活动",
                width: 100,
            },
            {
                dataField: "is_order_connects",
                caption: "是否允许用户自定义连接数",
                width: 140,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.authority, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "total_max_connects",
                caption: "最大连接数",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "pc_max_connects",
                caption: "PC连接数",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "mobile_max_connects",
                caption: "手机连接数",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "up_speed_rate",
                caption: "上传速度(KB)",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "down_speed_rate",
                caption: "下载速度(KB)",
                width: 100,
            },
            {
                dataField: "is_own_all_lines",
                caption: "是否拥有全部线路",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                dataField: "is_own_all_games",
                caption: "是否拥有全部游戏",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "package_version_no",
                caption: "版本号",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "package_refund_allow_days",
                caption: "允许全额退款(天)",
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "gateway_fee",
                caption: "手续费(分)",
                width: 100,
            },
            {
                dataField: "price_type",
                caption: "价格类型",
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
                        .appendTo(cellElement);
                },
                width: 100
            },
            {
                dataField: "is_valid",
                caption: "状态",
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.valid, option.value))
                        .appendTo(cellElement);
                },
                width: 100
            },
            {
                dataField: "billing_type",
                caption: "计费方式",
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.billing_type, option.value))
                        .appendTo(cellElement);
                },
                width: 100
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 80
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 80
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 160
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: "操作",
                width: 150,
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
            this.redirect("/package/edit/" + sender.key.id);
        });
    }


    /**
     * 编辑
     * @param cellElement
     * @param option
     */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        new menu(cellElement, {
            dataSource: [{
                id: "1",
                name: "操作",
                items: [
                    {
                        id: "1_1",
                        name: "编辑",
                        disabled: false
                    },
                    {
                        id: "1_2",
                        name: "编辑价格",
                    },
                    {
                        id: "1_3",
                        name: "绑定线路",
                        disabled: option.key.is_own_all_lines == 1 ? true : false
                    },
                    {
                        id: "1_4",
                        name: "绑定游戏",
                        disabled: option.key.is_own_all_games == 1 ? true : false
                    },
                    {
                        id: "1_5",
                        name: "绑定充值卡",
                    },
                    {
                        id: "1_6",
                        name: "退款条件",
                    },
                    {
                        id: "1_7",
                        name: "操作日志",
                    },
                    {
                        id: "1_8",
                        name: "折扣码",
                    }
                ]
            }],
            hideSubmenuOnMouseLeave: false,
            displayExpr: "name",
            onItemClick: sender => {
                let id = sender.itemData.id.toString();
                switch (id) {
                    case "1_1":
                        this.redirect("/package/edit/" + option.value);
                        break;
                    case "1_2":
                        this.redirect("/package/" + option.value + "/price");
                        break;
                    case "1_3":
                        this.redirect("/package/" + option.value + "/line/edit");
                        break;
                    case "1_4":
                        this.redirect("/package/" + option.value + "/game/edit");
                        break;
                    case "1_5":
                        this.redirect("/package/" + option.value + "/card/edit");
                        break;
                    case "1_6":
                        this.redirect("/package/" + option.value + "/refund/list");
                        break;
                    case "1_7":
                        this.redirect("/package/" + option.value + "/op_log/list");
                        break;
                    case "1_8":
                        this.bindDiscountPackage(Number(option.value));
                        break;
                }
            }
        });
    }

    /**
     * 套餐 打折绑定
     * @param id
     */
    private async bindDiscountPackage(id: number) {
        let d_discount_price_package_bind = await this.packageAPI.getPackageDiscountList(Number(id));
        //折扣列表 已选折扣
        let d_discount = await this.discountApi.getList();
        let data_all_discount = d_discount.data;
        let data_selected_all_discount: any[] = [];
        //获取选中的折扣列表
        for (const item of d_discount.data) {
            for (const item2 of d_discount_price_package_bind.data.discount_ids) {
                if (item.id == item2) {
                    data_selected_all_discount.push(item);
                }
            }
        }

        //已选价格
        let d_Price = await new PackagePriceApi().getList(id);
        let data_all_price = d_Price.data;
        let data_selected_all_price: any[] = [];

        for (const item of d_Price.data) {
            for (const item2 of d_discount_price_package_bind.data.price_ids) {
                if (item.id == item2) {
                    data_selected_all_price.push(item);
                }
            }
        }
        //表单
        let items = this.createFormItems([
            {
                itemType: "group",
                colCount: 2,
                items: [
                    {
                        label: {
                            text: "折扣码列表"
                        },
                        dataField: "data_all",
                        editorType: "dxTreeView",
                        editorOptions: {
                            displayExpr: "title",
                            valueExpr: "id",
                            searchEnabled: true,
                            dataSource: data_all_discount,
                            onItemClick: (e: any) => {
                                if ($.inArray(e.itemData, data_selected_all_discount) == -1) {
                                    data_selected_all_discount.push(e.itemData);
                                    form1.getEditor("data_selected_all").option({
                                        dataSource: data_selected_all_discount
                                    });
                                }
                            },
                        },
                        validationRules: []
                    },
                    {
                        label: {
                            text: "已选折扣码列表"
                        },
                        dataField: "data_selected_all",
                        editorType: "dxTreeView",
                        editorOptions: {
                            displayExpr: "title",
                            valueExpr: "id",
                            searchEnabled: true,
                            dataSource: data_selected_all_discount,
                            onItemClick: (e: any) => {
                                let index = data_selected_all_discount.indexOf(e.itemData);
                                let arr = data_selected_all_discount.splice(index, 1);
                                form1.getEditor("data_selected_all").option({
                                    dataSource: data_selected_all_discount
                                });
                            },
                        },
                        validationRules: []
                    },
                    {
                        label: {
                            text: "价格列表"
                        },
                        dataField: "data_all_price",
                        editorType: "dxTreeView",
                        editorOptions: {
                            displayExpr: "title",
                            valueExpr: "id",
                            searchEnabled: true,
                            dataSource: data_all_price,
                            onItemClick: (e: any) => {
                                if ($.inArray(e.itemData, data_selected_all_price) == -1) {
                                    data_selected_all_price.push(e.itemData);
                                    form1.getEditor("data_selected_all_price").option({
                                        dataSource: data_selected_all_price
                                    });
                                }
                            },
                        },
                        validationRules: []
                    },
                    {
                        label: {
                            text: "已选价格列表"
                        },
                        dataField: "data_selected_all_price",
                        editorType: "dxTreeView",
                        editorOptions: {
                            displayExpr: "title",
                            valueExpr: "id",
                            searchEnabled: true,
                            dataSource: data_selected_all_price,
                            onItemClick: (e: any) => {
                                let index = data_selected_all_price.indexOf(e.itemData);
                                let arr = data_selected_all_price.splice(index, 1);
                                form1.getEditor("data_selected_all_price").option({
                                    dataSource: data_selected_all_price
                                });
                            },
                        },
                        validationRules: []
                    }
                ]
            }
        ]);
        let form1 = this.createPopForm(
            {
                title: "套餐折扣码绑定",
                width: 800
            },
            {
                items: items
            },
            {
                hasReset: false
            },
            async (form, popup) => {
                try {
                    let dxTreeView2 = form.getEditor("data_selected_all") as DevExpress.ui.dxTreeView;
                    let nodes = dxTreeView2.getNodes();
                    let selectedNodes: number[] = [];
                    for (const n of nodes) {
                        selectedNodes.push(n.key);
                    }
                    if (selectedNodes.length < 1) {
                        await this.alert("请至少选择一个选项!再进行提交.");
                        return false;
                    }

                    let dxTreeView_price = form.getEditor("data_selected_all_price") as DevExpress.ui.dxTreeView;
                    let nodes_price = dxTreeView_price.getNodes();
                    let selectedNodes_price: number[] = [];
                    for (const n of nodes_price) {
                        selectedNodes_price.push(n.key);
                    }
                    if (selectedNodes_price.length < 1) {
                        await this.alert("请至少选择一个选项!再进行提交.");
                        return false;
                    }

                    let d = await this.packageAPI.setPackageDiscount(Number(id), selectedNodes, selectedNodes_price);
                    if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                        this.toast(() => {

                        });
                        return true;
                    } else {
                        this.errorCodeMsg(d.code, d.msg);
                    }
                } catch (error) {
                    this.error(error);
                }
            }
        );
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
                onClick: this.onSearchHandler
            }
        });
        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getDataList();
        });
    }

    /**
     * 添加
     * @param sender
     */
    private onAddHandler(sender) {
        this.redirect("/package/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.packageAPI.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    /**
     * 搜索
     * @param sender
     */
    private onSearchHandler(sender) {
        this.dxDataGrid1.refresh();
    }
}
