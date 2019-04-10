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
        <DxForm ref="dxForm1"></DxForm>
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
  DxPopup,
  DxTextArea,
  DxScrollView
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import { UserApi } from "@/api/UserApi";
import { RespCode } from "@/common/RespCode";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class Home extends BaseVue {
  //组件选项
  private options: any = {
    id: 0,
    visible: false,
    title: "修改主账号",
    toolbarItems: [],
    width: 400,
    height: 230,
    onHidden: null
  };

  @Prop()
  public visible!: boolean;

  @Watch("visible")
  private watch_visible(newVal: boolean, oldVal: boolean) {
    this.options.visible = newVal;
  }

  private dxForm1: DevExpress.ui.dxForm;

  private formData1: any = {};

  protected mounted(): void {
    this.options.visible = this.visible ? true : false;

    this.options.onHidden = () => {
      this.$emit("onHide", false);
    };

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "保存",
        type: "success",
        onClick: async () => {
          try {
            let form = this.dxForm1.option("formData");
            if (form.user_name_1 != form.user_name_2) {
              this.alert("两次输入的新账号不相同!");
              return;
            }
            let postArg = "";
            if (form.master_account == 0) {
              postArg += "mobile_num=" + form.user_name_1;
            } else if (form.master_account == 1) {
              postArg += "mail=" + form.user_name_1;
            }
            let result = await new UserApi().userUpdate(
              form.id,
              "account_token=" + this.token + "&" + postArg
            );
            if (
              result.code == RespCode.OK ||
              result.code == RespCode.isSame ||
              result.code == RespCode.isSameSaveData
            ) {
              this.toast(() => {
                this.$emit("onHide", true);
              });
            } else {
              this.errorCodeMsg(result.code, result.msg);
            }
          } catch (error) {
            this.error(error);
          }
        }
      }
    });

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "取消",
        type: "normal",
        onClick: sender => {
          this.$emit("onHide", false);
        }
      }
    });

    this.dxForm1 = this.getDxInstanceByKey("dxForm1");

    const items2: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        dataField: "old_user",
        label: {
          text: "旧账号"
        },
        editorOptions: {
          placeholder: "请输入名称",
          disabled: true
        },
        validationRules: [Validation.getRequired("名称不能为空!")]
      },
      {
        dataField: "user_name_1",
        label: {
          text: "新账号"
        },
        editorOptions: {
          placeholder: "请输入新账号"
        },
        validationRules: [Validation.getRequired("新账号不能为空!")]
      },
      {
        dataField: "user_name_2",
        label: {
          text: "确认新账号"
        },
        editorOptions: {
          placeholder: "请输入确认新账号"
        },
        validationRules: [Validation.getRequired("确认新账号不能为空!")]
      }
    ];

    this.dxForm1.option({
      items: items2,
      formData: this.formData1
    });
  }

  public async Show(id: number = 0) {
    if (id == 0) {
    } else if (id > 0) {
      //
      let d = await new UserApi().getUserModel(id);
      let model = d.data;
      this.formData1.id = id;
      this.formData1.master_account = model.master_account;
      if (model.master_account == 0) {
        this.formData1.old_user = model.mobile_num;
      } else {
        this.formData1.old_user = model.mail;
      }

      this.dxForm1.option({
        formData: this.formData1
      });
    }
  }
}
</script>
