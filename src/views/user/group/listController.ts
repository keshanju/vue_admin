import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { UserGroupApi } from '@/api/UserGroupApi';
import { UserGroupModel } from '@/models/UserGroupModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';

/**
 * 用户组列表
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
  private userGroupAPI = new UserGroupApi();

  // 入口
  protected async mounted() {
    //this.content_title = "用户组管理";
    (this.$parent as any).content_title = "用户组管理";
    
    this.initComponent();
    this.getUserGroupList();
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
        dataField: "user_type",
        caption: '用户类型',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          this.rowCellTemplateRender(cellElement, option);
        },
        width: 100,
        headerFilter: {
          dataSource: CommonUtils.getDictonary().data.user_type
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: '组名称',
        width: 100
      },
      {
        dataField: "desc",
        caption: '组描述',
        width: 200
      },
      {
        dataField: "is_reg",
        caption: '是否开放注册',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          this.rowCellTemplateRender(cellElement, option, color);
        },
        width: 100,
        headerFilter: {
          dataSource: CommonUtils.getDictonary().data.group_is_reg,
        }
      },
      {
        dataField: "user_vip_level_title",
        caption: '默认用户级别',
        width: 100
      },
      {
        dataField: "default_free_points",
        caption: '默认赠送积分',
        width: 100
      },
      {
        dataField: "create_staff_time",
        caption: '创建时间',
        width: 160
      },
      {
        dataField: "create_staff_name",
        caption: '创建人',
        width: 80
      },
      {
        dataField: "change_staff_time",
        caption: '修改时间',
        width: 160
      },
      {
        dataField: "id",
        alignment: "center",
        fixed: true,
        fixedPosition: "right",
        caption: Lang.Operate,
        cellTemplate: this.cellEdit,
        width: 140
      },
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick: this.onRowClickHandler,
    })

    this.dxDataGrid1.option(options);
  }

  /**
* 双击编辑
* @param e 
*/
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/user/group/edit/" + sender.key.id);
    });
  }

  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aEdit = $("<a href='javascript:void(0)'> 编辑 </a>");
    aEdit.bind("click", async (sender) => {
      this.redirect("/user/group/edit/" + option.value);
    });

    let aPackage = $("<a href='javascript:void(0)'> 套餐绑定 </a>");
    aPackage.bind("click", async (sender) => {
      this.redirect("/user/group/" + option.value + "/package/edit");
    });

    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append(aPackage)
      .appendTo(cellElement);
  }

  /**
 * 获取用户组列表
 */
  private async getUserGroupList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.userGroupAPI.UserGroupListPager(strWhere, pageSize, pageIndex);
      return d;
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
        text: Lang.Add,
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
    // this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
    //   this.getUserGroupList();
    // });
  }

  /**
   * 添加用户组
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/user/group/edit");
  }

  /**
* 刷新
* @param e 
*/
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

}