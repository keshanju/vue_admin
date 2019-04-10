import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { UserGroupApi } from '@/api/UserGroupApi';
import { UserGroupModel } from '@/models/UserGroupModel';
import { BaseModel } from '@/models/BaseModel';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { RespCode } from '@/common/RespCode';
import { Validation } from '@/common/Validation';
import { RoutePathModel } from '@/models/RoutePathModel';
import { RoutePathApi } from '@/api/RoutePathApi';
import { StaffRoleApi } from '@/api/StaffRoleApi';

/**
 * 用户编辑
 */
@Component({
    components: {
        DxDataGrid, DxForm, DxTreeView
    }
})
export default class Home extends BaseVue {
    private dxFormKey1: string = "dxForm_Key_1";
    private dxForm1: DevExpress.ui.dxForm;
    private staffRoleAPI = new StaffRoleApi();
    private routePathApi = new RoutePathApi();
    private arrRoutePath: RoutePathModel[];
    private dxTreeView1: DevExpress.ui.dxTreeView;

    protected async mounted() {
        (this.$parent as any).content_title = "角色路由编辑";
        this.submitText = Lang.Add;
        if (this.ID !== RespCode.zero) {
            this.submitText = Lang.Update;
        }
        //加载路由列表
        await this.getRoutePathList();
        this.initComponent();
    }

    private initComponent() {
        this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);
        //按钮组
        const items3: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: this.ID > 0 ? Lang.Update : Lang.Add,
                type: "success",
                useSubmitBehavior: true,
                onClick: this.onClickDoHandler
            }
        });

        // items3.push({
        //     itemType: "button",
        //     alignment: "center",
        //     buttonOptions: {
        //         text: "重置",
        //         type: "normal",
        //         onClick: this.onResetHandler
        //     }
        // });

        items3.push({
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
                text: Lang.Back,
                type: "normal",
                useSubmitBehavior: true,
                onClick: this.onClickBackHandler
            }
        });

        //分组
        const group2: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [];
        group2.push({
            itemType: "group",
            //caption: "角色路由更新",
            items: [
                {
                    label: {
                        text: "角色路由"
                    },
                    dataField: "data_selected_all",
                    editorType: "dxTreeView",
                    editorOptions: {
                        height: 500,
                        displayExpr: "title",
                        valueExpr: "id",
                        showCheckBoxesMode: "selectAll",
                        searchEnabled: true,
                        dataSource: this.arrRoutePath,
                        onContentReady:this.getRoleRotePathRelation
                    }
                }
            ]
        }, {
                itemType: "group",
                colCount: 3,
                items: items3
            });

        let options: DevExpress.ui.dxFormOptions = {
            items: group2,
            width: 500
        }
        this.dxForm1.option(options);

        this.dxTreeView1 = this.dxForm1.getEditor("data_selected_all");
    }

    /**
   * 用户组信息提交
   */
    private async onClickDoHandler() {
        try {
            let nodes = this.dxTreeView1.getNodes();
            let selectedNodes: number[] = [];
            for (const n of nodes) {
                if (n.selected) {
                    selectedNodes.push(n.key);
                }
            }
            let result: BaseModel = await this.staffRoleAPI.setStaffRoleRoutePath(this.ID, selectedNodes);
            if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
                this.toast(() => {
                    this.redirect("/staff/role/list");
                });
            } else {
                this.errorCodeMsg(result.code, result.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }

    /**
   * 返回
   */
    private onClickBackHandler() {
        this.redirect("/staff/role/list");
    }

    //绑定角色和路由关系
    private async getRoleRotePathRelation(sender){
        let t = sender.component as DevExpress.ui.dxTreeView;
        let d = await this.staffRoleAPI.getRoleRotePathRelation(this.ID);
        let arr = d.data;
        for (const ele of arr) {
          t.selectItem(ele.api_route_id);
        }
    }

    //加载路由列表
    private async getRoutePathList() {
        let d = await this.routePathApi.getList();
        this.arrRoutePath = d.data;
    }
}