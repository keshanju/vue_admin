import { Vue, Component } from 'vue-property-decorator'
import BaseVue from "@/common/BaseVue";
import { DxDataGrid } from 'devextreme-vue'
import DevExpress from 'devextreme/bundles/dx.all';
import { LangResourcesApi } from '@/api/LangResourcesApi';
import { CommonUtils } from '@/common/CommonUtils';
import { Validation } from '@/common/Validation';
import { LangResourcesModel } from '@/models/LangResourcesModel';
import { BaseModel } from '@/models/BaseModel';
import { RespCode } from '@/common/RespCode';

@Component({
    components: {
        DxDataGrid
    }
})
export default class listController extends BaseVue {

    DxDataGridKey = "DxDataGridKey";
    dxDataGrid1: DevExpress.ui.dxDataGrid;
    child_grid: DevExpress.ui.dxDataGrid;

    private langResourcesApi = new LangResourcesApi();
    private pid = 0;

    mounted() {
        (this.$parent as any).content_title = "语言字典";
        this.dxDataGrid1 = this.getDxInstanceByKey(this.DxDataGridKey);
        let cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "title",
                caption: "标题",
                width: 140,
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "type",
                caption: "资源类型",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.language_type, option.value))
                        .appendTo(cellElement);
                },
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "lang",
                caption: "语言",
                width: 80,
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160,
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 80,
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 160,
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 80,
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: "操作",
                width: 200,
                cellTemplate: this.cellEdit
            }
        ];

        let options = this.getDataGridOption({
            onToolbarPreparing: this.onToolbarPreparingHandler,
            columns: cols,
        });

        this.dxDataGrid1.option(options);

        this.getDataList();
    }

    /**
 * 编辑
 * @param container 
 * @param option 
 */
    private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let aEdit = $("<a href='javascript:void(0)'> " + "编辑" + " </a>");
        aEdit.bind("click", async (sender) => {
            let d = await this.langResourcesApi.getModel(Number(option.value));
            this.getEditForm(d.data);
        });

        let aChild = $("<a href='javascript:void(0)'> " + "语言列表" + " </a>");
        aChild.bind("click", (sender) => {

            let cols: DevExpress.ui.dxDataGridColumn[] = [
                {
                    dataField: "id",
                    caption: "编号",
                    width: 80
                },
                {
                    allowFiltering: true,
                    allowSorting: true,
                    dataField: "p_title",
                    caption: "所属字典标题",
                    width: 140,
                },
                {
                    allowFiltering: true,
                    allowSorting: true,
                    dataField: "title",
                    caption: "标题",
                    width: 140,
                },
                {
                    allowFiltering: true,
                    allowSorting: true,
                    dataField: "type",
                    caption: "资源类型",
                    width: 100,
                    cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                        $("<span>")
                            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.language_type, option.value))
                            .appendTo(cellElement);
                    },
                },
                {
                    allowFiltering: true,
                    allowSorting: true,
                    dataField: "lang",
                    caption: "语言",
                    width: 80,
                },
                {
                    dataField: "create_time",
                    caption: "创建时间",
                    width: 160,
                },
                {
                    dataField: "create_staff_name",
                    caption: "创建人",
                    width: 80,
                },
                {
                    dataField: "change_time",
                    caption: "修改时间",
                    width: 160,
                },
                {
                    dataField: "change_staff_name",
                    caption: "修改人",
                    width: 80,
                },
                {
                    fixed: true,
                    fixedPosition: "right",
                    dataField: "id",
                    alignment: "center",
                    caption: "操作",
                    width: 200,
                    cellTemplate: (cellElement1: DevExpress.core.dxElement, option1: any) => {
                        let aEdit1 = $("<a href='javascript:void(0)'> " + "编辑" + " </a>");
                        aEdit1.bind("click", async (sender) => {
                            let d = await this.langResourcesApi.getModel(Number(option1.value));
                            this.getEditForm(d.data);
                        });

                        let aDel1 = this.getCreateLink("删除", async sender => {
                            let a = await this.confirm("是否确定删除?");
                            if (a) {
                                let d = await this.langResourcesApi.setDelete(Number(option1.value));
                                if (this.child_grid)
                                    this.child_grid.refresh();
                            }
                        });

                        $("<span>")
                            .append(aEdit1)
                            .append(" | ")
                            .append(aDel1)
                            .appendTo(cellElement1);
                    }
                }
            ];

            this.child_grid = this.createPopDataList(
                {
                    title: "语言字典子列表"
                },
                {
                    columns: cols
                },
                (sender) => {
                    let toolbarItems = sender.toolbarOptions.items;
                    toolbarItems.push({
                        location: "before",
                        widget: "dxButton",
                        options: {
                            text: "添加",
                            icon: "add",
                            onClick: () => {
                                this.getEditForm({
                                    id: 0,
                                    pid: Number(option.value),
                                    type: 1,
                                    lang: "en"
                                });
                            }
                        }
                    });

                    toolbarItems.push({
                        location: "before",
                        widget: "dxButton",
                        options: {
                            text: "刷新",
                            icon: "refresh",
                            onClick: () => {
                                if (this.child_grid)
                                    this.child_grid.refresh();
                            }
                        }
                    });
                }
            );

            let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.langResourcesApi.getListPager(Number(option.value), strWhere, pageSize, pageIndex));
            this.child_grid.option({
                remoteOperations: true,
                dataSource: ds
            });
        });

        let aDel = this.getCreateLink("删除", async sender => {
            let a = await this.confirm("是否确定删除?");
            if (a) {
                let d = await this.langResourcesApi.setDelete(Number(option.value));
                this.dxDataGrid1.refresh();
            }
        });

        $("<span>")
            .append(aEdit)
            .append(" | ")
            .append(aChild)
            .append(" | ")
            .append(aDel)
            .appendTo(cellElement);
    }

    private onToolbarPreparingHandler(e: { component?: DevExpress.DOMComponent, element?: DevExpress.core.dxElement, model?: any, toolbarOptions?: DevExpress.ui.dxToolbarOptions }) {
        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "添加",
                icon: "add",
                onClick: () => {
                    this.getEditForm();
                }
            }
        });

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                icon: "refresh",
                text: "刷新",
                onClick: () => {
                    this.dxDataGrid1.refresh();
                }
            }
        });
    }

    private async getEditForm(model: LangResourcesModel = {
        id: 0,
        pid: 0,
        type: 1,
        lang: "en"
    }) {
        let d = await this.langResourcesApi.getList();
        let dPid = [{ id: 0, title: "字典标题(默认为0)" }, ...d.data];

        let items = this.createFormItems([
            {
                label: {
                    text: "所属字典标题"
                },
                dataField: "pid",
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择所属字典标题",
                    dataSource: dPid,
                    displayExpr: "title",
                    valueExpr: "id",
                    width: 280
                },
                validationRules: [
                    Validation.getRequired("所属字典标题不能为空!")
                ]
            },
            {
                label: {
                    text: "标题"
                },
                dataField: "title",
                editorType: "dxTextBox",
                editorOptions: {
                    placeholder: "请输入标题信息.",
                    width: 280
                },
                validationRules: [
                    Validation.getRequired("标题信息不能为空!")
                ]
            },
            {
                label: {
                    text: "资源类型"
                },
                dataField: "type",
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择资源类型!",
                    width: 280,
                    dataSource: CommonUtils.getDictonary().data.language_type,
                    displayExpr: "name",
                    valueExpr: "id",
                },
                validationRules: [
                    Validation.getRequired("资源类型不能为空!")
                ]
            },
            {
                label: {
                    text: "所属语言"
                },
                dataField: "lang",
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择所属语言!",
                    width: 280,
                    dataSource: CommonUtils.getDictonary().data.language_resources,
                    displayExpr: "name",
                    valueExpr: "id",
                },
                validationRules: [
                    Validation.getRequired("关键词不能为空!")
                ]
            },
        ]);
        let form = this.createPopForm(
            {
                title: "编辑语言",
                maxWidth: 500,
                maxHeight: 350
            },
            {
                formData: model,
                items: items
            },
            {

            },
            async (f, p) => {
                try {
                    if (!this.validateForm(f)) {
                        return
                    }
                    let formData = f.option('formData') as LangResourcesModel
                    formData.account_token = this.token

                    let postData = this.joinFormParams(formData)
                    let d: BaseModel
                    if (formData.id == RespCode.zero) {
                        d = await this.langResourcesApi.setAdd(postData)
                    } else {
                        d = await this.langResourcesApi.setUpdate(
                            formData.id,
                            postData
                        )
                    }
                    if (
                        d.code != RespCode.OK &&
                        d.code != RespCode.isSame &&
                        d.code != RespCode.isSameSaveData
                    ) {
                        this.errorCodeMsg(d.code, d.msg)
                        return false
                    } else {
                        if (this.child_grid) {
                            this.child_grid.refresh();
                            //this.child_grid = null;
                        }
                        else {
                            this.dxDataGrid1.refresh();
                        }
                    }
                } catch (error) {
                    this.error(error)
                }
                return true
            }
        );
    }
    /**
   * 数据列表
   */
    private getDataList() {
        let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.langResourcesApi.getListPager(this.pid, strWhere, pageSize, pageIndex));
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }
}