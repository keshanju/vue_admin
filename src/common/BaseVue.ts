import {Component, Vue} from "vue-property-decorator";
import $ from "jquery";
import Enumerable from "linq";
import DevExpress from "devextreme/bundles/dx.all";
import notify from "devextreme/ui/notify";
import dialog from "devextreme/ui/dialog";
import dxButton from "devextreme/ui/button";
import dxPopup from "devextreme/ui/popup";
import dxForm from "devextreme/ui/form";
import dxDataGrid from "devextreme/ui/data_grid";
import dxFileUploader from "devextreme/ui/file_uploader";
import scroll_view from "devextreme/ui/scroll_view";
import {UploadApi} from "@/api/UploadApi";
import * as UploadModel from "@/models/UploadModel";
import {Lang} from "@/common/Lang";
import {CommonUtils} from "@/common/CommonUtils";
import {DictionaryModel} from "@/models/DictionaryModel";
import {LangResourcesModel} from "@/models/LangResourcesModel";
import {ConditionSearchEnum} from './ConditionSearch';

@Component({
    components: {}
})
export default class BaseVue extends Vue {
    // Token
    protected token: string = "";
    // 提交按钮文本
    protected submitText: string = Lang.Submit;
    // 请求参数Id
    protected ID: number;
    protected uploadApi = new UploadApi();
    /**
     * 弹窗
     */
    protected popup1: DevExpress.ui.dxPopup;

    protected scroll_view1: DevExpress.ui.dxScrollView;

    protected dsLang: LangResourcesModel[];

    protected content_title: string = "测试";

    /**
     *
     */
    created() {
    }

    /**
     * 设置标题
     * @param title
     */
    protected setTitle(title: string) {
        (this.$parent as any).content_title = title;
    }

    // 入口
    protected mounted() {
        CommonUtils.Router = this.$router;
        if (this.$route && this.$route.path) {
            let path = this.$route.path;
            if (path != "/login") {
                // 判断用户是否登录
                let tUser = CommonUtils.getStaffLoginInfo();
                // if (tUser == null) {
                //     if (!CommonUtils.isAlert) {
                //         CommonUtils.isAlert = true
                //         dialog.alert("您的登录已过期,请重新登录!", "提示信息").then((d: any) => {
                //             CommonUtils.Router.push({ path: "/login" })
                //         });
                //     }
                //     return;
                // }

                // let nowTime = new Date()

                // let loginTime = new Date(
                //     Date.parse(tUser.data.login_info.expiry_time)
                // )
                // if (loginTime < nowTime) {
                //     if (!CommonUtils.isAlert) {
                //         CommonUtils.isAlert = true
                //         dialog.alert("您的登录已过期,请重新登录!", "提示信息").then((d: any) => {
                //             CommonUtils.Router.push({ path: "/login" })
                //         });
                //     }
                //     return;
                // }

                if (tUser != null) {
                    this.token = tUser.data.login_info.account_token;
                    // if (this.token == '') {
                    //     if (!CommonUtils.isAlert) {
                    //         CommonUtils.isAlert = true
                    //         dialog.alert("您的登录已过期,请重新登录!", "提示信息").then((d: any) => {
                    //             CommonUtils.Router.push({ path: "/login" })
                    //         });
                    //     }
                    //     return;
                    // }
                }
            }
        }
        // 默认Id处理
        this.ID = Number("0" + this.getParam("id"));
    }

    /**
     * 拼接表单参数
     * @param formData json对象
     */
    protected joinFormParams(formData: object) {
        let arr_result: Array<any> = [];
        let d = $.param(formData);
        let arr = d.split("&");
        for (let value of arr) {
            let vv = value.split("=");
            if (vv[1]) {
                arr_result.push(value);
            }
        }
        return arr_result.join("&");
    }

    /**
     * 地址跳转
     * @param path
     */
    protected redirect(paths: string) {
        this.$router.push({path: paths});
    }

    /**
     * 返回历史
     */
    protected backHistory() {
        this.$router.back();
        //  window.history.go(-1)
    }

    /**
     * 根据keyword获取DevExtreme对象
     * @param key
     */
    protected getDxInstanceByKey(key: string) {
        return (this.$refs[key] as any).instance;
    }

