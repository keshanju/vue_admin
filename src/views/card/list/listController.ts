import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid } from 'devextreme-vue';
import popup from 'devextreme/ui/popup';
import dx_form from 'devextreme/ui/form';
import BaseVue from '@/common/BaseVue';

import { CardListApi } from '@/api/CardListApi';
import { CardListModel } from '@/models/CardListModel';


import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { Validation } from '@/common/Validation';
import { CardsApi } from '@/api/CardsApi';
import md5 from "js-md5";
import { DateTimeUtils } from '@/utils/DateTimeUtils';

/**
 * 充值卡开卡管理
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
  private cardlistAPI = new CardListApi();
  private cardData1: CardListModel = {};

  private dxFormOrderSearch1: DevExpress.ui.dxForm;


  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "充值卡开卡列表";
    this.cardData1.id = 0;
    this.cardData1.account_token = this.token;
    this.initComponent();
    this.getDataList();

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
        dataField: "batch_no",
        caption: '批次号',
        width: 140,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "define_title",
        caption: '卡名称',
        width: 140
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "card_no",
        caption: '卡号',
        width: 200,
      },
      {
        dataField: "recharge_type",
        caption: '卡充值类型',
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.card_recharge_type, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "minutes",
        caption: '分钟数',
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "expired_time",
        caption: '过期时间',
        width: 180,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let expired_time = option.value;
          let now = DateTimeUtils.getNow();
          let color = "";
          if ((DateTimeUtils.parserDate(expired_time).getTime() - DateTimeUtils.parserDate(now).getTime()) < 0) {
            color = "red";
          }
          $("<span style='color:" + color + "'>")
            .append(expired_time)
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_export",
        caption: "是否导出",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.card_is_export, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "create_staff_name",
        caption: "创建员工姓名",
        width: 100
      },
      {
        dataField: "export_staff_name",
        caption: '导出人',
        width: 100,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "create_time",
        caption: '创建时间',
        width: 160,
      },
      // {
      //   dataField: "export_agent_name",
      //   caption: '代理商',
      //   width: 100,
      // },
      // {
      //   dataField: "export_source",
      //   caption: '导出来源',
      //   width: 100,
      //   cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      //     $("<span>")
      //       .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.export_source, option.value))
      //       .appendTo(cellElement);
      //   },
      // },
      {
        fixed: true,
        fixedPosition: "right",
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
      // export: {
      //   enabled: true
      // }
    });
    this.dxDataGrid1.option(options);
  }

  popup1: DevExpress.ui.dxPopup;

  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let invalid = $("<a href='#' data=" + option.value + "> " + " 废弃 " + " </a>");
    invalid.bind("click", async (sender) => {
      let id = $(sender.target).attr("data");

      let flag = await this.confirm("是否确定废弃此充值卡", "废弃充值卡");
      if (flag) {
        this.invalidCard(Number(id));
      }
    });

    $("<div>")
      .append(invalid)
      .appendTo(cellElement);
  }

  /**
   * 手动失效开卡后的充值卡
   */
  private async invalidCard(id: number) {
    let d = await this.cardlistAPI.carddelete(id);
    this.dxDataGrid1.refresh();
  }

  /**
 * 获取充值卡开卡列表
 */
  private async getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.cardlistAPI.cardlistListPager(this.ID, strWhere, pageSize, pageIndex));
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
        onClick: this.onSearchHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: '返回列表',
        icon: "back",
        onClick: this.onAddHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: '导出卡',
        icon: "export",
        onClick: this.onExportHandler
      }
    });

    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getDataList();
    });
  }

  /**
   * 导出卡
   */
  private onExportHandler() {

    let formData: {
      super_password: string
    } = {
      super_password: ""
    };

    let item = this.createFormItems([
      {
        dataField: "super_password",
        label: {
          text: "请输入密码"
        },
        editorOptions: {
          placeholder: "请输入员工超级密码.",
          mode: "password"
        },
        validationRules: [Validation.getRequired("员工超级密码不能为空!")]
      }
    ]);

    this.createPopForm(
      {
        title: "导出充值卡",
        width: 380,
        height: 240
      },
      {
        formData: formData,
        items: item
      },
      {
        isAdd: false,
        hasReset: false
      },
      async (form, popup) => {
        let data = form.option("formData") as { super_password: string };
        let ss = new CardsApi();
        let pp = md5(data.super_password)
        let aa = await ss.getCardsExportData(this.ID, pp);
        if(aa){
          if (aa.code != 0) {
            this.errorCodeMsg(aa.code, aa.msg);
            return false;
          }
        }
        return true;
      });
  }

  /**
   * 返回充值卡列表
   * @param sender 
   */
  private onAddHandler(sender) {
    this.redirect("/card/list");
  }

  /**
   * 搜索充值卡开卡
   * @param sender 
   */
  private onSearchHandler(sender) {
    this.dxDataGrid1.refresh();
  }


}