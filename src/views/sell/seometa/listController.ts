import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import BaseVue from '@/common/BaseVue';
import {
    DxTreeList
  } from 'devextreme-vue/tree-list';
import { SeometaApi } from '@/api/SeometaApi';

@Component({
    components: {
        DxTreeList
    }
})
export default class Home extends BaseVue {

    private devTreeListSrc: string = 'devTreeListSrc'
    private devTreeListUi: DevExpress.ui.dxTreeList;

    private dataSource = []

    private seometaApi = new SeometaApi

    protected async mounted() {
        (this.$parent as any).content_title = "SEO Meta";
        this.initComponents()
        this.getDataList()
    }

    /**
     * 初始化页面
     */
    protected initComponents() {
        this.devTreeListUi = (this.$refs[this.devTreeListSrc] as any).instance;
        let options: DevExpress.ui.dxTreeListOptions = {
            columns: this.columns(),
            dataSource: this.dataSource,
            keyExpr:"id",
            parentIdExpr:"pid",
            showRowLines:true,
            showBorders:true,
            editing:{
                allowAdding: true,
                allowDeleting:true,
                allowUpdating:true,
            },
            onRowInserted: this.insertedOneData,
            onRowUpdated: this.updatedOneData,
            onRowRemoved: this.removedOneData,
            onToolbarPreparing: (e) => {
                let toolbarItems = e.toolbarOptions.items;

                toolbarItems.push({
                    location: "before",
                    widget: "dxButton",
                    options: {
                        text: "刷新",
                        icon: "refresh",
                        onClick: this.getDataList
                    }
                });

                toolbarItems.forEach(function(item) {
                    if (item.name == "addRowButton") {
                        item.location = 'before';
                        item.showText = true;
                        item.options.text = '添加';
                    }
                });
            },
        }
        
        this.devTreeListUi.option(options);
    }

    /**
     * 添加一条新数据
     */
    private insertedOneData(value) {
        this.seometaApi.createOneSeoMeta(value.data).then((value) => {
            if(value.code == 0) {
                this.getDataList()
            }
        })
    }

    /**
     * 修改一条数据
     * @param value 
     */
    private updatedOneData(value) {
        this.seometaApi.updateOneSeoMeta(value.key, value.data).then((value) => {
            if(value.code == 0) {
                this.getDataList()
            }
        })
    }

    /**
     * 删除一条数据
     * @param value 
     */
    private removedOneData(value) {
        if (value.key == value.data.id) {
            this.seometaApi.deleteOneSeoMeta(value.key).then((value) => {
                if(value.code != 0) {
                    this.errorCodeMsg(value.code, value.msg);
                }
                this.getDataList()
            })
        }
    }

    /**
     * 获取服务数据
     */
    private getDataList()
    {
        this.seometaApi.getAllSeoMeta().then((value) => {
            this.dataSource = value.data
            this.devTreeListUi.option({
                remoteOperations: true,
                dataSource: this.dataSource
            });
        })
    }

    /**
     * 页面表单设置
     */
    private columns(){
        let columns: DevExpress.ui.dxTreeListColumn[] = [
            {
              dataField: "title",
              caption: "名称",
              width: 200,
              validationRules: [{type: "required"}]
            },
            {
                dataField: "key",
                caption: "SEO Key",
                width: 200,
                validationRules: [{type: "required"}]
            },
            {
                dataField: "value",
                caption: "SEO Value"
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 130,
                allowEditing: false
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 50,
                allowEditing: false
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 130,
                allowEditing: false
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 50,
                allowEditing: false
            }
        ];
        return columns;
    }
}