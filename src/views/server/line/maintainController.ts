import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { LineModel, Result } from '@/models/LineModel';
import { LineApi } from '@/api/LineApi';
import { LayoutApi } from '@/api/LayoutApi';
import { CommonUtils } from '@/common/CommonUtils';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 线路维护
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxFormKey1";
    private dxForm1: DevExpress.ui.dxForm;

    private dxFormData1: LineModel = { id: 0 };
    private dxFormDataReset1: LineModel = {};

    private lineAPI = new LineApi();

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "服务器组维护";
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
            items: [
                {
                    dataField: "fault_status",
                    label: {
                        text: "故障状态"
                    },
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: "name",
                        valueExpr: "id",
                        dataSource: CommonUtils.getDictonary().data.line_fault_status,
                        onValueChanged: (sender) => {
                            if (sender.value == 0) {
                                this.dxForm1.getEditor("fault_start_time").option({
                                    disabled: false
                                });
                                this.dxForm1.getEditor("fault_end_time").option({
                                    disabled: false
                                });
                            } else if (sender.value == 1) {
                                this.dxForm1.getEditor("fault_start_time").option({
                                    disabled: true
                                });
                                this.dxForm1.getEditor("fault_end_time").option({
                                    disabled: true
                                });
                            }
                        }
                    },
                    validationRules: [Validation.getRequired("请选择故障状态!")]
                }, {
                    dataField: "fault_desc",
                    editorType: "dxTextArea",
                    label: {
                        text: "故障说明"
                    },
                    editorOptions: {
                        placeholder: "故障说明信息!"
                    }
                },
                // {
                //     dataField: "fault_time",
                //     label: {
                //         text: "故障时间"
                //     },
                //     editorType: "dxDateBox",
                //     editorOptions: {
                //         placeholder: "故障时间",
                //         type: "datetime",
                //         displayFormat: "yyyy-MM-dd HH:mm:ss",
                //         dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
                //         min: new Date(),
                //     }
                // }, {
                //     dataField: "fault_resume_time",
                //     label: {
                //         text: "故障恢复时间"
                //     },
                //     editorType: "dxDateBox",
                //     editorOptions: {
                //         placeholder: "故障恢复时间",
                //         type: "datetime",
                //         displayFormat: "yyyy-MM-dd HH:mm:ss",
                //         dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
                //         min: new Date(),
                //     }
                // }, 
                {
                    dataField: "fault_start_time",
                    label: {
                        text: "故障开始时间"
                    },
                    editorType: "dxDateBox",
                    editorOptions: {
                        placeholder: "故障开始时间",
                        type: "datetime",
                        displayFormat: "yyyy-MM-dd HH:mm:ss",
                        dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
                        min: new Date(),
                        showClearButton:true,
                        onValueChanged: (e: any) => {
                            this.dxForm1.getEditor("fault_end_time").option({
                                min: e.value
                            });
                        }
                    }
                }, {
                    dataField: "fault_end_time",
                    label: {
                        text: "故障结束时间"
                    },
                    editorType: "dxDateBox",
                    editorOptions: {
                        placeholder: "故障结束时间",
                        type: "datetime",
                        displayFormat: "yyyy-MM-dd HH:mm:ss",
                        dateSerializationFormat: "yyyy-MM-dd HH:mm:ss",
                        min: new Date(),
                        showClearButton:true,
                    }
                }
            ]
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
            width: 500
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
        let d = await this.lineAPI.getModel(id);
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
                d = await this.lineAPI.setAdd(postData);
            } else {
                d = await this.lineAPI.setUpdate(this.ID, postData);
            }
            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/server/line/list");
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
        this.redirect("/server/line/list");
    }

}