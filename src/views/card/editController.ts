import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import {CardsApi} from '@/api/CardsApi';
import {CardsModel} from '@/models/CardsModel';
import {BaseModel} from '@/models/BaseModel';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 卡类别编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;

    private cardsAPI = new CardsApi();

    private dxFormData1: CardsModel = {
        id: 0,
        is_valid: 1,
        price_type: 1,
        card_type:0
    };
    private dxFormDataReset1: CardsModel = {};

    protected async mounted() {

        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();
        // this.getGameList();
        if (this.ID !== RespCode.zero) {
            await this.getCardsModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        //表单项
        const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        //卡名称
        items2.push({
            dataField: "title",
            label: {
                text: "卡名称"
            },
            editorOptions: {
                placeholder: "请输入卡名称"
            },
            validationRules: [
                Validation.getRequired("卡名称不能为空!"),
            ]
        });


        //卡前缀
        items2.push({
            dataField: "card_prefix",
            label: {
                text: "卡前缀"
            },
            editorOptions: {
                placeholder: "请输入卡前缀",
            },
            validationRules: [
                Validation.getRequired("卡前缀不能为空!"),
            ]
        });
        //是否有效
        items2.push({
            dataField: "is_valid",
            editorType: "dxSelectBox",
            label: {
                text: "是否有效"
            },
            editorOptions: {
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.flag
            }
        });
        //价格类型
        items2.push({
            dataField: "price_type",
            editorType: "dxSelectBox",
            label: {
                text: "价格类型"
            },
            editorOptions: {
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.price_type
            }
        });
        //价格
        items2.push({
            dataField: "price",
            label: {
                text: "价格(分)"
            },
            editorType: "dxNumberBox",
            editorOptions: {
                placeholder: "请输入价格",
                value: 0,
            },
            validationRules: [
                Validation.getRequired("价格不能为空!"),
            ]
        });
        //分钟数
        items2.push({
            dataField: "minutes",
            label: {
                text: "分钟数"
            },
            editorType: "dxNumberBox",
            editorOptions: {
                value: 1,
                placeholder: "分钟数"
            },
            validationRules: [
                Validation.getRequired("分钟数不能为空!"),
            ],
        });
        //卡定义类型 卡类型，0：充值卡，1：体检卡
        items2.push({
            dataField: "card_type",
            label: {
                text: "卡定义类型"
            },
            editorType: "dxSelectBox",
            editorOptions: {
                placeholder: "请选择卡定义类型",
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.card_define_type
            },
            validationRules: [
                Validation.getRequired("卡定义类型不能为空!"),
            ],
        });
        //卡定义最大使用个数 默认为0  不限制  充值卡使用次数，0：不限制
        items2.push({
            dataField: "max_used_count",
            label: {
                text: "同一用户使用次数"
            },
            editorType: "dxNumberBox",
            editorOptions: {
                value: 0,
                placeholder: "同一用户使用次数，0：不限制"
            },
            validationRules: [
                Validation.getRequired("同一用户使用次数不能为空!"),
            ],
        });
        //说明
        items2.push({
            dataField: "desc",
            label: {
                text: "说明"
            },
            editorType: "dxTextArea",
            editorOptions: {
                placeholder: "请输入说明"
            },
            validationRules: [
                Validation.getRequired("说明不能为空!"),
            ]
        });



        //按钮组
        const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: this.ID > 0 ? Lang.Update : Lang.Add,
                type: "success",
                useSubmitBehavior: true,
                onClick: this.onClickDoHandler
            }
        });

        if (this.ID == 0) {
            items3.push({
                itemType: "button",
                horizontalAlignment: "center",
                buttonOptions: {
                    text: "重置",
                    type: "normal",
                    onClick: this.onResetHandler
                }
            });
        }

        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: Lang.Back,
                type: "normal",
                useSubmitBehavior: true,
                onClick: this.onClickBackHandler
            }
        });

        //分组
        const group2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        group2.push({
            itemType: "group",
            caption: Lang.Edit,
            items: items2
        }, {
                itemType: "group",
                colCount: 3,
                items: items3
            });

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: group2,
            width: 500
        }
        this.dxForm1.option(options);
        // this.dxSelectBox1 = this.dxForm1.getEditor("role_id");
    }
    /**
     * 重置
     */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
        this.dxForm1.option("formData", this.dxFormData1);
    }
    /**
   * 充值卡信息提交
   */
    private async onClickDoHandler() {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return;
            }

            this.dxFormData1.account_token = this.token;
            let f = this.joinFormParams(this.dxFormData1);

            let result: BaseModel;
            if (this.dxFormData1.id == RespCode.zero) {
                result = await this.cardsAPI.cardsAdd(f);
            } else {
                result = await this.cardsAPI.cardsUpdate(this.dxFormData1.id, f);
            }
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(()=>{
                    this.redirect("/card/list");
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }

    }

    /**
   * 返回
   */
    private onClickBackHandler() {
        this.redirect("/card/list");
    }


    /**
   * 获取充值卡模型
   * @param id 
   */
    private async getCardsModel(id: number) {
        let d = await this.cardsAPI.getCardsModel(id);
        this.dxFormData1 = d.data;
        this.dxForm1.option("formData", this.dxFormData1);
    }
}