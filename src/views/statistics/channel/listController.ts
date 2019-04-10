import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import md5 from "js-md5";

import { LayoutApi } from "@/api/LayoutApi";
import { CommonUtils } from "@/common/CommonUtils";
import { DateTimeUtils, DateTimeEnum } from "@/utils/DateTimeUtils";
import { StatisticsApi } from "@/api/StatisticsApi";
import { Validation } from "@/common/Validation";
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
  private dxSearchForm1: DevExpress.ui.dxForm;
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private staffApi = new StaffApi();

  mounted() {
    this.setTitle("渠道统计");

    //查询表单
    this.dxSearchForm1 = this.getDxInstanceByKey("dxFormKey1");
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
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "登录统计",
            icon: "search",
            type: "success",
            onClick: async () => {
              let formData = this.dxSearchForm1.option("formData") as {
                time_range: number;
                start_time: string;
                end_time: string;
              };
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
                "&start_time=" + startTime + "&end_time=" + endTime
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

    //查询结果
    this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGridKey1");
    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "src_channel",
        caption: "渠道类型",
        width: 160
      },
      {
        dataField: "login_type",
        caption: "客户端类型",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.login_type,
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
        dataField: "login_num",
        caption: "登录次数",
        width: 160
      },
      {
        dataField: "active_user_num",
        caption: "激活人数",
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
      width: 800,
      pager: {
        visible: false
      },
      paging:{
        enabled:false
      },
    });

    this.dxDataGrid1.option(options);
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
        onClick: () => {
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
                  登录次数: string;
                  激活用户: string;
                }[] = [];
                let cc_user_sum = 0;
                for (const row of ds) {
                  cc.push({
                    渠道类型: row.src_channel,
                    登录次数: row.login_num,
                    激活用户: row.active_user_num
                  });
                  cc_user_sum += row.user_num;
                }
                // cc.push({
                //     产品类型: "",
                //     用户组: "",
                //     所属套餐: "",
                //     用户量: "用户总量:" + cc_user_sum.toString(),
                // });
                const data = cc;
                const fileName = "export_login_user";
                const exportType = "csv";
                exportFromJSON({ data, fileName, exportType });
                return true;
              } else {
                this.errorCodeMsg(d.code, d.msg);
                return false;
              }
            }
          );
        }
      }
    });
  }

  /**
   * 获取数据列表
   */
  private async getDataList(strWhere: string) {
    let ds = await new StatisticsApi().getChannelLogin(strWhere);
    let aa = ds.data;
    //增加汇总
    this.dxDataGrid1.option({
      dataSource: aa
    });
  }
}
