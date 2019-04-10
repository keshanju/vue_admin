
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxPopup, DxScrollView } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { NewsApi } from '@/api/NewsApi';
import { RespCode } from '@/common/RespCode';
/**
 * 公告编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxPopup,
        DxScrollView
    }
})
export default class Home extends BaseVue {
    /**
   * 选项
   */
    public options: {
        title?: string;
        visible?: boolean;
        toolbarItems?: any[];
        onHide?: (hasData?: boolean) => void;
    } = {
            title: "生成静态",
            visible: false,
            toolbarItems: []
        };


    private dxForm1: DevExpress.ui.dxForm;
    private formData1: { class_type?: number } = {};

    mounted() {
        this.dxForm1 = this.getDxInstanceByKey("DxForm1");

        let new_class_type = [{ id: -1, name: "全部分类" }, ...CommonUtils.getDictonary().data.class_type];

        this.dxForm1.option({
            formData: this.formData1,
            items: [
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
                        value:-1,
                        dataSource: new_class_type
                    },
                    validationRules: []
                },
            ]
        });
        this.initToolbarItems();
    }


    /**
     * 初始化工具条
     */
    private initToolbarItems() {
        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "生成静态",
                //icon: "save",
                type: "success",
                onClick: async (sender) => {
                    let btn:DevExpress.ui.dxButton = sender.component;
                    try {
                        btn.option({
                            disabled:true
                        });
                        let class_type = this.formData1.class_type;
                        let type_type = class_type.toString();
                        // if (class_type != -1) {
                        //     type_type = class_type.toString();
                        // }
                        let d = await new NewsApi().createNewsJson(type_type);
                        if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                            btn.option({
                                disabled:false
                            });
                            this.toast(() => {
                            }, "生成静态成功!");
                            this.hide();
                        } else {
                            btn.option({
                                disabled:false
                            });
                            this.errorCodeMsg(d.code, d.msg);
                        }
                    } catch (error) {
                        btn.option({
                            disabled:false
                        });
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
                    this.hide();
                }
            }
        });

        let popup = this.getDxInstanceByKey("dxPopup1") as DevExpress.ui.dxPopup;
        popup.option({
            toolbarItems: this.options.toolbarItems
        });

    }

    public show() {
        this.options.visible = true;
    }

    /**
     *隐藏
     */
    public hide(hasData: boolean = false) {
        this.options.visible = false;
        if (this.options.onHide) {
            this.options.onHide(hasData);
        }
    }
}