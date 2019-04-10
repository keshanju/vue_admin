import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackagePriceModel, Result } from '@/models/PackagePriceModel';
import { PackagePriceApi } from '@/api/PackagePriceApi';
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { RespCode } from '@/common/RespCode';
import { LangResourcesApi } from '@/api/LangResourcesApi';
import { LangUtils } from '@/common/LangUtils';

/**
 * 套餐价格编辑
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;

  private dxFormData1: PackagePriceModel = {
    id: 0,
    type: 0,
    is_recommend: 0,
    round_times_type:1,
    // include_region_codes:"",
    // include_region_codes_arr:[],
    // exclude_region_codes:"",
    // exclude_region_codes_arr:[],
  };
  private dxFormDataReset1: PackagePriceModel = {};

  private packagePriceAPI = new PackagePriceApi();

  private priceID: number = 0;

  private langResourcesApi = new LangResourcesApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐价格编辑";
    this.dsLang = await LangUtils.getLangResourceDic();
    this.priceID = Number("0" + this.getParam("price_id"));
    this.initComponents();
    if (this.priceID > RespCode.zero) {
      await this.getDataModel(this.priceID);
    }
    this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
  }


  /**
   * 初始化控件
   */
  private async initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    let lang = await LangUtils.getLangResourceList();
    const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: this.priceID > RespCode.zero ? "更新" : "添加",
      items: [{
        dataField: "title",
        label: {
          text: "名称"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请输入价格名称",
          acceptCustomValue: true,
          items: lang,
          searchEnabled:true
        },
        validationRules: [
          Validation.getRequired("价格名称不能为空!")
        ]
      }, {
        dataField: "short_desc",
        label: {
          text: "简介"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请输入简介",
          height: 80,
          acceptCustomValue: true,
          items: lang,
          searchEnabled:true
        },
        validationRules: [Validation.getRequired("简介不能为空!")]
      },
      {
        dataField: "price",
        label: {
          text: "价格(单位:分)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          displayExpr: "name",
          value: 0,
          min: 0,
        },
        validationRules: [Validation.getRequired("价格不能为空!")]
      },
      // {
      //   dataField: "price_type",
      //   label: {
      //     text: "价格类型"
      //   },
      //   editorType: "dxSelectBox",
      //   editorOptions: {
      //     displayExpr: "name",
      //     valueExpr: "id",
      //     dataSource: CommonUtils.getDictonary().data.price_type
      //   },
      //   validationRules: [Validation.getRequired("价格类型不能为空!")]
      // },
      // {
      //   dataField: "include_region_codes_arr",
      //   label: {
      //     text: '价格包含地区'
      //   },
      //   editorType: "dxTagBox",
      //   editorOptions: {
      //     placeholder: "请选择包含地区.",
      //     displayExpr: "name",
      //     valueExpr: "id",
      //     showSelectionControls: true,
      //     applyValueMode: "useButtons",
      //     dataSource: CommonUtils.getDictonary().data.region_code,
      //     onValueChanged: sender => {
      //         let aa = sender.value as any[];
      //         if (aa && aa.length > 0) {
      //             (this.dxForm1.getEditor("exclude_region_codes_arr") as DevExpress.ui.dxTagBox).option({
      //                 disabled: true
      //             });
      //         } else {
      //             (this.dxForm1.getEditor("exclude_region_codes_arr") as DevExpress.ui.dxTagBox).option({
      //                 disabled: false
      //             });
      //         }
      //     }
      //   },
      //   //validationRules: [Validation.getRequired("请选择包含地区!")]
      // },
      // {
      //   dataField: "exclude_region_codes_arr",
      //   label: {
      //     text: '价格排除地区'
      //   },
      //   editorType: "dxTagBox",
      //   editorOptions: {
      //     placeholder: "请选择排除地区.",
      //     displayExpr: "name",
      //     valueExpr: "id",
      //     showSelectionControls: true,
      //     applyValueMode: "useButtons",
      //     dataSource: CommonUtils.getDictonary().data.region_code,
      //     onValueChanged: sender => {
      //         let aa = sender.value as any[];
      //         if (aa && aa.length > 0) {
      //             (this.dxForm1.getEditor("include_region_codes_arr") as DevExpress.ui.dxTagBox).option({
      //                 disabled: true
      //             });
      //         } else {
      //             (this.dxForm1.getEditor("include_region_codes_arr") as DevExpress.ui.dxTagBox).option({
      //                 disabled: false
      //             });
      //         }
      //     }
      //   },
      //   //validationRules: [Validation.getRequired("请选择排除地区!")]
      // },
      {
        dataField: "extend_type",
        label: {
          text: "延长类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.duration_date_type
        },
        validationRules: [Validation.getRequired("请选择延长类型!")]
      }, {
        dataField: "extend_time",
        label: {
          text: "延长时间(月/分钟)"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          value: 0,
          min: 0
        },
        validationRules: [Validation.getRequired("请选择延长时间类型!")]
      }, {
        dataField: "free_add_time",
        label: {
          text: "赠送分钟数"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          value: 0,
          min: 0
        }
      }, {
        dataField: "desc",
        label: {
          text: "套餐价格说明"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "套餐价格说明",
          height: 80,
          acceptCustomValue: true,
          items: lang,
          searchEnabled:true
        }
      }, {
        dataField: "order_num",
        label: {
          text: "排序"
        },
        editorOptions: {
          value: 999,
          min: 0
        }
      }, {
        dataField: "points",
        label: {
          text: "购买积分"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          value: 0,
          min: 0
        }
      }, {
        dataField: "ref_points",
        label: {
          text: "推荐人获得积分"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          value: 0,
          min: 0
        }
      }, {
        dataField: "type",
        label: {
          text: "价格类型"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          // displayExpr: "name",
          // valueExpr: "id",
          // dataSource: CommonUtils.getDictonary().data.flag
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.package_price_type
        }
      }, {
        dataField: "is_recommend",
        label: {
          text: "是否推荐"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.flag
        }
      },
      // {
      //   dataField: "short_points",
      //   label: {
      //     text: "活动积分"
      //   },
      //   editorType: "dxNumberBox",
      //   editorOptions: {
      //     value: 0,
      //     min: 0
      //   }
      // },
      // {
      //   dataField: "short_ref_points",
      //   label: {
      //     text: "活动推荐人积分"
      //   },
      //   editorType: "dxNumberBox",
      //   editorOptions: {
      //     value: 0,
      //     min: 0
      //   }
      // },
      {
        dataField: "apple_commodity_id",
        label: {
          text: "苹果商品ID"
        },
        editorType: "dxTextBox",
        editorOptions: {
          placeholder: "请输入苹果商店商品ID."
        }
      },
      {
        dataField: "ref_add_self_time",
        label: {
          text: "推荐人赠送时长（分钟）"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "推荐人赠送时长（分钟）",
          value: 0
        }
      },
      {
        dataField: "ref_add_time",
        label: {
          text: "购买人赠送时长（分钟）"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "购买人赠送时长（分钟）",
          value: 0
        }
      },

      {
        dataField: "round_times_type",
        label: {
          text: "推荐赠送时长周期"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "name",
          valueExpr: "id",
          dataSource: CommonUtils.getDictonary().data.round_times_type
        }
      },
      {
        dataField: "max_ref_add_time",
        label: {
          text: "推荐用户免费最大获得时间值（分钟）"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "为0则不限制",
          value: 0
        }
      },
      {
        dataField: "max_ref_add_self_time",
        label: {
          text: "被推荐人免费最大获得时间值（分钟）"
        },
        editorType: "dxNumberBox",
        editorOptions: {
          placeholder: "为0则不限制",
          value: 0
        }
      },
      ]
    }, {
      itemType: "group",
      colCount: 3,
      items: [
        {
          itemType: "button",
          horizontalAlignment: "center",
          buttonOptions: {
            text: this.priceID > RespCode.zero ? "更新" : "添加",
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
    }];

    let options: DevExpress.ui.dxFormOptions = {
      formData: this.dxFormData1,
      items: items1,
      width: 800,
      validationGroup: "customerData",
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
   * 获取数据
   * @param id 
   */
  private async getDataModel(id: number) {
    let d = await this.packagePriceAPI.getModel(this.ID, id);
    this.dxFormData1 = d.data;

    this.dxFormData1.title = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.title);
    this.dxFormData1.short_desc = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.short_desc);
    this.dxFormData1.desc = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.desc);


    //处理包含区域 排除区域
    // let aa: number[] = [];
    // if (this.dxFormData1.include_region_codes) {
    //   let aa_items = this.dxFormData1.include_region_codes.toString().split(',');
    //   for (const item of aa_items) {
    //     if (item)
    //       aa.push(Number(item));
    //   }
    // }
    // this.dxFormData1.include_region_codes_arr = aa;

    // let bb: number[] = [];
    // if (this.dxFormData1.exclude_region_codes) {
    //   let bb_items = this.dxFormData1.exclude_region_codes.toString().split(',');
    //   for (const item of bb_items) {
    //     if (item)
    //       bb.push(Number(item));
    //   }
    // }
    // this.dxFormData1.exclude_region_codes_arr = bb;

    
    this.dxForm1.option({
      formData: this.dxFormData1
    });
  }

  /**
   * 添加删除
   * @param e 
   */
  private async onClickDoHandler(sender) {
    try {
      if (!this.validateForm(this.dxForm1)) {
        return;
      }
      this.dxFormData1.account_token = this.token;

      this.dxFormData1.title = await LangUtils.getLangResourceId(this.dsLang, this.dxFormData1.title);
      this.dxFormData1.short_desc = await LangUtils.getLangResourceId(this.dsLang, this.dxFormData1.short_desc);
      this.dxFormData1.desc = await LangUtils.getLangResourceId(this.dsLang, this.dxFormData1.desc);

      //处理包含地区 排除地区
      // this.dxFormData1.include_region_codes = this.dxFormData1.include_region_codes_arr.join(',');
      // this.dxFormData1.exclude_region_codes = this.dxFormData1.exclude_region_codes_arr.join(',');

      let f = this.joinFormParams(this.dxFormData1);
      // if (this.dxFormData1.include_region_codes && this.dxFormData1.include_region_codes != "") {
      //   f += "&exclude_region_codes=";
      // } else if (this.dxFormData1.exclude_region_codes && this.dxFormData1.exclude_region_codes != "") {
      //   f += "&include_region_codes=";
      // } else {
      //   f += "&include_region_codes=&exclude_region_codes=";
      // }
      let d: Result;
      if (this.dxFormData1.id == RespCode.zero) {
        d = await this.packagePriceAPI.setAdd(this.ID,  f);
      } else {
        d = await this.packagePriceAPI.setUpdate(this.ID, this.dxFormData1.id,  f);
      }

      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/package/" + this.ID + "/price");
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
    this.redirect("/package/" + this.ID + "/price");
  }

}