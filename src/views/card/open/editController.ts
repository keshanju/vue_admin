import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { CardsApi } from '@/api/CardsApi';
import { CardsModel } from '@/models/CardsModel';
import { BaseModel } from '@/models/BaseModel';
import { Validation } from '@/common/Validation';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { CommonUtils } from '@/common/CommonUtils';


/**
 * 卡开编辑
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
        recharge_type: 0
    };

    protected mounted() {
        (this.$parent as any).content_title = "充值卡开卡";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();

    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

        //表单项
        const items2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        //用户名
        items2.push({
            dataField: "card_count",
            label: {
                text: '开卡数量'
            },
            editorType: "dxNumberBox",
            editorOptions: {
                value: 1,
                placeholder: "最小1，最大200"
            },
            validationRules: [
                Validation.getRequired("开卡数量不能为空!"),
            ]
        });


        //过期时间
        items2.push({
            dataField: "expired_time",
            editorType: "dxDateBox",
            label: {
                text: Lang.lang_end_time
            },
            editorOptions: {
                type: "date",
                displayFormat: "yyyy-MM-dd",
                dateSerializationFormat: "yyyy-MM-dd",
                min: new Date(),
                //value: new Date()
                showClearButton:true,
            },
            validationRules: [
                Validation.getRequired("过期时间不能为空!"),
            ]
        });

        //开卡充值类型
        items2.push({
            dataField: "recharge_type",
            editorType: "dxSelectBox",
            label: {
                text: "开卡充值类型"
            },
            editorOptions: {
                placeholder: "请选择开卡充值类型",
                displayExpr: "name",
                valueExpr: "id",
                dataSource: CommonUtils.getDictonary().data.card_recharge_type
            },
            validationRules: [
                Validation.getRequired("开卡充值类型不能为空!"),
            ]
        });

        //按钮组
        const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: "开卡",
                type: "success",
                useSubmitBehavior: true,
                onClick: this.onClickDoHandler
            }
        });

        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: "重置",
                type: "normal",
                onClick: (sender) => {
                    this.dxForm1.resetValues();
                }
            }
        });

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
            //caption: Lang.Edit,
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
            result = await this.cardsAPI.cardsGenerate(this.ID, f);

            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/card/list");
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }

    }

    private onToolbarPreparingHandler(e: {
        component?: DevExpress.DOMComponent,
        element?: DevExpress.core.dxElement,
        model?: any,
        toolbarOptions?: DevExpress.ui.dxToolbarOptions
    }) {
        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;





        toolbarItems.push({
            location: "after",
            widget: "dxButton",
            options: {
                text: '返回充值卡列表',
                icon: "back",
                onClick: this.onClickBackHandler
            }
        });
    }

    /**
   * 返回
   */
    private onClickBackHandler() {
        this.redirect("/card/list");
    }


}