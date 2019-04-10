<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <DxForm ref="dxFormKey1"></DxForm>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <hr>
        <dxUserSearchForm @onSearch="onSearch" :col_count="0" v-show="options.visible"></dxUserSearchForm>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { UserAppealApi } from "@/api/UserAppealApi";
import { UserAppealModel } from "@/models/UserAppealModel";
import { BaseModel } from "@/models/BaseModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
import { UserApi } from "@/api/UserApi";
import { InvoiceApi } from "@/api/InvoiceApi";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  /**
   * 用户ID
   */
  @Prop()
  private id!: number;

  @Watch("id")
  private watch_id(val: number) {
    this.bind_form(val);
  }

  private options: any = { visible: false };

  private dxForm1: DevExpress.ui.dxForm;

  async mounted() {
    this.dxForm1 = this.getDxInstanceByKey("dxFormKey1");
    let items = this.createFormItems([
      {
        itemType: "group",
        caption: "用户原始信息",
        items: [
          {
            dataField: "create_time",
            label: {
              text: "注册时间"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "mobile_num",
            label: {
              text: "原始手机号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "email",
            label: {
              text: "原始邮箱"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "user_name",
            label: {
              text: "原始账号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "nickname",
            label: {
              text: "原始昵称"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "order_create_time",
            label: {
              text: "订单最后支付时间"
            },
            editorOptions: {
              disabled: true
            }
          }
        ]
      }
    ]);
    this.dxForm1.option({
      items: items
    });
    this.bind_form(this.id);
  }

  public async bind_form(id: number) {
    if (id != null && id != undefined && id > 0) {
      let d = await new UserApi().getUserModel(id);
      if (d.code != RespCode.OK) {
        this.errorCodeMsg(d.code, d.msg + " 可以进行搜索修改账号信息!");
        this.options.visible = true;
        return;
      }
      this.dxForm1.option("formData", d.data);

      let db_num = d.data.database_num.toString();
      //用户最后支付的订单
      let d_order = await new InvoiceApi().getListPager(
        db_num,
        "user_id=" + id
      );
      this.dxForm1
        .getEditor("order_create_time")
        .option({ value: d_order.data.list[0].create_time });
    }
  }

  private async onSearch(dic, user_id, db_num) {
    this.bind_form(user_id);
    this.$emit("onSearchUser", user_id);
  }
}
</script>

