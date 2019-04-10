import BaseVue from "@/common/BaseVue";
import DevExpress from "devextreme/bundles/dx.all";
import { UserApi } from "@/api/UserApi";
import { CommonUtils } from "@/common/CommonUtils";
import { UserDurationApi } from "@/api/UserDurationApi";
import { RespCode } from "@/common/RespCode";

export class UserDuration extends BaseVue {
  private user_id = 0;
  private db_id = "";
  private form: DevExpress.ui.dxForm;
  /**
   *
   */
  public create(user_id: number, db_id: string) {
    this.user_id = user_id;
    this.db_id = db_id;

    let items = this.createFormItems([
      {
        dataField: "reduce_time",
        label: {
          text: "所扣时长(分钟)"
        },
        editorOptions: {
          placeholder: "请输入所扣时长"
        }
      },
      {
        dataField: "invoice_money",
        label: {
          text: "退款金额(分)"
        },
        editorOptions: {
          placeholder: "请选输入退款金额"
        }
      }
    ]);

    this.form = this.createPopForm(
      { title: "用户部分退款", width: 500, height: 300 },
      {
        items: items
      },
      { hasReset: false },
      async (f, p) => {
        let formData = f.option("formData");
        let result = await new UserDurationApi().setUserDurationEdit(
          this.user_id,
          formData.reduce_time,
          formData.invoice_money
        );
        if (
          result.code == RespCode.OK ||
          result.code == RespCode.isSame ||
          result.code == RespCode.isSameSaveData
        ) {
          this.toast(() => {
            p.hide();
          });
        } else {
          this.errorCodeMsg(result.code, result.msg);
        }
        return false;
      }
    );

    // let cols = this.createDataGridColumns([
    //   {
    //     dataField: "reduce_time",
    //     caption: "所扣时长"
    //   },
    //   {
    //     dataField: "invoice_money",
    //     caption: "退款金额"
    //   }
    // ]);
    // this.grid = this.createPopDataList(
    //   {
    //     title: "用户操作日志"
    //   },
    //   {
    //     columns: cols
    //   },
    //   sender => {
    //     let toolbarItems = sender.toolbarOptions.items;
    //     toolbarItems.push({
    //       location: "before",
    //       widget: "dxButton",
    //       options: {
    //         text: "刷新",
    //         icon: "refush",
    //         onClick: async () => {
    //           this.grid.refresh();
    //         }
    //       }
    //     });
    //   }
    // );
    // this.getUserRefDataList();
    return this.form;
  }
}
