import {Component, Vue, Prop} from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import {
    DxDataGrid, DxForm, DxPopup,
    DxScrollView
} from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';
import {Validation} from "@/common/Validation";

import {WallpaperApi} from '@/api/WallpaperApi';
import {CommonUtils} from "@/common/CommonUtils";
import {ActivityApi} from "@/api/ActivityApi";
import {PackagePriceModel, Result} from "@/models/PackagePriceModel";
import {RespCode} from "@/common/RespCode";
import {WallpaperCateModel} from "@/models/WallpaperModel";
import {BaseResult2} from "@/models/BaseModel";


export interface MyPopupOption {
    visible?: boolean;
    title?: string;
    width?: number;
    height?: number;
    toolbarItems?: DevExpress.ui.dxPopupToolbarItem[];
    onHidden?: (flag: boolean) => void;
}


/**
 * 壁纸分类列表
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxPopup,
        DxScrollView,
    }
})
export default class Home extends BaseVue {

    private WallpaperApi = new WallpaperApi();
    public options: MyPopupOption = {
        visible: false,
        title: "新增/修改壁纸分类",
        toolbarItems: [],
        width: 400,
        height: 280
    };
    public dxForm1: DevExpress.ui.dxForm;

    public formData: WallpaperCateModel = {
        account_token: '',
        id: 0
    };

    public created() {
        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "修改保存",
                type: "success",
                onClick: async () => {
                    if (!this.validateForm(this.dxForm1)) {
                        return;
                    }
                    try {
                        let cateForm = this.dxForm1.option('formData');
                        let id = cateForm.id;
                        cateForm.account_token = this.token;
                        let d: BaseResult2;
                        if (id == RespCode.zero) {
                            d = await this.WallpaperApi.setAdd(cateForm);
                        } else {
                            d = await this.WallpaperApi.setUpdate(id, cateForm);
                        }
                        if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                            this.toast(() => {
                                this.options.visible = false;
                                this.options.onHidden(true);
                            }, d.msg);

                        } else {
                            this.errorCodeMsg(d.code, d.msg);
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
                onClick: async () => {
                    this.options.visible = false;
                    this.options.onHidden(true);
                }
            }
        });
    }

    /**
     * 入口
     */
    protected async mounted() {

        let d = await this.WallpaperApi.getList();

        let dsWallCate = [{
            'id': 0,
            'name': '顶级',
            'name_en': 'top',
            'pid': 0,
        }, ...d.data];

        let items = this.createFormItems([
            {
                dataField: "pid",
                label: {
                    text: "壁纸分类"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: dsWallCate
                },
                validationRules: [Validation.getRequired("游戏分类不能为空!")]
            },
            {
                dataField: "name",
                label: {
                    text: "请输入分类名称"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入分类名称"
                },
                validationRules: [
                    Validation.getRequired("分类名称不能为空!"),
                ]
            },
            {
                dataField: "name_en",
                label: {
                    text: "请输入分类英文名称"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入分类名称"
                },
                validationRules: [
                    Validation.getRequired("分类英文名称不能为空!"),
                ]
            },
            {
                dataField: "order",
                label: {
                    text: "请输入分类排序"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入分类排序"
                },

            },
        ]);
        this.dxForm1 = this.getDxInstanceByKey("dxForm1");
        this.dxForm1.option({
            items: items,
            formData: this.formData
        });
    }

    public async show(options: any, id: number = 0) {
        this.options.visible = true;
        this.options.onHidden = options.onHidden;
        if (id > 0) {
            let d = await this.WallpaperApi.getDetailList(id);
            this.dxForm1.option({
                formData: d.data
            });
        }
    }


}