import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";

import BaseVue from "@/common/BaseVue";

import { ActivityApi } from "@/api/ActivityApi";
import { ActivityModel, Result } from "@/models/ActivityModel";

import "ckeditor";
import { CommonUtils } from "@/common/CommonUtils";
import { UploadApi } from "@/api/UploadApi";
import { RespCode } from "@/common/RespCode";
import { Validation } from "@/common/Validation";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { DevUtils } from "@/utils/DevUtils";
import { dxUEditorFormItem } from "@/components/dxUEditorFormItem";

/**
 * 活动编辑
 */
@Component({
  components: {
    DxDataGrid,
    DxForm
  }
})
export default class Home extends BaseVue {
  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: ActivityModel = {
    id: 0,
    start_time: DateTimeUtils.getNow("yyyy-MM-dd HH:mm:ss"),
    end_time: DateTimeUtils.getNow("yyyy-MM-dd HH:mm:ss"),
    url_type: 0,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: [],
    attend_num_appoint: 1,
    attend_num_randon: 0,
    is_pay_user: 0
  };
  private dxFormDataReset1: ActivityModel = {};

  private newsAPI = new ActivityApi();
  protected uploadApi = new UploadApi();

  private myEditor: CKEDITOR.editor;
  private myEditorPrize: CKEDITOR.editor;

  private aParentNode: JQuery;
  private aParentNodePrize: JQuery;

  private iImageNode: JQuery;

  private UE: any;
  private UEPrice: any;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "活动编辑";

