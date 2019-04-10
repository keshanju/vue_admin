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
import Form1 from "./form1.vue";
import Form2 from "./form2.vue";
import Audit1 from "./audit.vue";
/**
 * 申述编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    Form1,
    Form2,
    Audit1
  }
})
export default class Home extends BaseVue {
  private options: {
    id?: number;
    status?: number;
  } = {};

  async created() {
    this.setTitle("用户申述");
    this.options.id = (this.$route.params["id"] as any) as number;
  }

  async mounted() {
    let d = await new UserAppealApi().getUserAppealModel(this.options.id);
    let form2 = this.$refs["formKey2"] as any;
    form2.bind_form(d.data.user_id);

    let form3 = this.$refs["formKey3"] as any;
    Object.assign(this.options, { status: d.data.status });
    form3.bind_form(d.data.user_id, d.data.status);
  }

  private onSearchUser(user_id: number) {
    let form3 = this.$refs["formKey3"] as any;
    form3.bind_form(user_id, this.options.status);
  }
}