    /**
     * 弹出信息
     * @param aMsg
     * @param type success error
     */
    protected toast(
        call: (component: any, ele: Element, model: object) => void = null,
        aMsg: string = "你提交的信息已经完成!",
        types = "success"
    ) {
        let aOptions: object = {
            message: aMsg,
            type: types,
            //position: { my: "top center", at: "top center", of: window, offset: "0 200" },
            position: {my: "center center", at: "center center", of: window},
            width: Math.min(aMsg.length * 15 + 60, 800),
            onHidden: call
        };
        notify(aOptions);
    }

    /**
     * 弹窗信息
     * @param aMsg
     * @param aTitle
     */
    protected alert(
        aMsg: string,
        aTitle: string = Lang.alert_title
    ): JQueryPromise<void> {
        return dialog.alert(aMsg, aTitle);
    }

    /**
     *
     * @param aMsg
     * @param aTitle
     */
    protected error(
        aMsg: string,
        aTitle: string = "错误信息"
    ): JQueryPromise<void> {
        return dialog.alert(aMsg, aTitle);
    }

    /**
     *
     * @param code
     * @param msg
     */
    protected errorCodeMsg(code: number, msg: string): JQueryPromise<void> {
        //  return this.error("<span style='color:red'>错误代码</span>: " + code + " <br/><span style='color:red'>错误信息</span>: " + msg);
        return this.error("<span style='color:red'>错误信息</span>: " + msg);
    }

    /**
     * 对话框信息
     * @param aMsg
     * @param aTitle
     */
    protected confirm(
        aMsg: string,
        aTitle: string = Lang.confirm_title
    ): JQueryPromise<boolean> {
        return dialog.confirm(
            '<div style="min-width: 200px; text-align: center; padding: 10px">' +
            aMsg +
            "</div>",
            aTitle
        );
    }

    /**
     * 获取路由请求参数
     * @param key
     */
    protected getParam(key: string = "id"): string {
        if (this.$route && this.$route.params) {
            let tempID = this.$route.params[key];
            if (tempID === undefined) {
                return "";
            } else {
                return tempID;
            }
        }
        return "";
    }

    /**
     * 验证表单数据
     * 自动定位到焦点
     * @param dxForm
     */
    protected validateForm(dxForm: DevExpress.ui.dxForm): boolean {
        let valids = dxForm.validate();
        if (!valids) {
            return true;
        }
        if (!valids.isValid) {
            for (let aBrokenRule of valids.brokenRules) {
                let vv = aBrokenRule as any;
                if (vv["fieldname"]) {
                    let ee = dxForm.getEditor(vv["fieldname"]);
                    ee.focus();
                    //this.toast(aBrokenRule.message, "error");
                    break;
                } else {
                    if (vv && vv.validator.focus) {
                        let aValidator: DevExpress.ui.dxValidator = vv.validator;
                        aValidator.focus();
                        break;
                    }
                }
            }
            return false;
        }
        valids.isValid = true;
        return true;
    }

