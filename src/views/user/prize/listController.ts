import { Component, Vue, Prop } from "vue-property-decorator";
import { DxDataGrid, DxForm, DxTreeView } from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import DevExpress from "devextreme/bundles/dx.all";
import { UserPrizeApi } from "@/api/UserPrizeApi";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import { RespCode } from "@/common/RespCode";
import dxUserSearchForm from "@/components/dxMyUserSearch.vue";
/**
 */
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    dxUserSearchForm
  }
})
export default class Home extends BaseVue {
  private dxDataGridKey1 = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  private userPrizeApi = new UserPrizeApi();
  protected mounted() {
    (this.$parent as any).content_title = "用户领奖";
    this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGridKey1");
    /**
         * `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
  `activity_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '活动ID',
  `present_id` int(11) DEFAULT NULL COMMENT '奖品定义ID',
  `present_type` int(2) DEFAULT NULL COMMENT '奖品类型（0:充值卡 1:现金红包 2:实物）',
  `instance_id` int(11) DEFAULT NULL COMMENT '奖品实例ID（充值卡ID）',
  `card_defined_id` int(11) DEFAULT NULL COMMENT '充值卡类别ID',
  `card_no` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '充值卡卡号',
  `card_pwd` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '充值卡密码',
  `card_secert` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '充值卡加密Key',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '领奖状态，0. 未领取，1. 客户已申请，2. 已发出，3. 已领取',
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '手机号',
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '邮件',
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '详细地址',
  `country_code` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '国家区号',
  `details` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '领取详情，此字段为实物奖品时填写快递单号，方便用户查询，其它类型的奖品时无实际意义',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `delivery_time` datetime DEFAULT NULL COMMENT '发货时间',
  `receive_time` datetime DEFAULT NULL COMMENT '领将时间',
  `delivery_staff_id` int(11) unsigned DEFAULT '0' COMMENT '发货管理员Id',
  `money` int(11) DEFAULT NULL COMMENT '现金',
  `price_type` tinyint(1) DEFAULT NULL COMMENT '货币类型 1:人民币 2:美元 3:欧元',
  `expire_time` datetime DEFAULT NULL COMMENT '领取最后时间',
         */
    let cols: DevExpress.ui.dxDataGridColumn[] = [
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
        width: 100
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
        dataField: "activity_title",
        caption: "所属活动",
        width: 120
      },
      {
        dataField: "present_title",
        caption: "所属奖品分类",
        width: 100
      },
      {
        dataField: "present_type",
        caption: "奖品类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
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
      // {
      //     dataField: "instance_id",
      //     caption: "奖品实例ID",
      //     width: 80
      // },
      // {
      //     dataField: "card_defined_id",
      //     caption: "充值卡类别ID",
      //     width: 80
      // },
      // {
      //     dataField: "card_no",
      //     caption: "充值卡卡号",
      //     width: 80
      // },
      {
        dataField: "money",
        caption: "现金",
        width: 80
      },
      {
        dataField: "price_type",
        caption: "货币类型",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
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
        dataField: "details",
        caption: "快递单号",
        width: 160
      },
      {
        dataField: "status",
        caption: "领奖状态",
        width: 80,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.activity_prize_status,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "phone",
        caption: "手机号",
        width: 110
      },
      {
        dataField: "email",
        caption: "邮件",
        width: 120
      },
      {
        dataField: "address",
        caption: "详细地址",
        width: 200
      },
      {
        dataField: "country_code",
        caption: "国家区号",
        width: 80
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "delivery_time",
        caption: "发货时间",
        width: 160
      },
      {
        dataField: "receive_time",
        caption: "领奖时间",
        width: 160
      },
      {
        dataField: "delivery_staff_id",
        caption: "发货管理员",
        width: 100
      },
      {
        dataField: "expire_time",
        caption: "领取最后时间",
        width: 160
      },
      {
        dataField: "id",
        alignment: "center",
        fixed: true,
        fixedPosition: "right",
        caption: "操作",
        width: 100,
        cellTemplate: this.cellEdit
      }
    ];
    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols
    });
    this.dxDataGrid1.option(options);

    this.getDataListPager();
  }

  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aEdit = $("<a href='javascript:void(0)'> 审核 </a>");
    aEdit.bind("click", sender => {
      this.editDataForm({
        prize_id: option.key.id,
        status: 0,
        details: ""
      });
    });

    $("<div>")
      .append(aEdit)
      .appendTo(cellElement);
  }

  private async getDataListPager() {
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.userPrizeApi.UserPrizeListPager(
        strWhere,
        pageSize,
        pageIndex
      );
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent;
    element?: DevExpress.core.dxElement;
    model?: any;
    toolbarOptions?: DevExpress.ui.dxToolbarOptions;
  }) {
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: sender => {
          this.dxDataGrid1.refresh();
        }
      }
    });

    //创建搜索工具条
    // this.createSearchToolbars(
    //   toolbarItems,
    //   this.dxDataGrid1.option("columns"),
    //   () => {
    //     this.getDataListPager();
    //   }
    // );
  }

  private editDataForm(
    data: {
      prize_id: number;
      status: number;
      details: string;
    } = {
      prize_id: 0,
      status: 0,
      details: ""
    }
  ) {
    let items = this.createFormItems([
      {
        dataField: "status",
        label: {
          text: "审核状态"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择状态!",
          dataSource: CommonUtils.getDictonary().data.activity_prize_status,
          displayExpr: "name",
          valueExpr: "id"
        },
        validationRules: [Validation.getRequired("请选择审核状态!")]
      },
      {
        dataField: "details",
        label: {
          text: "中奖备注"
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入备注信息!已发出必填!",
          height: 80
        }
      }
    ]);
    let form = this.createPopForm(
      {
        title: "审核奖品",
        maxWidth: 500,
        maxHeight: 300
      },
      {
        formData: data,
        items: items
      },
      {
        hasReset: false
      },
      async (form, pop) => {
        let data = form.option("formData") as {
          prize_id: number;
          status: number;
          details: string;
        };
        try {
          let d = await this.userPrizeApi.setPrizeUpdate(
            data.prize_id,
            data.status,
            data.details
          );
          if (
            d.code == RespCode.OK ||
            d.code == RespCode.isSame ||
            d.code == RespCode.isSameSaveData
          ) {
            this.toast(() => {
              this.dxDataGrid1.refresh();
            });
            return true;
          } else {
            this.errorCodeMsg(d.code, d.msg);
          }
        } catch (error) {
          this.error(error);
        }
        return false;
      }
    );
  }

  private onSearch(dic, user_id, db_num) {
    this.setSearchKeywords("&search=user_id__equal__" + user_id);
    this.getDataListPager();
  }
}
