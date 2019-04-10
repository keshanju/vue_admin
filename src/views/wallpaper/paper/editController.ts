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
import {WallpaperModel} from "@/models/WallpaperModel";
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
        width: 700,
        height: 800
    };
    public dxForm1: DevExpress.ui.dxForm;

    public formData: WallpaperModel = {
        account_token: '',
        id: 0 ,
        img_url:"",
        free_include_region_codes: "",
        free_include_region_codes_arr: [],
        free_exclude_region_codes: "",
        free_exclude_region_codes_arr: []
    };
    private iImageNode: JQuery;


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
                        let wallForm = this.dxForm1.option('formData');
                        //处理包含地区 排除地区
                        if( wallForm.free_include_region_codes_arr){
                            wallForm.free_include_region_codes = wallForm.free_include_region_codes_arr.join(
                                ","
                            );
                        }
                        if(wallForm.free_exclude_region_codes_arr){
                            wallForm.free_exclude_region_codes = wallForm.free_exclude_region_codes_arr.join(
                                ","
                            );
                        }
                        let id = wallForm.id;
                        wallForm.account_token = this.token;
                        let d: BaseResult2;
                        if (id == RespCode.zero) {
                            d = await this.WallpaperApi.setWallAdd(wallForm);
                        } else {
                            d = await this.WallpaperApi.setWallUpdate(id, wallForm);
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

        let d = await this.WallpaperApi.getCateSimpleList();

        let dsWallCate = d.data;


        let items = this.createFormItems([
            {
                dataField: "cate_ids",
                label: {
                    text: "壁纸分类"
                },
                editorType: "dxTagBox",
                editorOptions: {
                    placeholder: "请选择壁纸分类.",
                    displayExpr: "name",
                    valueExpr: "id",
                    showSelectionControls: true,
                    applyValueMode: "useButtons",
                    dataSource: dsWallCate,
                    onValueChanged: sender => {

                    }
                },
                validationRules: [
                    Validation.getRequired("请选择分类!")
                ]
            },
            {
                dataField: "title",
                label: {
                    text: "请输入壁纸名称"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入壁纸名称"
                },
                validationRules: [
                    Validation.getRequired("壁纸名称不能为空!"),
                ]
            },
            {
                dataField: "size",
                label: {
                    text: "请输入壁纸大小"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入壁纸大小"
                },
                validationRules: [
                    Validation.getRequired("请输入壁纸大小!"),
                ]
            },
            {
                dataField: "pixel_x",
                label: {
                    text: "请输入壁纸像素宽"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入壁纸像素宽"
                },
                validationRules: [
                    Validation.getRequired("请输入壁纸像素宽!"),
                ]

            }, {
                dataField: "pixel_y",
                label: {
                    text: "请输入壁纸像素高"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入壁纸像素高"
                },
                validationRules: [
                    Validation.getRequired("分类英文名称不能为空!"),
                ]

            },
            this.createUploadFileFormItem(
                image => {
                    this.iImageNode = image;
                },
                {
                    dataField: "img_url",
                    label: {
                        text: "背景图"
                    },
                    validationRules: [
                        Validation.getRequired("请上传背景图!"),
                    ]
                },
                {
                    name: "filename",
                    uploadUrl: this.uploadApi.getUploadNormalPath("images")
                }
            ),
            {
                dataField: "download_url",
                label: {
                    text: "请输入壁纸视频地址"
                },
                editorOptions: {
                    mode: "text",
                    placeholder: "请输入壁纸视频地址"
                },
                validationRules: [
                    Validation.getRequired("请输入壁纸视频地址!"),
                ]

            }, {
                dataField: "type",
                label: {
                    text: "请选择壁纸是否动态壁纸"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择壁纸是否动态壁纸.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
            }, {
                dataField: "order",
                label: {
                    text: "请输入壁纸排序"
                },
                editorOptions: {
                    mode: "text",
                    value:0,
                    placeholder: "请输入壁纸排序"
                },

            }, {
                dataField: "is_hot",
                label: {
                    text: "请选择是否热门"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择是否热门.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
            }, {
                dataField: "is_top",
                label: {
                    text: "请选择是否置顶"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择是否置顶.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
            },
            {
                dataField: "is_free",
                label: {
                    text: "是否免费"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择免费类型.",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
                validationRules: [Validation.getRequired("请选择免费类型!")]
            },
            {
                dataField: "free_include_region_codes_arr",
                label: {
                    text: "免费包含地区"
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
                                "free_exclude_region_codes_arr"
                            ) as DevExpress.ui.dxTagBox).option({
                                disabled: true
                            });
                        } else {
                            (this.dxForm1.getEditor(
                                "free_exclude_region_codes_arr"
                            ) as DevExpress.ui.dxTagBox).option({
                                disabled: false
                            });
                        }
                    }
                }
            },
            {
                dataField: "free_exclude_region_codes_arr",
                label: {
                    text: "免费排除地区"
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
                                "free_include_region_codes_arr"
                            ) as DevExpress.ui.dxTagBox).option({
                                disabled: true
                            });
                        } else {
                            (this.dxForm1.getEditor(
                                "free_include_region_codes_arr"
                            ) as DevExpress.ui.dxTagBox).option({
                                disabled: false
                            });
                        }
                    }
                }
            }
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
            let d = await this.WallpaperApi.getWallDetailList(id);
            this.formData = d.data;
            //处理包含区域 排除区域
            this.formData.free_include_region_codes_arr = this.getRegionCode(
                this.formData.free_include_region_codes
            );
            this.formData.free_exclude_region_codes_arr = this.getRegionCode(
                this.formData.free_exclude_region_codes
            );
            this.iImageNode.attr(
                "src",
                this.uploadApi.getUploadHttp + this.formData.img_url
            );
            this.dxForm1.option({
                formData: d.data
            });
        }
    }


}