    /**
     * 获取通用datagrid参数
     * @param options
     */
    protected getDataGridOption(
        options: DevExpress.ui.dxDataGridOptions
    ): DevExpress.ui.dxDataGridOptions {
        if (options.columns != null && options.columns.length > 0) {
            options.columns = this.FormatDataGridColumns(options.columns);
        }
        let oo: DevExpress.ui.dxDataGridOptions = null;
        oo = {
            paging: {
                enabled: true,
                pageSize: 20
            },
            showRowLines: true,
            showBorders: true,
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50, 100, 200],
                showInfo: true,
                showNavigationButtons: true,
                visible: true
            },
            hoverStateEnabled: true,
            //onToolbarPreparing: this.onToolbarPreparingHandler,
            //columns: cols,
            scrolling: {
                columnRenderingMode: "virtual",
                showScrollbar: "always"
            },
            rowAlternationEnabled: true,
            allowColumnResizing: true,
            // filterRow: {
            //     visible: true,
            //     applyFilter: "onClick"
            // },
            //focusStateEnabled:true,
            // filterPanel:{
            //     visible: true
            // },
            //filterSyncEnabled:false,
            columnResizingMode: "widget",
            columnChooser: {
                enabled: true,
                mode: "select",
                height: 500
            },
            columnAutoWidth: true
        };
        oo = $.extend(oo, options);
        return oo;
    }

    /**
     * 封装分页 排序 检索
     */
    protected getDataGridPager(
        dataHandler: (strWhere: string, pageSize: number, pageIndex: number) => any
    ) {
        // 数据源
        let ds = {
            load: async (loadOptions: DevExpress.data.LoadOptions) => {
                let strWhere = "";
                let strFilter = "";
                //检索
                if (loadOptions.filter != null) {
                    let filterArr: Array<any> = loadOptions.filter;
                    if (filterArr[1] == "and") {
                        let index = 0;
                        for (const ff of filterArr) {
                            let ss = index % 2;
                            if (ss == 0) {
                                let condition = "";
                                switch (ff[1]) {
                                    case "=":
                                        condition = "equal";
                                        break;
                                    case "contains":
                                        condition = "contain";
                                        break;
                                }
                                strFilter += ff[0] + "__" + condition + "__" + ff[2] + "|";
                            }
                            index++;
                        }
                    } else {
                        let condition = "";
                        switch (filterArr[1]) {
                            case "=":
                                condition = "equal";
                                break;
                            case "contains":
                                condition = "contain";
                                break;
                        }
                        strFilter += filterArr[0] + "__" + condition + "__" + filterArr[2];
                    }
                    strWhere += "&search=" + strFilter;
                }

                if (strWhere == "") {
                    strWhere = this.search_keyword;
                }

                //排序
                if (loadOptions.sort != null) {
                    let sortArr: any = loadOptions.sort[0];
                    let desc = "desc";
                    if (!sortArr.desc) {
                        desc = "asc";
                    }
                    strWhere += "&sort=" + sortArr.selector + "__" + desc;
                }
                let d = $.Deferred();
                let tempPageIndex = Math.floor(loadOptions.skip / loadOptions.take) + 1;
                let pageIndex: number = tempPageIndex;
                let pageSize: number = loadOptions.take;
                let dd: any = await dataHandler(strWhere, pageSize, pageIndex);

                //计算聚合 有bug
                let result_arr: any[] = [];
                //如果有数据说明是第一眼 缓存起来
                let summaryList: any[] = null;
                if (loadOptions && loadOptions.totalSummary) {
                    summaryList = loadOptions.totalSummary;
                    localStorage.setItem("totalSummary", JSON.stringify(summaryList));
                } else {
                    summaryList = JSON.parse(localStorage.getItem("totalSummary")) as any;
                }
                if (summaryList) {
                    let arr: any[] = dd.data.list;
                    for (const item of summaryList) {
                        if (item.summaryType == "sum") {
                            let a = Enumerable.from(arr).sum(p => p[item.selector]);
                            result_arr.push(a);
                        } else if (item.summaryType == "count") {
                            let a = Enumerable.from(arr).count(p => p[item.selector]);
                            result_arr.push(a);
                        }
                    }
                }
                d.resolve({
                    data: dd.data.list,
                    totalCount: dd.data.total,
                    summary: result_arr
                });
                return d.promise();
            }
        };
        return ds;
    }

    /**
     * 创建上传图片表单项 封装
     * 显示图片 自动上传图片
     * @param options
     */
    protected createUploadFileFormItem(
        showImageNode: (JQuery) => void,
        options: DevExpress.ui.dxFormSimpleItem = {},
        optionsUpload: DevExpress.ui.dxFileUploaderOptions = {},
        isShowPhoto: boolean = true
    ): DevExpress.ui.dxFormSimpleItem {
        let tempData: {
            component: DevExpress.ui.dxForm;
            dataField: string;
            editorOptions: any;
            editorType?: string;
        };
        let tempaImageNode: JQuery;

        //#region 上传选项
        let tempUploadOptions: DevExpress.ui.dxFileUploaderOptions = {
            name: "photo",
            multiple: false,
            accept: "images/*",
            uploadMode: "instantly",
            uploadUrl: this.uploadApi.getUploadGameBackGroundPath,
            uploadMethod: "POST",
            labelText: "",
            onUploaded: (e: {
                component?: DevExpress.DOMComponent;
                element?: DevExpress.core.dxElement;
                model?: any;
                file?: File;
                jQueryEvent?: JQueryEventObject;
                event?: DevExpress.event;
                request?: XMLHttpRequest;
            }) => {
                try {
                    let ff: UploadModel.ModelResult = JSON.parse(e.request.responseText);
                    if (!ff) {
                        this.error(e.request.responseText);
                        return;
                    }
                    if (ff.data.url != null) {
                        let src = this.uploadApi.getUploadHttp + ff.data.url;
                        tempaImageNode.attr("src", src);
                        tempData.component.updateData(tempData.dataField, ff.data.url);
                        showImageNode(
                            tempaImageNode != null && tempaImageNode.length > 0
                                ? tempaImageNode
                                : src
                        );
                    } else if (ff.data.file_path != null) {
                        let src = this.uploadApi.getUploadHttp + ff.data.file_path;
                        tempaImageNode.attr("src", src);
                        tempData.component.updateData(
                            tempData.dataField,
                            ff.data.file_path
                        );
                        showImageNode(
                            tempaImageNode != null && tempaImageNode.length > 0
                                ? tempaImageNode
                                : src
                        );
                    } else {
                        showImageNode(ff.msg);
                    }
                } catch (error) {
                    this.error(error);
                }
            },
            onUploadError: sender => {
                console.log(sender);
            }
        };

        if (optionsUpload != null) {
            tempUploadOptions = $.extend(tempUploadOptions, optionsUpload);
        }
        //#endregion

        let aObj: DevExpress.ui.dxFormSimpleItem = {
            dataField: "game_background_url",
            label: {
                text: "游戏背景图"
            },
            template: (
                data: {
                    component: DevExpress.ui.dxForm;
                    dataField: string;
                    editorOptions: any;
                    editorType?: string;
                },
                aItemEle: JQuery
            ) => {
                tempData = data;
                let img = CommonUtils.DEFAULT_PIC_URL;
                if (data.editorOptions && data.editorOptions["value"]) {
                    img = this.uploadApi.getUploadHttp + data.editorOptions["value"];
                }

                let aHeight: string = "auto";
                if (data.editorOptions && data.editorOptions["height"])
                    aHeight = data.editorOptions["height"].toString();
                let photoShow = "";
                if (isShowPhoto) {
                    photoShow =
                        '<img name="image" style="max-height: 100px;height: ' +
                        aHeight +
                        '; max-width: 500px; border: 0px solid #eee; margin-bottom: 6px"/>';
                }
                let aStr: string =
                    '<div style="border: 0px solid #F0BAB9; padding: 1px;">' +
                    photoShow +
                    ' <div class="dx-field-item-label-content" >' +
                    '   <span name="labelEmpty" class="dx-field-item-label-text">&nbsp;&nbsp;</span>' +
                    '   <label name="fileCombine" style="margin-bottom: 0px;width:50%;">' +
                    //+ '      <input type="file" name="file" style="opacity: 0; width: 0px; height: 1px;display:block;"/>'
                    '      <div name="changeFakeBtn" />' +
                    "   </label> " +
                    '   <div name="clearBtn" />' +
                    "</div>";
                let aParentNode = $(aStr);

                let aImageNode: JQuery = aParentNode.find('[name="image"]');
                let aChangeFakeNode: JQuery = aParentNode.find(
                    '[name="changeFakeBtn"]'
                );
                //文本框
                aParentNode.appendTo(aItemEle);
                tempaImageNode = aImageNode;
                aImageNode.attr("src", img);

                showImageNode(tempaImageNode);

                //更新图片
                // data.component.option({
                //     onOptionChanged: (sender: any) => {
                //         console.log(sender);
                //         if (sender.value != null && sender.value != "") {
                //             if (sender.fullName == "formData." + data.dataField) {
                //                 console.log(sender);
                //                 img = this.uploadApi.getUploadHttp + sender.value;
                //                 aImageNode.attr('src', img);
                //             }
                //         }

                //     }
                // });
                let dxFile1 = new dxFileUploader(aChangeFakeNode[0], tempUploadOptions);
            }
        };

        aObj = $.extend(aObj, options);
        return aObj;
    }

    private touchtime = new Date().getTime();

    /**
     * 双击
     * @param a
     */
    protected dbClick(a: () => void) {
        return;
        if (new Date().getTime() - this.touchtime < 500) {
            if (a != null) {
                a();
            }
        } else {
            this.touchtime = new Date().getTime();
        }
    }

    /**
     * 禁用Href
     * @param $line
     */
    protected setHrefDisplay($line: JQuery<HTMLElement>): JQuery<HTMLElement> {
        $line.css("cursor", "default");
        $line.css("color", "#ccc");
        $line.attr("href", "#");
        $line.click(function (event) {
            event.preventDefault();
        });
        return $line;
    }

    /**
     * 格式化DataGridColumn列表项
     * @param columns
     */
    protected FormatDataGridColumns(
        columns: DevExpress.ui.dxDataGridColumn[]
    ): DevExpress.ui.dxDataGridColumn[] {
        let oo: DevExpress.ui.dxDataGridColumn = {
            allowFiltering: false,
            allowSorting: true,
            visible: true,
            filterOperations: ["=", "contains"]
        };
        let oos: DevExpress.ui.dxDataGridColumn[] = [];
        for (const column of columns) {
            let oo1 = $.extend(true, {}, oo);
            oos.push($.extend(oo1, column));
        }
        return oos;
    }

    //#region  筛选搜索条件
    /**
     * 搜索条件
     */
    private formFilter = {
        name: "id",
        filter: "equal",
        keyword: ""
    };

    /**
     * 搜索关键词
     */
    private search_keyword = "";

    /**
     * 搜索字段
     */
    private search_columns: { name: string; id: string }[] = [];

    /**
     * 筛选搜索条件
     */
    protected getSearchFilterCondition(): any[] {
        let d = [];

        d.push({
            name: "等于",
            id: "equal"
        });
        d.push({
            name: "包含",
            id: "contain"
        });
        return d;
    }

    /**
     * 生成工具条
     */
    protected createSearchToolbars(
        toolbarItems: any[],
        cols: DevExpress.ui.dxDataGridColumn[],
        onSearchFilterHandler: () => void,
        first_col: string = "id",
        first_condition: ConditionSearchEnum = ConditionSearchEnum.equal
    ) {
        this.formFilter.name = first_col;
        this.formFilter.filter = first_condition;
        toolbarItems.push({
            location: "before",
            template: function () {
                return $("<span> 筛选:</span>");
            }
        });
        let aa = this.setSearchColumns(cols);
        toolbarItems.push({
            location: "before",
            widget: "dxSelectBox",
            options: {
                icon: "refresh",
                text: "筛选",
                dataSource: aa,
                displayExpr: "name",
                valueExpr: "id",
                value: first_col,
                width: 120,
                onValueChanged: (sender) => {
                    this.formFilter.name = sender.value;
                    //判断列是否为字典 如果为字典显示下拉列表 判断该列是否有字段 有就直接显示字典
                    let tool_item = toolbarItems.filter((sender, index) => {
                        return (sender.name = "toolbar_keyword");
                    });
                }
            }
        });
        toolbarItems.push({
            name: "toolbar_condition",
            location: "before",
            widget: "dxSelectBox",
            options: {
                icon: "refresh",
                placeholder: "条件",
                dataSource: this.getSearchFilterCondition(),
                displayExpr: "name",
                valueExpr: "id",
                value: first_condition,
                onValueChanged: sender => {
                    this.formFilter.filter = sender.value;
                },
                width: 80
            }
        });
        toolbarItems.push({
            name: "toolbar_keyword",
            location: "before",
            widget: "dxTextBox",
            options: {
                icon: "refresh",
                placeholder: "请输入关键词",
                onValueChanged: sender => {
                    this.formFilter.keyword = sender.value;
                }
            }
        });
        toolbarItems.push({
            location: "before",
            widget: "dxButton",
            options: {
                name: "toolbar_search",
                icon: "search",
                type: "success",
                onClick: async (sender) => {
                    //TODO:这里有bug 2018 10 18
                    if (
                        this.formFilter.keyword == null ||
                        this.formFilter.keyword == ""
                    ) {
                        this.search_keyword = "";
                    } else {
                        this.search_keyword =
                            "&search=" +
                            this.formFilter.name +
                            "__" +
                            this.formFilter.filter +
                            "__" +
                            this.formFilter.keyword;
                    }
                    await onSearchFilterHandler();
                }
            }
        });
    }

    /**
     * 设置搜索列
     */
    protected setSearchColumns(cols: DevExpress.ui.dxDataGridColumn[]) {
        for (const iterator of cols) {
            if (iterator.caption && iterator.caption.indexOf("操作") > -1) {
                continue;
            }
            this.search_columns.push({
                name: iterator.caption,
                id: iterator.dataField
            });
        }
        return this.search_columns;
    }

    /**
     * 设置搜索关键词
     */
    protected setSearchKeywordDic(
        search_form_dic: { name: string; filter: string; keyword: string }[]
    ) {
        let ss = "";
        for (const item of search_form_dic) {
            ss += item.name + "__" + item.filter + "__" + item.keyword + "|";
        }
        if (ss != "") {
            this.search_keyword = "&search=" + ss;
        }
    }

    /**
     * 设置搜索条件
     * @param str
     */
    protected setSearchKeywords(str: string) {
        this.search_keyword = str;
    }

    /**
     * 创建列表
     */
    protected createPopDataList(
        options_pop: DevExpress.ui.dxPopupOptions,
        options_grid: DevExpress.ui.dxDataGridOptions,
        toolbar_call?: (
            e: {
                component?: DevExpress.DOMComponent;
                element?: DevExpress.core.dxElement;
                model?: any;
                toolbarOptions?: DevExpress.ui.dxToolbarOptions;
            }
        ) => any
    ) {
        //清除搜索条件
        this.setSearchKeywords("");

        let tempPop = $("<div id='pop_xxx_222' />");
        tempPop.appendTo($("body"));

        //
        let options_grid1 = $.extend(
            this.getDataGridOption({
                // export: {
                //     enabled: true
                // },
                // selection: {
                //     mode: 'multiple',
                //     selectAllMode: 'page',
                //     showCheckBoxesMode: 'always'
                // },
                onToolbarPreparing: toolbar_call
            }),
            options_grid
        );
        let dataGrid1 = new dxDataGrid($("<div />")[0], options_grid1);

        //弹窗
        let toolbarItems: DevExpress.ui.dxPopupToolbarItem[] = [];
        toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            visible: true,
            widget: "dxButton",
            options: {
                type: "normal",
                text: "取消",
                onClick: () => {
                    popup1.hide();
                    tempPop.remove();
                }
            }
        });
        //弹窗
        let options_pop1 = $.extend(
            {
                title: "列表",
                onHidden: () => {
                    popup1.hide();
                    tempPop.remove();
                },
                contentTemplate: () => {
                    return dataGrid1.element();
                },
                //width: $(window).width() - 700,
                toolbarItems: toolbarItems
            },
            options_pop
        );

        let popup1: dxPopup = new dxPopup(tempPop[0], options_pop1);
        popup1.show();
        let scroll_view1 = new scroll_view($(popup1.content())[0], {
            useNative: false
        });
        return dataGrid1;
    }

    //#region

    /**
     * 创建弹窗表单
     * 2018-11-15 修改单击事件为Promise对象  其他bug出现继续修复
     * @param options_pop 弹窗属性
     * @param options_form 表单属性
     * @param option_other 其他属性
     * @param onClickHandler 单击事件
     */
    protected createPopForm(
        options_pop?: DevExpress.ui.dxPopupOptions,
        options_form?: DevExpress.ui.dxFormOptions,
        option_other?: {
            isAdd?: boolean;
            hasReset?: boolean;
        },
        onClickHandler?: (
            form: DevExpress.ui.dxForm,
            popup: DevExpress.ui.dxPopup
        ) => Promise<boolean>
    ): DevExpress.ui.dxForm {
        let tempPop = $("<div id='pop_xxx_111' />");

        tempPop.appendTo($("body"));

        let option_other1 = {
            isShowReset: true,
            /**
             * 是否添加
             */
            isAdd: false,
            /**
             * 是否有重设
             */
            hasReset: true
        };

        option_other1 = $.extend(option_other1, option_other);

        // let options_form1: DevExpress.ui.dxFormOptions = {
        //     items: []
        // };
        // options_form1 = $.extend(options_form1, options_form);

        let formDataReset: any = {};

        if (options_form && options_form.formData) {
            formDataReset = $.extend(true, {}, options_form.formData);
        }

        let form1 = new dxForm($("<div />")[0], options_form);

        let toolbarItems: DevExpress.ui.dxPopupToolbarItem[] = [];

        toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            visible: true,
            widget: "dxButton",
            options: {
                type: "success",
                text: "确定",
                onClick: async () => {
                    try {
                        try {
                            if (!this.validateForm(form1)) {
                                return;
                            }
                        } catch (sender) {
                            console.log(sender);
                        }

                        if (onClickHandler != null) {
                            let d = await onClickHandler(form1, popup1);
                            if (!d) {
                                return;
                            }
                        }

                        //是否继续添加数据
                        if (option_other1.isAdd) {
                            let ale = await this.confirm("是否继续添加数据?", "提示信息");
                            if (!ale) {
                                popup1.hide();
                            }
                            if (option_other1 != null)
                                form1.option("formData", formDataReset);
                        } else {
                            popup1.hide();
                        }
                    } catch (error) {
                        this.error(error, "错误信息!");
                    }
                }
            }
        });
        //是否有重设按钮
        if (option_other1.hasReset) {
            toolbarItems.push({
                location: "after",
                toolbar: "bottom",
                visible: true,
                widget: "dxButton",
                options: {
                    type: "normal",
                    text: "重置",
                    onClick: () => {
                        if (option_other1 != null) form1.option("formData", formDataReset);
                    }
                }
            });
        }
        //取消
        toolbarItems.push({
            location: "after",
            toolbar: "bottom",
            visible: true,
            widget: "dxButton",
            options: {
                type: "normal",
                text: "取消",
                onClick: () => {
                    popup1.hide();
                    tempPop.remove();
                }
            }
        });
        //弹窗
        let options_pop1: DevExpress.ui.dxPopupOptions = {
            title: "表单",
            onHidden: () => {
                popup1.hide();
                tempPop.remove();
            },
            contentTemplate: () => {
                return form1.element();
            },
            toolbarItems: toolbarItems
        };

        options_pop1 = $.extend(options_pop1, options_pop);

        let popup1: dxPopup = new dxPopup(tempPop[0], options_pop1);
        popup1.show();
        //添加滚动条
        let scroll_view1 = new scroll_view($(popup1.content())[0], {
            useNative: false
        });
        return form1;
    }

    /**
     *
     *
     *  dataField: "pause_status",
     caption: "暂停状态",
     cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      }
     * @param cols
     */
    protected createDataGridColumns(cols: DevExpress.ui.dxDataGridColumn[]) {
        return cols;
    }

    /**
     * 创建表单项
     */
    protected createFormItems(
        item: Array<| DevExpress.ui.dxFormSimpleItem
            | DevExpress.ui.dxFormGroupItem
            | DevExpress.ui.dxFormTabbedItem
            | DevExpress.ui.dxFormEmptyItem
            | DevExpress.ui.dxFormButtonItem>
    ): Array<| DevExpress.ui.dxFormSimpleItem
        | DevExpress.ui.dxFormGroupItem
        | DevExpress.ui.dxFormTabbedItem
        | DevExpress.ui.dxFormEmptyItem
        | DevExpress.ui.dxFormButtonItem> {
        return item;
    }

    //#endregion

    /**
     * 行列渲染
     * @param cellElement
     * @param option
     */
    protected rowCellTemplateRender(
        cellElement: DevExpress.core.dxElement,
        option: any,
        color: string = "",
        dic: Array<DictionaryModel> = null
    ) {
        if (option.column.headerFilter) {
            $("<span style='color:" + color + "'>")
                .append(
                    CommonUtils.getDicText(
                        option.column.headerFilter.dataSource,
                        option.value
                    )
                )
                .appendTo(cellElement);
        } else {
            if (dic) {
                $("<span style='color:" + color + "'>")
                    .append(CommonUtils.getDicText(dic, option.value))
                    .appendTo(cellElement);
            } else {
                $("<span style='color:red'>")
                    .append("未知标签")
                    .appendTo(cellElement);
            }
        }
    }

    /**
     * 区域解析
     * @param region
     */
    protected getRegionCode(region: string) {
        let aa: number[] = [];
        let a = typeof region;
        let bb: string[] = [];

        if (a == "number") {
            bb = region.toString().split(",");
        } else if (a == "string") {
            bb = region.trim().split(",");
        }
        for (const item of bb) {
            if (item) aa.push(Number(item));
        }
        return aa;
    }

    /**
     * 获取生成点击按钮链接
     * @param title
     * @param call
     */
    protected getCreateLink(title: string, call: (sender: any) => void) {
        let aEdit = $("<a href='javascript:void(0)'> " + title + " </a>");
        aEdit.bind("click", call);
        return aEdit;
    }
}

