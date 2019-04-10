<template>
  <div>
    <dx-popup
      :visible.sync="options.visible"
      :title="options.title"
      :toolbarItems="options.toolbarItems"
      :width="options.width"
      :height="options.height"
      :onHidden="options.onHidden"
    >
      <dx-scroll-view>
        <dx-form ref="dx_form_key_1"></dx-form>
        <br>
        <DxDataGrid ref="dxDataGridKey1"></DxDataGrid>
      </dx-scroll-view>
    </dx-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxFileUploader,
  DxScrollView,
  DxPopup
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import { InvoiceApi, InvoiceErrorApi } from "@/api/InvoiceApi";
import { InvoiceModel } from "@/models/InvoiceModel";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";

/**
 * 订单编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxScrollView,
    DxPopup,
    dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private dxForm1: DevExpress.ui.dxForm;

  private options: any = {};

  public created() {
    this.options = {
      visible: false,
      title: "订单错误日志",
      width: $(window).width() - 200,
      height: $(window).height() - 200,
      onHidden: () => {},
      toolbarItems: []
    };
  }

  protected mounted() {
    this.initControls();
  }

  private initControls() {
    //搜索表单
    this.dxForm1 = this.getDxInstanceByKey("dx_form_key_1");
    let items = this.createFormItems([
      {
        colSpan: 2,
        dataField: "dbNum",
        label: {
          text: "订单分库"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择订单分库,新规则,分库可以为空!",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.user_db_type
        },
        validationRules: []
      },
      {
        colSpan: 3,
        dataField: "invoice_no",
        label: {
          text: "订单号"
        },
        editorOptions: {
          placeholder: "请输入订单号查询!"
        },
        validationRules: [Validation.getRequired("订单号不能为空!")]
      },
      {
        colSpan: 1,
        itemType: "button",
        horizontalAlignment: "left",
        buttonOptions: {
          text: "搜索",
          icon: "search",
          type: "success",
          onClick: async () => {
            if (!this.validateForm(this.dxForm1)) {
              return;
            }
            let formData = this.dxForm1.option("formData");
            this.options.invoice_no = formData.invoice_no;
            this.options.dbNum = formData.dbNum;
            this.getDataList();
          }
        }
      }
    ]);
    this.dxForm1.option({
      colCount: 10,
      items: items
    });
    //列表
    this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGridKey1");

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "invoice_no",
        caption: "订单号",
        width: 200
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
        dataField: "payment_type",
        caption: "支付方式",
        width: 80
      },
      {
        dataField: "process_type",
        caption: "处理方式",
        width: 80
      },
      {
        dataField: "cancel_desc",
        caption: "错误原因",
        width: 300
      },
      {
        dataField: "transaction_time",
        caption: "交易时间",
        width: 100
      },
      {
        dataField: "transaction_no",
        caption: "交易订单号",
        width: 100
      },
      {
        dataField: "transaction_status",
        caption: "交易状态",
        width: 80
      },
      {
        dataField: "transaction_desc",
        caption: "交易请求报文",
        width: 300
      }
    ];
    let options = this.getDataGridOption({
      columns: cols,
      columnChooser: {
        enabled: false
      }
    });

    this.dxDataGrid1.option(options);
  }

  private show(val: boolean) {
    this.options.visible = val;
    this.dxForm1.resetValues();
    this.dxDataGrid1.option({
      dataSource: []
    });
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      try {
        let d = await new InvoiceErrorApi().getListPager(
          this.options.dbNum,
          this.options.invoice_no,
          strWhere,
          pageSize,
          pageIndex
        );
        if (d.code != RespCode.zero) {
          this.errorCodeMsg(d.code, d.msg);
          return {};
        }
        return d;
      } catch (error) {
        this.error(error);
      }
      return {};
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
</script>
