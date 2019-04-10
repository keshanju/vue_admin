import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { UserSessionApi } from "@/api/UserSessionApi";
import { UserSessionModel } from "@/models/UserSessionModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { SearchFormModel } from "@/models/SearchModel";
import { Validation } from "@/common/Validation";
import { UserApi } from "@/api/UserApi";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 用户事务列表
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
  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private userSessionAPI = new UserSessionApi();

  private db_num: string = "1";

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };
  // 入口
  protected mounted() {
    (this.$parent as any).content_title = "用户事务";
    this.initComponent();
    //this.getUserSessionList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
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
        allowFiltering: true,
        allowSorting: true,
        dataField: "server_ip",
        caption: "服务器",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "line_title",
        caption: "线路",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "node_title",
        caption: "节点",
        width: 180
      },
      {
        dataField: "game_title",
        caption: "游戏名",
        width: 180
      },
      {
        dataField: "hardware_id",
        caption: "硬件id",
        width: 180
      },
      {
        dataField: "user_login_sequence",
        caption: "用户登录序列",
        width: 160
      },
      {
        dataField: "login_time",
        caption: "最后登录",
        width: 160
      },
      {
        dataField: "lan_ip",
        caption: "私网IP",
        width: 120
      },
      {
        dataField: "wan_ip",
        caption: "公网ip",
        width: 120
      },
      {
        dataField: "rad_session",
        caption: "VPN控制表",
        width: 120
      },
      {
        dataField: "recv_bytes",
        caption: "接收(KB)",
        width: 100
      },
      {
        dataField: "send_bytes",
        caption: "发送(KB)",
        width: 100
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "heart_beat_time",
        caption: "心跳时间",
        width: 160
      },
      {
        dataField: "logout_type",
        caption: "强制退出类型",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.client_logout_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_logout",
        caption: "是否强制退出",
        width: 120,
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
        dataField: "force_logout_reason",
        caption: "强制退出原因",
        width: 180
      },
      {
        dataField: "login_device_type",
        caption: "登录设备类型",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.app_platform_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "client_version",
        caption: "客户端版本号",
        width: 120
      },
      {
        dataField: "os_type",
        caption: "操作系统类型",
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
        dataField: "device_info",
        caption: "设备信息",
        width: 120
      },
      {
        dataField: "os_version",
        caption: "操作系统版本",
        width: 120
      },
      {
        dataField: "auth_type",
        caption: "认证类型",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.billing_type,
                option.value
              )
            )
            .appendTo(cellElement);
        },
        width: 120
      },
      {
        dataField: "logout_time",
        caption: "退出时间",
        width: 160
      },
      {
        dataField: "expire_time",
        caption: "到期时间",
        width: 160
      },
      {
        dataField: "dns",
        caption: "dns",
        width: 160
      },
      {
        dataField: "compatible_mode",
        caption: "兼容模式",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
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
        dataField: "current_signal",
        caption: "当前信号",
        width: 100
      },
      {
        dataField: "packet_loss_rate",
        caption: "丢包率",
        width: 100
      },
      {
        dataField: "id",
        alignment: "center",
        fixed: true,
        fixedPosition: "right",
        caption: Lang.Operate,
        width: 200,
        cellTemplate: this.cellEdit
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols
      //onRowClick: this.onRowClickHandler
    });
    this.dxDataGrid1.option(options);


    // this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    // this.dxSearchForm1.option({
    //   formData: this.mySearchFormModel,
    //   width: 800,
    //   colCount: 3,
    //   items: [
    //     {
    //       label: {
    //         text: "搜索类型"
    //       },
    //       dataField: "type",
    //       editorType: "dxSelectBox",
    //       editorOptions: {
    //         placeholder: "请选择搜索类型",
    //         //width: 150,
    //         displayExpr: "text",
    //         valueExpr: "id",
    //         dataSource: [
    //           {
    //             text: "手机号",
    //             id: 0
    //           },
    //           {
    //             text: "账号",
    //             id: 1
    //           },
    //           {
    //             text: "邮箱",
    //             id: 2
    //           }
    //         ],
    //         value: 0
    //       },
    //       validationRules: [Validation.getRequired("搜索类型不能为空!")]
    //     },
    //     {
    //       label: {
    //         text: "关键词"
    //       },
    //       dataField: "title",
    //       editorType: "dxTextBox",
    //       editorOptions: {
    //         placeholder: "请根据类型输入关键词进行查询!"
    //         //width: 280
    //       },
    //       validationRules: [Validation.getRequired("关键词不能为空!")]
    //     },
    //     {
    //       itemType: "button",
    //       horizontalAlignment: "left",
    //       buttonOptions: {
    //         text: "全库搜索",
    //         icon: "search",
    //         type: "success",
    //         onClick: this.orderSearchHandler
    //       }
    //     }
    //   ]
    // });
  }

  private onSearch(dic, user_id, db_num) {
    this.db_num = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getUserSessionList();
  }
  /**
   * 搜索订单
   */
  private async orderSearchHandler() {
    console.log(this.dxDataGrid1);

    if (!this.validateForm(this.dxSearchForm1)) {
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
    this.getUserSessionList();
  }

  /**
   * 双击编辑
   * @param e
   */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("" + sender.key.id);
    });
  }

  /**
   * 编辑
   * @param container
   * @param option
   */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aForce = this.getCreateLink("强制下线", sender => {
      let userId = option.key.user_id;
      let sessionId = option.value;
      let logout_type = option.key.logout_type;
      if (logout_type == 1) {
        this.alert("用户已经强制退出了!");
        return;
      }
      this.redirect(
        "/user/" +
          this.db_num +
          "/session/force_logout/" +
          userId +
          "/" +
          sessionId
      );
    });

    $("<div>")
      .append(aForce)
      .appendTo(cellElement);
  }

  /**
   * 获取Session列表
   */
  private async getUserSessionList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.userSessionAPI.UserSessionListPager(
        this.db_num,
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
    // toolbarItems.push({
    //   location: "before",
    //   widget: "dxSelectBox",
    //   options: {
    //     displayExpr: "name",
    //     valueExpr: "id",
    //     placeholder: "选择一个分库查询",
    //     dataSource: CommonUtils.getDictonary().data.user_db_type,
    //     onValueChanged: sender => {
    //       this.setSearchKeywords("");
    //       this.db_num = sender.value;
    //       this.getUserSessionList();
    //     }
    //   }
    // });

    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getUserSessionList();
    // });
  }

  /**
   * 刷新
   * @param e
   */
  private onRefreshHandler(sender) {
    // this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }
}
