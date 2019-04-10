import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { ServerModel, Result } from '@/models/ServerModel';
import { ServerApi } from '@/api/ServerApi';
import { CommonUtils } from '@/common/CommonUtils';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
/**
 * 服务器编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxFormKey1";
    private dxForm1: DevExpress.ui.dxForm;

    private dxFormData1: ServerModel = {
        id: 0,
        is_valid: 1,
        is_online: 1,

    };
    private dxFormDataReset1: ServerModel = {};
    private serverAPI = new ServerApi();

    /**
     * 入口
     */
    protected async mounted() {
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
            caption: this.ID > RespCode.zero ? "更新" : "添加",
            items: [{
                dataField: "title",
                label: {
                    text: "服务器名称"
                },
                editorOptions: {
                    placeholder: "请输入服务器名称"
                },
                validationRules: [Validation.getRequired("服务器名称不能为空!")]
            }, {
                dataField: "server",
                label: {
                    text: "服务器ip地址"
                },
                editorOptions: {
                    placeholder: "请输入服务器IP地址"
                },
                validationRules: [
                    Validation.getRequired("服务器ip地址不能为空!"),
                    Validation.getIP("服务器IP地址不正确!")
                ]
            }, {
                dataField: "is_valid",
                label: {
                    text: "服务器是否有效"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.valid
                },
                validationRules: [Validation.getRequired("请选择服务器是否有效!")]
            }, {
                dataField: "online_max_users",
                label: {
                    text: "服务器最大允许在线人数"
                },
                editorType: "dxNumberBox",
                editorOptions: {
                    value: 0,
                    min: 0
                },
                validationRules: [Validation.getRequired("服务器最大允许在线人数")]
            }, {
                dataField: "server_type",
                label: {
                    text: "服务器类型"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.server_type
                },
                validationRules: [Validation.getRequired("请选择服务器类型")]
            },
            {
                itemType: "group",
                colCount: 2,
                items: [
                    {
                        dataField: "s5_port",
                        label: {
                            text: "服务端口"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            value: 430,
                            min: 0
                        },
                        validationRules: [Validation.getRequired("服务端口不能为空!")]
                    }, {
                        dataField: "s5_end_port",
                        label: {
                            text: "S5出端口"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            value: 430,
                            min: 0
                        },
                        validationRules: [Validation.getRequired("s5出端口不能为空!")]
                    }
                ]
            }, {
                colCount:2,
                itemType: "group",
                items: [
                    {
                        dataField: "s5_mobile_port",
                        label: {
                            text: "移动端服务端口"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            value: 430,
                            min: 0
                        },
                        validationRules: [Validation.getRequired("移动端服务端口不能为空!")]
                    }, {
                        dataField: "s5_mobile_end_port",
                        label: {
                            text: "移动端服务出端口"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            value: 430,
                            min: 0
                        },
                        validationRules: [Validation.getRequired("移动端服务出端口不能为空!")]
                    },
                ]
            }
                ,
            {
                dataField: "lan_delay",
                label: {
                    text: "专线延迟(KB)"
                },
                editorType: "dxNumberBox",
                editorOptions: {
                    value: 0,
                    min: 0
                },
                validationRules: [Validation.getRequired("专线延迟不能为空")]
            }, {
                dataField: "lan_loss",
                label: {
                    text: "内网丢包率(KB)"
                },
                editorOptions: {
                    value: 0,
                    min: 0
                },
                validationRules: [Validation.getRequired("内网丢包率不能为空")]
            }, {
                dataField: "is_online",
                label: {
                    text: "是否可用于分配"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.flag
                },
                validationRules: [Validation.getRequired("请选择是否可用于分配")]
            }, {
                dataField: "desc",
                label: {
                    text: "备注"
                },
                editorType: "dxTextArea",
                editorOptions: {
                    placeholder:"请输入备注信息!"
                },
                validationRules: []
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
        let d = await this.serverAPI.getModel(id);
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
                d = await this.serverAPI.setAdd(postData);
            } else {
                d = await this.serverAPI.setUpdate(this.ID, postData);
            }

            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/server/list");
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
        this.redirect("/server/list");
    }


}