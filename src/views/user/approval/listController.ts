import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { CommonUtils } from "@/common/CommonUtils";
import { ApprovalApi } from "@/api/ApprovalApi";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 审核列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private approvalAPI = new ApprovalApi();

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "退款审批";
    this.initComponents();
    await this.getDataList();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
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
        dataField: "state",
        caption: "审核状态",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = "";
          if (option.value == -1 || option.value == -2) {
            color = "red";
          } else {
            color = "green";
          }
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.approval_state,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "first_approval_staff_name",
        caption: "初步审核人",
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "first_approval_time",
        caption: "初步审核时间",
        width: 160
      },
      {
        dataField: "first_approval_desc",
        caption: "初步审核描述",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "confirm_approval_staff_name",
        caption: "确认审核人",
        width: 120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "confirm_approval_time",
        caption: "确认审核时间",
        width: 160
      },
      {
        dataField: "confirm_approval_desc",
        caption: "确认审核描述",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "refund_staff_name",
        caption: "退款人",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "refund_time",
        caption: "退款时间",
        width: 160
      },
      {
        dataField: "refund_desc",
        caption: "退款描述",
        width: 180
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: "操作",
        width: 200,
        cellTemplate: this.CellEdit
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick: this.onRowClickHandler
    });

    this.dxDataGrid1.option(options);
  }
  /**
   * 双击编辑
   * @param e
   */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/user/approval/edit/" + sender.key.id);
    });
  }
  /**
   * 编辑
   * @param cellElement
   * @param option
   */
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let showText = "需审核";
    switch (option.key.state) {
      case 0:
        showText = "需审核";
        break;
      case 1:
        showText = "初级审核";
        break;
      case 2:
        showText = "最终审核";
        break;
      case 3:
        showText = "查看详细";
        break;
    }

    let aEdit = this.getCreateLink(showText, sender => {
      this.redirect("/user/approval/edit/" + option.value);
    });

    if (option.key.state != -1 && option.key.state != -2) {
      $("<div>")
        .append(aEdit)
        .appendTo(cellElement);
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
        text: "刷新",
        icon: "refresh",
        onClick: this.onRefreshHandler
      }
    });

    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //     this.getDataList();
    // });
  }

  /**
   * 搜索
   * @param e
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.approvalAPI.getListPager(strWhere, pageSize, pageIndex)
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  private onSearch(dic, user_id, db_num) {
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getDataList();
  }
}
