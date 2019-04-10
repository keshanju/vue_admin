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
      <dx-form ref="dxForm1"></dx-form>
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
import { StaffApi } from "@/api/StaffApi";
import md5 from "md5";
import { RespCode } from "@/common/RespCode";

export interface MyPopupOption {
  visible?: boolean;
  title?: string;
  width?: number;
  height?: number;
  toolbarItems?: DevExpress.ui.dxPopupToolbarItem[];
  onHidden?: () => void;
}

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
  
  public options: MyPopupOption = {
    visible: false,
    title: "修改密码",
    toolbarItems: [],
    width: 350,
    height: 200,
    onHidden: () => {}
  };

  public dxForm1: DevExpress.ui.dxForm;

  public created() {
    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "修改保存",
        type: "success",
        onClick: async () => {
          if (!this.validateForm(this.dxForm1)) {
            return;
          }
          let formData: {
            new_password: string;
            new_password_2: string;
          } = this.dxForm1.option("formData");

          let d = CommonUtils.getStaffLoginInfo();
          let user_id = d.data.user_info.id;

          let result = await new StaffApi().staffUpdateJson(user_id, {
            account_token: this.token,
            staff_pwd: md5(formData.new_password),
            staff_pwd2: md5(formData.new_password)
          });
          if (
            result.code == RespCode.OK ||
            result.code == RespCode.isSame ||
            result.code == RespCode.isSameSaveData
          ) {
            this.toast(() => {
              this.redirect("/login");
            }, "修改密码成功!需要重新登录.");
          } else {
            this.errorCodeMsg(result.code, result.msg);
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
        onClick: async () => {
          this.options.visible = false;
        }
      }
    });
  }

  public mounted() {
    let items = this.createFormItems([
      {
        dataField: "new_password",
        label: {
          text: "输入新密码"
        },
        editorOptions: {
          mode: "password",
          placeholder: "请输入8位以上的密码"
        },
        validationRules: [
          Validation.getRequired("新密码不能为空!"),
          Validation.getPassword("密码强度弱了至少8个字符,数字,字母,特殊符号!")
        ]
      },
      {
        dataField: "new_password_2",
        label: {
          text: "确认新密码"
        },
        editorOptions: {
          mode: "password",
          placeholder: "请输入8位以上的密码"
        },
        validationRules: [
          Validation.getRequired("确认新密码不能为空!"),
          Validation.getCompare(
            () => this.dxForm1.option("formData").new_password,
            "两次输入的密码不一致!"
          )
        ]
      }
    ]);
    this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    this.dxForm1.option({
      items: items
    });
  }

  public Show() {
    this.dxForm1.resetValues();
    this.options.visible = true;
  }
}
</script>
