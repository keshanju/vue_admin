import {Component} from "vue-property-decorator";
import {DxDataGrid} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import DevExpress from 'devextreme/bundles/dx.all';
import {CommonUtils} from "@/common/CommonUtils";
import {CMSChannelApi} from "@/api/CMSChannelApi";
import {RespCode} from "@/common/RespCode";
import $ from "jquery";

@Component({
    components: {
        DxDataGrid
    }
})
export default class Home extends BaseVue {
    private devDataGridSrc = 'devDataGridSrc';

    private devDataGridUi: DevExpress.ui.dxDataGrid;

    private channelApi = new CMSChannelApi();

    private create_type = -1;

    private isCreateOption = false;

    private is_release = 0;

    private dataSource = [];

    private shellType = [];

    private toolbar;

    protected async mounted() {
        (this.$parent as any).content_title = "官网静态页面生成";

        this.channelApi.getCreateShellType().then((value) => {
            this.shellType = value.data;
            this.initComponent();
            this.getHtmlCreateList();
        });
    }

    private initComponent() {

        this.devDataGridUi = this.getDxInstanceByKey(this.devDataGridSrc);
        const cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "num",
                caption: "编号",
                width: 40,
                alignment: "center",
            },
            {
                dataField: "system_type",
                caption: "平台",
                width: 200,
                alignment: "center",
            },
            {
                dataField: "html_file",
                caption: "文件",
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "html_url",
                alignment: "center",
                caption: "操作",
                width: 200,
                cellTemplate: this.CellEdit
            }
        ];

        let options = this.getDataGridOption({
            dataSource: this.dataSource,
            columns: cols,
            pager: {visible: false},
            paging: {enabled: false},
            onToolbarPreparing: this.toolbarPreparingConf
        });

        this.devDataGridUi.option(options);
    }

    private async getCreateShellType() {
        let shellType = await this.channelApi.getCreateShellType();
        if (shellType.code == 0) {
            return shellType.data
        } else {
            return [];
        }
    }

    private getHtmlCreateList() {
        this.channelApi.getHtmlCreateList().then((value) => {
            if (value.code == 0) {
                this.dataSource = value.data.file_info;
                this.is_release = value.data.is_release;

                if (this.dataSource.length == 0) {
                    this.isCreateOption = false;
                } else {
                    this.isCreateOption = true;
                }

                this.devDataGridUi.option({
                    remoteOperations: true,
                    dataSource: this.dataSource,
                    onToolbarPreparing: this.toolbarPreparingConf
                });
            }
        })
    }

    private createWebHtml(value) {
        if (this.create_type < 0) {
            this.alert("请选择创建类型");
        } else {
            this.channelApi.createWwwHtml(this.create_type).then((value) => {
                if (value.code != 0) {
                    this.alert(value.msg);
                } else {
                    this.alert('生成静态HTML任务已添加成功')
                }
            })
        }
    }

    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        $("<div>").append($("<a href='"+option.data.html_url+"' target='_blank'> 预览 </a>")).appendTo(cellElement);
    }

    private releaseWebHtml()
    {
        if (this.is_release != 1) {
            this.alert("未检测到创建的HTML文件，如果您已经生成了HTML，请刷新后重试！");
        } else {
            this.channelApi.releaseWebHtml().then((value) => {
                if (value.code != 0) {
                    this.alert(value.msg);
                } else {
                    this.alert('发布任务已添加成功')
                }
            })
        }
    }

    private toolbarPreparingConf(e)
    {
        let toolbarItem = e.toolbarOptions.items;
        toolbarItem.push({
            location: "before",
            widget: "dxButton",
            options: {
                icon: "refresh",
                text: "刷新",
                onClick: this.getHtmlCreateList
            }
        });

        toolbarItem.push({
            location: "before",
            widget: "dxSelectBox",
            group: "group",
            name: "shell_type",
            options: {
                placeholder: "选择生成类型",
                displayExpr: "title",
                valueExpr: "id",
                dataSource: this.shellType,
                onValueChanged: sender => {
                    this.create_type = sender.value;
                }
            }
        });

        toolbarItem.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "生成/预览",
                onClick: this.createWebHtml
            }
        });

        toolbarItem.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "执行发布",
                onClick: this.releaseWebHtml
            }
        });
    }
}