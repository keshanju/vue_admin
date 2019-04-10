import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { UserPointLogApi } from '@/api/UserPointLogApi';
import { UserPointLogModel } from '@/models/UserPointLogModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { SearchFormModel } from '@/models/SearchModel';
import { Validation } from '@/common/Validation';
import { UserApi } from '@/api/UserApi';

/**
 * 用户积分日志管理
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private userPointLogAPI = new UserPointLogApi();

  private dbNum: string = "001";

  private userId: number = 0;

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };

  // 入口
  protected mounted() {
    (this.$parent as any).content_title = "积分日志";
    this.userId = this.ID;
    this.dbNum =  this.getParam("db_num");
    this.initComponent();
    this.getPagerList();
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
        caption: '所属用户',
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
        dataField: "activity_title",
        caption: '活动标题',
        width: 120,
      },
      {
        dataField: "point",
        caption: '积分',
        width: 120,
      },
      {
        dataField: "point_from_type",
        caption: '积分来源',
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.public_user_point_edit_type, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "point_ref_id",
        caption: '积分来源编号',
        width: 120,
      },
      {
        dataField: "expiry_time",
        caption: '失效时间',
        width: 160
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        dataField: "staff_name",
        caption: '操作员工',
        width: 80,
      },
      {
        dataField: "staff_operate_desc",
        caption: '员工操作原因',
        width: 120,
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160,
        visible:false
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
    //组装用户id
    let userInfo = userData.data.list[0];
    //柱状库编号
    this.dbNum = userInfo.database_num.toString();
    //组装搜索条件
    this.setSearchKeywords("&search=user_id__equal__" + userInfo.id);
    //刷新数据源
    //this.dxDataGrid1.refresh();
    this.getPagerList();
  }

  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent,
    element?: DevExpress.core.dxElement,
    model?: any,
    toolbarOptions?: DevExpress.ui.dxToolbarOptions
  }) {
    let dataGrid = e.component;
    let toolbarItems = e.toolbarOptions.items;

    // toolbarItems.push({
    //   location: "before",
    //   widget: "dxButton",
    //   options: {
    //     icon: "refresh",
    //     text: "刷新",
    //     onClick: this.onRefreshHandler
    //   }
    // });

    // //分库
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
    //       this.dbNum = sender.value;
    //       this.getPagerList();
    //     }
    //   }
    // });

    // if (this.ID > 0) {
    //   toolbarItems.push({
    //     location: "before",
    //     widget: "dxButton",
    //     options: {
    //       text: '返回用户管理',
    //       icon: "back",
    //       onClick: this.onAddHandler
    //     }
    //   });
    // }

    //创建搜索工具条
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getPagerList();
    // });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "返回用户管理",
        icon: "back",
        onClick: this.onAddHandler
      }
    });
  }

  /**
 * 返回用户管理列表
 * @param e 
 */
  private onAddHandler(sender) {
    this.redirect("/user/list");
  }

  /**
* 刷新
* @param e 
*/
  private onRefreshHandler(sender) {
    this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  /**
* 数据列表
*/
  private getPagerList() {
    try {
      let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
        let d = await this.userPointLogAPI.UserPointLogListPager(this.userId,this.dbNum, strWhere, pageSize, pageIndex)
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


}