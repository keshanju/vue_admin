
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
} from "devextreme-vue";
import BaseVue from '@/common/BaseVue';
import { CardOtherDefineApi } from '@/api/CardOtherApi';
import { BaseModel, BaseResult2 } from '@/models/BaseModel';
import { RespCode } from '@/common/RespCode';
/**
 * 第三方充值卡
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView, DxPopup, DxScrollView
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
    private watch_id(newVal: number, oldVal: number) {
        this.options.id = newVal;
        this.forms = {
            file: ""
        }
    }

    //组件选项
    private options: any = {
        id: 0,
        visible: false,
        title: "导入第三方充值卡",
        toolbarItems: [],
        width: 500,
        height: 300,
        onHidden: null
    }

    private forms: any = {

    };

    mounted() {

        this.options.visible = this.visible ? true : false;
        this.options.id = this.id;

        this.options.onHidden = () => {
            this.$emit("onHide", false);
        };

        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "开始导入",
                type: "success",
                onClick: async () => {
                    try {
                        let formData = new FormData();
                        formData.append('excel', this.forms.file);
                        formData.append('account_token', this.token);
                        let result: BaseResult2;
                        result = await new CardOtherDefineApi().importCard(this.options.id, formData);
                        if (
                            result.code == RespCode.OK ||
                            result.code == RespCode.isSame ||
                            result.code == RespCode.isSameSaveData
                        ) {
                            this.toast(() => {
                                this.$emit("onHide", true);
                            });
                        }
                        else {
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
    }

    private getFile(event): void {
        this.forms.file = event.target.files[0];
    }
}