import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { StaffApi } from '@/api/StaffApi';
import { StaffModel } from '@/models/StaffModel';
import { Lang } from '@/common/Lang';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 员工列表
 */
@Component({
  components: {
    DxDataGrid
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGrid_Key_1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private staffAPI = new StaffApi();

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "员工管理";
    this.initComponent();
    this.getDataList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);
    const cols: Array<DevExpress.ui.dxDataGridColumn> = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "staff_name",
        caption: Lang.lang_staff_name,
        width: 140,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "name",
        caption: Lang.lang_name1,
        width: 100,
      },
      {
        dataField: "role_name",
        caption: "角色组",
        width: 100,
      },
      // {
      //   dataField: "is_need_sms",
      //   caption: "是否绑定验证",
      //   width: 100,
      //   cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      //     let color = option.value == 0 ? "red" : "green";
      //     $("<span style='color:" + color + "'>")
      //       .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
      //       .appendTo(cellElement);
      //   }
      // },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "phone",
        caption: "手机号",
        width: 120,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "mail",
        caption: "邮箱",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        visible: false,
        dataField: "qq",
        caption: "QQ",
        width: 100,
      },
      {
        visible: false,
        dataField: "address",
        caption: "地址",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "limited_ip",
        caption: "限制IP",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "last_login_ip",
        caption: "最后登录IP",
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "last_login_time",
        caption: Lang.lang_last_login_time,
        width: 160
      },
      {
        dataField: "status",
        caption: "状态",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.status, option.value))
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "end_time",
        caption: "过期时间",
        width: 160,
      },
      {
        dataField: "change_time",
        caption: "修改时间",
        width: 160,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160,
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        cellTemplate: this.cellEdit
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
    });

    this.dxDataGrid1.option(options);
  }

  /**
   * 编辑
   * @param container 
   * @param option 
   */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aEdit = this.getCreateLink("编辑", (sender) => {
      this.redirect("/staff/edit/" + option.value);
    });

    $("<div>")
      .append(aEdit)
      .appendTo(cellElement);
  }

  /**
   * 获取列表
   */
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.staffAPI.staffDataListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 初始化工具条
   * @param e 
   */
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
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getDataList();
    });
  }

  /**
   * 添加
   * @param e 
   */
  private onAddHandler(sender) {
    this.redirect("/staff/edit");
  }

  /**
   * 刷新
   * @param e 
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

}