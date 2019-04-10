import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxScrollView
} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import { CardOtherDefineApi } from "@/api/CardOtherApi";
import { Validation } from "@/common/Validation";
import { CardOtherDefineModel } from "@/models/CardOtherModel";
import { CommonUtils } from "@/common/CommonUtils";
/**
 * 第三方充值卡
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
  }
})
export default class ListController extends BaseVue {
  @Prop()
  public visible!: boolean;

  @Watch("visible")
  private watch_visible(newVal: boolean, oldVal: boolean) {
    this.options.visible = newVal;
  }

  @Prop()
  public id!: number;

  @Watch("id")
  private async watch_id(newVal: number, oldVal: number) {
    this.dxForm1.resetValues();
    //this.dxForm1.validate().isValid = true

    this.options.id = newVal;
    if (newVal > 0) {
      this.options.title = "编辑充值卡类别";
      let d = await new CardOtherDefineApi().getModel(this.options.id);
      this.formData1 = d.data;
    } else {
      this.options.title = "添加充值卡类别";
      this.formData1 = {
        id: 0,
        title: "",
        type: 1,
        price: 0,
        price_type: 1,
        is_valid: 1,
        desc: ""
      };
    }
    this.dxForm1.option({
      formData: this.formData1
    });
  }

  //组件选项
  private options: any = {
    id: 0,
    visible: false,
    title: "添加充值卡类别",
    toolbarItems: [],
    width: 600,
    height: 380,
    onHidden: null
  };

  private dxForm1: DevExpress.ui.dxForm;

  private formData1: CardOtherDefineModel = {
    id: 0,
    type: 1,
    price: 0,
    price_type: 1,
    is_valid: 1
  };

  mounted() {
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
          // TODO:sdfsdfsdfsdf
          // for (const iterator of this.dxForm1.validate().brokenRules) {
          //     (iterator as any).isValid=true;
          //     console.log(iterator);
          // }
          if (!this.validateForm(this.dxForm1)) {
            return;
          }
          this.formData1.account_token = this.token;
          if (this.formData1.id == 0) {
            new CardOtherDefineApi().setAdd(this.formData1);
          } else {
            new CardOtherDefineApi().setUpdate(
              this.formData1.id,
              this.formData1
            );
          }
          this.$emit("onHide", true);
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
        dataField: "title",
        label: {
          text: "名称"
        },
        editorOptions: {
          placeholder: "请输入名称"
        },
        validationRules: [Validation.getRequired("名称不能为空!")]
      },
      {
        dataField: "type",
        label: {
          text: "类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择类型",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.other_card_type
        },
        validationRules: [Validation.getRequired("类型不能为空!")]
      },
      {
        dataField: "price",
        label: {
          text: "价格"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "请输入价格"
        },
        validationRules: [Validation.getRequired("价格不能为空!")]
      },
      {
        dataField: "price_type",
        label: {
          text: "价格类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择价格类型",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.price_type
        },
        validationRules: [Validation.getRequired("价格类型不能为空!")]
      },
      {
        dataField: "is_valid",
        label: {
          text: "是否有效"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择有效状态",
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.flag
        },
        validationRules: [Validation.getRequired("有效状态不能为空!")]
      },
      {
        dataField: "desc",
        label: {
          text: "说明"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入说明信息!最小5个字符,最大200个字符",
          height: 80
        },
        validationRules: [Validation.getRequired("说明信息不能为空!")]
      }
    ];

    this.dxForm1.option({
      items: items2,
      formData: this.formData1
    });
  }
}
