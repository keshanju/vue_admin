<template>
  <div>
    <DxForm ref="dxSearchFormKey1"></DxForm>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import BaseVue from "@/common/BaseVue";
import { Validation } from "@/common/Validation";
import { UserApi } from "@/api/UserApi";
import { CommonUtils } from "@/common/CommonUtils";
import Enumerable from "linq";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxTextArea
} from "devextreme-vue";
@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxTextArea
  }
})
export default class dxMyUserSearchController extends BaseVue {
  /**
   * 是否搜索用户
   */
  @Prop()
  private is_search_user!: boolean;

  @Prop()
  private col_count!: number;

  /**
   * 操作选项
   */
  private options: any = {
    is_search_user: false
  };

  private dxSearchForm1: DevExpress.ui.dxForm;
  private mySearchFormModel: UserSearchModel = {
    search_type: 0,
    search_country_code: 86,
    search_keyword: ""
  };

  private isEmptyObject(obj) {
    for (var key in obj) {
      return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
  }

  public mounted() {
    this.options.is_search_user = !this.is_search_user
      ? false
      : this.is_search_user;

    let col_count = 0;
    if (this.col_count == null) {
      col_count = 12;
    } else {
      col_count = 0;
    }

    Object.assign(this.options, {
      col_count: col_count
    });

    this.initControls();
  }

  private initControls() {
    this.dxSearchForm1 = this.getDxInstanceByKey("dxSearchFormKey1");
    this.dxSearchForm1.option({
      formData: this.mySearchFormModel,
      colCount: this.options.col_count,
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
            value: 0,
            onValueChanged: (sender: any) => {
              let val = sender.value;
              let selectBox_Country_Code: DevExpress.ui.dxSelectBox = this.dxSearchForm1.getEditor(
                "search_country_code"
              );
              if (val == 0) {
                // this.dxSearchForm1.itemOption(
                //   "search_country_code_name",
                //   "visible",
                //   true
                // );
                selectBox_Country_Code.option({
                  disabled: false
                });
              } else {
                // this.dxSearchForm1.itemOption(
                //   "search_country_code_name",
                //   "visible",
                //   false
                // );
                selectBox_Country_Code.option({
                  disabled: true
                });
              }
            }
          },
          validationRules: [Validation.getRequired("搜索类型不能为空!")]
        },
        {
          colSpan: 2,
          label: {
            text: "国家区号"
          },
          dataField: "search_country_code",
          editorType: "dxSelectBox",
          editorOptions: {
            searchEnabled: true,
            placeholder: "请选择国家区号查询!",
            dataSource: CommonUtils.getCountryCode(),
            displayExpr: "id",
            valueExpr: "id"
          },
          validationRules: [Validation.getRequired("国家区号不能为空!")]
        },
        {
          colSpan: 3,
          label: {
            text: "关键词"
          },
          dataField: "search_keyword",
          editorType: "dxTextBox",
          editorOptions: {
            placeholder: "请根据类型输入关键词进行查询!精确查询数据."
          },
          validationRules: [Validation.getRequired("关键词不能为空!")]
        },
        {
          colSpan: 2,
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "搜索",
            icon: "search",
            type: "success",
            onClick: async () => {
              if (!this.validateForm(this.dxSearchForm1)) {
                return;
              }

              let search_form_dic: {
                name: string;
                filter: string;
                keyword: string;
              }[] = [];

              if (this.mySearchFormModel.search_type == 0) {
                search_form_dic.push({
                  name: "mobile_num",
                  filter: "equal",
                  keyword: this.mySearchFormModel.search_keyword
                });
                search_form_dic.push({
                  name: "country_code",
                  filter: "equal",
                  keyword: this.mySearchFormModel.search_country_code.toString()
                });
              } else if (this.mySearchFormModel.search_type == 1) {
                search_form_dic.push({
                  name: "user_name",
                  filter: "equal",
                  keyword: this.mySearchFormModel.search_keyword
                });
              } else if (this.mySearchFormModel.search_type == 2) {
                search_form_dic.push({
                  name: "mail",
                  filter: "equal",
                  keyword: this.mySearchFormModel.search_keyword
                });
              }
              //处理搜索用户 如果是用户信息不用搜索
              if (!this.options.is_search_user) {
                let strWhere_Arr: string[] = [];
                Enumerable.from(search_form_dic).forEach(p => {
                  strWhere_Arr.push(`${p.name}__${p.filter}__${p.keyword}`);
                });
                let strWhere = "&search=" + strWhere_Arr.join("|");
                let userApi = new UserApi();
                let userData = await userApi.UserListPager(strWhere);
                if (
                  userData.data == null ||
                  userData.data.list == null ||
                  userData.data.list.length == 0
                ) {
                  this.alert("没有查询到用户信息");
                  return;
                }
                let userInfo = userData.data.list[0];
                let user_id = userInfo.id;
                let db_num = userInfo.database_num.toString();

                this.$emit("onSearch", search_form_dic, user_id, db_num);
              } else {
                this.$emit("onSearch", search_form_dic, 0, 0);
              }
            }
          }
        }
      ]
    });
  }
}

/**
 * 用户搜索表单
 */
export interface UserSearchModel {
  /**
   * 搜索类型
   */
  search_type?: number;
  /**
   * 搜索关键词
   */
  search_keyword?: string;
  /**
   * 国家代码
   */
  search_country_code?: number;
}
</script>

