import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { LayoutApi } from "@/api/LayoutApi";
import { CommonUtils } from "@/common/CommonUtils";
import { StatisticsApi } from "@/api/StatisticsApi";
import { DateTimeUtils, DateTimeEnum } from "@/utils/DateTimeUtils";
import exportFromJSON from "export-from-json";
import { StatisticsSpeedLogModel } from "@/models/StatisticsModel";
import { Validation } from "@/common/Validation";
import md5 from "js-md5";
import { StaffApi } from "@/api/StaffApi";
import { RespCode } from "@/common/RespCode";

/**
 * 布局列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;

  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private layoutAPI = new LayoutApi();

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "加速时长统计";
    this.initComponents();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "region_code",
        caption: "区域",
        width: 80,
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
        dataField: "os_type",
        caption: "设备类型",
        width: 120,
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
        dataField: "speed_num",
        caption: "加速次数",
        width: 120
      },
      {
        dataField: "user_num",
        caption: "加速用户",
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
      pager: {
        visible: false
      },
      summary: {
        totalItems: [
          {
            column: "speed_num",
            summaryType: "sum",
            displayFormat: "总次数:{0}"
          },
          {
            column: "user_num",
            summaryType: "sum",
            displayFormat: "总人数:{0}"
          }
        ]
      }
    });

    this.dxDataGrid1.option(options);

    this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    this.dxSearchForm1.option({
      colCount: 12,
      items: [
        {
          colSpan: 2,
          label: {
            text: "选择时间"
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
                dx_start_time.option({ disabled: false });
                dx_end_time.option({ disabled: false });
              } else {
                dx_start_time.option({ disabled: true });
                dx_end_time.option({ disabled: true });
              }
            }
          }
        },
        {
          colSpan: 2,
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
          colSpan: 2,
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
        },
        {
          colSpan: 2,
          dataField: "mini_minitues",
          label: {
            text: "最小范围(秒)"
          },
          editorType: "dxTextBox",
          editorOptions: {
            placeholder: "请输入数字,可以为空."
          }
        },
        {
          colSpan: 2,
          dataField: "max_minitus",
          label: {
            text: "最大范围(秒)"
          },
          editorType: "dxTextBox",
          editorOptions: {
            placeholder: "请输入数字,可以为空."
          }
        },
        {
          colSpan: 1,
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "统计",
            icon: "search",
            type: "success",
            onClick: () => {
              let formData: {
                time_range: number;
                start_time: string;
                end_time: string;
                mini_minitues: string;
                max_minitus: string;
              } = this.dxSearchForm1.option("formData");

              let startTime = "",
                endTime = "";
              switch (formData.time_range) {
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
                case -1:
                  {
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
                startTime,
                endTime,
                formData.mini_minitues,
                formData.max_minitus
              );
            }
          }
        }
      ]
    });
  }

  /**
   * 获取数据列表
   */
  private async getDataList(
    start_time: string,
    end_time: string,
    start_speed_time: string,
    end_speed_time: string
  ) {
    let d = await new StatisticsApi().getSpeedLogList(
      start_time,
      end_time,
      start_speed_time,
      end_speed_time
    );
    this.dxDataGrid1.option({
      dataSource: d.data
    });

    // let ds: any = this.getDataGridPager(
    //   async (strWhere, pageSize, pageIndex) =>
    //     await new StatisticsApi().getSpeedLogList(
    //       start_time,
    //       end_time,
    //       start_speed_time,
    //       end_speed_time
    //     )
    // );
    // this.dxDataGrid1.option({
    //   remoteOperations: true,
    //   dataSource: ds
    // });
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
        ) as StatisticsSpeedLogModel[];
        if (!ds || ds.length == 0) {
          this.alert("没有任何数据!");
          return true;
        }

        let formData = form.option("formData") as {
          super_password: string;
        };
        let pwd = md5(formData.super_password);
        let d = await new StaffApi().getStaffSupperPassword(pwd);
        if (d.code == RespCode.zero) {
          let cc: {
            区域?: string;
            设备类型?: string;
            加速次数?: string;
            加速用户?: string;
          }[] = [];
          let cc_speed_sum = 0;
          let cc_user_sum = 0;
          for (const item of ds) {
            cc.push({
              区域: CommonUtils.getDicText(
                CommonUtils.getDictonary().data.region_code,
                item.region_code
              ),
              设备类型: CommonUtils.getDicText(
                CommonUtils.getDictonary().data.client_os_type,
                item.os_type
              ),
              加速次数: item.speed_num.toString(),
              加速用户: item.user_num.toString()
            });
            cc_speed_sum += item.speed_num;
            cc_user_sum += item.user_num;
          }
          cc.push({
            区域: "",
            设备类型: "",
            加速次数: "总加速次数:" + cc_speed_sum.toString(),
            加速用户: "总人数:" + cc_user_sum.toString()
          });
          const data = cc;
          const fileName = "export_speed";
          const exportType = "csv";
          exportFromJSON({ data, fileName, exportType });
        } else {
          this.errorCodeMsg(d.code, d.msg);
          return false;
        }
        return true;
      }
    );
  }
}
