import {Component, Vue, Prop} from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {DxDataGrid, DxForm} from "devextreme-vue";
import $ from "jquery";

import BaseVue from "@/common/BaseVue";

import {NewsApi} from "@/api/NewsApi";
import {NewsLabelModel, NewsModel, Result} from "@/models/NewsModel";

import "ckeditor";
import {Validation} from "@/common/Validation";
import {RespCode} from "@/common/RespCode";

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
    private dxFormData1: NewsLabelModel = {
        id: 0,
        group: "",
        label: "",
        desc: "",
        label_sort: 0,

    };
    private dxFormDataReset1: NewsLabelModel = {};
    private newsAPI = new NewsApi();
    private UE: any;

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "标签编辑";

        if (this.ID > RespCode.zero) {
            let d = await this.newsAPI.getLableDetail(this.ID);
            this.dxFormData1 = d.data;
        }

        this.initComponents();

        if (this.ID > RespCode.zero) {
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
        const items1: Array<| DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem> = [
            {
                itemType: "group",
                //caption: this.ID > RespCode.zero ? "更新" : "添加",
                items: [
                    {
                        dataField: "group",
                        label: {
                            text: "标签组名"
                        },
                        editorOptions: {
                            placeholder: "请输入标签组名",
                        },
                        validationRules: [Validation.getRequired("标签组名不能为空!")]
                    },
                    {
                        dataField: "label",
                        label: {
                            text: "标签"
                        },
                        editorOptions: {
                            placeholder: "请输入标签",
                        },
                        validationRules: [Validation.getRequired("标签不能为空!")]
                    },
                    {
                        dataField: "desc",
                        label: {
                            text: "描述"
                        },
                        editorType: "dxTextArea",
                        editorOptions: {
                            placeholder: "请输入描述",
                        },
                        validationRules: []
                    },

                    {
                        dataField: "label_sort",
                        label: {
                            text: "排序"
                        },
                        editorOptions: {
                            placeholder: "请输入排序",
                        },
                        validationRules: []
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

            let f = this.joinFormParams(this.dxFormData1);
            let d: Result;
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.newsAPI.setAddNewsLabel(f);
            } else {
                d = await this.newsAPI.setUpdateNewsLabel(this.ID, f);
            }
            if (
                d.code == RespCode.OK ||
                d.code == RespCode.isSame ||
                d.code == RespCode.isSameSaveData
            ) {
                this.toast(() => {
                    this.redirect("/sell/news/label");
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
        this.redirect("/sell/news/label");
    }
}
