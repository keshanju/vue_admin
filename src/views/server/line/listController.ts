import { Component, Vue, Prop, Model } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import popup from "devextreme/ui/popup";
import dx_form from "devextreme/ui/form";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { LineApi } from "@/api/LineApi";
import { CommonUtils } from "@/common/CommonUtils";
import { Validation } from "@/common/Validation";
import { LineModel } from "@/models/LineModel";
import { RespCode } from "@/common/RespCode";
import { LineBindApi } from "@/api/LineBindApi";
import { LineBindModel } from "@/models/LineBindModel";
import * as lineBindModel from "@/models/LineBindModel";
import form from "devextreme/ui/form";
import { ConditionSearchEnum } from "@/common/ConditionSearch";
import line_limit_edit from "./line_limit_edit.vue";
/**
 * 线路列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    line_limit_edit
  }
})
export default class Home extends BaseVue {
  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private lineAPI = new LineApi();

  private dxFormData1: LineModel = { id: 0 };
  private dxFormBatMaintain1: DevExpress.ui.dxForm;

  private lineBindApi = new LineBindApi();

  private master_id = 0;
  private master_grid: DevExpress.ui.dxDataGrid;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "线路管理";
    this.initComponents();
    this.getDataList();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: "名称",
        width: 120
      },
      {
        dataField: "in_line_type",
        caption: "入口线路类型",
        width: 140,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.line_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "failover_line_title",
        caption: "备用线路",
        width: 120
      },
      {
        dataField: "fault_status",
        caption: "线路状态",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 1 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.line_fault_status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "bandwidth",
        caption: "带宽",
        width: 120
      },
      {
        dataField: "region_enter_title",
        caption: "线路入口",
        width: 80
      },
      {
        dataField: "region_exit_title",
        caption: "线路出口",
        width: 80
      },
      {
        dataField: "line_type",
        caption: "线路类型",
        width: 140,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.port_line_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "line_vip_level_title",
        caption: "线路等级",
        width: 120
      },
      {
        dataField: "provider",
        caption: "提供商",
        width: 120
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "line_layout_code",
        caption: "线路布局Code",
        width: 120
      },
      {
        visible: false,
        dataField: "fault_desc",
        caption: "故障描述",
        width: 180
      },
      {
        visible: false,
        dataField: "fault_staff_name",
        caption: "故障提交人",
        width: 80
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "fault_time",
        caption: "故障时间",
        width: 160
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "fault_resume_time",
        caption: "故障恢复时间",
        width: 160
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "fault_start_time",
        caption: "故障开始时间",
        width: 160
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "fault_end_time",
        caption: "故障结束时间",
        width: 160
      },
      {
        dataField: "fixed_delays",
        caption: "修订延迟",
        width: 120
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "game_server_ip",
        caption: "游戏区服测试IP",
        width: 120
      },
      {
        visible: false,
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        visible: false,
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: "操作",
        width: 260,
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
      this.redirect("/server/line/edit/" + sender.key.id);
    });
  }
  /**
   * 编辑
   * @param cellElement
   * @param option
   */
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aDel = this.getCreateLink("删除", async sender => {
      let a = await this.confirm("是否确定删除?");
      if (a) {
        let d = await this.lineAPI.setDelete(Number(option.value));
        if (
          d.code == RespCode.OK ||
          d.code == RespCode.isSame ||
          d.code == RespCode.isSameSaveData
        ) {
          this.toast(() => {
            this.dxDataGrid1.refresh();
          });
        } else {
          this.errorCodeMsg(d.code, d.msg);
        }
      }
    });

    let aChild = $(
      "<a href='javascript:void(0)' data=" + option.value + "> 子线路 </a>"
    );
    aChild.bind("click", async sender => {
      this.master_id = Number(option.value);
      this.master_grid = this.createPopDataList(
        {
          title: "绑定子线路"
        },
        {
          columns: [
            {
              dataField: "id",
              caption: "编号",
              width: 80
            },
            {
              dataField: "master_title",
              caption: "主线路",
              width: 140
            },
            {
              dataField: "slave_title",
              caption: "从线路",
              width: 140
            },
            {
              dataField: "key",
              caption: "别名",
              width: 120
            },
            {
              dataField: "create_time",
              caption: "创建时间",
              width: 160
            },
            {
              fixed: true,
              fixedPosition: "right",
              dataField: "id",
              alignment: "center",
              caption: "操作",
              width: 200,
              cellTemplate: (
                cellElement: DevExpress.core.dxElement,
                option: any
              ) => {
                let edit = $(
                  "<a href='javascript:void(0)' data='" +
                    option.value +
                    "'>编辑</a>"
                );
                edit.bind("click", async sender => {
                  let id = Number(option.value);
                  let d = await this.lineBindApi.getModel(id);
                  this.editLineBindFormEdit(d.data);
                });

                let del = $(
                  "<a href='javascript:void(0)' data='" +
                    option.value +
                    "'>删除</a>"
                );
                del.bind("click", async sender => {
                  let id = Number(option.value);
                  let d = await this.lineBindApi.setDelete(id);
                  this.master_grid.refresh();
                });

                $("<div>")
                  .append(edit)
                  .append(" | ")
                  .append(del)
                  .appendTo(cellElement);
              }
            }
          ]
        },
        sender => {
          let toolbarItems = sender.toolbarOptions.items;
          toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
              text: "添加",
              icon: "add",
              onClick: sender => {
                this.editLineBindFormEdit();
              }
            }
          });

          toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
              text: "刷新",
              icon: "refresh",
              onClick: sender => {
                this.master_grid.refresh();
              }
            }
          });

          //创建搜索工具条
          this.createSearchToolbars(
            toolbarItems,
            this.dxDataGrid1.option("columns"),
            () => {
              this.getLineBindDataList();
            }
          );
        }
      );
      this.getLineBindDataList();
    });

    let aEdit = this.getCreateLink("编辑", sender => {
      this.redirect("/server/line/edit/" + option.value);
    });

    let aBindNode = this.getCreateLink("服务器组", sender => {
      this.redirect("/server/line/node/edit/" + option.value);
    });

    let aMaintain = this.getCreateLink("维护", sender => {
      this.redirect("/server/line/maintain/" + option.value);
    });


    let aLineLimit = this.getCreateLink("限速", sender => {
        (this.$refs["line_limit_edit"] as any).Show(option.value);
    });


    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append(aBindNode)
      .append(" | ")
      .append(aChild)
      .append(" | ")
      .append(aMaintain)
      .append(" | ")
      .append(aDel)
      .append(" | ")
      .append(aLineLimit)
      .appendTo(cellElement);
  }

  private getLineBindDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.lineBindApi.getListPager(
          this.master_id,
          strWhere,
          pageSize,
          pageIndex
        )
    );
    this.master_grid.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  private async editLineBindFormEdit(
    model: LineBindModel = {
      id: 0,
      key: "tcp"
    }
  ) {
    let line_ds = await this.lineAPI.getList();
    if (model.id == 0) {
      model.slave_id = line_ds.data[0].id;
    }
    let items = this.createFormItems([
      {
        dataField: "slave_id",
        label: {
          text: "请选择子线路"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择子线路",
          dataSource: line_ds.data,
          displayExpr: "title",
          valueExpr: "id"
        },
        validationRules: [Validation.getRequired("子线路不能为空!")]
      },
      {
        dataField: "key",
        label: {
          text: "别名"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择或者输入一个别名,提示 kr,hk,tcp,download",
          //dataSource: ["kr", "hk", "tcp", "download"],
          acceptCustomValue: true,
          items: ["kr", "hk", "tcp", "download"]
        },
        validationRules: [Validation.getRequired("别名不能为空!")]
      }
    ]);
    let master_form = this.createPopForm(
      {
        title: "编辑从线路",
        maxHeight: 300,
        maxWidth: 500
      },
      {
        formData: model,
        items: items
      },
      {},
      async (form, popu) => {
        try {
          if (!this.validateForm(form)) {
            return;
          }
          let formData = form.option("formData") as LineBindModel;
          formData.account_token = this.token;

          let postData = this.joinFormParams(formData);
          let d: lineBindModel.Result;
          if (formData.id == RespCode.zero) {
            d = await this.lineBindApi.setAdd(this.master_id, postData);
          } else {
            d = await this.lineBindApi.setUpdate(formData.id, postData);
          }
          if (
            d.code != RespCode.OK &&
            d.code != RespCode.isSame &&
            d.code != RespCode.isSameSaveData
          ) {
            this.errorCodeMsg(d.code, d.msg);
            return false;
          } else {
            this.master_grid.refresh();
          }
        } catch (error) {
          this.error(error);
        }
        return true;
      }
    );
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
        text: "添加",
        icon: "add",
        onClick: this.onAddHandler
      }
    });

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
    this.createSearchToolbars(
      toolbarItems,
      this.dxDataGrid1.option("columns"),
      () => {
        this.getDataList();
      },
      "title",
      ConditionSearchEnum.contain
    );
  }

  /**
   * 搜索
   * @param e
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
   * 添加
   * @param e
   */
  private onAddHandler(sender) {
    this.redirect("/server/line/edit");
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.lineAPI.getListPager(strWhere, pageSize, pageIndex)
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
