import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { RefundLogApi } from '@/api/RefundLogApi';
import { CommonUtils } from '@/common/CommonUtils';
import { SearchFormModel } from '@/models/SearchModel';
import { UserApi } from '@/api/UserApi';
import { Validation } from '@/common/Validation';
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 退款记录列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView,dxUserSearchForm
  }
})
export default class Home extends BaseVue {


  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;

  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private invoiceRefundLogApi = new RefundLogApi();
  private db_num: string = "001";

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "退款记录";
    this.initComponent();
    //this.getDataList();
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
        dataField: "user_mobile_num",
        caption: "手机号",
        width: 150,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let $span = $("<span>");
          if (option.value && option.value.toString() != "") {
            if (option.data.country_code && option.data.country_code.toString() != "") {
              $span.append("(+" + option.data.country_code + ")");
            }
          }
          $span.append(option.value);
          $span.appendTo(cellElement);
        }
      },
      {
        dataField: "user_mail",
        caption: '邮箱',
        width: 150
      },
      {
        dataField: "user_name",
        caption: '账号',
        width: 100
      },
      {
        dataField: "user_nickname",
        caption: '昵称',
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "create_time",
        caption: "退款时间",
        width: 160,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "refund_fee",
        caption: "退款金额(分)",
        width: 100,
      },
      {
        dataField: "refund_source",
        caption: "退款来源",
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.refund_source, option.value))
            .appendTo(cellElement);
        }
      }, {
        dataField: "refund_status",
        caption: "退款状态",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.refund_status, option.value))
            .appendTo(cellElement);
        }
      }, {
        dataField: "staff_name",
        caption: "操作人",
        width: 80
      }, {
        dataField: "refund_reason",
        caption: "退款原因",
        width: 180,
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
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
    //         width: 150,
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
    //       validationRules: [
    //         Validation.getRequired("搜索类型不能为空!")
    //       ]
    //     },
    //     {
    //       label: {
    //         text: "关键词"
    //       },
    //       dataField: "title",
    //       editorType: "dxTextBox",
    //       editorOptions: {
    //         placeholder: "请根据类型输入关键词进行查询!",
    //         //width: 280
    //       },
    //       validationRules: [
    //         Validation.getRequired("关键词不能为空!")
    //       ]
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
    this.dxDataGrid1.clearFilter();
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
    if (userData.data == null || userData.data.list == null || userData.data.list.length == 0 || userData.data.list.length > 1) {
      this.alert("没有查询到用户信息");
      return;
    }
    let userInfo = userData.data.list[0];
    this.db_num = userInfo.database_num.toString();
    this.setSearchKeywords("&search=user_id__equal__" + userInfo.id)
    this.dxDataGrid1.refresh();
  }

  /**
   * 初始化工具条
   * @param e 
   */
  private onToolbarPreparingHandler(e: { component?: DevExpress.DOMComponent, element?: DevExpress.core.dxElement, model?: any, toolbarOptions?: DevExpress.ui.dxToolbarOptions }) {
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
    //     onValueChanged: (sender) => {
    //       this.setSearchKeywords("");
    //       this.db_num = sender.value;
    //       this.getDataList();
    //     }
    //   }
    // });

    
    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getDataList();
    // });
  }


  /**
  * 搜索
  * @param sender 
  */
  private onRefreshHandler(sender) {
    //this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  /**
   * 数据列表
   */
  private getDataList() {
    try {
      let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
        let d = await this.invoiceRefundLogApi.getListPager(this.db_num, strWhere, pageSize, pageIndex);
        if (d.code == 0) {
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
    this.getDataList();
  }
}