import {Component, Vue, Prop} from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {DxDataGrid, DxForm, DxChart} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import {StatisticsApi} from "@/api/StatisticsApi";
import {CommonUtils} from "@/common/CommonUtils";
import {DateTimeUtils, DateTimeEnum} from "@/utils/DateTimeUtils";
import {Validation} from "@/common/Validation";
import {StaffApi} from "@/api/StaffApi";
import md5 from "js-md5";
import {RespCode} from "@/common/RespCode";
import exportFromJSON from "export-from-json";

/**
 * 布局列表
 */
@Component({
    components: {
        DxDataGrid,
        DxForm,
        DxChart,
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxFormKey2: string = "dxForm_Key_2";

    private dxSearchForm1: DevExpress.ui.dxForm;
    private dxSearchForm2: DevExpress.ui.dxForm;

    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;

    protected dxChart1: DevExpress.viz.dxChart;

    private statisticsAPI = new StatisticsApi();
    private staffApi = new StaffApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "用户统计";
        await this.initComponents();
    }

    /**
     * 初始化控件
     */
    private async initComponents() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

        this.dxChart1 = this.getDxInstanceByKey("DxChartHtml");
        let cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "src_channel",
                caption: "渠道类型",
                width: 80
            },
            {
                dataField: "product_type",
                caption: "产品类型",
                width: 160,
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
                dataField: "os_type",
                caption: "设备类型",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.client_os_type,
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
                dataField: "group_name",
                caption: "用户组",
                width: 160
            },
            {
                dataField: "package_name",
                caption: "所属套餐",
                width: 160
            },
            {
                dataField: "user_num",
                caption: "用户量",
                width: 120
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
            width: 1000,
            pager: {
                visible: false
            },
            paging: {
                enabled: false
            },
            summary: {
                totalItems: [
                    {
                        column: "user_num",
                        summaryType: "sum",
                        customizeText: sender => {
                            return "用户总量:" + sender.value;
                        }
                    }
                ]
            }
        });

        this.dxDataGrid1.option(options);

        this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        this.dxSearchForm1.option({
            width: 800,
            colCount: 4,
            items: [
                {
                    label: {
                        text: "时间范围"
                    },
                    dataField: "time_range",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "选择时间",
                        displayExpr: "title",
                        valueExpr: "id",
                        dataSource: [
                            // {
                            //     id: 1,
                            //     title: "今天"
                            // },
                            {
                                id: 2,
                                title: "昨天"
                            },
                            {
                                id: 3,
                                title: "前天"
                            },
                            {
                                id: 4,
                                title: "本周"
                            },
                            {
                                id: 5,
                                title: "上周"
                            },
                            {
                                id: 6,
                                title: "上上周"
                            },
                            {
                                id: 7,
                                title: "本月"
                            },
                            {
                                id: 8,
                                title: "上月"
                            },
                            {
                                id: 9,
                                title: "上上月"
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
                }, {
                    label: {
                        text: "是否付费"
                    },
                    dataField: "is_pay",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "选择用户类别",
                        displayExpr: 'title',
                        valueExpr: "id",
                        dataSource: [
                            {
                                id: 0,
                                title: "全部用户"
                            },
                            {
                                id: 1,
                                title: "付费用户"
                            }
                        ],
                        value: 0,
                        //width: 100,
                        onValueChanged: sender => {
                            // let val = sender.value;
                            // let dx_is_pay = this.dxSearchForm1.getEditor(
                            //     "is_pay"
                            // ) as DevExpress.ui.dxDateBox;
                            //

                        }
                    }
                },
                {
                    itemType: "button",
                    horizontalAlignment: "left",
                    buttonOptions: {
                        text: "统计用户",
                        icon: "search",
                        type: "success",
                        onClick: async () => {
                            let formData = this.dxSearchForm1.option("formData") as {
                                time_range: number;
                                start_time: string;
                                end_time: string;
                                is_pay: number;
                            };
                            let endTime = DateTimeUtils.getNow("yyyy-MM-dd 00:00:00");
                            let startTime = "";
                            // let isPay=0;

                            let type = this.dxSearchForm1
                                .getEditor("time_range")
                                .option("value");
                            let is_pay = this.dxSearchForm1
                                .getEditor("is_pay")
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
                            await this.getDataList(
                                "&start_time=" + startTime + "&end_time=" + endTime + "&size=200" + "&is_pay=" + is_pay
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

        this.dxSearchForm2 = this.getDxInstanceByKey(this.dxFormKey2);
        this.dxSearchForm2.option({
            width: 800,
            colCount: 4,
            items: [
                {
                    label: {
                        text: "时间范围"
                    },
                    dataField: "time_range",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "选择时间",
                        displayExpr: "title",
                        valueExpr: "id",
                        dataSource: [
                            {
                                id: 4,
                                title: "近7天"
                            },
                            {
                                id: 7,
                                title: "近30天"
                            },
                            {
                                id: 8,
                                title: "上月"
                            },
                            {
                                id: -1,
                                title: "自定义"
                            }
                        ],
                        value: 4,
                        //width: 100,
                        onValueChanged: sender => {
                            let val = sender.value;
                            let dx_start_time = this.dxSearchForm2.getEditor(
                                "start_time"
                            ) as DevExpress.ui.dxDateBox;
                            let dx_end_time = this.dxSearchForm2.getEditor(
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
                        text: "查询",
                        icon: "search",
                        type: "success",
                        onClick: async () => {
                            let formData = this.dxSearchForm2.option("formData") as {
                                time_range: number;
                                start_time: string;
                                end_time: string;
                                is_pay: number;
                            };
                            let endTime = DateTimeUtils.getNow("yyyy-MM-dd 00:00:00");
                            let startTime = "";
                            // let isPay=0;

                            let type = this.dxSearchForm2
                                .getEditor("time_range")
                                .option("value");


                            switch (type) {

                                case 4:
                                    startTime = DateTimeUtils.AddTime(
                                        endTime,
                                        DateTimeEnum.Date,
                                        -3
                                    );
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
                            await this.getUserChartList(
                                "&start_time=" + startTime + "&end_time=" + endTime + "&size=200"
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
        let init_end_time = DateTimeUtils.getNow("yyyy-MM-dd 00:00:00");
        let init_start_time =  DateTimeUtils.AddTime(
            init_end_time,
            DateTimeEnum.Date,
            -7
        );;
        // 图表
        await this.getUserChartList("&start_time="+init_start_time+"&end_time="+init_end_time);
        this.dxChart1.option({
            palette: "Harmony Light",
            // dataSource: data,
            series: [
                {
                    argumentField: 'dateline',
                    valueField: 'user_num',
                    label: {
                        visible: true,
                        connector: {
                            visible: true,
                        },
                        position: "outside",
                    }

                }, {
                    argumentField: 'dateline',
                    valueField: 'pay_user_num',
                    label: {
                        visible: true,
                        connector: {
                            visible: false,
                        },
                        showForZeroValues: false,

                    }
                },

            ],
            argumentAxis: {
                visualRange: {
                    startValue: 300,
                    endValue: 500
                }
            },
            scrollBar: {
                visible: false
            },
            // zoomAndPan: {
            //     allowMouseWheel: true,
            //     allowTouchGestures: true,
            //     argumentAxis: "both",
            //     dragBoxStyle: {},
            //     dragToZoom: false,
            //     panKey: "shift",
            //     valueAxis: "none"
            // },
            legend: {
                visible: false
            },


        });
    }

    // 获取图表数据
    private async getUserChartList(strWhere: string) {

        let ds = await this.statisticsAPI.getUserChartList(strWhere);
        let data = ds.data;
        let ret = [];
        data.forEach((item, index) => {
            ret.push({
                'dateline': item.dateline,
                'user_num': item.user_num,
                'pay_user_num': item.pay_user_num,
            });
        })

        this.dxChart1.option({
            dataSource: ret
        });
        // return ret;
    }

    // private async getUserChartData(strWhere:string){
    //     let ds: any = await this.statisticsAPI.getUserList(strWhere);
    //     let aa = ds.data;
    //     this.dxDataGrid1.option({
    //         dataSource: aa
    //     });
    // }


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
        let myFormData: {
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
                formData: myFormData,
                items: item
            },
            {
                isAdd: false,
                hasReset: false
            },
            async (form, popup) => {
                let ds = this.dxDataGrid1.option("dataSource") as any[];
                if (!ds || ds.length == 0) {
                    this.alert("没有任何数据!");
                    return true;
                }

                let myFormData = form.option("formData") as {
                    super_password: string;
                };
                let pwd = md5(myFormData.super_password);
                let d = await this.staffApi.getStaffSupperPassword(pwd);
                if (d.code == RespCode.zero) {
                    let cc: {
                        渠道类型: string;
                        产品类型: string;
                        设备类型: string;
                        用户组: string;
                        所属套餐: string;
                        用户量: string;
                    }[] = [];
                    let cc_user_sum = 0;
                    for (const row of ds) {
                        cc.push({
                            渠道类型: row.src_channel,
                            产品类型: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.product_type,
                                row.product_type
                            ),
                            设备类型: CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.client_os_type,
                                row.os_type
                            ),
                            用户组: row.group_name,
                            所属套餐: row.package_name,
                            用户量: row.user_num
                        });
                        cc_user_sum += row.user_num;
                    }
                    cc.push({
                        渠道类型: "",
                        产品类型: "",
                        设备类型: "",
                        用户组: "",
                        所属套餐: "",
                        用户量: "用户总量:" + cc_user_sum.toString()
                    });
                    const data = cc;
                    const fileName = "export_user";
                    const exportType = "csv";
                    exportFromJSON({data, fileName, exportType});
                    return true;
                } else {
                    this.errorCodeMsg(d.code, d.msg);
                    return false;
                }
            }
        );
    }

    /**
     * 获取数据列表
     */
    private async getDataList(strWhere: string) {
        let ds: any = await this.statisticsAPI.getUserList(strWhere);
        let aa = ds.data;
        this.dxDataGrid1.option({
            dataSource: aa
        });
    }

}
