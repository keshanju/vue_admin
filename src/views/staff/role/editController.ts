import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup, DxLoadIndicator } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { MenuApi } from '@/api/MenuApi';
import { StaffApi } from '@/api/StaffApi';
import { StaffRoleModel } from '@/models/StaffRoleModel';
import { BaseModel } from '@/models/BaseModel';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';

/**
 * 角色编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {

    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;
    private dxTreeView1: DevExpress.ui.dxTreeView;
    private dxCheckBox1: DevExpress.ui.dxCheckBox;

    private menuAPI = new MenuApi();
    private staffAPI = new StaffApi();

    private dxFormData1: StaffRoleModel = { id: 0 };
    private dxFormDataReset1: StaffRoleModel = {};


    private menu_list: any[] = [];
    private mene_selected_list: any[] = [];
    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "员工角色编辑";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        this.initComponent();
        await this.bindMenuList();
        if (this.ID !== RespCode.zero) {
            await this.getStaffRoleModel(this.ID);
        }

        this.dxTreeView1.option({ dataSource: this.menu_list });

        if (this.dxFormData1.data_selected_all) {
            this.dxCheckBox1.option({
                value: true
            });
            this.dxTreeView1.selectAll();
        } else {
            for (const item of this.mene_selected_list) {
                this.dxTreeView1.selectItem(item);
            }
        }


        this.dxFormDataReset1 = $.extend(true, {}, this.dxFormData1);
    }

    //#region 初始化组件
    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        const items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
            itemType: "group",
            //caption: this.ID > RespCode.zero ? Lang.Update : Lang.Add,
            items: [{
                dataField: "name",
                label: {
                    text: Lang.lang_role_name
                },
                editorOptions: {
                    placeholder: "请输入角色名称."
                },
                validationRules: [
                    Validation.getRequired("角色名称不能为空!")
                ]
            }, {
                label: {
                    text: Lang.lang_role_data_selected_all
                },
                dataField: "data_selected_all",
                editorType: "dxCheckBox",
                editorOptions: {
                    onValueChanged: (sender) => {
                        if (sender.value) {
                            this.dxTreeView1.selectAll();
                        } else {
                            this.dxTreeView1.unselectAll();
                        }
                    }
                }
            }, {
                label: {
                    text: Lang.lang_role_menu_ids
                },
                dataField: "menu_ids",
                editorType: "dxTreeView",
                editorOptions: {
                    height: 400,
                    displayExpr: "text",
                    valueExpr: "id",
                    showCheckBoxesMode: "normal",
                }
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
                        text: Lang.Back,
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

        this.dxTreeView1 = this.dxForm1.getEditor("menu_ids");
        this.dxCheckBox1 = this.dxForm1.getEditor("data_selected_all");
    }

    /**
 * 重置
 */
    private onResetHandler(sender) {
        this.dxFormData1 = $.extend(true, {}, this.dxFormDataReset1);
        this.dxForm1.option("formData", this.dxFormData1);
    }

    /**
     * 添加 修改
     * @param e 
     */
    private async onClickDoHandler(sender) {
        try {
            if (!this.validateForm(this.dxForm1)) {
                return;
            }

            let nodes: Array<DevExpress.ui.dxTreeViewNode> = this.dxTreeView1.getNodes();

            if (nodes.length == 0) {
                this.alert("请至少选择一个菜单!");
                return;
            }

            let menu_ids: string[] = [];
            let menu_all_count: number = 0;

            for (const ele of nodes) {
                menu_all_count++;
                menu_all_count = ele.children.length + menu_all_count;
                let childs: DevExpress.ui.dxTreeViewNode[] = ele.children.filter((element1: DevExpress.ui.dxTreeViewNode, index1: number) => {
                    return element1.selected;
                });
                if (childs.length > 0) {
                    menu_ids.push(ele.itemData.id);
                    for (const ele3 of childs) {
                        menu_ids.push(ele3.itemData.id);
                    }
                }
            }

            if (menu_ids.length == menu_all_count) {
                menu_ids = ["all"];
            }

            this.dxFormData1.menu_ids = menu_ids.join(",");

            let d: BaseModel;
            if (this.dxFormData1.id == RespCode.zero) {
                d = await this.staffAPI.staffRoleGroupAdd(this.dxFormData1.name, this.dxFormData1.menu_ids)
            } else {
                d = await this.staffAPI.staffRoleGroupUpdate(this.dxFormData1.id, this.dxFormData1.name, this.dxFormData1.menu_ids);
            }
            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/staff/role/list");
                });
            } else {
                this.errorCodeMsg(d.code, d.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }


    /**
     * 返回
     * @param e 
     */
    private onClickBackHandler(sender) {
        this.redirect("/staff/role/list");
    }
    /**
     * 获取菜单列表
     */
    private async  bindMenuList() {
        let ds: any[] = [];
        let d = await this.menuAPI.getList();
        let ss = d.data.filter((element, index) => {
            return element.menu_level == 1;
        });
        for (const ele of ss) {
            let pId = ele.id;

            let aa: any = {
                id: ele.id,
                level: ele.menu_level,
                pid: ele.menu_pid,
                text: ele.menu_name,
                href: ele.menu_route,
                expanded: true,
                items: [] = []
            };
            let ww = d.data.filter((element, index) => {
                return element.menu_level == 2 && element.menu_pid == pId;
            });

            for (const ele2 of ww) {
                aa.items.push({
                    id: ele2.id,
                    level: ele2.menu_level,
                    pid: ele2.menu_pid,
                    text: ele2.menu_name,
                    href: ele2.menu_route,
                })
            }
            ds.push(aa);
        }
        this.menu_list = ds;
    }

    /**
     * 获取员工角色模型
     * @param id 
     */
    private async getStaffRoleModel(id: number) {
        let d = await this.staffAPI.staffRoleGroupModel(id);
        let dMenu = d.data.menu_ids.split(',');
        //获取所有菜单项
        let tMenu = [];
        for (const menu of this.menu_list) {
            if (menu.items != null && menu.items.length > 0) {
                for (const menu_child of menu.items) {
                    for (const menu_id of dMenu) {
                        if (menu_child.id == menu_id) {
                            tMenu.push(menu_id);
                        }
                    }
                }
            }
        }
        this.mene_selected_list = tMenu;
        this.dxFormData1 = d.data;
        this.dxFormData1.data_selected_all = d.data.menu_ids == "all" ? true : false;

        this.dxForm1.option({
            formData: this.dxFormData1
        });
    }
}



