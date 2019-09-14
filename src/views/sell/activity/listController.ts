import {Component, Vue, Prop} from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {DxDataGrid, DxForm} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";

import {ActivityApi} from "@/api/ActivityApi";
import {CommonUtils} from "@/common/CommonUtils";

import {UploadApi} from "@/api/UploadApi";
import {RespCode} from "@/common/RespCode";
import file_uploader from "devextreme/ui/file_uploader";
import popup from "../../../../node_modules/devextreme/ui/popup";
import {ActivityPresentApi} from "@/api/ActivityPresentApi";
import {Validation} from "@/common/Validation";
import {ActivityPresentModel, Result} from "@/models/ActivityPresentModel";
import {CardsApi} from "@/api/CardsApi";
import {DevUtils} from "@/utils/DevUtils";
import * as ActivityModel from "@/models/ActivityModel";
import Image_List from "./image/list.vue";
import {ActivityImgApi} from "@/api/ActivityImgApi";
import {ActivityImgModel} from "@/models/ActivityImgModel";
import {BaseResult2} from "@/models/BaseModel";

@Component({
    components: {
        DxDataGrid,
        DxForm,
        Image_List
    }
})
export default class Home extends BaseVue {
    protected dxDataGridKey1: string = "dxDataGridKey1";
    protected dxDataGrid1: DevExpress.ui.dxDataGrid;
    private activityAPI = new ActivityApi();
    protected uploadApi = new UploadApi();
    private activityPresentApi = new ActivityPresentApi();
    private grid: DevExpress.ui.dxDataGrid;
    private activityId: number = 0;//活动Id
    private image_dialog: any = {
        visible: false,
        onHide: (flag: boolean) => {
            this.image_dialog.visible = false;
        }
    };

    /**
     * 入口
     */
    protected async mounted() {
        (this.$parent as any).content_title = "活动管理";
        this.initComponents();
        this.getDataList();
    }

    /**
     * 初始化控件
     */
    private initComponents() {
        this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

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
                width: 120
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "fee",
                caption: "所需积分",
                width: 80
            },
            {
                dataField: "type",
                caption: "类别",
                width: 120,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.activity_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "plat_type",
                caption: "平台类型",
                width: 120,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.support_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "label",
                caption: "标签",
                width: 180
            },
            {
                dataField: "summary",
                caption: "摘要",
                width: 180
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "start_time",
                caption: "开始时间",
                width: 160
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "end_time",
                caption: "结束时间",
                width: 160
            },
            {
                allowFiltering: true,
                allowSorting: true,
                dataField: "hits",
                caption: "点击次数",
                width: 100
            },
            {
                dataField: "include_region_codes",
                caption: "包含区域",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let arr: string[] = [];
                    try {
                        let region_codes_arr = (option.value as string)
                            .toString()
                            .split(",");
                        for (const item of region_codes_arr) {
                            if (item && item != "") {
                                arr.push(
                                    CommonUtils.getDicText(
                                        CommonUtils.getDictonary().data.region_code,
                                        Number(item)
                                    )
                                );
                            }
                        }
                    } catch (ex) {
                    }
                    $("<span>")
                        .append(arr.join(","))
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "exclude_region_codes",
                caption: "排除区域",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let arr: string[] = [];
                    try {
                        let region_codes_arr = (option.value as string)
                            .toString()
                            .split(",");
                        for (const item of region_codes_arr) {
                            if (item && item != "") {
                                arr.push(
                                    CommonUtils.getDicText(
                                        CommonUtils.getDictonary().data.region_code,
                                        Number(item)
                                    )
                                );
                            }
                        }
                    } catch (ex) {
                    }
                    $("<span>")
                        .append(arr.join(","))
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 80
            },
            {
                dataField: "change_time",
                caption: "更新时间",
                width: 160
            },
            {
                dataField: "change_staff_name",
                caption: "更新人",
                width: 80
            },
            {
                dataField: "url_type",
                caption: "是否链接",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let color = option.value == 0 ? "red" : "green";
                    $("<span style='color:" + color + "'>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.flag,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "url",
                caption: "链接",
                width: 180
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: "操作",
                width: 250,
                cellTemplate: this.CellEdit
            }
        ];

