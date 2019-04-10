import {Component, Vue, Prop} from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {DxDataGrid, DxForm, DxChart} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import {StatisticsApi} from "@/api/StatisticsApi";
import {CommonUtils} from "@/common/CommonUtils";

import dx_form from "devextreme/ui/form";
import {DateTimeUtils, DateTimeEnum} from "@/utils/DateTimeUtils";
import {Validation} from "@/common/Validation";
import exportFromJSON from "export-from-json";
import {
    StatisticsOrderList,
    StatisticsOrderModel
} from "@/models/StatisticsModel";
import {StaffApi} from "@/api/StaffApi";
import md5 from "js-md5";
import {RespCode} from "@/common/RespCode";

/**
 * 布局列表
 */
@Component({
    components: {
        DxDataGrid,
        DxForm,
        DxChart
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxSearchForm1: DevExpress.ui.dxForm;

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    private statisticsAPI = new StatisticsApi();

    private staffApi = new StaffApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "销售统计";
        this.initComponents();
        //this.getDataList();
    }

    /**
     * 初始化控件
     */
    private async initComponents() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

       

        let cols: DevExpress.ui.dxDataGridColumn[] = [
            // {
            //     dataField: "dateline",
            //     caption: "统计时间",
            //     width: 120,
            //     cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
            //         $("<span>")
            //             .append(DateTimeUtils.convertDate(DateTimeUtils.parserDate(option.value),"yyyy-MM-dd"))
            //             .appendTo(cellElement);
            //     }
            // },
            {
                dataField: "src_channel",
                caption: "渠道类型",
                width: 80
            },
            {
                dataField: "product_type",
                caption: "产品类型",
                width: 80,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.product_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "package_name",
                caption: "套餐类型",
                width: 100
            },
            {
                dataField: "channel_type",
                caption: "订单来源",
                width: 120,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.invoice_from,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "region_code",
                caption: "所属区域",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.region_code,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "pay_type",
                caption: "支付类型",
                width: 120,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.invoice_payment_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "invoice_num",
                caption: "订单总数量",
                width: 120
            },
            {
                dataField: "invoice_complete_num",
                caption: "完成订单数",
                width: 120
            },
            // {
            //     dataField: "invoice_num",
            //     caption: "未支付订单",
            //     width: 120,
            // },
            {
                dataField: "invoice_complete_money",
                caption: "支付金额(元)",
                width: 160,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let money = option.value / 100;
                    $("<span>")
                        .append(money.toString())
                        .appendTo(cellElement);
                }
            }
        ];

        let options = this.getDataGridOption({
            onToolbarPreparing: this.onToolbarPreparingHandler,
            columns: cols,
            filterRow: {
                visible: false
            },
            columnChooser: {
                enabled: false
            },
            pager: {
                visible: false
            },
            summary: {
                totalItems: [
                    {
                        column: "invoice_complete_num",
                        summaryType: "sum",
                        displayFormat: "总订单:{0}"
                    },
                    {
                        column: "invoice_complete_money",
                        summaryType: "sum",
                        //valueFormat: "currency",
                        //displayFormat:"总金额:{0}"
                        customizeText: sender => {
                            return "总金额(元):" + Number(sender.value) / 100;
                        }
                    }
                ]
            }
        });


        this.dxDataGrid1.option(options);

        this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        //订单来源
        let invoice_from = [
            {id: -1, name: "全部"},
            ...CommonUtils.getDictonary().data.invoice_from
        ];
        //支付来源
        let pay_type = [
            {id: -1, name: "全部"},
            ...CommonUtils.getDictonary().data.invoice_payment_type.filter((a, b) => {
                //过滤支付类型
                return a.id != 0 && a.id != 1 && a.id != 5;
            })
        ];

        this.dxSearchForm1.option({
            width: 800,
            colCount: 4,
            items: [
                {
                    label: {
                        text: "渠道来源"
                    },
                    dataField: "channel_type",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "渠道来源",
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: invoice_from,
                        value: -1
                        //showClearButton: true,
                        //width: 180
                    }
                },
                {
                    label: {
                        text: "支付类型"
                    },
                    dataField: "pay_type",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "支付类型",
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: pay_type,
                        value: -1
                        //showClearButton: true,
                        //width: 180
                    }
                },
                {
                    label: {
                        text: "时间范围"
                    },
                    dataField: "time_range",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "时间范围",
                        displayExpr: "title",
                        valueExpr: "id",
                        dataSource: [
                            {
                                id: 2,
                                title: "前一天"
                            },
                            {
                                id: 3,
                                title: "前两天"
                            },
                            {
                                id: 4,
                                title: "前三天"
                            },
                            {
                                id: 5,
                                title: "近一周"
                            },
                            {
                                id: 6,
                                title: "本月"
                            },
                            {
                                id: 7,
                                title: "前一月"
                            },
                            {
                                id: 8,
                                title: "前两月"
                            },
                            {
                                id: 9,
                                title: "前三月"
                            },
                            {
                                id: -1,
                                title: "自定义"
                            }
                        ],
                        value: 2,
                        //width: 100,
                        onValueChanged: sender => {
                            let val = sender.value;
                            let dx_start_time = this.dxSearchForm1.getEditor(
                                "start_time"
                            ) as DevExpress.ui.dxDateBox;
                            let dx_end_time = this.dxSearchForm1.getEditor(
                                "end_time"
                            ) as DevExpress.ui.dxDateBox;
                            if (val == -1) {
                                dx_start_time.option({disabled: false});
                                dx_end_time.option({disabled: false});
                            } else {
                                dx_start_time.option({disabled: true});
                                dx_end_time.option({disabled: true});
                            }
                        }
                    }
                },
                {
                    itemType: "button",
                    horizontalAlignment: "left",
                    buttonOptions: {
                        text: "统计订单",
                        icon: "search",
                        type: "success",
                        onClick: () => {
                            let formData = this.dxSearchForm1.option("formData") as {
                                channel_type: number;
                                pay_type: number;
                                time_range: number;
                                start_time: string;
                                end_time: string;
                            };
                            let strWhere = "";
                            let channel_type = this.dxSearchForm1
                                .getEditor("channel_type")
                                .option("value");
                            if (channel_type != null && channel_type != -1) {
                                strWhere += "&channel_type=" + channel_type;
                            }

                            let pay_type = this.dxSearchForm1
                                .getEditor("pay_type")
                                .option("value");
                            if (pay_type != null && pay_type != -1) {
                                strWhere += "&pay_type=" + pay_type;
                            }

                            let endTime = DateTimeUtils.getNow("yyyy-MM-dd 00:00:00");
                            let startTime = "";

                            let type = this.dxSearchForm1
                                .getEditor("time_range")
                                .option("value");

                            switch (type) {
                                case 2:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Date,
                                        -1
                                    );
                                    break;
                                case 3:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Date,
                                        -2
                                    );
                                    break;
                                case 4:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Date,
                                        -3
                                    );
                                    break;
                                case 5:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Week,
                                        -1
                                    );
                                    break;
                                case 6:
                                    startTime = DateTimeUtils.getNow("yyyy-MM-01 00:00:00");
                                    break;
                                case 7:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Month,
                                        -1
                                    );
                                    break;
                                case 8:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Month,
                                        -2
                                    );
                                    break;
                                case 9:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Month,
                                        -3
                                    );
                                    break;
                                case -1: {
                                    startTime = formData.start_time;
                                    endTime = formData.end_time;
                                }
                                    break;
                            }

                            startTime = DateTimeUtils.convertDate(
                                DateTimeUtils.parserDate(startTime),
                                "yyyy-MM-dd"
                            );
                            endTime = DateTimeUtils.convertDate(
                                DateTimeUtils.parserDate(endTime),
                                "yyyy-MM-dd"
                            );

                            this.getDataList(
                                "&start_time=" + startTime + "&end_time=" + endTime + strWhere
                            );
                        }
                    }
                },
                {
                    dataField: "start_time",
                    label: {
                        text: "开始时间"
                    },
                    editorType: "dxDateBox",
                    editorOptions: {
                        disabled: true,
                        type: "datetime",
                        displayFormat: "yyyy-MM-dd 00:00:00",
                        dateSerializationFormat: "yyyy-MM-dd 00:00:00"
                    }
                },
                {
                    dataField: "end_time",
                    label: {
                        text: "结束时间"
                    },
                    editorType: "dxDateBox",
                    editorOptions: {
                        disabled: true,
                        type: "datetime",
                        displayFormat: "yyyy-MM-dd 23:59:59",
                        dateSerializationFormat: "yyyy-MM-dd 23:59:59"
                    }
                }
            ]
        });
        let chart: DevExpress.viz.dxChart = this.getDxInstanceByKey("DxChartHtml");
        // 图表
        // let data = await this.getChartList("&start_time=2019-02-01&end_time=2019-02-21");
        // chart.option({
        //     dataSource: data,
        //     series: {
        //         argumentField: 'dateline',
        //         valueField: 'invoice_complete_money',
        //     },
        //     palette: "Bright",
        //     pointSelectionMode:"multiple",
        // });
      
    }

    // 获取图表数据
    private async getChartList(strWhere: string) {
        
        let ds =  await this.statisticsAPI.getOrderChartList(strWhere);
        let data = ds.data;
        let ret = [];
        data.forEach((item,index)=>{
            ret.push({
                'dateline':item.dateline,
                'invoice_complete_money':item.invoice_complete_money,
            });
        })
        return ret;
    }


    private onToolbarPreparingHandler(e: {
        component?: DevExpress.DOMComponent;
        element?: DevExpress.core.dxElement;
        model?: any;
        toolbarOptions?: DevExpress.ui.dxToolbarOptions;
    }) {
        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
            location: "after",
            widget: "dxButton",
            options: {
                text: "导出数据",
                icon: "export",
                onClick: this.onExportHandler
            }
        });
    }

    
    private onExportHandler() {
        let formData: {
            super_password: string;
        } = {
            super_password: ""
        };

        let item = this.createFormItems([
            {
                dataField: "super_password",
                label: {
                    text: "请输入密码"
                },
                editorOptions: {
                    placeholder: "请输入员工超级密码.",
                    mode: "password"
                },
                validationRules: [Validation.getRequired("员工超级密码不能为空!")]
            }
        ]);

        this.createPopForm(
            {
                title: "导出",
                width: 380,
                height: 240
            },
            {
                formData: formData,
                items: item
            },
            {
                isAdd: false,
                hasReset: false
            },
            async (form, popup) => {
                let ds = this.dxDataGrid1.option(
                    "dataSource"
                ) as StatisticsOrderModel[];
                if (!ds || ds.length == 0) {
                    this.alert("没有任何数据!");
                    return true;
                }

                let formData = form.option("formData") as {
                    super_password: string;
                };
                let pwd = md5(formData.super_password);
                let d = await this.staffApi.getStaffSupperPassword(pwd);
                if (d.code == RespCode.zero) {
                    let cc: {
                        渠道来源?: string;
                        产品类型?: string;
                        套餐类型?: string;
                        订单来源?: string;
                        所属区域?: string;
                        支付类型?: string;
                        订单总数量?: string;
                        完成订单数?: string;
                        支付金额?: string;
                    }[] = [];
                    let cc_order_sum = 0;
                    let cc_price_sum = 0;
                    for (const item of ds) {
                        cc.push({
                            渠道来源: item.src_channel,
                            产品类型: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.product_type,
                                item.product_type
                            ),
                            套餐类型: item.package_name,
                            // 设备类型: CommonUtils.getDicText(CommonUtils.getDictonary().data.client_os_type, item.os_type),
                            订单来源: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.invoice_from,
                                item.channel_type
                            ),
                            所属区域: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.region_code,
                                item.region_code
                            ),
                            支付类型: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.invoice_payment_type,
                                item.pay_type
                            ),
                            订单总数量: item.invoice_num.toString(),
                            完成订单数: item.invoice_complete_num.toString(),
                            支付金额: (item.invoice_complete_money / 100).toString()
                        });
                        cc_order_sum += item.invoice_complete_num;
                        cc_price_sum += item.invoice_complete_money;
                    }
                    cc.push({
                        渠道来源: "",
                        产品类型: "",
                        订单来源: "",
                        所属区域: "",
                        支付类型: "",
                        订单总数量: "",
                        完成订单数: "总订单:" + cc_order_sum.toString(),
                        支付金额: "总金额(元):" + (cc_price_sum / 100).toString()
                    });
                    const data = cc;
                    const fileName = "export_order";
                    const exportType = "csv";
                    exportFromJSON({data, fileName, exportType});
                } else {
                    this.errorCodeMsg(d.code, d.msg);
                    return false;
                }
                return true;
            }
        );
    }

    private exportToCsv(filename: string, rows: object[]) {
        var processRow = function (row) {
            var finalVal = "";
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] ? row[j].toString() : "";
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
                if (j > 0) finalVal += ",";
                finalVal += result;
            }
            return finalVal + "\n";
        };

        var csvFile = "";
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
        var compatible = "\uFEFF";
        var blob = new Blob([compatible + csvFile], {
            type: "text/csv;charset=utf-8;"
        });
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");

            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename + ".csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    /**
     * 获取数据列表
     */
    private async getDataList(strWhere: string) {
        let ds = await this.statisticsAPI.getOrderList(strWhere);
        let aa = ds.data;
        //增加汇总
        this.dxDataGrid1.option({
            dataSource: aa
        });
    }
}
