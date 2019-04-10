import { Component, Vue, Prop } from 'vue-property-decorator'
import DevExpress from 'devextreme/bundles/dx.all'
import { DxDataGrid, DxForm } from 'devextreme-vue'
import $ from 'jquery'
import BaseVue from '@/common/BaseVue'

import { LineModel, Result } from '@/models/LineModel'
import { LineApi } from '@/api/LineApi'
import { LayoutApi } from '@/api/LayoutApi'
import { CommonUtils } from '@/common/CommonUtils'
import { RespCode } from '@/common/RespCode'
import { Validation } from '@/common/Validation'

import { RegionApi } from '@/api/RegionApi'
import { UserVipLevelApi } from '@/api/UserVipLevelApi'
/**
 * 线路编辑
 */
@Component({
    components: {
        DxDataGrid,
        DxForm
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = 'dxFormKey1'
    private dxForm1: DevExpress.ui.dxForm

    private dxSelectBoxBakLine: DevExpress.ui.dxSelectBox
    //private dxSelectBoxDownLine: DevExpress.ui.dxSelectBox
    private dxSelectBoxLayoutCode: DevExpress.ui.dxSelectBox
    private dxSelectBoxdownload_failover_line_id: DevExpress.ui.dxSelectBox

    private dxSelectBoxLineEnter: DevExpress.ui.dxSelectBox
    private dxSelectBoxLineExit: DevExpress.ui.dxSelectBox

    private dxFormData1: LineModel = {
        id: 0,
        fault_status: 0
    }
    private dxFormDataReset1: LineModel = {}

    private lineAPI = new LineApi()
    private layoutAPI = new LayoutApi()

    private regionAPI = new RegionApi()

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "线路编辑";
        this.initComponents()
        await this.getDataListByLine()
        await this.getDataListByLayout()
        if (this.ID > RespCode.zero) {
            await this.getDataModel(this.ID)
        }

        let userVipLevel = new UserVipLevelApi()
        let userVipLevelData = await userVipLevel.getList()
        this.dxForm1.getEditor('line_level').option({
            dataSource: userVipLevelData.data,
            displayExpr: 'title',
            valueExpr: 'id'
        })

        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1)
    }

    /**
     * 控件初始化
     */
    private initComponents() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1)
        const items1: Array<
            | DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem
        > = [
            {
                itemType: 'group',
                //caption: this.ID > RespCode.zero ? '更新' : '添加',
                items: [
                    {
                        dataField: 'title',
                        label: {
                            text: '名称'
                        },
                        editorOptions: {
                            placeholder: '请输入线路名称'
                        },
                        validationRules: [
                            Validation.getRequired('线路名称不能为空!')
                        ]
                    },
                    {
                        dataField: 'line_level',
                        label: {
                            text: '线路等级'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            // displayExpr: "name",
                            // valueExpr: "id",
                            // dataSource: CommonUtils.getDictonary().data.line_level
                        },
                        validationRules: [
                            Validation.getRequired('请选择线路等级!')
                        ]
                    },
                    {
                        dataField: 'provider',
                        label: {
                            text: '提供商'
                        },
                        editorOptions: {
                            placeholder: '请输入提供商名称'
                        },
                        validationRules: [
                            Validation.getRequired('提供商不能为空!')
                        ]
                    },
                    {
                        dataField: 'in_line_type',
                        label: {
                            text: '入口线路类型'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            displayExpr: 'name',
                            valueExpr: 'id',
                            dataSource: CommonUtils.getDictonary().data
                                .line_type
                        },
                        validationRules: [
                            Validation.getRequired('入口线路类型不能为空!')
                        ]
                    },
                    {
                        dataField: 'line_layout_code',
                        label: {
                            text: '线路布局Code'
                        },
                        editorOptions: {
                            placeholder: '请输入线路布局别名,比如 bj,sh等'
                        }
                        // editorType: "dxSelectBox",
                        // editorOptions: {
                        //     displayExpr: "layout_code",
                        //     valueExpr: "layout_code",
                        //     searchEnabled: true,
                        // }
                    },
                    {
                        dataField: 'failover_line_id',
                        label: {
                            text: '备用线路'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            displayExpr: 'title',
                            valueExpr: 'id',
                            searchEnabled: true,
                            showClearButton:true
                        }
                    },
                    // {
                    //     dataField: "fault_status",
                    //     label: {
                    //         text: "故障状态"
                    //     },
                    //     editorType: "dxSelectBox",
                    //     editorOptions: {
                    //         displayExpr: "name",
                    //         valueExpr: "id",
                    //         dataSource: CommonHelper.getDictonary().data.line_fault_status
                    //     }
                    // }, {
                    //     dataField: "fault_desc",
                    //     editorType: "dxTextArea",
                    //     label: {
                    //         text: "故障说明"
                    //     },
                    //     editorOptions: {
                    //         placeholder: "故障说明信息!",
                    //     }
                    // }, {
                    //     dataField: "fault_staff_id",
                    //     label: {
                    //         text: "故障提交人"
                    //     },
                    //     editorType: "dxSelectBox",
                    //     editorOptions: {
                    //         placeholder: "请选择故障提交人",
                    //     }
                    // }, {
                    //     dataField: "fault_time",
                    //     label: {
                    //         text: "故障时间"
                    //     },
                    //     editorType: "dxDateBox",
                    //     editorOptions: {
                    //         placeholder: "故障时间",
                    //     }
                    // }, {
                    //     dataField: "fault_resume_time",
                    //     label: {
                    //         text: "故障恢复时间"
                    //     },
                    //     editorType: "dxDateBox",
                    //     editorOptions: {
                    //         placeholder: "故障恢复时间",
                    //     }
                    // }, {
                    //     dataField: "fault_start_time",
                    //     label: {
                    //         text: "故障开始时间"
                    //     },
                    //     editorType: "dxDateBox",
                    //     editorOptions: {
                    //         placeholder: "故障开始时间",
                    //     }
                    // }, {
                    //     dataField: "fault_end_time",
                    //     label: {
                    //         text: "故障结束时间"
                    //     },
                    //     editorType: "dxDateBox",
                    //     editorOptions: {
                    //         placeholder: "故障结束时间",
                    //     }
                    // },
                    // {
                    //     dataField: 'download_line_id',
                    //     label: {
                    //         text: '下载线路'
                    //     },
                    //     editorType: 'dxSelectBox',
                    //     editorOptions: {
                    //         displayExpr: 'title',
                    //         valueExpr: 'id',
                    //         searchEnabled: true
                    //     }
                    // },
                    // {
                    //     dataField: 'download_failover_line_id',
                    //     label: {
                    //         text: '下载备用线路'
                    //     },
                    //     editorType: 'dxSelectBox',
                    //     editorOptions: {
                    //         displayExpr: 'title',
                    //         valueExpr: 'id',
                    //         searchEnabled: true
                    //     }
                    // },
                    {
                        dataField: 'bandwidth',
                        label: {
                            text: '带宽'
                        },
                        editorOptions: {
                            placeholder: '请输入带宽信息,例如:200k/200k 5000k/5000k 2000k/2000k 15/15'
                        },
                        validationRules: [
                            Validation.getRequired('带宽信息不能为空!')
                        ]
                    },
                    {
                        dataField: 'fixed_delays',
                        label: {
                            text: '修订延迟(毫秒)'
                        },
                        editorType: 'dxNumberBox',
                        editorOptions: {
                            placeholder: '请输入修订延时,单位(毫秒).',
                            //min: 0,
                            value: 0
                        }
                    },
                    {
                        dataField: 'server_delays',
                        label: {
                            text: '专线延时(ms)'
                        },
                        editorType: 'dxNumberBox',
                        editorOptions: {
                            placeholder: '请输入专线延时,单位(ms).',
                            //min: 0,
                            value: 0
                        }
                    },
                    {
                        dataField: 'game_server_ip',
                        label: {
                            text: '游戏区服测试IP'
                        },
                        editorOptions: {
                            placeholder: '请输入游戏区服测试IP,127.0.0.1.'
                        },
                        validationRules: [
                            Validation.getIP('不是有效的IP!IP:127.0.0.1')
                        ]
                    },
                    {
                        dataField: 'line_enter',
                        label: {
                            text: '线路入口'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            displayExpr: 'title',
                            valueExpr: 'short',
                            searchEnabled: true
                        },
                        validationRules: [
                            Validation.getRequired('线路入口不能为空!')
                        ]
                    },
                    {
                        dataField: 'line_exit',
                        label: {
                            text: '线路出口'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            displayExpr: 'title',
                            valueExpr: 'short',
                            searchEnabled: true
                        },
                        validationRules: [
                            Validation.getRequired('线路出口不能为空!')
                        ]
                    },
                    {
                        dataField: 'line_type',
                        label: {
                            text: '线路类型'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            displayExpr: 'name',
                            valueExpr: 'id',
                            dataSource: CommonUtils.getDictonary().data.port_line_type
                        },
                        validationRules: [
                            Validation.getRequired('线路类型不能为空!')
                        ]
                    }
                ]
            },
            {
                itemType: 'group',
                colCount: 3,
                items: [
                    {
                        itemType: 'button',
                        horizontalAlignment: 'center',
                        buttonOptions: {
                            text: this.ID > RespCode.zero ? '更新' : '添加',
                            type: 'success',
                            useSubmitBehavior: true,
                            onClick: this.onClickDoHandler
                        }
                    },
                    {
                        itemType: 'button',
                        horizontalAlignment: 'center',
                        buttonOptions: {
                            text: '重置',
                            type: 'normal',
                            onClick: this.onResetHandler
                        }
                    },
                    {
                        itemType: 'button',
                        horizontalAlignment: 'center',
                        buttonOptions: {
                            text: '返回',
                            type: 'normal',
                            onClick: this.onClickBackHandler
                        }
                    }
                ]
            }
        ]

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: items1,
            width: 500,
            validationGroup: 'customerData'
        }
        this.dxForm1.option(options)

        this.dxSelectBoxBakLine = this.dxForm1.getEditor('failover_line_id')
        //this.dxSelectBoxDownLine = this.dxForm1.getEditor('download_line_id')
        this.dxSelectBoxLayoutCode = this.dxForm1.getEditor('line_layout_code')
        this.dxSelectBoxdownload_failover_line_id = this.dxForm1.getEditor(
            'download_failover_line_id'
        )
        //
        this.dxSelectBoxLineEnter = this.dxForm1.getEditor('line_enter')
        this.dxSelectBoxLineExit = this.dxForm1.getEditor('line_exit')
    }

    /**
     * 重置
     */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1)
        this.dxForm1.option('formData', this.dxFormData1)
    }
    /**
     * 数据模型
     * @param id
     */
    private async getDataModel(id: number) {
        let d = await this.lineAPI.getModel(id)
        this.dxFormData1 = d.data

        this.dxForm1.option({
            formData: this.dxFormData1
        })
    }

    /**
     * 添加 修改 事件
     * @param e
     */
    private async onClickDoHandler(sender) {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return
            }
            this.dxFormData1.account_token = this.token
            let postData = this.joinFormParams(this.dxFormData1)
            let d: Result
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.lineAPI.setAdd(postData)
            } else {
                d = await this.lineAPI.setUpdate(this.ID, postData)
            }
            if (
                d.code == RespCode.OK ||
                d.code == RespCode.isSame ||
                d.code == RespCode.isSameSaveData
            ) {
                this.toast(() => {
                    this.redirect('/server/line/list')
                })
            } else {
                this.errorCodeMsg(d.code, d.msg)
            }
        } catch (error) {
            this.error(error)
        }
    }

    /**
     * 跳转
     * @param e
     */
    private async onClickBackHandler(sender) {
        this.redirect('/server/line/list')
    }

    /**
     * 获取线路
     */
    private async getDataListByLine() {
        let d = await this.lineAPI.getList()

        this.dxSelectBoxBakLine.option({
            dataSource: d.data
        })

        // this.dxSelectBoxDownLine.option({
        //     dataSource: d.data
        // })

        // this.dxSelectBoxdownload_failover_line_id.option({
        //     dataSource: d.data
        // })

        let d_region_short = await this.regionAPI.getList()
        this.dxSelectBoxLineEnter.option({
            dataSource: d_region_short.data
        })

        this.dxSelectBoxLineExit.option({
            dataSource: d_region_short.data
        })
    }

    private async getDataListByLayout() {
        let d = await this.layoutAPI.getList()
        this.dxSelectBoxLayoutCode.option({
            dataSource: d.data
        })
    }
}
