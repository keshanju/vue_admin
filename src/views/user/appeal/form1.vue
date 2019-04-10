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

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView
  }
})
export default class Home extends BaseVue {
  @Prop()
  private id!: number;

  @Watch("id")
  private watch_id(val: number) {
    this.bind_Form(val);
  }

  private dxForm1: DevExpress.ui.dxForm;

  protected async mounted() {
    this.dxForm1 = this.getDxInstanceByKey("dxFormKey1");
    let items = this.createFormItems([
      {
        itemType: "group",
        caption: "用户申述请求",
        items: [
          {
            dataField: "user_id",
            label: {
              text: "申诉人"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "appeal_id",
            label: {
              text: "申诉编号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "old_country_code",
            editorType: "dxNumberBox",
            label: {
              text: "旧手机编号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "mobile_num",
            editorType: "dxNumberBox",
            label: {
              text: "旧手机号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "email",
            label: {
              text: "旧邮箱"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "new_country_code",
            editorType: "dxNumberBox",
            label: {
              text: "新手机编号"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "new_mobile_num",
            label: {
              text: "新手机号"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "new_email",
            label: {
              text: "新邮箱"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "user_desc",
            editorType: "dxTextArea",
            label: {
              text: "用户说明"
            },
            editorOptions: {
              disabled: true
            }
          },
          {
            dataField: "appeal_source",
            editorType: "dxSelectBox",
            label: {
              text: "申诉来源"
            },
            editorOptions: {
              disabled: true,
              dataSource: CommonUtils.getDictonary().data.appeal_source,
              displayExpr: "name",
              valueExpr: "id"
            }
          },
          this.createUploadFileFormItem(
            image => {},
            {
              dataField: "appeal_voucher1",
              label: {
                text: "申诉凭证1"
              }
            },
            {}
          ),
          this.createUploadFileFormItem(
            image => {},
            {
              dataField: "appeal_voucher2",
              label: {
                text: "申诉凭证2"
              }
            },
            {}
          ),
           {
            dataField: "status",
            editorType: "dxSelectBox",
            label: {
              text: "审核状态"
            },
            editorOptions: {
              disabled: true,
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.appeal_status
            },
            validationRules: []
          },
          {
            dataField: "op_desc",
            editorType: "dxTextArea",
            label: {
              text: "操作说明"
            },
            editorOptions: {
              placeholder: "操作说明",
              height: 80,
              disabled: true
            },
            validationRules: []
          }
        ]
      }
    ]);
    this.dxForm1.option({
      items: items
    });
    this.bind_Form(this.id);
  }

  private async bind_Form(id: number) {
    if (this.id && this.id > 0) {
      let d = await new UserAppealApi().getUserAppealModel(this.id);
      this.dxForm1.option("formData", d.data);
    }
  }
}
</script>

