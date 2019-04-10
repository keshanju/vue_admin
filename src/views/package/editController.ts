import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackageModel, Result } from '@/models/PackageModel';
import { PackageApi } from '@/api/PackageApi';
import { CommonUtils } from '@/common/CommonUtils';
import { ActivityApi } from '@/api/ActivityApi';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { LangResourcesApi } from '@/api/LangResourcesApi';
import { LangUtils } from '@/common/LangUtils';

/**
 * 套餐编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxFormKey1";
    private dxForm1: DevExpress.ui.dxForm;
    private langResourcesApi = new LangResourcesApi();

    private dxFormData1: PackageModel = {
        id: 0,
        is_valid: 1,
        billing_type: 1,
        price_type: 1,
        is_order_connects: 0,
        is_own_all_lines: 0,
        is_own_all_games: 0,
        is_duration_valid: 0,
        is_config_id: 0,
        include_region_codes: "",
        include_region_codes_arr: [],
        exclude_region_codes: "",
        exclude_region_codes_arr: [],
    };
    private dxFormDataReset1: PackageModel = {};
    private packageAPI = new PackageApi();

    private dxActivitySelectBox: DevExpress.ui.dxSelectBox;
    private activityApi = new ActivityApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "套餐编辑";
        this.dsLang = await LangUtils.getLangResourceDic();
        this.initComponents();
        this.getActivityList();
        if (this.ID > RespCode.zero) {
            await this.getDataModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);

        let max = this.dxForm1.getEditor("total_max_connects") as DevExpress.ui.dxNumberBox;
        let pc = this.dxForm1.getEditor("pc_max_connects") as DevExpress.ui.dxNumberBox;
        let mobile = this.dxForm1.getEditor("mobile_max_connects") as DevExpress.ui.dxNumberBox;

        if (max.option("value") > 0) {
            pc.option("disabled", true);
            mobile.option("disabled", true);
        } else {
            pc.option("disabled", false);
            mobile.option("disabled", false);
        }

        max.option({
            onValueChanged: () => {
                if (max.option("value") > 0) {
                    pc.option("disabled", true);
                    mobile.option("disabled", true);
                } else {
                    pc.option("disabled", false);
                    mobile.option("disabled", false);
                }
            }
        })

    }

    /**
     * 控件初始化
     */
    private async initComponents() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        let lang = await LangUtils.getLangResourceList();
        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            //caption: this.ID > RespCode.zero ? "更新" : "添加",
            items: [
                {
                    dataField: "title",
                    label: {
                        text: "名称"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "请输入套餐名称",
                        acceptCustomValue: true,
                        items: lang,
                        searchEnabled: true
                    },
                    validationRules: [
                        Validation.getRequired("套餐名称不能为空")
                    ],
                }, {
                    dataField: "is_valid",
                    label: {
                        text: "是否有效"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.valid
                    }
                },
                {
                    dataField: "billing_type",
                    label: {
                        text: "计费方式"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.billing_type
                    },
                    validationRules: [Validation.getRequired("计费方式不能为空!")]
                },
                {
                    dataField: "price_type",
                    label: {
                        text: "价格类型"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.price_type
                    },
                    validationRules: [Validation.getRequired("价格类型不能为空!")],
                },
                {
                    dataField: "include_region_codes_arr",
                    label: {
                        text: '价格包含地区'
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
                                (this.dxForm1.getEditor("exclude_region_codes_arr") as DevExpress.ui.dxTagBox).option({
                                    disabled: true
                                });
                            } else {
                                (this.dxForm1.getEditor("exclude_region_codes_arr") as DevExpress.ui.dxTagBox).option({
                                    disabled: false
                                });
                            }
                        }
                    },
                    //validationRules: [Validation.getRequired("请选择包含地区!")]
                },
                {
                    dataField: "exclude_region_codes_arr",
                    label: {
                        text: '价格排除地区'
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
                                (this.dxForm1.getEditor("include_region_codes_arr") as DevExpress.ui.dxTagBox).option({
                                    disabled: true
                                });
                            } else {
                                (this.dxForm1.getEditor("include_region_codes_arr") as DevExpress.ui.dxTagBox).option({
                                    disabled: false
                                });
                            }
                        }
                    },
                    //validationRules: [Validation.getRequired("请选择排除地区!")]
                },
                {
                    dataField: "order_position",
                    label: {
                        text: "排序位置(默认999)"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: "999"
                    }
                }, {
                    dataField: "short_desc",
                    label: {
                        text: "短备注"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        placeholder: "请输入短备注",
                        acceptCustomValue: true,
                        items: lang,
                        height: 80,
                        searchEnabled: true
                    },
                    validationRules: [Validation.getRequired("短备注不能为空!")]
                },
                {
                    dataField: "desc",
                    label: {
                        text: "备注"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        height: 80,
                        placeholder: "备注信息",
                        acceptCustomValue: true,
                        items: lang,
                        searchEnabled: true
                    }
                },
                // {
                //     dataField: "short_activity_id",
                //     label: {
                //         text: "活动"
                //     },
                //     editorType: "dxSelectBox",
                //     editorOptions: {
                //         displayExpr: "title",
                //         valueExpr: "id",
                //         searchEnabled: true,
                //     }
                // },
                {
                    dataField: "is_order_connects",
                    label: {
                        text: "是否允许用户自定义连接数"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.authority
                    }
                },
                {
                    dataField: "total_max_connects",
                    label: {
                        text: "最大连接数"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: 0,
                        min: 0
                    }
                },
                {
                    dataField: "pc_max_connects",
                    label: {
                        text: "PC连接数"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: 0,
                        min: 0
                    }
                },
                {
                    dataField: "mobile_max_connects",
                    label: {
                        text: "手机连接数"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: 0,
                        min: 0
                    }
                },
                // {
                //     dataField: "up_speed_rate",
                //     label: {
                //         text: "上传速度(KB)"
                //     },
                //     editorType: "dxNumberBox",
                //     editorOptions: {
                //         value: 0,
                //         min: 0
                //     }
                // },
                // {
                //     dataField: "down_speed_rate",
                //     label: {
                //         text: "下载速度(KB)"
                //     },
                //     editorType: "dxNumberBox",
                //     editorOptions: {
                //         value: 0,
                //         min: 0
                //     }
                // },
                {
                    dataField: "is_own_all_lines",
                    label: {
                        text: "是否拥有全部线路"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.flag
                    }
                },
                {
                    dataField: "is_own_all_games",
                    label: {
                        text: "是否拥有全部游戏"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.flag
                    }
                },
                {
                    dataField: "package_refund_allow_days",
                    label: {
                        text: "允许全额退款天数"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: 0
                    }
                },
                {
                    dataField: "gateway_fee",
                    label: {
                        text: "手续费"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        value: 0,
                        min: 0
                    }
                },
                {
                    dataField: "package_level",
                    label: {
                        text: "套餐级别"
                    },
                    editorType: "dxNumberBox",
                    editorOptions: {
                        placeholder: "请输入大于0的数字,主要给前端做判断使用.",
                        value: 0,
                        min: 0
                    }
                },
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
        }];

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: items1,
            width: 800,
            validationGroup: "customerData",
        };
        this.dxForm1.option(options);

        this.dxActivitySelectBox = this.dxForm1.getEditor("short_activity_id");
        //获取连接数

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
        let d = await this.packageAPI.getModel(id);
        this.dxFormData1 = d.data;

        this.dxFormData1.title = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.title);
        this.dxFormData1.short_desc = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.short_desc);
        this.dxFormData1.desc = await LangUtils.getLangResourceTitle(this.dsLang, this.dxFormData1.desc);

        //处理包含区域 排除区域
        this.dxFormData1.include_region_codes_arr = this.getRegionCode(this.dxFormData1.include_region_codes);
        this.dxFormData1.exclude_region_codes_arr = this.getRegionCode(this.dxFormData1.exclude_region_codes);

        this.dxForm1.option({
            formData: this.dxFormData1
        });
    }

    /**
     * 添加 修改 事件
     * @param sender 
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
            this.dxFormData1.include_region_codes = this.dxFormData1.include_region_codes_arr.join(',');
            this.dxFormData1.exclude_region_codes = this.dxFormData1.exclude_region_codes_arr.join(',');

            let f = this.joinFormParams(this.dxFormData1);
            if (this.dxFormData1.include_region_codes && this.dxFormData1.include_region_codes != "") {
                f += "&exclude_region_codes=";
            } else if (this.dxFormData1.exclude_region_codes && this.dxFormData1.exclude_region_codes != "") {
                f += "&include_region_codes=";
            } else {
                f += "&include_region_codes=&exclude_region_codes=";
            }

            let d: Result;
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.packageAPI.seteAdd(f);
            } else {
                d = await this.packageAPI.setUpdate(this.ID, f);
            }

            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/package/list");
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
     * @param sender 
     */
    private async onClickBackHandler(sender) {
        this.redirect("/package/list");
    }

    /**
     * 获取活动列表
     */
    private async getActivityList() {
        // let d = await this.activityApi.getList();
        // this.dxActivitySelectBox.option({
        //     dataSource: d.data
        // });
    }

}