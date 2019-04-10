import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { ServerApi } from "@/api/ServerApi";
import { CommonUtils } from "@/common/CommonUtils";
import { ServerModel, Result } from "@/models/ServerModel";
import { Validation } from "@/common/Validation";
import { RespCode } from "@/common/RespCode";
import { ConditionSearchEnum } from "@/common/ConditionSearch";
import server_node_error from "@/views/server/node_error/node_error.vue";
/**
 * 服务器列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    server_node_error
  }
})
export default class Home extends BaseVue {
  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private serverAPI = new ServerApi();
  //默认表单
  private dxFormData1: ServerModel = {};
  //修改表单
  private dxFormDataReset2: ServerModel = {
    id: 0,
    is_valid: 1,
    is_online: 1,
    online_users: 0,
    server_type: 0,
    s5_port: 443,
    s5_end_port: 443,
    s5_mobile_port: 1443,
    s5_mobile_end_port: 1443,
    lan_delay: 0,
    lan_loss: 0,
    online_max_users: 1000,
    ikv2_connect_port: 0,
    ikv2_transfer_port: 0,
    pptp_port: 0,
    l2tp_port: 0,
    is_auto_latitude: 0,
    latitude: "0",
    longitude: "0",
    isp: ""
  };

  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "服务器管理";
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
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "server",
        caption: "主机/IP",
        width: 120
      },
      {
        dataField: "title",
        caption: "标题",
        width: 120
      },
      {
        dataField: "is_valid",
        caption: "是否有效",
        cellTemplate: (cellElement, option) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.flag,
                option.value
              )
            )
            .appendTo(cellElement);
        },
        width: 80
      },
      {
        dataField: "desc",
        caption: "备注",
        width: 100
      },
      {
        dataField: "online_users",
        caption: "在线人数",
        width: 100
      },
      {
        dataField: "online_max_users",
        caption: "最大允许人数",
        width: 120
      },
      {
        dataField: "server_type",
        caption: "服务器类型",
        width: 100,
        cellTemplate: (cellElement, option) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.server_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "s5_port",
        caption: "服务端口",
        width: 120
      },
      {
        dataField: "s5_end_port",
        caption: "s5出端口",
        width: 120
      },
      {
        dataField: "lan_delay",
        caption: "专线延迟",
        width: 120
      },
      {
        dataField: "lan_loss",
        caption: "内网丢包率",
        width: 120
      },
      {
        dataField: "s5_mobile_port",
        caption: "移动端端口",
        width: 120
      },
      {
        dataField: "s5_mobile_end_port",
        caption: "s5移动版出端口",
        width: 120
      },
      {
        dataField: "is_online",
        caption: "是否可用于分配",
        width: 120,
        cellTemplate: (cellElement, option) => {
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
        dataField: "ikv2_connect_port",
        caption: "建立连接端口",
        width: 120
      },
      {
        dataField: "ikv2_transfer_port",
        caption: "数据传输端口",
        width: 120
      },
      {
        dataField: "pptp_port",
        caption: "PPTP端口",
        width: 120
      },
      {
        dataField: "l2tp_port",
        caption: "L2TP端口",
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
        visible: false,
        dataField: "change_time",
        caption: "修改时间",
        width: 160
      },
      {
        visible: false,
        dataField: "change_staff_name",
        caption: "修改人",
        width: 80
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
      onRowClick: this.onRowClickHandler,
      export: {
        enabled: true
      },
      selection: {
        mode: "multiple",
        selectAllMode: "page",
        showCheckBoxesMode: "always"
      }
    });

    this.dxDataGrid1.option(options);
  }

  /**
   * 双击编辑
   * @param e
   */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/server/edit/" + sender.key.id);
    });
  }

  /**
   * 编辑
   * @param cellElement
   * @param option
   */
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let edit = $("<a data='" + option.value + "'>编辑</a>");
    edit.bind("click", async sender => {
      let id = Number($(sender.target).attr("data"));
      let d = await this.serverAPI.getModel(id);
      let model = d.data;
      model.match_groups = (model.match_groups + "").trim();

      this.showEditForm(model);
    });

    let aDel = this.getCreateLink("删除", async sender => {
      let a = await this.confirm("是否确定删除?");
      if (a) {
        let d = await this.serverAPI.setDelete(Number(option.value));
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

    $("<div>")
      .append(edit)
      .append(" | ")
      .append(aDel)
      .appendTo(cellElement);
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
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "添加",
        icon: "add",
        onClick: sender => {
          this.showEditForm(this.dxFormDataReset2);
        }
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

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "批量更新状态",
        icon: "refresh",
        onClick: this.onBatUpdateServerStatus
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "服务器人数更新",
        icon: "edit",
        onClick: async () => {
          let d = await new ServerApi().setUpdateServerOnline();
          if (d.code == RespCode.zero) {
            this.alert("重置成功!");
            this.dxDataGrid1.refresh();
          } else {
            this.alert(d.msg);
          }
        }
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "加速服务器错误",
        icon: "rowfield",
        type:"danger",
        onClick: async () => {
            (this.$refs["server_node_error"] as any).Show();
        }
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
   * 显示编辑表单
   * @param model
   */
  private showEditForm(model: ServerModel = { id: 0, match_groups: "" }) {
    let ds_server_group = [
      {
        name: "0",
        id: 0
      },
      {
        name: "1",
        id: 1
      },
      {
        name: "2",
        id: 2
      },
      {
        name: "3",
        id: 3
      },
      {
        name: "4",
        id: 4
      },
      {
        name: "5",
        id: 5
      },
      {
        name: "6",
        id: 6
      },
      {
        name: "7",
        id: 7
      },
      {
        name: "8",
        id: 8
      },
      {
        name: "9",
        id: 9
      }
    ];
    let items = this.createFormItems([
      {
        itemType: "group",
        colCount: 2,
        items: [
          {
            colSpan: 2,
            dataField: "title",
            label: {
              text: "服务器名称"
            },
            editorOptions: {
              placeholder: "请输入服务器名称"
            },
            validationRules: [Validation.getRequired("服务器名称不能为空!")]
          },
          {
            colSpan: 2,
            dataField: "server",
            label: {
              text: "服务器IP地址"
            },
            editorOptions: {
              placeholder: "请输入服务器IP地址"
            },
            validationRules: [
              Validation.getRequired("服务器ip地址不能为空!"),
              Validation.getIP("服务器IP地址不正确!")
            ]
          },
          {
            colSpan: 2,
            dataField: "match_groups_arr",
            label: {
              text: "服务器组"
            },
            editorType: "dxTagBox",
            editorOptions: {
              placeholder: "请选择服务器组信息!,为空作为所有.",
              displayExpr: "name",
              valueExpr: "id",
              showSelectionControls: true,
              applyValueMode: "useButtons",
              dataSource: ds_server_group,
              onValueChanged: sender => {
                let value: number[] = sender.value;
                if (value != null && value.length > 0) {
                  model.match_groups = value.join(",");
                } else {
                  model.match_groups = "";
                }
              }
            },
            validationRules: []
          },
          {
            colSpan: 1,
            dataField: "is_valid",
            label: {
              text: "服务器是否有效"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.valid
            },
            validationRules: [Validation.getRequired("请选择服务器是否有效!")]
          },
          {
            colSpan: 1,
            dataField: "online_max_users",
            label: {
              text: "服务器最大允许在线人数"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("服务器最大允许在线人数")]
          },
          {
            colSpan: 1,
            dataField: "server_type",
            label: {
              text: "服务器类型"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.server_type
            },
            validationRules: [Validation.getRequired("请选择服务器类型")]
          },
          {
            colSpan: 1,
            dataField: "is_online",
            label: {
              text: "是否可用于分配"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.flag
            },
            validationRules: [Validation.getRequired("请选择是否可用于分配")]
          },
          {
            colSpan: 1,
            dataField: "s5_port",
            label: {
              text: "服务端口"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("服务端口不能为空!")]
          },
          {
            colSpan: 1,
            dataField: "s5_end_port",
            label: {
              text: "结束端口"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("s5出端口不能为空!")]
          },
          {
            colSpan: 1,
            dataField: "s5_mobile_port",
            label: {
              text: "移动端服务端口"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("移动端服务端口不能为空!")]
          },
          {
            colSpan: 1,
            dataField: "s5_mobile_end_port",
            label: {
              text: "结束端口"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [
              Validation.getRequired("移动端服务出端口不能为空!")
            ]
          },
          {
            colSpan: 1,
            dataField: "lan_delay",
            label: {
              text: "专线延迟(ms)"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("专线延迟不能为空")]
          },
          {
            colSpan: 1,
            dataField: "lan_loss",
            label: {
              text: "内网丢包率(%)"
            },
            editorOptions: {
              min: 0
            },
            validationRules: [Validation.getRequired("内网丢包率不能为空")]
          },
          {
            colSpan: 1,
            dataField: "ikv2_connect_port",
            label: {
              text: "连接端口"
            },
            editorOptions: {
              min: 0
            },
            validationRules: [
              //Validation.getRequired('内网丢包率不能为空')
            ]
          },
          {
            colSpan: 1,
            dataField: "ikv2_transfer_port",
            label: {
              text: "传输端口"
            },
            editorOptions: {
              min: 0
            },
            validationRules: [
              //Validation.getRequired('内网丢包率不能为空')
            ]
          },
          {
            colSpan: 1,
            dataField: "pptp_port",
            label: {
              text: "PPTP端口"
            },
            editorOptions: {
              min: 0
            },
            validationRules: [
              //Validation.getRequired('内网丢包率不能为空')
            ]
          },
          {
            colSpan: 1,
            dataField: "l2tp_port",
            label: {
              text: "L2TP端口"
            },
            editorOptions: {
              min: 0
            },
            validationRules: [
              //Validation.getRequired('内网丢包率不能为空')
            ]
          },
          {
            colSpan: 2,
            dataField: "l2tp_secret_key",
            label: {
              text: "共享秘钥"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入L2TP共享秘钥信息!",
              height: 60
            },
            validationRules: [
              // Validation.getRequired('内网丢包率不能为空')
            ]
          },
          {
            colSpan: 2,
            dataField: "desc",
            label: {
              text: "备注"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入备注信息!",
              height: 100
            },
            validationRules: []
          }
        ]
      }
    ]);

    if (model.id > 0) {
      let editItems = this.createFormItems([
        {
          itemType: "group",
          colCount: 2,
          items: [
            {
              dataField: "is_auto_latitude",
              label: {
                text: "是否重新设置经纬度和运营商"
              },
              editorType: "dxCheckBox",
              editorOptions: {
                placeholder: "请选择是否信息.",
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.flag,
                value: 0
              },
              validationRules: []
            },
            {
              dataField: "isp",
              label: {
                text: "运营商名称(isp)"
              },
              editorType: "dxTextBox",
              editorOptions: {
                placeholder: "请输入运营商名称(isp)."
                // displayExpr: 'name',
                // valueExpr: 'id',
                // dataSource: CommonUtils.getDictonary().data.line_type
              },
              validationRules: []
            },

            {
              dataField: "latitude",
              label: {
                text: "维度"
              },
              editorOptions: {
                placeholder: "请输入经度信息!"
              },
              validationRules: []
            },
            {
              dataField: "longitude",
              label: {
                text: "经度"
              },
              editorOptions: {
                placeholder: "请输入维度信息!"
              },
              validationRules: []
            }
          ]
        }
      ]);
      items = items.concat(editItems);
    }

    let form1 = this.createPopForm(
      {
        title: model.id == 0 ? "添加服务器" : "编辑服务器",
        maxWidth: 1000,
        maxHeight: 880
      },
      {
        items: items,
        formData: model
      },
      {
        isAdd: model.id == 0 ? true : false
      },
      async (f, p) => {
        try {
          if (!this.validateForm(f)) {
            return;
          }
          let formData = f.option("formData") as ServerModel;
          formData.account_token = this.token;
          //TODO:解决服务器组置空的问题
          if (!formData.match_groups || formData.match_groups == null|| formData.match_groups == "null") {
            formData.match_groups = "";
          }

          let postData = this.joinFormParams(formData);
          let d: Result;
          if (formData.id == RespCode.zero) {
            d = await this.serverAPI.setAdd(postData);
          } else {
            d = await this.serverAPI.setUpdate(formData.id, formData);
          }
          if (
            d.code != RespCode.OK &&
            d.code != RespCode.isSame &&
            d.code != RespCode.isSameSaveData
          ) {
            this.errorCodeMsg(d.code, d.msg);
            return false;
          } else {
            this.dxDataGrid1.refresh();
          }
        } catch (error) {
          this.error(error);
        }
        return true;
      }
    );
    if (model.id > 0) {
      form1.getEditor("is_auto_latitude").option({ value: 0 });
      let aa: string[] = [];
      if (model.match_groups) {
        aa = model.match_groups.split(",");
      }
      form1.getEditor("match_groups_arr").option({ value: aa });
    }
  }

  /**
   * 批量更新服务器状态
   */
  private onBatUpdateServerStatus(e: any) {
    let selectedData = this.dxDataGrid1.getSelectedRowsData();
    if (selectedData.length == 0) {
      this.alert("请至少选择一条数据再进行操作!");
      return;
    }

    let items = this.createFormItems([
      {
        dataField: "is_valid",
        label: {
          text: "服务器状态"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.valid
        },

        validationRules: [Validation.getRequired("请选择服务器状态!")]
      },
      {
        dataField: "desc",
        label: {
          text: "备注"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入备注信息!",
          height: 100
        },
        validationRules: []
      }
    ]);

    let form = this.createPopForm(
      {
        title: "服务器批量维护",
        width: 500,
        height: 320
      },
      {
        items: items,
        formData: this.dxFormData1
      },
      {
        hasReset: false
      },
      async (f, p) => {
        if (!this.validateForm(f)) {
          return;
        }
        let formData = f.option("formData") as ServerModel;
        let lineIds: number[] = [];
        let selectedData = this.dxDataGrid1.getSelectedRowsData();
        for (const item of selectedData) {
          lineIds.push(item.id);
        }
        let d = await this.serverAPI.setBatUpdateState({
          account_token: this.token,
          is_valid: formData.is_valid,
          ids: lineIds,
          desc: formData.desc
        });

        if (
          d.code == RespCode.OK ||
          d.code == RespCode.isSame ||
          d.code == RespCode.isSameSaveData
        ) {
          this.dxDataGrid1.refresh();
        } else {
          this.errorCodeMsg(d.code, d.msg);
        }
        return true;
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
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) => {
        let d = await this.serverAPI.getListPager(
          strWhere,
          pageSize,
          pageIndex
        );
        //let cc = this.dxDataGrid1.getTotalSummaryValue("online_users");
        //console.log(cc);
        //计算在线人数
        return d;
      }
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds,
      summary: {
        totalItems: [
          {
            name: "online_users",
            column: "online_users",
            displayFormat: "合计: {0}",
            summaryType: "sum"
          }
        ]
      }
    });
  }
  //#endregion
}
