import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { ForceLogoutLogApi } from "@/api/ForceLogoutLogApi";
import { ForceLogoutLogModel } from "@/models/ForceLogoutLogModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { SearchFormModel } from "@/models/SearchModel";
import { Validation } from "@/common/Validation";
import { UserApi } from "@/api/UserApi";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 强制下线列表
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
  private forceLogoutLogAPI = new ForceLogoutLogApi();

  private db_num: string = "001";

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };

  // 入口
  protected mounted() {
    (this.$parent as any).content_title = "强制下线日志";
    this.initComponent();
    //this.getUserForceLogList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 120
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
        allowFiltering: true,
        allowSorting: true,
        dataField: "user_ip",
        caption: "用户IP",
        width: 140
      },
      {
        dataField: "force_logout_type",
        caption: "下线类型",
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
        dataField: "account_admin_desc",
        caption: "下线说明",
        width: 180
      },
      {
        visible: false,
        allowFiltering: true,
        allowSorting: true,
        dataField: "account_admin_ip",
        caption: "管理员IP",
        width: 120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "staff_name",
        caption: "操作人",
        width: 120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols
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

  /**
   * 搜索订单
   */
  private async orderSearchHandler() {
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
    this.getUserForceLogList();
  }

  /**
   * 获取强制下线日志列表
   */
  private async getUserForceLogList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.forceLogoutLogAPI.getListPager(
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
    //     placeholder: "选择一个分库查询",
    //     displayExpr: "name",
    //     valueExpr: "id",
    //     dataSource: CommonUtils.getDictonary().data.user_db_type,
    //     onValueChanged: sender => {
    //       this.setSearchKeywords("");
    //       this.db_num = sender.value;
    //       this.getUserForceLogList();
    //     }
    //   }
    // });

    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getUserForceLogList();
    // });
  }

  /**
   * 刷新
   * @param e
   */
  private onRefreshHandler(sender) {
    //this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  private onSearch(dic, user_id, db_num) {
    this.db_num = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getUserForceLogList();
  }
}
