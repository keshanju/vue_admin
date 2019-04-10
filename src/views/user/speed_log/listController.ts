import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserSpeedLogApi } from '@/api/UserSpeedLogApi';
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { UserApi } from '@/api/UserApi';
import { SearchFormModel } from '@/models/SearchModel';
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 * 用户加速日志列表
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
  private userSpeedLogApi = new UserSpeedLogApi();
  private db_num: string = "1";
  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };
  /**
 * 入口
 */
  protected async mounted() {
    (this.$parent as any).content_title = "加速日志";
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
        dataField: "game_title",
        caption: "所属游戏",
        width: 160
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "start_time",
        caption: "开始时间",
        width: 160,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "end_time",
        caption: "结束时间",
        width: 160,
      },
      {
        dataField: "speed_status",
        caption: "加速状态",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.speed_status, option.value))
            .appendTo(cellElement);
        }
      }, {
        dataField: "line_title",
        caption: "加速线路",
        width: 120
      },
      {
        dataField: "node_title",
        caption: "加速节点",
        width: 120
      },
      {
        dataField: "server_ip",
        caption: "加速服务器",
        width: 120
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      //height: $(window).height() - 80
    });

    this.dxDataGrid1.option(options);

    // this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    // this.dxSearchForm1.option({
    //   formData: this.mySearchFormModel,
    //   width: 800,
    //   colCount: 12,
    //   items: [
    //     {
    //       colSpan: 4,
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
    //       validationRules: [
    //         Validation.getRequired("搜索类型不能为空!")
    //       ]
    //     },
    //     {
    //       colSpan: 4,
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
    //       colSpan: 4,
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
    if (userData.data == null || userData.data.list == null || userData.data.list.length == 0 || userData.data.list.length > 1) {
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
    //     placeholder: "选择一个分库查询",
    //     displayExpr: "name",
    //     valueExpr: "id",
    //     dataSource: CommonUtils.getDictonary().data.user_db_type,
    //     onValueChanged: (ee: any) => {
    //       this.setSearchKeywords("");
    //       this.db_num = ee.value;
    //       this.getPagerList();
    //     }
    //   }
    // });


    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getPagerList();
    // });

  }


  /**
  * 搜索
  * @param e 
  */
  private onRefreshHandler(e: any) {
    //this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  /**
   * 数据列表
   */
  private getPagerList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.userSpeedLogApi.getListPager(this.db_num, 0, strWhere, pageSize, pageIndex);
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
  
  private onSearch(dic, user_id, db_num) {
    this.db_num = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getPagerList();
  }
}