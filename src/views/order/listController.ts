import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView, DxFileUploader } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import popup from "devextreme/ui/popup";
import dx_form from "devextreme/ui/form";

import { InvoiceModel } from "@/models/InvoiceModel";
import { InvoiceApi } from "@/api/InvoiceApi";
import { CommonUtils } from "@/common/CommonUtils";
import { Validation } from "@/common/Validation";
import { UserApi } from "@/api/UserApi";
import { DateTimeUtils, DateTimeEnum } from "@/utils/DateTimeUtils";
import { SearchFormModel } from "@/models/SearchModel";
import Enumerable from "linq";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
import { ConditionSearchEnum } from "@/common/ConditionSearch";
import OrderErrorList from "./error/errorlist.vue";
/**
 * 订单列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    dxUserSearchForm,
    OrderErrorList
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxForm1: DevExpress.ui.dxForm;
  private dxFormSearchOrder1: DevExpress.ui.dxForm;

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  private invoiceApi = new InvoiceApi();
  private db_num: string = "1";
  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };

  /**
   * 入口
   */
  protected mounted() {
    (this.$parent as any).content_title = "订单管理";
    this.initComponent();
    //this.getPagerList();
  }

  // 初始化组件
  private initComponent() {
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
        dataField: "invoice_no",
        caption: "订单号",
        width: 200
      },
      {
        dataField: "user_mobile_num",
        caption: "手机号",
        width: 150,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let $span = $("<span>");
          if (option.value && option.value.toString() != "") {
            if (
              option.data.country_code &&
              option.data.country_code.toString() != ""
            ) {
              $span.append("(+" + option.data.country_code + ")");
            }
          }
          $span.append(option.value);
          $span.appendTo(cellElement);
        }
      },
      {
        dataField: "user_mail",
        caption: "邮箱",
        width: 150
      },
      {
        dataField: "user_name",
        caption: "账号",
        width: 100
      },
      {
        dataField: "user_nickname",
        caption: "昵称",
        width: 100
      },
      {
        dataField: "invoice_from",
        caption: "订单来源",
        width: 100,
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
      // {
      //   dataField: "oem_type",
      //   caption: "OEM类型",
      //   width: 80,
      //   cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      //     $("<span>")
      //       .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.user_oem_type, option.value))
      //       .appendTo(cellElement);
      //   },
      // },
      {
        dataField: "invoice_type",
        caption: "订单类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.invoice_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "status",
        caption: "订单状态",
        width: 60,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = "";
          switch (option.value) {
            case 0:
            case 2:
            case 4:
            case 5:
              color = "red";
              break;
            case 1:
              color = "green";
              break;
          }
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.invoice_status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "money_type",
        caption: "货币类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.price_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "money",
        caption: "金额(分)",
        width: 80
      },
      {
        dataField: "num",
        caption: "数量",
        width: 60
      },
      {
        dataField: "package_name",
        caption: "套餐",
        width: 100
      },
      {
        dataField: "package_version",
        caption: "套餐版本",
        width: 140
      },
      {
        dataField: "payment_type",
        caption: "支付方式",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = "";
          switch (option.value) {
            case 0:
              color = "red";
              break;
          }
          let $span = $("<span style='color:" + color + "'>")
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
        dataField: "transaction_status",
        caption: "支付状态",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.invoice_transaction_status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "transaction_time",
        caption: "交易时间",
        width: 160
      },
      {
        dataField: "process_type",
        caption: "处理方式",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.invoice_process_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "process_time",
        caption: "处理时间",
        width: 160
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "cancel_desc",
        caption: "取消说明",
        width: 170
      },
      {
        dataField: "lcid",
        caption: "LCID",
        width: 170
      },
      {
        dataField: "card_type",
        caption: "卡类型(类别)",
        width: 170
      },

      {
        dataField: "paycard_id",
        caption: "支付卡ID",
        width: 170
      },
      {
        dataField: "process_staff_id",
        caption: "处理人",
        width: 170
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "transaction_no",
        caption: "交易号",
        width: 170
      },
      {
        dataField: "transaction_desc",
        caption: "交易说明",
        width: 300
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
      columns: cols
    });

    this.dxDataGrid1.option(options);

    //搜索订单
    this.dxFormSearchOrder1 = this.getDxInstanceByKey("dxFormSearchOrder1");
    let items = this.createFormItems([
      {
        colSpan: 4,
        dataField: "order_no",
        label: {
          text: "订单号查询"
        },
        editorOptions: {
          placeholder: "请输入订单号查询查询"
        },
        validationRules: [Validation.getRequired("订单号查询不能为空!")]
      },
      {
        colSpan: 1,
        itemType: "button",
        horizontalAlignment: "center",
        buttonOptions: {
          text: "搜索订单",
          type: "success",
          onClick: () => {
            let aa = this.dxFormSearchOrder1.option("formData");
            this.getListPager_invoice(aa.order_no);
          }
        }
      }
    ]);
    this.dxFormSearchOrder1.option({
      colCount: 12,
      items: items
    });
  }

  /**
   * 获取订单列表
   * @param ss
   */
  private async getListPager_invoice(ss: string) {
    try {
      let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
        let d = await this.invoiceApi.getListPager_invoice(
          ss,
          pageSize,
          pageIndex
        );
        if (d.code != 0) {
          this.errorCodeMsg(d.code, d.msg);
          return {};
        }
        return d;
      });
      this.dxDataGrid1.option({
        remoteOperations: true,
        dataSource: ds
      });
    } catch (error) {
      this.error(error);
    }
  }
  /**
   * 编辑
   * @param container
   * @param option
   */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    if (option.key.status == 0) {
      let now = DateTimeUtils.getNow();
      let create_now = DateTimeUtils.AddTime(
        option.key.create_time,
        DateTimeEnum.Minute,
        30
      );

      let diff =
        DateTimeUtils.parserDate(create_now).getTime() -
        DateTimeUtils.parserDate(now).getTime();

      let aCancel = this.getCreateLink("取消订单", sender => {
        this.redirect("/order/" + this.db_num + "/cancel/edit/" + option.value);
      });

      if (diff < 0) {
        $("<span>")
          .append("<span style='color:red'>超时取消</span>")
          .appendTo(cellElement);
      } else {
        $("<span>")
          .append(aCancel)
          .appendTo(cellElement);
      }
    }
  }
  /**
   * 初始化工具条
   * @param e
   */
  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent;
    element?: DevExpress.core.dxElement;
    model?: any;
    toolbarOptions?: DevExpress.ui.dxToolbarOptions;
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

    //分库
    toolbarItems.push({
      location: "before",
      widget: "dxSelectBox",
      options: {
        placeholder: "选择一个分库查询",
        displayExpr: "name",
        valueExpr: "id",
        dataSource: CommonUtils.getDictonary().data.user_db_type,
        onValueChanged: sender => {
          //this.setSearchKeywords("");
          this.db_num = sender.value;
          //this.getPagerList();
        }
      }
    });
    let cols: DevExpress.ui.dxDataGridColumn[] = this.dxDataGrid1.option(
      "columns"
    );
    let cc = Enumerable.from(cols).where(p => p.dataField == "invoice_no");
    //创建搜索工具条
    this.createSearchToolbars(
      toolbarItems,
      //this.dxDataGrid1.option("columns"),
      cc.toArray(),
      () => {
        this.getPagerList();
      },
      "invoice_no",
      ConditionSearchEnum.equal
    );

    toolbarItems.push({
      location: "after",
      widget: "dxButton",
      options: {
        icon: "find",
        text: "查询订单错误日志",
        type:'danger',
        onClick: () => {
          (this.$refs["order_error_list"] as any).show(true);
        }
      }
    });
  }

  /**
   * 搜索订单
   */
  private async orderSearchHandler() {
    if (!this.validateForm(this.dxForm1)) {
      return;
    }
    //this.dxDataGrid1.clearFilter();
    let type = this.mySearchFormModel.type;
    let title = this.mySearchFormModel.title;
    let strWhere = "";
    switch (type) {
      case 0:
        strWhere = "&search=mobile_num__equal__" + title;
        break;
      case 1:
        strWhere = "&search=user_name__equal__" + title;
        break;
      case 2:
        strWhere = "&search=mail__equal__" + title;
        break;
    }
    let userApi = new UserApi();
    let userData = await userApi.UserListPager(strWhere);
    if (
      userData.data == null ||
      userData.data.list == null ||
      userData.data.list.length == 0 ||
      userData.data.list.length > 1
    ) {
      this.alert("没有查询到用户信息");
      return;
    }
    let userInfo = userData.data.list[0];
    this.db_num = userInfo.database_num.toString();
    this.setSearchKeywords("&search=user_id__equal__" + userInfo.id);
    //this.dxDataGrid1.refresh();
    this.getPagerList();
  }

  /**
   * 刷新
   * @param sender
   */
  private onRefreshHandler(sender) {
    //this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  /**
   * 数据列表
   */
  private getPagerList() {
    try {
      let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
        //查询老订单数据
        //TODO:查询不到数据 需要到其他的分库查询  固定几个值 101 102 103 104 105 106
        let a = [101, 102, 103, 104, 105, 106];
        let d = await this.invoiceApi.getListPager(
          this.db_num,
          strWhere,
          pageSize,
          pageIndex
        );
        if (d.code == 0) {
          // if (d.data.list && d.data.list.length == 0) {
          //   let model = Enumerable.from(a).firstOrDefault(
          //     p => p == Number(this.dbNum)
          //   );
          //   if (model) {
          //     let aa = Enumerable.from(a).where(p => p != Number(this.dbNum));
          //     let ss = d;
          //     for (const row of aa.toArray()) {
          //       try {
          //         let dd = await this.invoiceApi.getListPager(
          //           row.toString(),
          //           strWhere,
          //           pageSize,
          //           pageIndex
          //         );
          //         if (dd.code == 0 && d.data.list && d.data.list.length > 0) {
          //           ss = dd;
          //           break;
          //         }
          //       } catch (error) {
          //         continue;
          //       }
          //     }
          //     return ss;
          //   }
          //   return d;
          // }
          return d;
        } else {
          this.errorCodeMsg(d.code, d.msg);
        }
      });
      this.dxDataGrid1.option({
        remoteOperations: true,
        dataSource: ds
      });
    } catch (error) {
      this.error(error);
    }
  }

  private onSearch(dic, user_id, db_num) {
    this.db_num = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getPagerList();
  }
}
