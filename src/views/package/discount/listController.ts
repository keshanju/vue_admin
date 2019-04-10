import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { DiscountApi } from "@/api/DiscountApi";
import { DiscountModel } from "@/models/DiscountModel";
import { CommonUtils } from "@/common/CommonUtils";
import { Validation } from "@/common/Validation";
import { BaseModel } from "@/models/BaseModel";
import { RespCode } from "@/common/RespCode";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import MyEdit from "./edit.vue";

/**
 * 套餐日志列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    MyEdit
  }
})
export default class Home extends BaseVue {
  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private packageOpLogApi = new DiscountApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "折扣码管理";
    this.initComponent();
    this.getDataList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "id",
        caption: "编号",
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: "名称",
        width: 120
      },
      {
        dataField: "code",
        caption: "折扣码",
        width: 100
      },
      {
        dataField: "type",
        caption: "折扣类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.discount_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "value",
        caption: "折扣值",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let type = option.key.type;
          let val = option.value;
          let type_value = "";
          if (type == 0) {
            type_value = val + "%";
          } else if (type == 1) {
            type_value = val + "分";
          }
          $("<span>")
            .append(type_value)
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "is_enable_expired_time",
        caption: "启动时间限制",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "begin_time",
        caption: "开始时间",
        width: 180
      },
      {
        dataField: "end_time",
        caption: "结束时间",
        width: 180
      },
      {
        dataField: "is_enable",
        caption: "启用状态",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_private",
        caption: "是否私有",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.flag,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 180
      },
      {
        dataField: "change_staff_name",
        caption: "修改人",
        width: 80
      },
      {
        dataField: "change_time",
        caption: "修改时间",
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
      columns: cols
    });

    this.dxDataGrid1.option(options);
  }

  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let edit = $("<a href='#' data=" + option.value + "> 编辑 </a>");
    edit.bind("click", async sender => {
      let id = $(sender.target).attr("data");
      let d = await this.packageOpLogApi.getModel(Number(id));
      this.formShow(Number(id), d.data);
    });

    let aDel = this.getCreateLink("删除", async sender => {
      let a = await this.confirm("是否确定删除?");
      if (a) {
        let d = await this.packageOpLogApi.setDelete(option.value);
        if (d && d.code == 0) this.dxDataGrid1.refresh();
        else this.alert("数据删除出错!");
      }
    });

    let $div = $("<div>");
    $div.append(edit);
    $div.append(" | ");
    $div.append(aDel);
    $div.appendTo(cellElement);
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
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });

    //创建搜索工具条
    this.createSearchToolbars(
      toolbarItems,
      this.dxDataGrid1.option("columns"),
      () => {
        this.getDataList();
      }
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
   * 数据列表
   */
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      if (strWhere != "") {
        if (strWhere.indexOf("|") > -1) {
          strWhere += "package_id__equal__" + this.ID;
        } else {
          strWhere += "|package_id__equal__" + this.ID;
        }
      } else {
        strWhere += "&search=package_id__equal__" + this.ID;
      }

      let d = await this.packageOpLogApi.getListPager(
        strWhere,
        pageSize,
        pageIndex
      );
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  //#region
  private onAddHandler() {
    // let dd = this.$refs["MyEdit"] as any;
    // dd.show({}, {
    //     title: "添加折扣码"
    // });

    let model: DiscountModel = {
      id: 0,
      type: 0,
      is_enable_expired_time: 0,
      is_enable: 1
    };
    this.formShow(0, model);
  }

  private formShow(id: number = 0, formData: any = {}) {
    let items = this.createFormItems([
      {
        dataField: "title",
        label: {
          text: "名称"
        },
        editorOptions: {
          placeholder: "请输入折扣码名称"
        },
        validationRules: [Validation.getRequired("折扣码名称不能为空")]
      },
      {
        dataField: "type",
        label: {
          text: "折扣类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请输入折扣类型",
          width: 150,
          dataSource: CommonUtils.getDictonary().data.discount_type,
          displayExpr: "name",
          valueExpr: "id",
          onValueChanged: sender => {
            let val = sender.value;
            if (val == 0) {
              form1.getEditor("value").option({
                min: 1,
                max: 100
              });
            } else {
              form1.getEditor("value").option({
                min: 1,
                max: 99999999
              });
            }
          }
        },
        validationRules: [Validation.getRequired("折扣类型不能为空")]
      },
      {
        dataField: "value",
        label: {
          text: "折扣值/金额(单位分)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder:
            "如果为打折请输入1~100之间的值,现金券请输入数值(单位分).",
          min: 1,
          //max: 100,
          width: 400
        },
        validationRules: [Validation.getRequired("(折扣值/金额)不能为空")]
      },
      {
        dataField: "is_enable_expired_time",
        label: {
          text: "时间限制"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择时间限制",
          dataSource: CommonUtils.getDictonary().data.status,
          displayExpr: "name",
          valueExpr: "id",
          onValueChanged: sender => {
            let val = sender.value;
            if (val == 0) {
              form1.getEditor("begin_time").option({
                disabled: true
              });
              form1.getEditor("end_time").option({
                disabled: true
              });
            } else if (val == 1) {
              form1.getEditor("begin_time").option({
                disabled: false
              });
              form1.getEditor("end_time").option({
                disabled: false
              });
            }
          },
          width: 150
        },
        validationRules: [Validation.getRequired("时间限制不能为空")]
      },
      {
        dataField: "begin_time",
        label: {
          text: "开始时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          placeholder: "请输入开始时间",
          disabled: true,
          type: "datetime",
          displayFormat: "yyyy-MM-dd HH:mm:ss",
          dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
          min: DateTimeUtils.getNow("yyyy-MM-dd 00:00:00"),
          onValueChanged: (e: any) => {
            // form1.getEditor('end_time').option({
            //     min: e.value,
            //     value: e.value
            // })
          }
        },
        validationRules: [Validation.getRequired("开始时间不能为空")]
      },
      {
        dataField: "end_time",
        label: {
          text: "结束时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          placeholder: "请输入结束时间",
          disabled: true,
          type: "datetime",
          displayFormat: "yyyy-MM-dd HH:mm:ss",
          dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
          min: DateTimeUtils.getNow("yyyy-MM-dd 00:00:00")
        },
        validationRules: [Validation.getRequired("结束时间不能为空")]
      },
      {
        dataField: "is_enable",
        label: {
          text: "是否启用"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请输入启用状态",
          dataSource: CommonUtils.getDictonary().data.status,
          displayExpr: "name",
          valueExpr: "id",
          width: 150
        },
        validationRules: [Validation.getRequired("启用状态不能为空")]
      },
      {
        dataField: "is_private",
        label: {
          text: "是否私有"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择私有状态",
          dataSource: CommonUtils.getDictonary().data.flag,
          displayExpr: "name",
          valueExpr: "id",
          width: 150
        },
        validationRules: [Validation.getRequired("私有状态不能为空")]
      },
      {
        dataField: "desc",
        label: {
          text: "备注"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入备注",
          height: 80
        },
        validationRules: [Validation.getRequired("备注不能为空")]
      }
    ]);
    let form1 = this.createPopForm(
      {
        width: 800,
        height: 600,
        title: id == 0 ? "添加折扣码" : "编辑折扣码"
      },
      {
        formData: formData,
        items: items
      },
      {},
      async (form, popup) => {
        try {
          let formData = form.option("formData") as DiscountModel;

          console.log(formData);
          formData.account_token = this.token;
          if (formData.is_enable_expired_time == 0) {
            formData.begin_time = "";
            formData.end_time = "";
          }
          // for (const key in formData) {
          //     console.log(key,formData[key]);
          // }
          // return false;
          let result: BaseModel;
          if (formData.id == 0)
            result = await this.packageOpLogApi.setAdd(formData);
          else
            result = await this.packageOpLogApi.setUpdate(
              formData.id,
              formData
            );
          if (result && result.code == RespCode.zero) {
            this.toast(() => {
              this.dxDataGrid1.refresh();
            });
            return true;
          } else {
            this.errorCodeMsg(result.code, result.msg);
          }
        } catch (error) {
          this.error(error);
        }
      }
    );

    if (
      formData.is_enable_expired_time &&
      formData.is_enable_expired_time == 1
    ) {
      let val = formData.is_enable_expired_time;
      if (val == 0) {
        form1.getEditor("begin_time").option({
          disabled: true
        });
        form1.getEditor("end_time").option({
          disabled: true
        });
      } else if (val == 1) {
        form1.getEditor("begin_time").option({
          disabled: false
        });
        form1.getEditor("end_time").option({
          disabled: false
        });
      }
    }
  }
  //#endregion
}
