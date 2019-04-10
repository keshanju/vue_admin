import BaseVue from "@/common/BaseVue";
import DevExpress from "devextreme/bundles/dx.all";
import { UserApi } from "@/api/UserApi";
import { CommonUtils } from '@/common/CommonUtils';

export class UserOpLogs extends BaseVue {
  private user_id = 0;
  private db_id = "";
  private grid: DevExpress.ui.dxDataGrid;
  /**
   *
   */
  public create(user_id: number, db_id: string) {
    this.user_id = user_id;
    this.db_id = db_id;
    let cols = this.createDataGridColumns([
      {
        dataField: "user_mobile_num",
        caption: "手机号",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let val = `(+${option.data.country_code})${option.value}`;
          $("<span>")
            .append(val)
            .appendTo(cellElement);
        }
      },
      {
        dataField: "user_mail",
        caption: "邮箱"
      },
      {
        dataField: "user_name",
        caption: "账号"
      },
      {
        dataField: "action_type",
        caption: "操作类型",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let val = CommonUtils.getDicText(
            CommonUtils.getDictonary().data.public_user_operate_type,
            option.value
          );
          $("<span>")
            .append(val)
            .appendTo(cellElement);
        }
      },
      {
        dataField: "subject",
        caption: "主题"
      },
      {
        dataField: "content",
        caption: "内容"
      },
      {
        dataField: "create_time",
        caption: "操作时间"
      }
    ]);
    this.grid = this.createPopDataList(
      {
        title: "用户操作日志"
      },
      {
        columns: cols
      },
      sender => {
        let toolbarItems = sender.toolbarOptions.items;
        toolbarItems.push({
          location: "before",
          widget: "dxButton",
          options: {
            text: "刷新",
            icon: "refush",
            onClick: async () => {
              this.grid.refresh();
            }
          }
        });
      }
    );
    this.getUserRefDataList();
    return this.grid;
  }

  private getUserRefDataList() {
    let ds = this.getDataGridPager(
      async (strWhere: string, pageSize: number, pageIndex: number) => {
        let d = await new UserApi().getUserOpLogsListPager(
          this.user_id,
          this.db_id,
          strWhere,
          pageSize,
          pageIndex
        );
        return d;
      }
    );
    this.grid.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
