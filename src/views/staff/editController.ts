import { Component, Vue, Prop } from 'vue-property-decorator'
import $ from 'jquery'
import DevExpress from 'devextreme/bundles/dx.all'
import { DxForm, DxPopup } from 'devextreme-vue'
import BaseVue from '@/common/BaseVue'

import { StaffApi } from '@/api/StaffApi'
import { StaffRoleApi } from '@/api/StaffRoleApi'
import { StaffModel } from '@/models/StaffModel'
import { BaseModel } from '@/models/BaseModel'
import { RespCode } from '@/common/RespCode'
import { Lang } from '@/common/Lang'
import { Validation } from '@/common/Validation'
import { CommonUtils } from '@/common/CommonUtils'
import md5 from 'md5'

/**
 * 员工编辑
 */
@Component({
    components: {
        DxForm,
        DxPopup
    }
})
export default class Home extends BaseVue {
    // 组件
    private dxFormKey1: string = 'dxForm_Key_1'
    private dxForm1: DevExpress.ui.dxForm = null
    private dxSelectBox1: DevExpress.ui.dxSelectBox = null

    //表单数据
    private dxFormData1: StaffModel = { status: 1,super_password:"" }
    //重置数据
    private dxFormDataReset1: StaffModel = {}

    private staffAPI = new StaffApi()
    private staffRoleAPI = new StaffRoleApi()
    // 入口
    protected async mounted() {
        (this.$parent as any).content_title = "员工编辑";
        this.dxFormData1.id = 0
        this.dxFormData1.account_token = this.token

        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update
        }
        this.initComponent()
        this.getRoleUserList()
        if (this.ID !== RespCode.zero) {
            await this.getStaffModel(this.ID)
        }
        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1)
    }

    //#region 初始化组件
    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1)
        //表单项
        const items2: Array<
            | DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem
        > = []
        let flagEdit = false
        if (this.ID > 0) {
            flagEdit = true
        }
        //用户名
        items2.push({
            dataField: 'staff_name',
            label: {
                text: '账号'
            },
            editorOptions: {
                placeholder: '请输入4-16位的字母、数字、下划线!',
                readOnly: flagEdit,
                disabled: flagEdit
            },
            validationRules: [
                Validation.getRequired('账号不能为空!'),
                Validation.getUserName('请输入4-16位的字母、数字、下划线!')
            ]
        })

        let pwd1 = []
        let pwd2 = []
        if (this.ID == RespCode.zero) {
            pwd1 = [
                Validation.getRequired('密码不能为空!'),
                Validation.getPassword(
                    '密码强度弱了至少8个字符,数字,字母,特殊符号!'
                )
            ]
            pwd2 = [
                Validation.getRequired('确认密码不能为空!'),
                Validation.getCompare(
                    () => this.dxFormData1.staff_pwd,
                    '两次输入的密码不一致!'
                )
            ]
        } else {
            pwd1 = [
                Validation.getPassword(
                    '密码强度弱了至少8个字符,数字,字母,特殊符号!'
                )
            ]
            pwd2 = [
                Validation.getCompare(
                    () => this.dxFormData1.staff_pwd,
                    '两次输入的密码不一致!'
                )
            ]
        }

        //密码
        items2.push({
            dataField: 'staff_pwd',
            label: {
                text: '密码'
            },
            editorOptions: {
                mode: 'password',
                placeholder: '请输入8位以上的密码'
            },
            validationRules: pwd1
        })
        //确认密码
        items2.push({
            dataField: 'staff_pwd2',
            label: {
                text: '确认密码'
            },
            editorOptions: {
                mode: 'password',
                placeholder: '请再次输入密码'
            },
            validationRules: pwd2
        })
        //超级密码
        items2.push({
            dataField: 'super_password',
            label: {
                text: '超级密码'
            },
            editorOptions: {
                mode: 'password',
                placeholder: '请输入超级密码,主要员工操作二次确认,比如导出卡'
            },
            validationRules: [
                Validation.getPassword(
                    '密码强度弱了至少8个字符,数字,字母,特殊符号!'
                )
            ]
        })
        //用户名
        items2.push({
            dataField: 'name',
            label: {
                text: '员工姓名'
            },
            editorOptions: {
                placeholder: '请输入合法的员工姓名'
            },
            validationRules: [Validation.getRequired('员工姓名不能为空!')]
        })
        //角色
        items2.push({
            dataField: 'role_id',
            editorType: 'dxSelectBox',
            label: {
                text: Lang.lang_role_id
            },
            editorOptions: {
                placeholder: '请选择一个角色',
                displayExpr: 'name',
                valueExpr: 'id',
                searchEnabled: true
            },
            validationRules: [Validation.getRequired('请选择一个角色!')]
        })
        //身份证
        items2.push({
            dataField: 'id_number',
            label: {
                text: Lang.lang_id_number
            },
            editorOptions: {
                placeholder: '请输入有效的身份证号码'
            },
            validationRules: [
                Validation.getRequired('身份证号码不能为空!'),
                Validation.getIdNumber('不是有效的身份证号码!')
            ]
        })
        //qq
        items2.push({
            dataField: 'qq',
            label: {
                text: Lang.lang_qq
            },
            editorOptions: {
                placeholder: 'QQ号码'
            },
            validationRules: []
        })
        //email
        items2.push({
            dataField: 'mail',
            label: {
                text: Lang.lang_mail
            },
            editorOptions: {
                placeholder: '邮箱地址'
            },
            validationRules: [Validation.getEmail('不是有效的邮箱!')]
        })
        //phone
        items2.push({
            dataField: 'phone',
            label: {
                text: Lang.lang_phone
            },
            editorOptions: {
                placeholder: '手机号码'
            },
            validationRules: [Validation.getMobile('不是有效的手机号!')]
        })
        //地址
        items2.push({
            dataField: 'address',
            label: {
                text: Lang.lang_address
            },
            editorType: 'dxTextArea',
            editorOptions: {
                placeholder: '地址信息'
            }
        })
        //状态
        items2.push({
            dataField: 'status',
            editorType: 'dxSelectBox',
            label: {
                text: Lang.lang_status
            },
            editorOptions: {
                displayExpr: 'name',
                valueExpr: 'id',
                dataSource: CommonUtils.getDictonary().data.status
            }
        })
        //过期时间
        items2.push({
            dataField: 'end_time',
            editorType: 'dxDateBox',
            label: {
                text: Lang.lang_end_time
            },
            editorOptions: {
                placeholder: '账号过期时间',
                type: 'datetime',
                displayFormat: 'yyyy-MM-dd HH:mm:ss',
                dateSerializationFormat: 'yyyy-MM-dd HH:mm:ss',
                showClearButton: true,
                min: new Date()
            }
        })
        //按钮组
        const items3: Array<
            | DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem
        > = []
        items3.push({
            itemType: 'button',
            horizontalAlignment: 'center',
            buttonOptions: {
                text: this.ID > 0 ? Lang.Update : Lang.Add,
                type: 'success',
                useSubmitBehavior: true,
                onClick: this.onClickDoHandler
            }
        })

        items3.push({
            itemType: 'button',
            horizontalAlignment: 'center',
            buttonOptions: {
                text: '重置',
                type: 'normal',
                onClick: this.onResetHandler
            }
        })

        items3.push({
            itemType: 'button',
            horizontalAlignment: 'center',
            buttonOptions: {
                text: Lang.Back,
                type: 'normal',
                onClick: this.onClickBackHandler
            }
        })

        //分组
        const group2: Array<
            | DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem
        > = []
        group2.push(
            {
                itemType: 'group',
                //caption: Lang.Edit,
                items: items2
            },
            {
                itemType: 'group',
                colCount: 3,
                items: items3
            }
        )

        let options: DevExpress.ui.dxFormOptions = {
            formData: this.dxFormData1,
            items: group2,
            width: 500
        }
        this.dxForm1.option(options)
        this.dxSelectBox1 = this.dxForm1.getEditor('role_id')
    }
    //#endregion

    /**
     * 获取角色组
     */
    private async getRoleUserList() {
        let d = await this.staffRoleAPI.getList()
        this.dxSelectBox1.option({
            dataSource: d.data
        })
    }

    /**
     * 添加 修改
     */
    private async onClickDoHandler() {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return
            }
            this.dxFormData1.account_token = this.token
            //修改md5
            let aa = $.extend(true, {}, this.dxFormData1)
            if (aa.staff_pwd != '') {
                aa.staff_pwd = md5(aa.staff_pwd)
                aa.staff_pwd2 = md5(aa.staff_pwd2)
            }

            if (aa.super_password && aa.super_password != '') {
                aa.super_password = md5(aa.super_password)
            }

            let f = this.joinFormParams(aa)

            let result: BaseModel
            if (this.dxFormData1.id == RespCode.zero) {
                result = await this.staffAPI.staffAdd(f)
            } else {
                result = await this.staffAPI.staffUpdate(aa.id, f)
            }
            if (
                result.code == RespCode.OK ||
                result.code == RespCode.isSame ||
                result.code == RespCode.isSameSaveData
            ) {
                this.toast(() => {
                    this.redirect('/staff/list')
                })
            } else {
                this.errorCodeMsg(result.code, result.msg)
            }
        } catch (error) {
            this.error(error)
        }
    }

    /**
     * 重置
     */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1)
        this.dxForm1.option('formData', this.dxFormData1)
    }
    /**
     * 返回
     */
    private onClickBackHandler() {
        this.redirect('/staff/list')
    }

    /**
     * 获取模型
     * @param id
     */
    private async getStaffModel(id: number) {
        let d = await this.staffAPI.getStaffModel(id)
        this.dxFormData1 = d.data
        this.dxForm1.option('formData', this.dxFormData1)
    }
}
