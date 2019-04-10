import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserVipLevelApi } from '@/api/UserVipLevelApi';
import { UserVipLevelModel, Result } from '@/models/UserVipLevelModel';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 布局编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxFormKey1";
    private dxForm1: DevExpress.ui.dxForm;

    private dxFormData1: UserVipLevelModel = { id: 0 };
    private dxFormDataReset1: UserVipLevelModel = {};

    private packageAPI = new UserVipLevelApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "用户等级编辑";
        this.initComponents();
        if (this.ID > RespCode.zero) {
            await this.getDataModel(this.ID);
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    /**
     * 控件初始化
     */
    private initComponents() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            //caption: this.ID > RespCode.zero ? "更新" : "添加",
            items: [{
                dataField: "title",
                label: {
                    text: "标题"
                },
                editorOptions: {
                    placeholder: "请输入标题"
                },
                validationRules: [Validation.getRequired("标题不能为空!")]
            }, {
                dataField: "integral",
                label: {
                    text: "所需积分"
                },
                editorType: "dxNumberBox",
                editorOptions: {
                    placeholder: "请输入所需积分",
                    min:0
                },
                validationRules: [Validation.getRequired("所需积分不能为空!")]
            }]
        }, {
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
            width: 500,
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
     * 数据模型
     * @param id 
     */
    private async getDataModel(id: number) {
        let d = await this.packageAPI.getModel(id);
        this.dxFormData1 = d.data;

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
            let postData = this.joinFormParams(this.dxFormData1);
            let d: Result;
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.packageAPI.setAdd(postData);
            } else {
                d = await this.packageAPI.setUpdate(this.ID, postData);
            }

            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/user/vip/list");
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
        this.redirect("/user/vip/list");
    }

}