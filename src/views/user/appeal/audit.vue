<template>
  <div>
    <DxForm ref="dxFormKey1"></DxForm>
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
import { UserApi } from "@/api/UserApi";
import Enumerable from "linq";
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView
  }
})
export default class Home extends BaseVue {
  @Prop()
  private appeal_id!: number;

  private dxForm1: DevExpress.ui.dxForm;

  private options: { appeal_id?: number; user_id?: number } = {};

  created() {
    this.options.appeal_id = this.appeal_id;
  }

  async mounted() {
    this.dxForm1 = this.getDxInstanceByKey("dxFormKey1");

    let dic = Enumerable.from(CommonUtils.getDictonary().data.appeal_status)
      .where(p => p.id != 0)
      .toArray();

    let items = this.createFormItems([
      {
        itemType: "group",
        caption: "用户审核状态",
        items: [
          {
            label: {
              text: "国家区号"
            },
            dataField: "country_code",
            editorType: "dxSelectBox",
            editorOptions: {
              searchEnabled: true,
              placeholder: "请选择国家区号查询!",
              dataSource: CommonUtils.getCountryCode(),
              displayExpr: "id",
              valueExpr: "id"
            },
            validationRules: []
          },
          {
            dataField: "mobile_num",
            label: {
              text: "新手机号"
            },
            editorOptions: {
              placeholder: "请输入新手机号!"
            }
          },
          {
            dataField: "mail",
            label: {
              text: "新邮箱"
            },
            editorOptions: {
              placeholder: "请输入新邮箱!"
            }
          },
          {
            dataField: "user_name",
            label: {
              text: "新账号"
            },
            editorOptions: {
              placeholder: "请输入新账号!"
            }
          },
          {
            dataField: "user_pwd",
            label: {
              text: "新密码"
            },
            editorOptions: {
              placeholder: "请输入用户新密码,留空不修改!"
            }
          },
          {
            dataField: "status",
            editorType: "dxSelectBox",
            label: {
              text: "审核状态"
            },
            editorOptions: {
              displayExpr: "name",
              valueExpr: "id",
              dataSource: dic
            },
            validationRules: [Validation.getRequired("审核状态不能为空!")]
          },
          {
            dataField: "op_desc",
            editorType: "dxTextArea",
            label: {
              text: "操作说明"
            },
            editorOptions: {
              placeholder: "操作说明",
              height: 80
            },
            validationRules: [Validation.getRequired("操作说明不能为空!")]
          }
        ]
      },
      {
        itemType: "group",
        colCount: 2,
        items: [
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "确认审核",
              type: "success",
              useSubmitBehavior: true,
              onClick: async () => {
                let formData = this.dxForm1.option("formData");
                let newFormData = {
                  country_code: formData.country_code,
                  mobile_num: formData.mobile_num,
                  mail: formData.mail,
                  user_name: formData.user_name,
                  user_pwd: formData.user_pwd
                };

                for (const row in newFormData) {
                  console.log(row);
                }

                let d = await new UserAppealApi().userAppealUpdate(
                  this.options.appeal_id,
                  `status=${formData.status}&op_desc=${formData.op_desc}`
                );

                if (
                  d.code == RespCode.OK ||
                  d.code == RespCode.isSame ||
                  d.code == RespCode.isSameSaveData
                ) {
                  // let d2 = await new UserApi().userUpdate(
                  //   this.options.user_id,
                  //   ""
                  // );
                }
              }
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "返回",
              type: "normal",
              onClick: () => {
                this.redirect("/user/appeal/list");
              }
            }
          }
        ]
      }
    ]);
    this.dxForm1.option({
      items: items
    });
  }

  private async bind_form(id: number, status: number) {
    this.options.user_id = id;
    let d = await new UserApi().getUserModel(id);
    this.dxForm1.option("formData", d.data);
  }
}
</script>

