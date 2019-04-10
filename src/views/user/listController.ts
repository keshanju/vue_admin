import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";
import DevExpress from "devextreme/bundles/dx.all";
import { DxDataGrid, DxForm, DxTreeView, DxMenu } from "devextreme-vue";
import menu from "devextreme/ui/menu";
import BaseVue from "@/common/BaseVue";

import { UserApi } from "@/api/UserApi";
import { UserModel } from "@/models/UserModel";

import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { DateTimeUtils, DateTimeEnum } from "@/utils/DateTimeUtils";
import { SearchFormModel } from "@/models/SearchModel";
import { Validation } from "@/common/Validation";
import { UserLoginLogApi } from "@/api/UserLoginLogApi";
import { UserChangeTimeLogApi } from "@/api/UserChangeTimeLogApi";
import MyMaster from "./master.vue";
import { BaseModel } from "@/models/BaseModel";
import { RespCode } from "@/common/RespCode";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
import { UserOpLogs } from "./op_logs/UserOpLogs";
import { UserDuration } from './duration/UserDuration';
/**
 * 会员列表
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxMenu,
    MyMaster,
    dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private userAPI = new UserApi();
  private dxSearchFormKey1: string = "dxSearchFormKey1";
  private dxSearchForm1: DevExpress.ui.dxForm;
  private mySearchFormModel: UserModel = {
    search_type: 0,
    mobile_num: "",
    mail: "",
    group_id: null,
    status: null,
    search_title: ""
  };
  private role_list: any[];

  private master_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.master_dialog.visible = false;
      if (flag) {
      }
    }
  };

  /**
   * 推荐标识  1 推荐 2 被推荐
   */
  private ref_flag = 1;
  private ref_user_id = "";
  private ref_grid: DevExpress.ui.dxDataGrid;

  protected async mounted() {
    (this.$parent as any).content_title = "用户管理";

    await this.getUserGroupList();
    this.initComponent();
    //this.initComponentSearchForm();
    //await this.getUserList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);
    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "master_account",
        caption: "主账号类型",
        width: 150,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.master_account,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "mobile_num",
        caption: "手机号",
        width: 150,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let $span = $("<span>");
          if (option.value && option.value.toString() != "") {
            if (
              option.data.country_code &&
              option.data.country_code.toString() != ""
            ) {
              $span.append("(+" + option.data.country_code + ")");
            }
          }
          $span.append(option.value);
          $span.appendTo(cellElement);
        }
      },
      {
        dataField: "mail",
        caption: "邮箱",
        width: 150
      },
      {
        dataField: "user_name",
        caption: "账号",
        width: 100
      },
      {
        dataField: "nickname",
        caption: "用户昵称",
        width: 100
      },
      {
        dataField: "pause_status",
        caption: "暂停状态",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          let $span = $("<span style='color:" + color + "'>");
          if (option.key.package_billing_type == 1)
            $span.append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_pause_status,
                option.value
              )
            );
          $span.appendTo(cellElement);
        },
        width: 80
      },
      {
        dataField: "package_title",
        caption: "套餐名称",
        width: 100
      },
      {
        dataField: "group_title",
        caption: "用户组",
        width: 80
      },
      {
        dataField: "vip_level_title",
        caption: "会员级别",
        width: 80
      },
      {
        dataField: "expired_time",
        caption: "到期时间(包月)",
        width: 160,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let billing_type = option.key.package_billing_type;
          let expired_time = option.key.expired_time;
          let user_earn_minutes = option.key.user_earn_minutes;
          //计算到期时间
          let now = DateTimeUtils.getNow();
          let esc_time = "";
          if (billing_type == 2) {
            esc_time = DateTimeUtils.AddTime(
              expired_time,
              DateTimeEnum.Milliscond,
              user_earn_minutes * 60 * 1000
            );
            let color = "";
            if (
              DateTimeUtils.parserDate(esc_time).getTime() -
                DateTimeUtils.parserDate(now).getTime() <
              0
            ) {
              color = "red";
            }
            let $span = $("<span style='color:" + color + "'>");
            $span.append(esc_time);
            $span.appendTo(cellElement);
          }
        }
      },
      {
        dataField: "expired_time",
        caption: "剩余时长(计时)",
        width: 180,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let billing_type = option.key.package_billing_type;
          let expired_time = option.key.expired_time;
          let user_earn_minutes = option.key.user_earn_minutes;
          let last_pause_time = option.key.last_pause_time;
          let pause_status = option.key.pause_status;
          //计算到期时间
          let now = DateTimeUtils.getNow();
          let time_diff = 0;
          let esc_time = "";
          if (billing_type == 1) {
            time_diff =
              DateTimeUtils.parserDate(expired_time).getTime() -
              DateTimeUtils.parserDate(now).getTime();

            if (pause_status == 1) {
              let tt_diff =
                DateTimeUtils.parserDate(now).getTime() -
                DateTimeUtils.parserDate(last_pause_time).getTime();
              time_diff = time_diff + tt_diff;
            }

            time_diff = time_diff + user_earn_minutes * 60 * 1000;
            esc_time = DateTimeUtils.TimeIntegrate2(time_diff); // DateTimeUtils.AddTime(now, DateTimeEnum.Milliscond, time_diff);

            if (esc_time == null || esc_time == "") {
              esc_time = "0小时0分钟";
            }
            let color = "";
            if (time_diff < 0) {
              color = "red";
            }

            let $span = $("<span style='color:" + color + "'>");
            $span.append(esc_time);
            $span.appendTo(cellElement);
          }
        }
      },
      {
        dataField: "user_from",
        caption: "用户来源",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_from,
                option.value
              )
            )
            .appendTo(cellElement);
        },
        width: 100
      },
      // {
      //   dataField: "last_login_time",
      //   caption: "最后登录时间",
      //   width: 150
      // },
      // {
      //   dataField: "last_login_ip",
      //   caption: "最后登录IP",
      //   width: 100
      // },
      {
        dataField: "create_time",
        caption: "注册时间",
        width: 150
      },
      {
        dataField: "refer_code",
        caption: "自定义推荐码",
        width: 150
      },
      {
        visible: false,
        dataField: "status",
        caption: "状态",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = "";
          switch (option.value) {
            case 0:
              color = "green";
              break;
            case 1:
              color = "red";
              break;
            case 2:
              color = "blue";
              break;
          }
          $("<span style='color:" + color + "'>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_status,
                option.value
              )
            )
            .appendTo(cellElement);
        },
        width: 60
      },
      {
        visible: false,
        dataField: "locked_ip",
        caption: "锁定IP",
        width: 100
      },
      {
        visible: false,
        dataField: "sex",
        caption: "性别",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_sex,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        visible: false,
        dataField: "mobile_contact_type",
        caption: "通讯联系类型",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.mobile_contact_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        visible: false,
        dataField: "mobile_contact_number",
        caption: "联系号码"
      },
      {
        visible: false,
        dataField: "public_ip",
        caption: "注册IP"
      },
      {
        visible: false,
        dataField: "stoped_remaining",
        caption: "是否提醒",
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
        visible: false,
        dataField: "ver_from",
        caption: "验证来源",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_ver_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },

      {
        visible: false,
        dataField: "recommend_nickname",
        caption: "推荐用户"
      },
      {
        visible: false,
        dataField: "lang_id",
        caption: "语言",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_lang,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        visible: false,
        dataField: "package_order_connects",
        caption: "订阅连接数"
      },
      {
        visible: false,
        dataField: "database_num",
        caption: "分库编号"
      },
      {
        visible: false,
        dataField: "change_time",
        caption: "修改时间"
      },
      {
        dataField: "create_staff_name",
        caption: "创建人"
      },
      {
        visible: false,
        dataField: "ver_type",
        caption: "验证类型",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.user_ver_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        width: 150,
        cellTemplate: this.cellEdit
      }
    ];
    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick: this.onRowClickHandler,
      height: "inherit"
    });

    this.dxDataGrid1.option(options);
  }

  //#region  搜索
  private initComponentSearchForm() {
    this.dxSearchForm1 = this.getDxInstanceByKey(this.dxSearchFormKey1);
    this.dxSearchForm1.option({
      formData: this.mySearchFormModel,
      colCount: 12,
      items: [
        {
          colSpan: 2,
          label: {
            text: "搜索类型"
          },
          dataField: "search_type",
          editorType: "dxSelectBox",
          editorOptions: {
            placeholder: "请选择搜索类型",
            //width: 100,
            displayExpr: "text",
            valueExpr: "id",
            dataSource: [
              {
                text: "手机号",
                id: 0
              },
              {
                text: "账号",
                id: 1
              },
              {
                text: "邮箱",
                id: 2
              }
            ],
            value: 0
          },
          validationRules: []
        },
        {
          colSpan: 2,
          label: {
            text: "关键词"
          },
          dataField: "search_title",
          editorType: "dxTextBox",
          editorOptions: {
            placeholder: "请根据类型输入关键词进行查询!"
          },
          validationRules: []
        },
        {
          colSpan: 2,
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "搜索",
            icon: "search",
            type: "success",
            onClick: this.SearchUserHandler
          }
        }
      ]
    });
  }

  /**
   * 获取角色组
   */
  private async getUserGroupList() {
    let d = await this.userAPI.getList();
    this.role_list = d.data;
  }

  private onSearch(dic, user_id, db_num) {
    this.setSearchKeywordDic(dic);
    this.getUserList();
  }
  /**
   * 搜索用户
   */
  private async SearchUserHandler() {
    let search_form_dic: {
      name: string;
      filter: string;
      keyword: string;
    }[] = [];

    if (
      this.mySearchFormModel.search_type == 0 &&
      this.mySearchFormModel.search_title != ""
    ) {
      search_form_dic.push({
        name: "mobile_num",
        filter: "equal",
        keyword: this.mySearchFormModel.search_title
      });
    }
    if (
      this.mySearchFormModel.search_type == 1 &&
      this.mySearchFormModel.search_title != ""
    ) {
      search_form_dic.push({
        name: "user_name",
        filter: "equal",
        keyword: this.mySearchFormModel.search_title
      });
    }
    if (
      this.mySearchFormModel.search_type == 2 &&
      this.mySearchFormModel.search_title != ""
    ) {
      search_form_dic.push({
        name: "mail",
        filter: "equal",
        keyword: this.mySearchFormModel.search_title
      });
    }

    // if (this.mySearchFormModel.group_id != null) {
    //   search_form_dic.push({
    //     name: "group_id",
    //     filter: "equal",
    //     keyword: this.mySearchFormModel.group_id.toString()
    //   });
    // }

    // if (this.mySearchFormModel.status != null) {
    //   search_form_dic.push({
    //     name: "status",
    //     filter: "equal",
    //     keyword: this.mySearchFormModel.status.toString()
    //   });
    // }

    this.setSearchKeywordDic(search_form_dic);
    this.getUserList();
  }
  //#endregion
  /**
   * 双击编辑
   * @param e
   */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/user/edit/" + sender.key.id);
    });
  }

  /**
   * 编辑
   * @param container
   * @param option
   */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    new menu(cellElement, {
      dataSource: [
        {
          id: "1",
          name: "操作",
          items: [
            {
              id: "1_1",
              name: "编辑",
              disabled: false
            },
            {
              id: "1_2",
              name: "重置密码"
            },
            {
              id: "1_3",
              name: "积分日志"
            },
            {
              id: "1_4",
              name: "剩余活动积分",
              disabled: false
            },
            {
              id: "1_5",
              name: "网吧IP",
              disabled: option.key.user_type != 1 ? true : false
            },
            {
              id: "1_6",
              name: "赠送时长"
            },
            {
              id: "1_7",
              name: "暂停",
              disabled: option.key.package_billing_type != 1 ? true : false
            },
            {
              id: "1_8",
              name: "申请退款"
            },
            {
              id: "1_9",
              name: "时长变化"
            },
            {
              id: "1_10",
              name: "登录日志"
            },
            {
              id: "1_11",
              name: "主账号修改"
            },
            {
              id: "1_12",
              name: "删除账号"
            },
            {
              id: "1_13",
              name: "推荐关系"
            },
            {
              id: "1_14",
              name: "用户绑定日志"
            },
            {
              id: "1_15",
              name: "用户部分退款"
            }
          ]
        }
      ],
      hideSubmenuOnMouseLeave: false,
      displayExpr: "name",
      onItemClick: sender => {
        let id = sender.itemData.id.toString();
        switch (id) {
          case "1_1":
            this.redirect("/user/edit/" + option.value);
            break;
          case "1_2":
            this.redirect("/user/repasswd/" + option.value);
            break;
          case "1_3":
            this.redirect(
              "/user/" +
                option.value +
                "/point_log/list/" +
                option.data.database_num
            );
            break;
          case "1_4":
            this.redirect(
              "/user/" +
                option.value +
                "/point_short/list/" +
                option.data.database_num
            );
            break;
          case "1_5":
            this.redirect("/user/" + option.value + "/wanip/list");
            break;
          case "1_6":
            this.redirect("/user/" + option.value + "/duration/edit");
            break;
          case "1_7":
            this.redirect(
              "/user/" + option.key.database_num + "/pause/edit/" + option.value
            );
            break;
          case "1_8":
            this.redirect("/user/" + option.value + "/approval/apply");
            break;
          case "1_9":
            {
              let dbNum = option.data.database_num;
              let userId = option.value;
              this.getChangeDurationLogsList(dbNum, userId);
            }
            break;
          case "1_10":
            {
              let dbNum = option.data.database_num;
              let userId = option.value;
              this.getUserLoginLogsList(dbNum, userId);
            }
            break;

          case "1_11":
            {
              this.master_dialog.visible = true;
              this.master_dialog.id = option.value;
              (this.$refs["master_user"] as any).Show(option.value);
            }
            break;
          case "1_12":
            {
              let items = this.createFormItems([
                {
                  dataField: "delete_explain",
                  label: {
                    text: "删除原因"
                  },
                  editorType: "dxTextArea",
                  editorOptions: {
                    placeholder: "请输入删除原因!",
                    height: 80
                  },
                  validationRules: [
                    Validation.getRequired("用户删除原因不能为空!")
                  ]
                }
              ]);
              let formData: {
                user_id?: number;
                delete_explain?: string;
              } = {
                user_id: option.value
              };
              let form = this.createPopForm(
                { width: 400, height: 220, title: "删除用户" },
                {
                  formData: formData,
                  items: items
                },
                { hasReset: false },
                async (form, popu) => {
                  try {
                    let result: BaseModel = await new UserApi().setDelete(
                      formData.user_id,
                      formData.delete_explain
                    );
                    if (
                      result.code == RespCode.OK ||
                      result.code == RespCode.isSame ||
                      result.code == RespCode.isSameSaveData
                    ) {
                      this.toast(() => {
                        //清空表格数据
                        this.dxDataGrid1.option({
                          dataSource: []
                        });
                      });
                      return true;
                    } else {
                      this.errorCodeMsg(result.code, result.msg);
                    }
                  } catch (error) {
                    this.error(error);
                  }
                  return false;
                }
              );
            }
            break;
          case "1_13":
            {
              this.ref_user_id = option.value;

              let cols = this.createDataGridColumns([
                {
                  dataField: "user_mobile_num",
                  caption: "手机号",
                  cellTemplate: (
                    cellElement: DevExpress.core.dxElement,
                    option: any
                  ) => {
                    let val = `(+${option.data.country_code})${option.value}`;
                    $("<span>")
                      .append(val)
                      .appendTo(cellElement);
                  }
                },
                {
                  dataField: "user_mail",
                  caption: "邮箱"
                },
                {
                  dataField: "user_name",
                  caption: "账号"
                },
                {
                  dataField: "activity_title",
                  caption: "活动"
                },
                {
                  dataField: "ref_user_mobile_num",
                  caption: "推荐人手机号",
                  cellTemplate: (
                    cellElement: DevExpress.core.dxElement,
                    option: any
                  ) => {
                    let val = `(+${option.data.ref_country_code})${
                      option.value
                    }`;
                    $("<span>")
                      .append(val)
                      .appendTo(cellElement);
                  }
                },
                {
                  dataField: "ref_user_mail",
                  caption: "推荐人邮箱"
                },
                {
                  dataField: "ref_user_name",
                  caption: "推荐人账号"
                },
                {
                  dataField: "create_time",
                  caption: "创建时间"
                }
              ]);
              this.ref_grid = this.createPopDataList(
                {
                  title: "用户推荐关系"
                },
                {
                  columns: cols
                },
                sender => {
                  let toolbarItems = sender.toolbarOptions.items;
                  toolbarItems.push({
                    location: "before",
                    widget: "dxButton",
                    options: {
                      text: "推荐人关系",
                      icon: "list",
                      onClick: async () => {
                        this.ref_flag = 1;
                        this.getUserRefDataList();
                        //
                      }
                    }
                  });
                  toolbarItems.push({
                    location: "before",
                    widget: "dxButton",
                    options: {
                      text: "被推荐人关系",
                      icon: "list",
                      onClick: () => {
                        this.ref_flag = 2;
                        this.getUserRefDataList();
                        //
                      }
                    }
                  });
                }
              );
            }
            break;
          case "1_14":
            {
              let user_id = option.value;
              let db_num = option.data.database_num;
              new UserOpLogs().create(user_id,db_num);
            }
            break;
          case "1_15":
            {
              let user_id = option.value;
              let db_num = option.data.database_num;
              new UserDuration().create(user_id,db_num);
            }
            break;
        }
      }
    });
  }

  private getUserRefDataList() {
    let ds = this.getDataGridPager(
      async (strWhere: string, pageSize: number, pageIndex: number) => {
        let to_ref_id = "",
          from_ref_id = "";
        if (this.ref_flag == 1) {
          to_ref_id = this.ref_user_id.toString();
        }
        if (this.ref_flag == 2) {
          from_ref_id = this.ref_user_id.toString();
        }
        let d = await new UserApi().getUserRefListPager(
          to_ref_id,
          from_ref_id,
          strWhere,
          pageSize,
          pageIndex
        );
        return d;
      }
    );
    this.ref_grid.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 获取会员列表
   */
  private async getUserList() {
    // 数据源
    let ds = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.userAPI.UserListPager(strWhere, pageSize, pageIndex)
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 工具条
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
        text: Lang.Add,
        icon: "add",
        onClick: this.onAddHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: this.onRefreshHandler
      }
    });

    //创建搜索工具条
    // this.createSearchToolbars(
    //   toolbarItems,
    //   this.dxDataGrid1.option("columns"),
    //   () => {
    //     this.getUserList();
    //   }
    // );
  }

  /**
   * 刷新
   * @param e
   */
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
   * 添加会员
   * @param e
   */
  private onAddHandler(sender) {
    this.redirect("/user/edit");
  }

  //#region  时长变化
  private userChangeTimeLog = new UserChangeTimeLogApi();
  private dbNum_Change: string;
  private grid_Change: DevExpress.ui.dxDataGrid;
  private getChangeDurationLogsList(dbNum: string, userId: number) {
    this.dbNum_Change = dbNum;
    this.grid_Change = this.createPopDataList(
      {
        title: "用户时长变化日志"
      },
      {
        columns: [
          {
            dataField: "id",
            caption: "编号",
            width: 80
          },
          {
            allowFiltering: true,
            allowSorting: true,
            dataField: "user_mobile_num",
            caption: "所属用户",
            width: 150,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              let $span = $("<span>");
              if (option.value && option.value.toString() != "") {
                if (
                  option.data.country_code &&
                  option.data.country_code.toString() != ""
                ) {
                  $span.append("(+" + option.data.country_code + ")");
                }
              }
              $span.append(option.value);
              $span.appendTo(cellElement);
            }
          },
          {
            dataField: "user_mail",
            caption: "邮箱",
            width: 150
          },
          {
            dataField: "user_name",
            caption: "账号",
            width: 100
          },
          {
            dataField: "user_nickname",
            caption: "昵称",
            width: 100
          },
          {
            dataField: "duration_type",
            caption: "时长类型",
            width: 100,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              $("<span>")
                .append(
                  CommonUtils.getDicText(
                    CommonUtils.getDictonary().data.duration_date_type,
                    option.value
                  )
                )
                .appendTo(cellElement);
            }
          },
          {
            dataField: "duration",
            caption: "时长",
            width: 100
          },
          {
            dataField: "user_surplus_time",
            caption: "剩余时长/到期时间",
            width: 160,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              let esc_time = option.data.user_expiry_time;
              if (option.value && option.value != null) {
                esc_time = DateTimeUtils.TimeIntegrate2(option.value * 1000);
              }
              $("<span>")
                .append(esc_time)
                .appendTo(cellElement);
            }
          },
          {
            dataField: "op_source",
            caption: "操作来源",
            width: 100,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              $("<span>")
                .append(
                  CommonUtils.getDicText(
                    CommonUtils.getDictonary().data.duration_option_source,
                    option.value
                  )
                )
                .appendTo(cellElement);
            }
          },
          {
            dataField: "create_time",
            caption: "创建时间",
            width: 160
          }
        ]
      },
      sender => {
        let toolbarItems = sender.toolbarOptions.items;
        toolbarItems.push({
          location: "before",
          widget: "dxButton",
          options: {
            text: "刷新",
            icon: "refresh",
            onClick: sender => {
              this.grid_Change.refresh();
            }
          }
        });

        //创建搜索工具条
        // this.createSearchToolbars(
        //   toolbarItems,
        //   this.dxDataGrid1.option("columns"),
        //   () => {
        //     this.getChangeDataList();
        //   }
        // );
      }
    );
    this.setSearchKeywords("&user_id=" + userId);
    this.getChangeDataList();
  }

  private getChangeDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.userChangeTimeLog.getListPager(
          this.dbNum_Change,
          strWhere,
          pageSize,
          pageIndex
        )
    );
    this.grid_Change.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
  //#endregion

  //#region  登录日志
  private userLoginLog = new UserLoginLogApi();
  private grid: DevExpress.ui.dxDataGrid;
  private dbNum: string;
  private getUserLoginLogsList(dbNum: string, userId: number) {
    this.dbNum = dbNum;
    this.grid = this.createPopDataList(
      {
        title: "用户登录日志"
      },
      {
        columns: [
          {
            dataField: "id",
            caption: "编号",
            width: 80
          },
          {
            allowFiltering: true,
            allowSorting: true,
            dataField: "user_mobile_num",
            caption: "所属用户",
            width: 150,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              let $span = $("<span>");
              if (option.value && option.value.toString() != "") {
                if (
                  option.data.country_code &&
                  option.data.country_code.toString() != ""
                ) {
                  $span.append("(+" + option.data.country_code + ")");
                }
              }
              $span.append(option.value);
              $span.appendTo(cellElement);
            }
          },
          {
            dataField: "user_mail",
            caption: "邮箱",
            width: 150
          },
          {
            dataField: "user_name",
            caption: "账号",
            width: 100
          },
          {
            dataField: "user_nickname",
            caption: "昵称",
            width: 100
          },
          {
            dataField: "login_type",
            caption: "登录类型",
            width: 100,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              $("<span>")
                .append(
                  CommonUtils.getDicText(
                    CommonUtils.getDictonary().data.login_type,
                    option.value
                  )
                )
                .appendTo(cellElement);
            }
          },
          {
            dataField: "login_account_type",
            caption: "登录账号类型",
            width: 100,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              $("<span>")
                .append(
                  CommonUtils.getDicText(
                    CommonUtils.getDictonary().data.login_account_type,
                    option.value
                  )
                )
                .appendTo(cellElement);
            }
          },
          {
            dataField: "login_country_code",
            caption: "登录区域编码",
            width: 100,
            cellTemplate: (
              cellElement: DevExpress.core.dxElement,
              option: any
            ) => {
              $("<span>")
                .append(
                  CommonUtils.getDicText(
                    CommonUtils.getDictonary().data.region_code,
                    option.value
                  )
                )
                .appendTo(cellElement);
            }
          },
          {
            dataField: "login_country_iso_code",
            caption: "登录国家iso代码",
            width: 100
          },
          {
            dataField: "login_ip",
            caption: "登录IP",
            width: 100
          },
          {
            dataField: "login_time",
            caption: "登录时间",
            width: 100
          }
        ]
      },
      sender => {
        let toolbarItems = sender.toolbarOptions.items;
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

        //创建搜索工具条
        // this.createSearchToolbars(
        //   toolbarItems,
        //   this.dxDataGrid1.option("columns"),
        //   () => {
        //     this.getDataList();
        //   }
        // );
      }
    );

    this.setSearchKeywords("&user_id=" + userId);

    this.getDataList();
  }

  private getDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.userLoginLog.getListPager(
          this.dbNum,
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
  //#endregion
}
