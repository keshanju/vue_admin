import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";

import { UserPointsShortApi } from "@/api/UserPointsShortApi";
import { UserPointShortModel } from "@/models/UserPointShortModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { Validation } from "@/common/Validation";
import { UserPointsShortModel } from "@/models/UserPointsShortModel";
import { ActivityApi } from "@/api/ActivityApi";
import { RespCode } from '@/common/RespCode';
/**
 * 用户短期活动积分管理
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
  private userPointsShortAPI = new UserPointsShortApi();

  private dbNum = "001";

  // 入口
  protected async mounted() {
    this.dbNum = this.getParam("db_num");
    this.initComponent();
    this.getUserPointShortList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "user_mobile_num",
        caption: "所属用户",
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
        dataField: "activity_title",
        caption: "所属活动",
        width: 180
      },
      {
        dataField: "points",
        caption: "积分",
        width: 180
      },
      {
        dataField: "expiry_time",
        caption: "过期时间",
        width: 180
      },
      {
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
  }

  /**
   * 获取用户短期活动积分列表
   */
  private async getUserPointShortList() {
    // 数据源
    let ds = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.userPointsShortAPI.getListPager(
          this.ID,
          this.dbNum,
          strWhere,
          pageSize,
          pageIndex
        )
    );
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
        text: "添加积分",
        icon: "add",
        onClick: async () => {
          let formData: UserPointsShortModel = {
            points: 0
          };
          let d = await new ActivityApi().getList();
          let ds_activity = d.data;

          let item = this.createFormItems([
            {
              dataField: "activity_id",
              editorType: "dxSelectBox",
              label: {
                text: "活动"
              },
              editorOptions: {
                placeholder: "请选择有效的活动",
                dataSource: ds_activity,
                displayExpr: "title",
                valueExpr: "id"
              },
              validationRules: [Validation.getRequired("请选择有效的活动!")]
            },
            {
              dataField: "points",
              editorType: "dxNumberBox",
              label: {
                text: "积分(可负数)"
              },
              editorOptions: {
                placeholder: "请输入有效的积分,支持负数"
              },
              validationRules: [Validation.getRequired("请输入有效的积分!")]
            },
            {
              dataField: "staff_operate_desc",
              editorType: "dxTextArea",
              label: {
                text: "操作理由"
              },
              editorOptions: {
                placeholder: "操作理由说明!",
                height: 80
              },
              validationRules: [Validation.getRequired("操作理由说明不能为空!")]
            }
          ]);
          let myForm = this.createPopForm(
            { title: "增加删除用户活动积分", width: 400, height: 280 },
            {
              formData: formData,
              items: item
            },
            { hasReset: false },
            async (f,p) => {
              try {
                let formData: UserPointsShortModel = myForm.option("formData");
                let d = await new UserPointsShortApi().changeUserPoints(this.ID,this.dbNum,formData);
                if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                  this.toast(() => {
                    p.hide();
                    this.dxDataGrid1.refresh();
                    return true;
                  });
                } else {
                  this.errorCodeMsg(d.code, d.msg);
                }
              } catch (error) {
                this.error(error);
              }
              return false;
            }
          );
        }
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
    this.dxDataGrid1.refresh();
  }
}