        let options = this.getDataGridOption({
            onToolbarPreparing: this.onToolbarPreparingHandler,
            columns: cols,
            onRowClick: this.onRowClickHandler
        });

        this.dxDataGrid1.option(options);
    }

    /**
     * 双击编辑
     * @param e
     */
    private onRowClickHandler(sender) {
        this.dbClick(() => {
            this.redirect("/sell/activity/edit/" + sender.key.id);
        });
    }

    /**
     * 编辑
     * @param cellElement
     * @param option
     */
    private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
        let is_release = option.data.is_release;
        let release_title =
            is_release == 1 ? "<span style='color:red'>取消发布</span>" : "发布";

        let aActive = this.getCreateLink(release_title, async sender => {
            try {
                let d: ActivityModel.Result;
                if (is_release == 1) {
                    d = await this.activityAPI.setActiveStatusCancel(option.value);
                } else {
                    d = await this.activityAPI.setActiveStatus(option.value);
                }
                if (
                    d.code == RespCode.OK ||
                    d.code == RespCode.isSame ||
                    d.code == RespCode.isSameSaveData
                ) {
                    this.toast(() => {
                        this.dxDataGrid1.refresh();
                    });
                } else {
                    this.errorCodeMsg(d.code, d.msg);
                }
            } catch (error) {
                this.error(error);
            }
        });

        let aBindPresent = $(
            "<a href='#' data=" + option.value + "> 绑定礼品 </a>"
        );
        aBindPresent.bind("click", sender => {
            this.activityId = Number($(sender.target).attr("data"));
            this.grid = this.createPopDataList(
                {
                    title: "礼品列表"
                },
                {
                    dataSource: [],
                    columns: [
                        {
                            dataField: "id",
                            caption: "编号",
                            width: 80
                        },
                        {
                            dataField: "activity_title",
                            caption: "所属活动",
                            width: 120
                        },
                        {
                            dataField: "type",
                            caption: "活动类型",
                            width: 100,
                            cellTemplate: (
                                cellElement: DevExpress.core.dxElement,
                                option: any
                            ) => {
                                $("<span>")
                                    .append(
                                        CommonUtils.getDicText(
                                            CommonUtils.getDictonary().data.present_type,
                                            option.value
                                        )
                                    )
                                    .appendTo(cellElement);
                            }
                        },
                        {
                            dataField: "title",
                            caption: "礼品名称",
                            width: 160
                        },
                        {
                            dataField: "present_type",
                            caption: "奖品类型",
                            width: 120,
                            cellTemplate: (
                                cellElement: DevExpress.core.dxElement,
                                option: any
                            ) => {
                                $("<span>")
                                    .append(
                                        CommonUtils.getDicText(
                                            CommonUtils.getDictonary().data.activity_present_type,
                                            option.value
                                        )
                                    )
                                    .appendTo(cellElement);
                            }
                        },
                        {
                            dataField: "fee",
                            caption: "消耗积分",
                            width: 100
                        },
                        {
                            dataField: "card_define_title",
                            caption: "关联充值卡",
                            width: 120
                        },
                        {
                            dataField: "price_type",
                            caption: "货币类型",
                            width: 80,
                            cellTemplate: (
                                cellElement: DevExpress.core.dxElement,
                                option: any
                            ) => {
                                $("<span>")
                                    .append(
                                        CommonUtils.getDicText(
                                            CommonUtils.getDictonary().data.price_type,
                                            option.value
                                        )
                                    )
                                    .appendTo(cellElement);
                            }
                        },
                        {
                            dataField: "money",
                            caption: "奖品价格(分)",
                            width: 100
                        },
                        // {
                        //   dataField: "image",
                        //   caption: "图片地址",
                        //   width: 160,
                        //   cellTemplate: (
                        //     cellElement: DevExpress.core.dxElement,
                        //     option: any
                        //   ) => {
                        //     let aImg = $(
                        //       "<img src='" +
                        //         this.uploadApi.getUploadHttp +
                        //         option.value +
                        //         "' width='150' height='50'/>"
                        //     );
                        //     aImg.appendTo(cellElement);
                        //   }
                        // },
                        {
                            dataField: "number",
                            caption: "奖品库存数量",
                            width: 110
                        },
                        {
                            dataField: "ratio",
                            caption: "抽奖率(万分之一)",
                            width: 120
                        },

                        {
                            fixed: true,
                            fixedPosition: "right",
                            dataField: "id",
                            alignment: "center",
                            caption: "操作",
                            width: 200,
                            cellTemplate: (
                                cellElement1: DevExpress.core.dxElement,
                                option1: any
                            ) => {
                                let aEdit = $(
                                    "<a href='#' data='" + option1.value + "'> 编辑 </a>"
                                ).bind("click", async sender => {
                                    let id = Number($(sender.target).attr("data"));
                                    let d = await this.activityPresentApi.getModel(
                                        this.activityId,
                                        id
                                    );
                                    this.editPresentForm(d.data);
                                });

                                let aDel = this.getCreateLink("删除", async sender => {
                                    let a = await this.confirm("是否确定删除?");
                                    if (a) {
                                        let d = await this.activityPresentApi.setDelete(
                                            option.value,
                                            option1.value
                                        );
                                        this.toast(() => {
                                            this.grid.refresh();
                                        });
                                    }
                                });

                                $("<div>")
                                    .append(aEdit)
                                    .append(" | ")
                                    .append(aDel)
                                    .appendTo(cellElement1);
                            }
                        }
                    ]
                },
                sender => {
                    let toolbarItems = sender.toolbarOptions.items;
                    toolbarItems.push({
                        location: "before",
                        widget: "dxButton",
                        options: {
                            text: "添加",
                            icon: "add",
                            onClick: this.onPresentClickHandler
                        }
                    });

                    toolbarItems.push({
                        location: "before",
                        widget: "dxButton",
                        options: {
                            text: "刷新",
                            icon: "refresh",
                            onClick: sender => {
                                this.grid.refresh();
                            }
                        }
                    });
                }
            );

            this.getPresentDataList();
        });

        let browserUrl = CommonUtils.GetSettingsVal("Activity_Browser_Url").replace(
            "${id}",
            option.value
        );

        let aEdit = this.getCreateLink("编辑", sender => {
            this.redirect("/sell/activity/edit/" + option.value);
        });

        let aImage = this.getCreateLink("图片列表", sender => {
            // this.image_dialog.visible = true;
            // this.image_dialog.id = option.value;
            this.Img_DataList(option.value);
        });

        let ele = $("<div>");
        if (is_release == 1) {
            ele.append(aActive);
        } else {
            ele.append(aActive);
            ele.append(" | ");
            ele.append(aBindPresent);
            ele.append(" | ");
            ele.append(aEdit);
            ele.append(" | ");
            ele.append(aImage);
        }
        ele.append(" | ");
        ele.append($("<a href='" + browserUrl + "' target='_blank'> 浏览 </a>"));
        ele.appendTo(cellElement);
    }

    private getPresentDataList() {
        let ds: any = this.getDataGridPager(
            async (strWhere, pageSize, pageIndex) =>
                await this.activityPresentApi.getListPager(
                    this.activityId,
                    strWhere,
                    pageSize,
                    pageIndex
                )
        );
        this.grid.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    private onPresentClickHandler() {
        this.editPresentForm();
    }

    private async editPresentForm(
        formData: ActivityPresentModel = {
            id: 0,
            price_type: 1,
            type: 0,
            money: 0,
            total_number: 0,
            ref_id: 0,
            present_type: 0
        }
    ) {
        let cardDefindDS = await new CardsApi().getSimpleListResult();
        let dsCard = cardDefindDS.data;
        dsCard = [{id: -1, title: "请选择充值卡类别"}, ...dsCard];
        let form = this.createPopForm(
            {
                title: "奖品编辑",
                maxWidth: 800
            },
            {
                formData: formData,
                colCount: 2,
                items: [
                    {
                        colSpan: 2,
                        dataField: "title",
                        label: {
                            text: "礼品名称"
                        },
                        editorOptions: {
                            placeholder: "请输入礼品名称",
                            hint: "请输入礼品名称"
                        },
                        validationRules: [Validation.getRequired("礼品名称不能为空!")]
                    },
                    {
                        dataField: "type",
                        label: {
                            text: "奖品类型"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            placeholder: "请输入奖品类型",
                            hint: "请输入奖品类型",
                            displayExpr: "name",
                            valueExpr: "id",
                            dataSource: CommonUtils.getDictonary().data.present_type,
                            onValueChanged: () => {
                                this.setSelectType(form);
                            }
                        },
                        validationRules: [Validation.getRequired("奖品类型不能为空!")]
                    },
                    {
                        dataField: "ref_id",
                        label: {
                            text: "充值卡关联"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            placeholder: "请选择充值卡关联",
                            hint: "请选择充值卡关联",
                            dataSource: dsCard,
                            displayExpr: "title",
                            valueExpr: "id"
                        },
                        validationRules: [
                            //Validation.getRequired('关联ID不能为空!')
                        ]
                    },
                    {
                        dataField: "present_type",
                        label: {
                            text: "奖品类型"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            placeholder: "请选择奖品类型",
                            hint: "请选择奖品类型",
                            dataSource: CommonUtils.getDictonary().data.activity_present_type,
                            displayExpr: "name",
                            valueExpr: "id"
                        },
                        validationRules: [Validation.getRequired("奖品类型不能为空!")]
                    },
                    {
                        dataField: "fee",
                        label: {
                            text: "消耗积分"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            placeholder: "消耗积分",
                            min: 0
                        },
                        validationRules: []
                    },
                    {
                        dataField: "price_type",
                        label: {
                            text: "价格类型"
                        },
                        editorType: "dxSelectBox",
                        editorOptions: {
                            placeholder: "请输入价格类型",
                            hint: "请输入价格类型",
                            displayExpr: "name",
                            valueExpr: "id",
                            dataSource: CommonUtils.getDictonary().data.price_type
                        },
                        validationRules: [Validation.getRequired("价格类型不能为空!")]
                    },
                    {
                        dataField: "money",
                        label: {
                            text: "奖品价格(分)"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            placeholder: "请输入奖品价格",
                            hint: "请输入奖品价格"
                        },
                        validationRules: [Validation.getRequired("奖品价格不能为空!")]
                    },
                    DevUtils.getUploadFormItem({
                        options: {
                            colSpan: 2,
                            dataField: "image",
                            label: {
                                text: "请输入礼品图片"
                            },
                            validationRules: [Validation.getRequired("礼品图片不能为空")]
                        }
                    }),
                    {
                        dataField: "total_number",
                        label: {
                            text: "奖品库存数量"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            placeholder: "请输入奖品库存数量",
                            hint: "请输入奖品库存数量",
                            min: 0
                        },
                        validationRules: [Validation.getRequired("奖品库存数量不能为空!")]
                    },
                    {
                        dataField: "ratio",
                        label: {
                            text: "抽奖率(万分之一)"
                        },
                        editorType: "dxNumberBox",
                        editorOptions: {
                            placeholder: "请输入抽奖率,格式为1~1000之间",
                            hint: "请输入抽奖率,格式为1~10000之间",
                            min: 1,
                            max: 10000
                        },
                        validationRules: [Validation.getRequired("抽奖率不能为空!")]
                    },
                    {
                        colSpan: 2,
                        dataField: "desc",
                        label: {
                            text: "奖品描述"
                        },
                        editorType: "dxTextArea",
                        editorOptions: {
                            placeholder: "请输入奖品描述",
                            hint: "请输入奖品描述",
                            height: 100
                        },
                        validationRules: [Validation.getRequired("奖品描述不能为空!")]
                    }
                ]
            },
            {},
            async (form, pop) => {
                let data = form.option("formData") as ActivityPresentModel;
                try {
                    data.account_token = this.token;
                    let postData = this.joinFormParams(data);
                    let d: Result;
                    if (data.id == RespCode.zero) {
                        d = await this.activityPresentApi.setAdd(this.activityId, postData);
                    } else {
                        d = await this.activityPresentApi.setUpdate(
                            this.activityId,
                            data.id,
                            postData
                        );
                    }
                    if (
                        d.code == RespCode.OK ||
                        d.code == RespCode.isSame ||
                        d.code == RespCode.isSameSaveData
                    ) {
                        this.toast(() => {
                            this.grid.refresh();
                        });
                        return true;
                    } else {
                        this.errorCodeMsg(d.code, d.msg);
                        return false;
                    }
                } catch (error) {
                    this.error(error);
                    return false;
                }
                return false;
            }
        );
        this.setSelectType(form);
    }

    private setSelectType(form: DevExpress.ui.dxForm) {
        let c_type = form.getEditor("type") as DevExpress.ui.dxSelectBox;
        let c_ref_id = form.getEditor("ref_id") as DevExpress.ui.dxSelectBox;
        if (c_type.option("value") == 0) {
            c_ref_id.option({
                disabled: false
            });
        } else {
            c_ref_id.option({
                disabled: true,
                value: -1
            });
        }
    }

    /**
     * 初始化工具条
     * @param e
     */
    private onToolbarPreparingHandler(e: {
        component?: DevExpress.DOMComponent;
        element?: DevExpress.core.dxElement;
        model?: any;
        toolbarOptions?: DevExpress.ui.dxToolbarOptions;
    }) {
        let dataGrid = e.component;
        let toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "添加",
                icon: "add",
                onClick: this.onAddHandler
            }
        });

        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                text: "刷新",
                icon: "refresh",
                onClick: this.onRefreshHandler
            }
        });

        // toolbarItems.push({
        //     location: 'before',
        //     widget: 'dxButton',
        //     options: {
        //         text: '官网静态化',
        //         icon: 'upload',
        //         onClick: this.onUploadJsonHandler
        //     }
        // })

        //创建搜索工具条
        this.createSearchToolbars(
            toolbarItems,
            this.dxDataGrid1.option("columns"),
            () => {
                this.getDataList();
            }
        );
    }

    /**
     * 静态化
     */
    private async onUpdateStaticHandler() {
        try {
            let d = await this.activityAPI.setStatic();
            if (d.code == RespCode.zero) {
                this.alert("活动缓存更新成功!");
            } else {
                this.errorCodeMsg(d.code, d.msg);
            }
        } catch (error) {
            this.error(error);
        }
    }

    /**
     * 上传文件
     */
    private onUploadJsonHandler(sender) {
        let div = $("<div>");
        div.appendTo(sender.element);

        this.popup1 = new popup(div[0], {
            width: 400,
            height: 220,
            title: "上传文件",
            contentTemplate: () => {
                let f = new file_uploader($("<div>")[0], {
                    multiple: false,
                    accept: "*",
                    uploadMode: "instantly",
                    uploadMethod: "POST",
                    name: "filename",
                    uploadUrl: this.uploadApi.getActivityUploadPath("json"),
                    onUploaded: (e: {
                        component?: DevExpress.DOMComponent;
                        element?: DevExpress.core.dxElement;
                        model?: any;
                        file?: File;
                        jQueryEvent?: JQueryEventObject;
                        event?: DevExpress.event;
                        request?: XMLHttpRequest;
                    }) => {
                        this.toast(() => {
                            this.popup1.hide();
                            this.dxDataGrid1.refresh();
                        }, "您的信息已经上传成功!");
                    },
                    onUploadError: () => {
                        console.log("error");
                    }
                });
                return f.element();
            },
            toolbarItems: [
                {
                    location: "after",
                    toolbar: "bottom",
                    visible: true,
                    widget: "dxButton",
                    options: {
                        type: "success",
                        text: "模板文件",
                        onClick: () => {
                        }
                    }
                }
            ]
        });
        this.popup1.show();
    }

    /**
     * 搜索
     * @param e
     */
    private onRefreshHandler(sender) {
        this.dxDataGrid1.refresh();
    }

    /**
     * 添加
     * @param e
     */
    private onAddHandler(sender) {
        this.redirect("/sell/activity/edit");
    }

    /**
     * 获取数据列表
     */
    private getDataList() {
        let ds: any = this.getDataGridPager(
            async (strWhere, pageSize, pageIndex) =>
                await this.activityAPI.getListPager(strWhere, pageSize, pageIndex)
        );
        this.dxDataGrid1.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    //#region  图片列表
    private active_id = 0;
    private active_img_list: DevExpress.ui.dxDataGrid;

    private Img_DataList(active_id: number) {
        this.active_id = active_id;
        const cols: DevExpress.ui.dxDataGridColumn[] = [
            {
                dataField: "id",
                caption: "编号",
                width: 80
            },
            {
                dataField: "key",
                caption: "图片类型",
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    $("<span>")
                        .append(
                            CommonUtils.getDicText(
                                CommonUtils.getDictonary().data.img_key_type,
                                option.value
                            )
                        )
                        .appendTo(cellElement);
                }
            },
            {
                dataField: "create_staff_name",
                caption: "创建人",
                width: 100
            },
            {
                dataField: "create_time",
                caption: "创建时间",
                width: 160
            },
            {
                dataField: "change_staff_name",
                caption: "修改人",
                width: 100
            },
            {
                dataField: "change_time",
                caption: "修改时间",
                width: 160
            },
            {
                fixed: true,
                fixedPosition: "right",
                dataField: "id",
                alignment: "center",
                caption: "操作",
                width: 250,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                    let aEdit = this.getCreateLink("编辑图片", () => {
                        this.Img_DataEdit(option.value);
                    });

                    $("<span>")
                        .append(aEdit)
                        .appendTo(cellElement);
                }
            }
        ];

        this.active_img_list = this.createPopDataList(
            {title: "活动图片列表"},
            {
                columns: cols
            },
            sender => {
                let toolbarItems = sender.toolbarOptions.items;
                toolbarItems.push({
                    location: "before",
                    widget: "dxButton",
                    options: {
                        text: "添加",
                        icon: "add",
                        onClick: () => {
                            this.Img_DataEdit(0);
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
                            this.active_img_list.refresh();
                        }
                    }
                });
                //创建搜索工具条
                this.createSearchToolbars(
                    toolbarItems,
                    this.dxDataGrid1.option("columns"),
                    () => {
                        this.getImgDataListPager();
                    }
                );
            }
        );
        this.getImgDataListPager();
    }

    private async getImgDataListPager() {
        // 数据源
        let ds = this.getDataGridPager(
            async (strWhere, pageSize, pageIndex) =>
                await new ActivityImgApi().getListPager(
                    this.active_id,
                    strWhere,
                    pageSize,
                    pageIndex
                )
        );
        this.active_img_list.option({
            remoteOperations: true,
            dataSource: ds
        });
    }

    private iImageNode: JQuery;

    /**
     * 编辑图片
     * @param id
     */
    private async Img_DataEdit(id: number) {
        const items: Array<| DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem> = [
            {
                dataField: "key",
                label: {
                    text: "活动图片类型"
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    placeholder: "请选择活动图片类型",
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: CommonUtils.getDictonary().data.img_key_type
                },
                validationRules: [Validation.getRequired("活动图片类型不能为空!")]
            },
            this.createUploadFileFormItem(
                image => {
                    this.iImageNode = image;
                },
                {
                    dataField: "img_url",
                    label: {
                        text: "活动图片"
                    },
                    validationRules: [Validation.getRequired("活动图片不能为空!")]
                },
                {
                    name: "filename",
                    uploadUrl: this.uploadApi.getUploadNormalPath("activity_images")
                }
            )
        ];

        let formData: ActivityImgModel = {
            id: 0,
            key: 0
        };

        if (id > 0) {
            let d = await new ActivityImgApi().getModel(this.active_id, id);
            formData = d.data;
        }

        let form = this.createPopForm(
            {
                title: "活动图片编辑",
                width: 500,
                height: 300
            },
            {
                formData: formData,
                items: items
            },
            {hasReset: false},
            async (a, b) => {
                try {
                    formData = a.option("formData");
                    let result: BaseResult2;
                    formData.account_token = this.token;
                    if (formData.id == 0) {
                        result = await new ActivityImgApi().setAdd(
                            this.active_id,
                            formData
                        );
                    } else if (formData.id > 0) {
                        result = await new ActivityImgApi().setUpdate(
                            this.active_id,
                            formData.id,
                            formData
                        );
                    }

                    if (
                        result.code == RespCode.OK ||
                        result.code == RespCode.isSame ||
                        result.code == RespCode.isSameSaveData
                    ) {
                        this.toast(() => {
                            this.active_img_list.refresh();
                            b.hide();
                        });
                    } else {
                        this.errorCodeMsg(result.code, result.msg);
                    }
                } catch (error) {
                    this.error(error);
                }
                return false;
            }
        );

        if (id > 0) {
            this.iImageNode.attr(
                "src",
                this.uploadApi.getUploadHttp + formData.img_url
            );
        }
    }

    //#endregion
}
