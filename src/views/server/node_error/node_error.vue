<template>
  <dx-popup
    :visible.sync="options.visible"
    :title="options.title"
    :toolbarItems="options.toolbarItems"
    :width="options.width"
    :height="options.height"
    :onHidden="options.onHidden"
  >
    <dx-scroll-view>
      <dx-form ref="dxSearchForm1"></dx-form>
      <br>
      <dx-data-grid ref="dxDataGrid1"></dx-data-grid>
    </dx-scroll-view>
  </dx-popup>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxScrollView
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import md5 from "md5";
import { RespCode } from "@/common/RespCode";
import { ServerApi } from "@/api/ServerApi";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class PassWord extends BaseVue {
  /**
  默认配置项
   */
  public options: {} | any = {
    visible: false,
    title: "加速服务器节点错误列表",
    toolbarItems: [],
    width: $(window).width() - 200,
    height: $(window).height() - 200,
    onHidden: () => {}
  };

  public dxSearchForm1: DevExpress.ui.dxForm;
  public dxDataGrid1: DevExpress.ui.dxDataGrid;


  public created() {
    $(window).resize(()=>{
        this.options.width = $(window).width() - 200;
        this.options.height = $(window).height() - 200;
    });
  }

  public mounted() {
    //
    this.dxSearchForm1 = this.getDxInstanceByKey("dxSearchForm1");
    let items_search = this.createFormItems([
      {
        dataField: "start_time",
        label: {
          text: "开始时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          type: "datetime",
          displayFormat: "yyyy-MM-dd 00:00:00",
          dateSerializationFormat: "yyyy-MM-dd 00:00:00",
          value: DateTimeUtils.getNow("yyyy-MM-dd 00:00:00")
        },
        validationRules: [Validation.getRequired("请选择开始时间!")]
      },
      {
        dataField: "end_time",
        label: {
          text: "结束时间"
        },
        editorType: "dxDateBox",
        editorOptions: {
          type: "datetime",
          displayFormat: "yyyy-MM-dd 23:59:59",
          dateSerializationFormat: "yyyy-MM-dd 23:59:59",
          value: DateTimeUtils.getNow("yyyy-MM-dd 23:59:59")
        },
        validationRules: [Validation.getRequired("请选择结束时间!")]
      },
      {
        itemType: "button",
        horizontalAlignment: "left",
        buttonOptions: {
          text: "查询",
          icon: "search",
          type: "success",
          onClick: async () => {
            if (!this.validateForm(this.dxSearchForm1)) {
              return;
            }
            let formData: {
              start_time: string;
              end_time: string;
            } = this.dxSearchForm1.option("formData");
            this.getDataList(formData.start_time, formData.end_time);
          }
        }
      }
    ]);
    this.dxSearchForm1.option({
      colCount: 6,
      items: items_search
    });
    //
    this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGrid1");

    let cols = this.createDataGridColumns([
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
        dataField: "speed_ip",
        caption: "加速IP",
        width: 120
      },
      {
        dataField: "speed_port",
        caption: "加速端口",
        width: 120
      },
      {
        dataField: "client_ip",
        caption: "客户端IP",
        width: 120
      },
      {
        dataField: "hardware_id",
        caption: "硬件号",
        width: 120
      },
      {
        dataField: "os_type",
        caption: "设备类型",
        width: 120,
         cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.client_os_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      }
    ]);

    let options = this.getDataGridOption({
      columns: cols,
      columnChooser: {
        enabled: false
      }
    });

    this.dxDataGrid1.option(options);
  }

  public Show() {
    this.options.visible = true;
  }

  /**
   * 获取数据列表
   */
  private getDataList(start_time: string, end_time: string) {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) => {
        let d = await new ServerApi().getServerNodeError(
          start_time,
          end_time,
          pageIndex,
          pageSize
        );
        return d;
      }
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
</script>
