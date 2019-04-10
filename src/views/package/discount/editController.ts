import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DevExpress from 'devextreme/bundles/dx.all'
import {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView
} from 'devextreme-vue'
import $ from 'jquery'
import BaseVue from '@/common/BaseVue'

import { DiscountApi } from '@/api/DiscountApi'
import { DiscountModel } from '@/models/DiscountModel'
import { CommonUtils } from '@/common/CommonUtils'
import { Validation } from '@/common/Validation'
import { BaseModel } from '@/models/BaseModel'
import { RespCode } from '@/common/RespCode'
import { DateTimeUtils } from '@/utils/DateTimeUtils'

@Component({
    components: {
        DxDataGrid,
        DxForm,
        DxTreeView,
        DxPopup,
        DxScrollView
    }
})
export default class EditController extends BaseVue {
    //配置选项
    public options: {
        title?: string;
        visible?: boolean;
        toolbarItems?: any[];
        onHide?: (hasData?: boolean) => void;
    } = {
            title: "弹窗",
            visible: false,
            toolbarItems: []
        };
    //表单
    private formData1: DiscountModel = {};
    // 新建表单
    private formDataNew1: DiscountModel = {
        id: 0,
        type: 0,
        is_enable_expired_time: 0,
        is_enable: 1,
        value: 0
    };
    // 重置表单
    private formDataReset1: DiscountModel = {};
    //api
    private packageOpLogApi = new DiscountApi()
    //form组件
    private dxForm1: DevExpress.ui.dxForm;
    //显示
    public show(data: {
        id?: number
    } = {
            id: 0
        }, config: any) {
        Object.assign(this.options, config);
        this.options.visible = true;
        if (data.id == 0) {
            this.formData1 = $.extend(true, {}, this.formDataNew1);
        } else {

        }
        this.dxForm1.option({
            formData: this.formData1
        });
    }
    //隐藏
    public hide(hasData: boolean = false) {
        this.options.visible = false;
    }
    //挂载加载
    mounted() {
        this.initWidgets();
    }
    //组件初始化
    initWidgets() {
        this.dxForm1 = this.getDxInstanceByKey("dxForm1");
        let items = this.createFormItems([
            {
                dataField: 'title',
                label: {
                    text: '名称'
                },
                editorOptions: {
                    placeholder: '请输入折扣码名称'
                },
                validationRules: [Validation.getRequired('折扣码名称不能为空')]
            },
            {
                dataField: 'type',
                label: {
                    text: '折扣类型'
                },
                editorType: 'dxSelectBox',
                editorOptions: {
                    placeholder: '请输入折扣类型',
                    width: 150,
                    dataSource: CommonUtils.getDictonary().data.discount_type,
                    displayExpr: 'name',
                    valueExpr: 'id',
                    onValueChanged: sender => {
                        let val = sender.value
                        if (val == 0) {
                            this.dxForm1.getEditor('value').option({
                                min: 1,
                                max: 100
                            })
                        } else {
                            this.dxForm1.getEditor('value').option({
                                min: 1,
                                max: 99999999
                            })
                        }
                    }
                },
                validationRules: [Validation.getRequired('折扣类型不能为空')]
            },
            {
                dataField: 'value',
                label: {
                    text: '折扣值/金额(单位分)'
                },
                editorType: 'dxNumberBox',
                editorOptions: {
                    placeholder:
                        '如果为打折请输入1~100之间的值,现金券请输入数值(单位分).',
                    min: 1,
                    max: 100,
                    width: 400
                },
                validationRules: [
                    Validation.getRequired('(折扣值/金额)不能为空')
                ]
            },
            {
                dataField: 'is_enable_expired_time',
                label: {
                    text: '时间限制'
                },
                editorType: 'dxSelectBox',
                editorOptions: {
                    placeholder: '请输入时间限制',
                    dataSource: CommonUtils.getDictonary().data.status,
                    displayExpr: 'name',
                    valueExpr: 'id',
                    onValueChanged: sender => {
                        let val = sender.value
                        if (val == 0) {
                            this.dxForm1.getEditor('begin_time').option({
                                disabled: true
                            })
                            this.dxForm1.getEditor('end_time').option({
                                disabled: true
                            })
                        } else if (val == 1) {
                            this.dxForm1.getEditor('begin_time').option({
                                disabled: false
                            })
                            this.dxForm1.getEditor('end_time').option({
                                disabled: false
                            })
                        }
                    },
                    width: 150
                },
                validationRules: [Validation.getRequired('时间限制不能为空')]
            },
            {
                dataField: 'begin_time',
                label: {
                    text: '开始时间'
                },
                editorType: 'dxDateBox',
                editorOptions: {
                    placeholder: '请输入开始时间',
                    disabled: true,
                    type: 'datetime',
                    displayFormat: 'yyyy-MM-dd HH:mm:ss',
                    dateSerializationFormat: 'yyyy-MM-dd HH:mm:ss',
                    min: DateTimeUtils.getNow(),
                    onValueChanged: (e: any) => {
                        this.dxForm1.getEditor('end_time').option({
                            min: e.value,
                            value: e.value
                        })
                    }
                },
                validationRules: [Validation.getRequired('开始时间不能为空')]
            },
            {
                dataField: 'end_time',
                label: {
                    text: '结束时间'
                },
                editorType: 'dxDateBox',
                editorOptions: {
                    placeholder: '请输入结束时间',
                    disabled: true,
                    type: 'datetime',
                    displayFormat: 'yyyy-MM-dd HH:mm:ss',
                    dateSerializationFormat: 'yyyy-MM-dd HH:mm:ss',
                    min: DateTimeUtils.getNow()
                },
                validationRules: [Validation.getRequired('结束时间不能为空')]
            },
            {
                dataField: 'is_enable',
                label: {
                    text: '是否启用'
                },
                editorType: 'dxSelectBox',
                editorOptions: {
                    placeholder: '请输入启用状态',
                    dataSource: CommonUtils.getDictonary().data.status,
                    displayExpr: 'name',
                    valueExpr: 'id',
                    width: 150
                },
                validationRules: [Validation.getRequired('启用状态不能为空')]
            },
            {
                dataField: 'is_private',
                label: {
                    text: '是否私有'
                },
                editorType: 'dxSelectBox',
                editorOptions: {
                    placeholder: '请选择私有状态',
                    dataSource: CommonUtils.getDictonary().data.flag,
                    displayExpr: 'name',
                    valueExpr: 'id',
                    width: 150
                },
                validationRules: [Validation.getRequired('私有状态不能为空')]
            },
            {
                dataField: 'desc',
                label: {
                    text: '备注'
                },
                editorType: 'dxTextArea',
                editorOptions: {
                    placeholder: '请输入备注',
                    height: 80
                },
                validationRules: [Validation.getRequired('备注不能为空')]
            }
        ]);

        this.dxForm1.option({
            items: items
        });

        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "保存",
                type: "success",
                onClick: async () => {
                    try {
                        if (!this.validateForm(this.dxForm1)) {
                            return false;
                        }
                        this.formData1.account_token = this.token;
                        if (this.formData1.is_enable_expired_time == 0) {
                            this.formData1.begin_time = '';
                            this.formData1.end_time = '';
                        }
                        let result: BaseModel = null;
                        // for (const iterator in this.formData1) {
                        //     console.log(iterator, this.formData1[iterator]);
                        // }
                        if (!this.formData1.id || this.formData1.id == 0) {

                            result = await this.packageOpLogApi.setAdd(this.formData1)
                        }
                        else {
                            result = await this.packageOpLogApi.setUpdate(
                                this.formData1.id,
                                this.formData1
                            );
                        }
                        if (result && result.code == RespCode.zero) {
                            this.toast(() => {
                                this.hide(true);
                            });
                            return true;
                        } else {
                            this.errorCodeMsg(result.code, result.msg)
                        }
                    } catch (error) {
                        this.error(error)
                    }
                    return false;
                }
            }
        });

        this.options.toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            widget: "dxButton",
            options: {
                text: "重置",
                type: "normal",
                onClick: () => {

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
    }
}