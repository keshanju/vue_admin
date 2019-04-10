
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
} from "devextreme-vue";
import BaseVue from '@/common/BaseVue';
import { CardOtherDefineApi, CardOtherUsedApi } from '@/api/CardOtherApi';
/**
 * 第三方充值卡
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView, DxPopup, DxScrollView
    }
})
export default class ListController extends BaseVue {

    @Prop()
    public visible!: boolean;

    @Watch("visible")
    private watch_visible(newVal: boolean, oldVal: boolean) {
        this.options.visible = newVal;
    }

    @Prop()
    public id!: number;

    @Watch("id")
    private watch_id(newVal: boolean, oldVal: boolean) {
        this.options.id = newVal;
        this.getDataListPager();
    }

    //组件选项
    private options: any = {
        visible: false,
        title: "已使用卡列表",
        toolbarItems: [],
        width: $(window).width()-200,
        height: $(window).height()-200,
        onHidden:null
    }

    private dxDataGrid1: DevExpress.ui.dxDataGrid;

    mounted() {

        this.options.visible = this.visible ? true : false;

        this.options.onHidden=()=>{
            this.$emit("onHide", false);
        };

        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "取消",
                type: "normal",
                onClick: sender => {
                    this.$emit("onHide", false);
                }
            }
        });

        this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGrid1");
        const cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            // {
            //     dataField: "card_define_id",
            //     caption: "卡类别",
            //     width: 120
            // },
            {
                dataField: "card_number",
                caption: "卡编号",
            },
            {
                dataField: "card_password",
                caption: "卡密码",
                width: 160
            },
            {
                dataField: "used_user_name",
                caption: "使用人",
                width: 100
            },
            {
                dataField: "used_user_mobile_numb",
                caption: "手机号",
                width: 120
            },
            {
                dataField: "used_user_mail",
                caption: "邮箱",
                width: 160
            },
            {
                dataField: "used_time",
                caption: "使用时间",
                width: 160
            },
            {
                dataField: "expired_time",
                caption: "过期时间",
                width: 160
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 100
            }
        ];

        let options = this.getDataGridOption({
            onToolbarPreparing: this.onToolbarPreparingHandler,
            columns: cols,
        });

        this.dxDataGrid1.option(options);

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
                icon: "refresh",
                text: "刷新",
                onClick: () => {
                    this.dxDataGrid1.refresh();
                }
            }
        });


        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getDataListPager();
        });
    }


    /**
    * 获取充值卡列表
    */
    private async getDataListPager() {
        // 数据源
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await new CardOtherUsedApi().getListPager(this.options.id, strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }
}