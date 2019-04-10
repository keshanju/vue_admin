import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import {UserAppealApi} from '@/api/UserAppealApi';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';

/**
 * 申诉列表
 */
@Component({
  components: {
    DxDataGrid
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private userAPI = new UserAppealApi();

  // 入口
  protected mounted() {
    (this.$parent as any).content_title = "申述管理";
    this.initComponent();
     this.getUserAppealList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "appeal_id",
        caption: '申诉编号',
        width:120
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "mobile_num",
        caption: '手机号',
        width: 120,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "email",
        caption: '邮箱',
        width:160,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "new_email",
        caption: '新邮箱',
        width: 160
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "new_mobile_num",
        caption: '新手机号',
        width: 120,
      },
      {
        dataField: "status",
        caption: '审核状态',
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.appeal_status, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "user_desc",
        caption: '用户说明',
        width: 180
      },
      {
        dataField: "create_time",
        caption: '创建时间',
        width: 160
      },
      {
        dataField: "op_time",
        caption: '操作时间',
        width: 160,
      },
      {
        dataField: "staff_name",
        caption: '操作人',
        width: 80,
      },
      {
        dataField: "op_desc",
        caption: '操作说明',
        width: 180
      },
      {
        fixed:true,
        fixedPosition:"right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        width: 200,
        cellTemplate: this.cellEdit
      },
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
    this.redirect("/user/appeal/edit/" + sender.key.id);
  });
}

  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aEdit = this.getCreateLink("编辑",(sender)=>{
        this.redirect("/user/appeal/edit/" + option.value);
    });
    $("<div>")
      .append(aEdit)
      .appendTo(cellElement);
  }

  /**
 * 获取申诉列表
 */
  private async getUserAppealList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.userAPI.UserAppealListPager(strWhere, pageSize, pageIndex));
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

    // toolbarItems.push({
    //   location: "before",
    //   widget: "dxButton",
    //   options: {
    //     text: Lang.Add,
    //     icon: "add",
    //     onClick: this.onAddHandler
    //   }
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

    
    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getUserAppealList();
    });
  }

  /**
   * 添加用户组
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/user/appeal/edit");
  }

  /**
* 刷新
* @param e 
*/
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }


}