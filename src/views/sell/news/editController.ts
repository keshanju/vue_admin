import { Component, Vue, Prop } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm } from "devextreme-vue";
import $ from "jquery";

import BaseVue from "@/common/BaseVue";

import { NewsApi } from "@/api/NewsApi";
import { NewsModel, Result } from "@/models/NewsModel";

import "ckeditor";
import { CommonUtils } from "@/common/CommonUtils";
import { Validation } from "@/common/Validation";
import { RespCode } from "@/common/RespCode";
import dxFileUploader from "devextreme/ui/file_uploader";
import { dxUEditorFormItem } from "@/components/dxUEditorFormItem";
import { DateTimeUtils } from "@/utils/DateTimeUtils";

/**
 * 公告编辑
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
  private dxFormData1: NewsModel = {
    id: 0,
    class_type: 0,
    support_type: 1,
    publish_status: 1,
    include_region_codes: "",
    include_region_codes_arr: [],
    exclude_region_codes: "",
    exclude_region_codes_arr: [],
    publish_time: DateTimeUtils.getNow(),
    is_top: 0,
    is_client_popup: 0
  };
  private dxFormDataReset1: NewsModel = {};
  private newsAPI = new NewsApi();
  private iImageNode: JQuery;
  private UE: any;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "文章编辑";

    if (this.ID > RespCode.zero) {
      let d = await this.newsAPI.getModel(this.ID);
      this.dxFormData1 = d.data;
    }

    this.initComponents();

    if (this.ID > RespCode.zero) {
      //处理包含区域 排除区域
      this.dxFormData1.include_region_codes_arr = this.getRegionCode(
        this.dxFormData1.include_region_codes
      );
      this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(
        this.dxFormData1.exclude_region_codes
      );

      this.iImageNode.attr(
        "src",
        this.uploadApi.getUploadHttp + this.dxFormData1.image_url
      );

      this.dxForm1.option({
        formData: this.dxFormData1
      });
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
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
            dataField: "class_type",
            label: {
              text: "类别"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择分类类别",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.class_type
            },
            validationRules: [Validation.getRequired("分类类别不能为空!")]
          },
          {
            dataField: "label",
            label: {
              text: "标签关键词列表"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入标签关键词,多个请用英文逗号分开.",
              height: 120
            }
          },
          {
            dataField: "summary",
            label: {
              text: "摘要"
            },
            editorType: "dxTextArea",
            editorOptions: {
              placeholder: "请输入摘要信息"
            },
            validationRules: []
          },
          this.createUploadFileFormItem(
            image => {
              this.iImageNode = image;
            },
            {
              dataField: "image_url",
              label: {
                text: "公告图片"
              },
              validationRules: []
            },
            {
              name: "filename",
              uploadUrl: this.uploadApi.getUploadNormalPath("images")
            }
          ),
          this.createUploadFileFormItem(
            image => {
              if (this.UE != null)
                this.UE.execCommand(
                  "insertHtml",
                  '<img src="' + image + '" />'
                );
            },
            {
              label: {
                text: "上传图片"
              }
            },
            {
              name: "filename",
              uploadUrl: this.uploadApi.getUploadNormalPath("images")
            },
            false
          ),
          dxUEditorFormItem.createUEEditor(
            {
              dataField: "content",
              label: {
                text: "详细"
              },
              editorOptions: {
                placeholder: "请输入详细内容"
              }
            },
            editor => {
              this.UE = editor;
            }
          ),
          {
            dataField: "tag",
            label: {
              text: "引用标记"
            },
            editorOptions: {
              placeholder: "请输入引用标记"
            },
            validationRules: []
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
            dataField: "support_type",
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
            dataField: "publish_status",
            label: {
              text: "发布状态"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择发布状态",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.publish_status
            },
            validationRules: [Validation.getRequired("发布状态不能为空!")]
          },
          {
            dataField: "is_top",
            label: {
              text: "是否置顶"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择置顶状态",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.flag
            },
            validationRules: [Validation.getRequired("置顶状态不能为空!")]
          },
          {
            dataField: "is_client_popup",
            label: {
              text: "是否弹窗"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: "请选择弹窗状态",
              displayExpr: "name",
              valueExpr: "id",
              dataSource: CommonUtils.getDictonary().data.flag
            },
            validationRules: [Validation.getRequired("置顶弹窗不能为空!")]
          },
          {
            dataField: "publish_time",
            label: {
              text: "发布时间"
            },
            editorType: "dxDateBox",
            editorOptions: {
              placeholder: "请输入发布时间",
              type: "datetime",
              displayFormat: "yyyy-MM-dd HH:mm:ss",
              dateSerializationFormat: "yyyy-MM-dd HH:mm:ss"
              //showClearButton: true,
            },
            validationRules: [Validation.getRequired("发布时间不能为空!")]
          },
          {
            dataField: "expiry_time",
            label: {
              text: "过期时间"
            },
            editorType: "dxDateBox",
            editorOptions: {
              placeholder: "请输入过期时间",
              type: "datetime",
              displayFormat: "yyyy-MM-dd HH:mm:ss",
              dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
              showClearButton: true
            },
            validationRules: [
              //Validation.getRequired("开始时间不能为空!")
            ]
          },
          {
            dataField: "include_region_codes_arr",
            label: {
              text: "文章包含地区"
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
              // validationRules: [
              //   Validation.getRequired("开始时间不能为空!")
              // ]
            }
          },
          {
            dataField: "exclude_region_codes_arr",
            label: {
              text: "文章排除地区"
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
      width: 1200,
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
   * 添加 修改 事件
   * @param e
   */
  private async onClickDoHandler(sender) {
    let btn: DevExpress.ui.dxButton = sender.component;
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      //禁用提交按钮
      btn.option({
        disabled: true
      });

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
      }
      if (
        d.code == RespCode.OK ||
        d.code == RespCode.isSame ||
        d.code == RespCode.isSameSaveData
      ) {
        this.toast(() => {
          this.redirect("/sell/news/list");
        });
      } else {
        btn.option({
          disabled: false
        });

        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      btn.option({
        disabled: false
      });
      this.error(error);
    }
  }

  /**
   * 跳转
   * @param e
   */
  private async onClickBackHandler(sender) {
    this.redirect("/sell/news/list");
  }
}
