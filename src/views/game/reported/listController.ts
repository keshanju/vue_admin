import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';
import { GameReportedApi } from '@/api/GameReportedApi';
import { GameReportedModel } from '@/models/GameReportedModel'
import popup from '../../../../node_modules/devextreme/ui/popup';
import scroll_view from 'devextreme/ui/scroll_view';
import dx_form from 'devextreme/ui/form';
import { Validation } from '@/common/Validation';
import { RespCode } from '@/common/RespCode';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 游戏热度列表
 */
@Component({
    components: {
        DxDataGrid
    }
})
export default class Home extends BaseVue {
    // 控件初始化
    private dxDataGridKey1: string = "dxDataGridKey1";
    private dxDataGrid1: DevExpress.ui.dxDataGrid;
    private gamehotAPI = new GameReportedApi();

    private dxForm1: DevExpress.ui.dxForm;

    // 入口
    protected async mounted() {
        (this.$parent as any).content_title = "游戏上报";
        this.initComponent();
        await this.getGameHotList();
    }

    // 初始化组件
    private initComponent() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

        const cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "user_mobile_num",
                caption: '所属用户',
                width: 150,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let $span = $("<span>");
                    if (option.value && option.value.toString() != "") {
                        if (option.data.country_code && option.data.country_code.toString() != "") {
                            $span.append("(+" + option.data.country_code + ")");
                        }
                    }
                    $span.append(option.value);
                    $span.appendTo(cellElement);
                }
            },
            {
                dataField: "user_mail",
                caption: '邮箱',
                width: 80
            },{
                dataField: "contact_type",
                caption: '意见反馈',
                width: 150,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.public_report_contact_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },{
                dataField: "contact_desc",
                caption: '描述',
                width: 150
            },{
                dataField: "contact_url",
                caption: '图片',
                width: 150,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    if(option.value){
                        let imgList = option.value.split(',');
                        let imgHtml ='';
                        imgList.forEach((item,index)=>{
                            imgHtml += '<a href="'+item+'" target="_blank">查看图片'+(index+1)+'/</a>';
                        })
                        $("<span>").append(imgHtml).appendTo(cellElement);
                    }
                }
            },{
                dataField: "line_type",
                caption: '网络类型',
                width: 150,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.public_report_net_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "title",
                caption: '游戏名称',
                width: 120,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "contact",
                caption: '联系方式',
                width: 100,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "create_time",
                caption: '创建时间',
                width: 160,
            },
            {
                dataField: "user_name",
                caption: '账号',
                width: 100
            },
            {
                dataField: "user_nickname",
                caption: '昵称',
                width: 100
            },
            {
                dataField: "status",
                caption: '处理状态',
                width: 80,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.game_report_state, option.value))
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "staff_name",
                caption: '处理人',
                width: 80
            },
            {
                dataField: "update_time",
                caption: '处理时间',
                width: 160
            },
            {
                dataField: "desc",
                caption: '处理说明',
                width: 200
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
            columns: cols,
        });
        this.dxDataGrid1.option(options);
    }

    /**
 * 编辑
 * @param cellElement 
 * @param option 
 */
    private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let aDel = $("<a href='#' data=" + option.value + "> 处理 </a>");
        aDel.bind("click", (sender) => {
            let id = $(sender.target).attr("data");

            let aa = $("<div>").appendTo($(sender.target));

            this.onDoGameReported(aa[0], Number(id));
        });

        $("<div>")
            .append(aDel)
            .appendTo(cellElement);
    }

    /**
   * 获取游戏热点列表
   */
    private async getGameHotList() {
        // 数据源
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.gamehotAPI.getListPager(strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
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
                onClick: this.onRefreshHandler
            }
        });

        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
            this.getGameHotList();
        });
    }

    /**
  * 刷新
  * @param sender 
  */
    private onRefreshHandler(sender) {
        this.dxDataGrid1.refresh();
    }


    //#region  处理游戏上报
    private _DataForm1: GameReportedModel = {

    };

    private _DataFormReset1: GameReportedModel = {

    };
    /**
     * 处理游戏上报
     */
    private onDoGameReported(element: Element, id: number) {
        this.popup1 = new popup(element);
        this.popup1.option({
            title: "编辑",
            showTitle: false,
            width: 600,
            height: 400,
            contentTemplate: () => {
                this.dxForm1 = new dx_form($("<div />")[0]);
                this.initFormComponents(id);
                return this.dxForm1.element();
            }
        });
        this.popup1.show();
        //增加滚动条
        this.scroll_view1 = new scroll_view($(this.popup1.content())[0], {
            useNative: false,
        });
    }

    /**
     * 加载表单
     * @param id 
     */
    private async initFormComponents(id: number) {

        if (id > 0) {
            let d = await this.gamehotAPI.getModel(id);
            this._DataForm1 = d.data;
        }

        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            caption: "处理",
            items: [
                {
                    dataField: "title",
                    label: {
                        text: "标题"
                    },
                    template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {
                        $("<span></span>").appendTo(aItemEle).text(this._DataForm1.title);
                    }
                },
                {
                    dataField: "status",
                    label: {
                        text: "状态"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "请选择状态",
                        dataSource: CommonUtils.getDictonary().data.game_report_state,
                        displayExpr: "name",
                        valueExpr: "id",
                        value: 0
                    },
                    validationRules: [Validation.getRequired("请选择状态!")]
                }, {
                    dataField: "desc",
                    label: {
                        text: "处理说明"
                    },
                    editorType: "dxTextArea",
                    editorOptions: {
                        placeholder: "请输入处理说明",
                        height: 150
                    },
                    validationRules: [Validation.getRequired("处理说明不能为空!")]
                }
            ]
        }, {
            itemType: "group",
            colCount: 2,
            items: [
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "确定处理",
                        type: "success",
                        useSubmitBehavior: true,
                        onClick: this.onFormClickHandler
                    }
                },
                {
                    itemType: "button",
                    horizontalAlignment: "center",
                    buttonOptions: {
                        text: "返回",
                        type: "normal",
                        onClick: () => {
                            this.popup1.hide();
                        }
                    }
                }
            ]
        }];

        this.dxForm1.option({
            formData: this._DataForm1,
            items: items1
        });
    }


    /**
     * 处理
     */
    private async onFormClickHandler() {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return;
            }

            this._DataForm1.account_token = this.token;
            let f = this.joinFormParams(this._DataForm1);

            let result = await this.gamehotAPI.setUpdate(this._DataForm1.id, f);

            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.dxDataGrid1.refresh();
                    this.popup1.hide();
                    this.popup1.dispose();
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }
    //#endregion
}