    if (this.ID > RespCode.zero) {
      let d = await this.newsAPI.getModel(this.ID);
      this.dxFormData1 = d.data;

      //处理包含区域 排除区域
      this.dxFormData1.include_region_codes_arr = this.getRegionCode(
        this.dxFormData1.include_region_codes
      );
      this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
        this.dxFormData1.exclude_region_codes
      );
    }

    this.initComponents();

    if (this.ID > RespCode.zero) {
      await this.getDataModel(this.ID);

      this.iImageNode.attr(
        "src",
        this.uploadApi.getUploadHttp + this.dxFormData1.image
      );
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    //编辑器初始化
    // this.myEditor = CKEDITOR.replace(this.aParentNode[0].id, {
    //   height: 450
    // });
    // this.myEditor.on("instanceReady", sender => {
    //   this.myEditor.setData(this.dxFormData1.content);
    // });

    // this.myEditorPrize = CKEDITOR.replace(this.aParentNodePrize[0].id, {
    //   height: 150
    // });
    // this.myEditorPrize.on("instanceReady", sender => {
    //   this.myEditorPrize.setData(this.dxFormData1.prize);
    // });
  }

  /**
   * 控件初始化
   */
  private initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    const items1: Array<
      | DevExpress.ui.dxFormSimpleItem
      | DevExpress.ui.dxFormGroupItem
      | DevExpress.ui.dxFormTabbedItem
      | DevExpress.ui.dxFormEmptyItem
      | DevExpress.ui.dxFormButtonItem
    > = [
      {
        itemType: "group",
        //caption: this.ID > RespCode.zero ? "更新" : "添加",
        items: [
          {
            dataField: "title",
            label: {
              text: "标题"
            },
            editorOptions: {
              placeholder: "请输入标题"
            },
            validationRules: [Validation.getRequired("标题不能为空!")]
          },
          {
            dataField: "seo_keywords",
            label: {
              text: "SEO关键词"
            },
            editorOptions: {
              placeholder: "请输入SEO关键词"
            }
          },
          {
            dataField: "seo_desc",
            label: {
              text: "SEO描述信息"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入SEO描述信息",
              height: 120
            }
          },
          {
            dataField: "fee",
            label: {
              text: "所需积分"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: "请输入积分",
              value: 0,
              min: 0
            },
            validationRules: [Validation.getRequired("请输入积分!")]
          },
          {
            dataField: "type",
            label: {
              text: "类别"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择分类类别",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.activity_type
            },
            validationRules: [Validation.getRequired("分类类别能为空!")]
          },
          {
            dataField: "attend_num_appoint",
            label: {
              text: "指定抽奖类型"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择分类类别",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.attend_appoint_type
            },
            validationRules: []
          },
          {
            dataField: "attend_num_randon",
            label: {
              text: "随机抽奖次数"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: "请输入随机奖品次数",
              value: 0,
              min: 0
            },
            validationRules: []
          },
          {
            dataField: "is_pay_user",
            label: {
              text: "活动是否只对付费用户有效"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择是否",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.flag
            },
            validationRules: []
          },
          {
            dataField: "plat_type",
            label: {
              text: "支持类型"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择支持类型",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.support_type
            },
            validationRules: [Validation.getRequired("支持类型不能为空!")]
          },
          {
            dataField: "label",
            label: {
              text: "标签"
            },
            editorOptions: {
              placeholder: "请输入标签信息"
            },
            validationRules: [Validation.getRequired("标签不能为空!")]
          },
          this.createUploadFileFormItem(
            image => {
              this.iImageNode = image;
            },
            {
              dataField: "image",
              label: {
                text: "活动图片"
              },
              validationRules: [Validation.getRequired("活动图片不能为空")]
            },
            {
              name: "filename",
              uploadUrl: this.uploadApi.getUploadNormalPath("images")
            }
          ),
          {
            dataField: "summary",
            label: {
              text: "活动简介"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入活动简介",
              height: 120
            },
            validationRules: [Validation.getRequired("活动简介不能为空!")]
          },
          this.createUploadFileFormItem(
            image => {
              //if (this.myEditor != null)
              //this.myEditor.insertHtml('<img src="' + image + '" />');
              if (this.UE != null)
                this.UE.execCommand(
                  "insertHtml",
                  '<img src="' + image + '" />'
                );
            },
            {
              label: {
                text: "插入图片"
              }
            },
            {
              name: "filename",
              uploadUrl: this.uploadApi.getUploadNormalPath("images")
            },
            false
          ),
          // {
          //   dataField: "content",
          //   label: {
          //     text: "详细"
          //   },
          //   itemType: "simple",
          //   ID: "content",
          //   template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {
          //     let html = '<textarea name="editor" id="editor"></textarea>';
          //     this.aParentNode = $(html);
          //     this.aParentNode.appendTo(aItemEle);
          //   },
          //   validationRules: [
          //     Validation.getRequired("详细内容能为空!")
          //   ]
          // },
          dxUEditorFormItem.createUEEditor(
            {
              dataField: "content",
              label: {
                text: "详细"
              },
              editorOptions: {
                placeholder: "请输入详细内容"
              },
              validationRules: [Validation.getRequired("详细内容能为空!")]
            },
            editor => {
              this.UE = editor;
            }
          ),
          // {
          //   dataField: "prize",
          //   label: {
          //     text: "奖品"
          //   },
          //   itemType: "simple",
          //   ID: "content",
          //   template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string }, aItemEle: JQuery) => {
          //     let html = '<textarea name="editor_prize" id="editor_prize"></textarea>';
          //     this.aParentNodePrize = $(html);
          //     this.aParentNodePrize.appendTo(aItemEle);
          //   }
          // },
          dxUEditorFormItem.createUEEditor(
            {
              dataField: "prize",
              label: {
                text: "奖品"
              },
              editorOptions: {
                placeholder: "请输入奖品信息",
                height: 150
              }
            },
            editor => {
              this.UEPrice = editor;
            }
          ),
          {
            dataField: "start_time",
            label: {
              text: "开始时间"
            },
            editorType: "dxDateBox",
            editorOptions: {
              placeholder: "请输入开始时间",
              type: "datetime",
              displayFormat: "yyyy-MM-dd HH:mm:ss",
              dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
              //min: new Date(),
              showClearButton: true
            },
            validationRules: [Validation.getRequired("开始时间不能为空!")]
          },
          {
            dataField: "end_time",
            label: {
              text: "结束时间"
            },
            editorType: "dxDateBox",
            editorOptions: {
              placeholder: "请输入结束时间",
              type: "datetime",
              displayFormat: "yyyy-MM-dd HH:mm:ss",
              dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
              //min: new Date(),
              showClearButton: true
            },
            validationRules: [Validation.getRequired("结束时间不能为空!")]
          },
          {
            dataField: "hits",
            label: {
              text: "点击次数"
            },
            editorType: "dxNumberBox",
            editorOptions: {
              min: 0,
              value: 0
            },
            validationRules: [Validation.getRequired("点击次数不能为空!")]
          },
          {
            dataField: "url_type",
            label: {
              text: "是否链接"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.flag
            },
            validationRules: [Validation.getRequired("链接不能为空!")]
          },
          {
            dataField: "url",
            label: {
              text: "链接"
            },
            editorOptions: {},
            validationRules: [Validation.getHttp()]
          },
          {
            dataField: "include_region_codes_arr",
            label: {
              text: "活动包含地区"
            },
            editorType: "dxTagBox",
            editorOptions: {
              placeholder: "请选择包含地区.",
              displayExpr: "name",
              valueExpr: "id",
              showSelectionControls: true,
              applyValueMode: "useButtons",
              dataSource: CommonUtils.getDictonary().data.region_code,
              onValueChanged: sender => {
                let aa = sender.value as any[];
                if (aa && aa.length > 0) {
                  (this.dxForm1.getEditor(
                    "exclude_region_codes_arr"
                  ) as DevExpress.ui.dxTagBox).option({
                    disabled: true
                  });
                } else {
                  (this.dxForm1.getEditor(
                    "exclude_region_codes_arr"
                  ) as DevExpress.ui.dxTagBox).option({
                    disabled: false
                  });
                }
              }
            }
          },
          {
            dataField: "exclude_region_codes_arr",
            label: {
              text: "活动排除地区"
            },
            editorType: "dxTagBox",
            editorOptions: {
              placeholder: "请选择排除地区.",
              displayExpr: "name",
              valueExpr: "id",
              showSelectionControls: true,
              applyValueMode: "useButtons",
              dataSource: CommonUtils.getDictonary().data.region_code,
              onValueChanged: sender => {
                let aa = sender.value as any[];
                if (aa && aa.length > 0) {
                  (this.dxForm1.getEditor(
                    "include_region_codes_arr"
                  ) as DevExpress.ui.dxTagBox).option({
                    disabled: true
                  });
                } else {
                  (this.dxForm1.getEditor(
                    "include_region_codes_arr"
                  ) as DevExpress.ui.dxTagBox).option({
                    disabled: false
                  });
                }
              }
            }
          }
        ]
      },
      {
        itemType: "group",
        colCount: 3,
        items: [
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: this.ID > RespCode.zero ? "更新" : "添加",
              type: "success",
              useSubmitBehavior: true,
              onClick: this.onClickDoHandler
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "重置",
              type: "normal",
              onClick: this.onResetHandler
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "返回",
              type: "normal",
              onClick: this.onClickBackHandler
            }
          }
        ]
      }
    ];

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.dxFormData1,
      items: items1,
      width: 1000,
      validationGroup: "customerData"
    };
    this.dxForm1.option(options);
  }
  /**
   * 重置
   */
  private onResetHandler(sender) {
    this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
    this.dxForm1.option("formData", this.dxFormData1);
  }
  /**
   * 数据模型
   * @param id
   */
  private async getDataModel(id: number) {
    let d = await this.newsAPI.getModel(id);
    this.dxFormData1 = d.data;

    //处理包含区域 排除区域
    this.dxFormData1.include_region_codes_arr = this.getRegionCode(
      this.dxFormData1.include_region_codes
    );
    this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
      this.dxFormData1.exclude_region_codes
    );

    this.dxForm1.option({
      formData: this.dxFormData1
    });
  }

  /**
   * 添加 修改 事件
   * @param e
   */
  private async onClickDoHandler(sender) {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      this.dxFormData1.account_token = this.token;

      //处理包含地区 排除地区
      this.dxFormData1.include_region_codes = this.dxFormData1.include_region_codes_arr.join(
        ","
      );
      this.dxFormData1.exclude_region_codes = this.dxFormData1.exclude_region_codes_arr.join(
        ","
      );

      let f = this.joinFormParams(this.dxFormData1);
      if (
        this.dxFormData1.include_region_codes &&
        this.dxFormData1.include_region_codes != ""
      ) {
        f += "&exclude_region_codes=";
      } else if (
        this.dxFormData1.exclude_region_codes &&
        this.dxFormData1.exclude_region_codes != ""
      ) {
        f += "&include_region_codes=";
      } else {
        f += "&include_region_codes=&exclude_region_codes=";
      }

      let d: Result;
      if (this.dxFormData1.id == RespCode.zero) {
        d = await this.newsAPI.setAdd(f);
      } else {
        d = await this.newsAPI.setUpdate(this.ID, f);
        //d = await this.newsAPI.setUpdate(this.ID, $.param(this.dxFormData1));
      }

      if (
        d.code == RespCode.OK ||
        d.code == RespCode.isSame ||
        d.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/sell/activity/list");
        });
      } else {
        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * 跳转
   * @param e
   */
  private async onClickBackHandler(sender) {
    this.redirect("/sell/activity/list");
  }
}
