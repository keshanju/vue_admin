import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { UserPauseLogApi } from '@/api/UserPauseLogApi';
import { UserPauseLogModel } from '@/models/UserPauseLogModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { SearchFormModel } from '@/models/SearchModel';
import { UserApi } from '@/api/UserApi';
import { Validation } from '@/common/Validation';
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";

/**
 * 用户暂停日志列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView,dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private userPauseAPI = new UserPauseLogApi();

  private dbNum: string = "001";

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };
  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "暂停日志";
    this.initComponent();
    //this.getUserPauseLogList();
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
        dataField: "user_mobile_num",
        caption: '手机号',
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
        dataField: "status",
        caption: '暂停状态',
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = "";
          switch (option.value) {
            case 0:
              color = "red";
              break
            case 1:
              color = "green"
              break;
          }
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.user_pause_status, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "pause_time",
        caption: '暂停时间',
        width: 160
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "resume_time",
        caption: '恢复时间',
        width: 160
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "pause_ip",
        caption: '暂停IP',
        width: 100
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "resume_ip",
        caption: '恢复IP',
        width: 100
      },
      {
        dataField: "surplus_time",
        caption: '剩余时长(小时)',
        width: 100
      },
      {
        dataField: "staff_name",
        caption: '操作人',
        width: 80,
      },
      {
        dataField: "staff_desc",
        caption: '操作描述',
        width: 160
      },
      {
        dataField: "op_source",
        caption: '操作来源',
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.op_source_type, option.value))
            .appendTo(cellElement);
        }
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

  private onSearch(dic,user_id,db_num){
    this.dbNum = db_num;
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getUserPauseLogList();
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
    this.dbNum = userInfo.database_num.toString();
    this.setSearchKeywords("&search=user_id__equal__" + userInfo.id);
    //this.dxDataGrid1.refresh();
    this.getUserPauseLogList();
  }
  /**
 * 获取用户暂停日志列表
 */
  private async getUserPauseLogList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      try {
        let d = await this.userPauseAPI.UserPauseLogListPager(this.dbNum, strWhere, pageSize, pageIndex);
        if (d.code == 0) {
          return d;
        } else {
          this.errorCodeMsg(d.code, d.msg);
        }
      } catch (error) {
        this.error(error);
      }
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }


  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent,
    element?: DevExpress.core.dxElement,
    model?: any,
    toolbarOptions?: DevExpress.ui.dxToolbarOptions
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
    //     onValueChanged: (sender) => {
    //       this.setSearchKeywords("");
    //       this.dbNum = sender.value;
    //       this.getUserPauseLogList();
    //     }
    //   }
    // });

    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getUserPauseLogList();
    // });

  }

  /**
   * 添加用户组
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/user/0/point_log/edit");
  }

  /**
* 刷新
* @param e 
*/
  private onRefreshHandler(sender) {
    //this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }


}