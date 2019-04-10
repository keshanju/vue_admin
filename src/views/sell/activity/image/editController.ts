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
import { Lang } from "@/common/Lang";
import { dxMyPopuForm } from "@/components/dxMyPopuForm";
import { AreaModel } from "@/models/AreaModel";
import { BaseModel, BaseResult2 } from "@/models/BaseModel";
import { AreaApi } from "@/api/AreaApi";
import { GameApi } from "@/api/GameApi";
import { RespCode } from "@/common/RespCode";
import LogUtil from "@/utils/LogUtil";
import { ActivityImgApi } from "@/api/ActivityImgApi";
import { ActivityImgModel } from "@/models/ActivityImgModel";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class EditController extends BaseVue {
  @Prop()
  public visible!: boolean;

  @Watch("visible")
  private watch_visible(newVal: boolean, oldVal: boolean) {
    this.options.visible = newVal;
    this.dxForm1.resetValues();
  }

  @Prop()
  public id!: number;

  @Watch("id")
  private async watch_id(newVal: number, oldVal: number) {
    console.log(newVal);
    this.options.id = newVal;
    if (newVal == 0) {
      this.dxForm1.resetValues();
      this.forms = {
        id: 0,
        key: 0,
        img_url: ""
      };
      this.iImageNode.attr("src", CommonUtils.DEFAULT_PIC_URL);
    }
    if (newVal > 0) {
      let d = await new ActivityImgApi().getModel(
        this.options.activity_id,
        newVal
      );

      this.forms = d.data;

      this.dxForm1.option({
        formData: this.forms
      });

      this.iImageNode.attr(
        "src",
        this.uploadApi.getUploadHttp + this.forms.img_url
      );
    }
  }

  @Prop()
  public activity_id!: number;

  @Watch("activity_id")
  private watch_activity_id(newVal: number, oldVal: number) {
    this.options.activity_id = newVal;
  }

  /**
   * 选项
   */
  private options: any = {
    activity_id: 0,
    id: 0,
    visible: false,
    title: "活动图片编辑",
    toolbarItems: [],
    width: 500,
    height: 300,
    onHidden: null
  };

  private dxForm1: DevExpress.ui.dxForm;

  private forms: ActivityImgModel = {
    id: 0,
    key: 0
  };

  private iImageNode: JQuery;

  public Add() {
    this.options.visible = true;
    this.options.id = 0;
    this.dxForm1.resetValues();
    this.forms = {
      id: 0,
      key: 0,
      img_url: ""
    };
    this.iImageNode.attr("src", CommonUtils.DEFAULT_PIC_URL);
  }

  mounted() {
    this.options.visible = this.visible ? true : false;
    this.options.id = this.id ? this.id : 0;
    this.options.activity_id = this.activity_id ? this.activity_id : 0;

    this.options.onHidden = () => {
      this.$emit("onHide", false);
    };

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "确定",
        type: "success",
        onClick: async () => {
          try {
            this.forms = this.dxForm1.option("formData");
            let result: BaseResult2;
            this.forms.account_token = this.token;
            if (this.forms.id == 0) {
              result = await new ActivityImgApi().setAdd(
                this.options.activity_id,
                this.forms
              );
            } else if (this.forms.id > 0) {
              result = await new ActivityImgApi().setUpdate(
                this.options.activity_id,
                this.forms.id,
                this.forms
              );
            }

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

    const items: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        dataField: "key",
        label: {
          text: "活动图片类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择活动图片类型",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.img_key_type
        },
        validationRules: [Validation.getRequired("活动图片类型不能为空!")]
      },
      this.createUploadFileFormItem(
        image => {
          this.iImageNode = image;
        },
        {
          dataField: "img_url",
          label: {
            text: "活动图片"
          },
          validationRules: [Validation.getRequired("活动图片不能为空!")]
        },
        {
          name: "filename",
          uploadUrl: this.uploadApi.getUploadNormalPath("activity_images")
        }
      )
    ];

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.forms,
      items: items,
      validationGroup: "customerData"
    };
    this.dxForm1.option(options);
  }
}
