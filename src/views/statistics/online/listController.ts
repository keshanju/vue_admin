import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { LayoutApi } from "@/api/LayoutApi";
import { CommonUtils } from "@/common/CommonUtils";
import { StatisticsApi } from "@/api/StatisticsApi";
import { DateTimeUtils, DateTimeEnum } from "@/utils/DateTimeUtils";
import { Validation } from "@/common/Validation";
import { StatisticsOnlineUserLogModel } from "@/models/StatisticsModel";
import md5 from "js-md5";
import { StaffApi } from "@/api/StaffApi";
import { RespCode } from "@/common/RespCode";
import exportFromJSON from "export-from-json";

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
  private data_grid_ds: StatisticsOnlineUserLogModel[];
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "用户在线人数统计";
    this.initComponents();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      //   {
      //     dataField: "id",
      //     caption: "编号",
      //     width: 80
      //   },
      {
        dataField: "online_users",
        caption: "在线人数",
        width: 120
      },
      {
        dataField: "online_users_other",
        caption: "其他服务器在线人数",
        width: 160
      },
      //   {
      //     dataField: "bandwidth",
      //     caption: "带宽",
      //     width: 100
      //   },
      {
        dataField: "create_time",
        caption: "时间点",
        width: 160
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
              let dx_start_time: DevExpress.ui.dxDateBox = this.dxSearchForm1.getEditor(
                "start_time"
              );
              let dx_end_time: DevExpress.ui.dxDateBox = this.dxSearchForm1.getEditor(
                "end_time"
              );
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
          label: {
            text: "开始时间"
          },
          dataField: "start_time",
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
          label: {
            text: "结束时间"
          },
          dataField: "end_time",
          editorType: "dxDateBox",
          editorOptions: {
            disabled: true,
            type: "datetime",
            displayFormat: "yyyy-MM-dd 00:00:00",
            dateSerializationFormat: "yyyy-MM-dd 00:00:00"
          }
        },
        {
          colSpan: 1,
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "统计订单",
            icon: "search",
            type: "success",
            onClick: () => {
              let formData: {
                time_range: number;
                start_time: string;
                end_time: string;
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

              this.getDataList(startTime, endTime);
            }
          }
        }
      ]
    });
  }

  /**
   * 获取数据列表
   */
  private getDataList(start_time: string, end_time: string) {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) => {
        let aa = await new StatisticsApi().getUserOnlineLogList(
          start_time,
          end_time,
          pageIndex,
          pageSize
        );
        this.data_grid_ds = aa.data.list;
        return aa;
      }
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
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
        let ds = this.data_grid_ds;
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
            在线人数?: number;
            其他服务在线人数?: number;
            时间点?: string;
          }[] = [];
          for (const item of ds) {
            cc.push({
              在线人数: item.online_users,
              其他服务在线人数: item.online_users_other,
              时间点: item.create_time
            });
          }
          const data = cc;
          const fileName = "export_user_online";
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
