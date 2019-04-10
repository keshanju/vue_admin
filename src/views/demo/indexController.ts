import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import json2xls from "json2xls";
import exportFromJSON from "export-from-json";
import { exportUtils } from "@/utils/exportUtils";

import {
  DxDataGrid,
  DxForm,
  DxTreeList,
  DxPopup,
  DxTabPanel
} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import DevExpress from "devextreme/bundles/dx.all";
import { dxUEditorFormItem } from "@/components/dxUEditorFormItem";
import { dxMyPopup } from "@/components/dxMyPopup";
import dxPopup from "devextreme/ui/popup";
import UserEditController from "@/views/user/editController";
import UserListController from "@/views/user/listController";
import popu from "./load/popu.vue";
import { DateTimeUtils } from "@/utils/DateTimeUtils";

import AreaList from "../../views/game/area/arealist.vue";
import AreaLine from "../../views/game/area/arealine.vue";
import LogUtil from "@/utils/LogUtil";
import { ServerApi } from "@/api/ServerApi";
import { PageHelper } from "@/common/PageHelper";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeList,
    DxPopup,
    popu,
    AreaList,
    AreaLine,
    DxTabPanel
  }
})
export default class HomeController extends BaseVue {
  protected mounted() {
    // let grid: DevExpress.ui.dxDataGrid = this.getDxInstanceByKey("DxDataGrid1");

    // let ds = PageHelper.List(
    //   "http://dev-api1.leigod.com/staff/server?account_token=QVLHLzCxOe804IDxMuxLWMASBhkkL9NqoGdN10HE9X4zOPiM1bfDCOK12T36LbCK"
    // );

    // let cols: DevExpress.ui.dxDataGridColumn[] = [
    //   {
    //       dataField: "id",
    //       caption: "编号",
    //       width: 80
    //   },
    //   {
    //       dataField: "online_users",
    //       caption: "在线人数",
    //       width: 160
    //   },
    // ];

    // grid.option({
    //   columns: cols,
    //   remoteOperations: {
    //     paging: true, //remote
    //     sorting: true, //remote
    //     filtering: true,
    //     grouping: true,
    //     summary: true
    //   },
    //   // remoteOperations: true,
    //   dataSource: ds,
    //   summary: {
    //     totalItems: [
    //       {
    //         column: "online_users",
    //         summaryType: "sum",
    //         displayFormat: "在线人数:{0}"
    //       }
    //     ]
    //   }
    // });
    let tabs = [
      {
        id:1,
        title: "Tab 1 Title",
      },
      {
        id:2,
        title: "Tab 2 Title",
      },
      {
        id:3,
        title: "Tab 3 Title",
      }
    ];
    let tabPanel: DevExpress.ui.dxTabPanel = this.getDxInstanceByKey(
      "DxTabPanel1"
    );
    tabPanel.option({
      items: tabs,
      onSelectionChanged:(sender:any)=>{
        console.log(sender)
      }
    });
  }

  protected JsonToExcel() {
    let json = {
      foo: "bar",
      qux: "moo",
      poo: 123,
      stux: new Date()
    };

    let data = json2xls(json);

    // console.log(data);

    // let a = document.createElement('a');
    // let url = window.URL.createObjectURL("11231");
    // a.href = url;
    // a.download = "test.xls";
    // a.click();
    // window.URL.revokeObjectURL(url);

    let binaryData = [];
    binaryData.push(json);
    let url = window.URL.createObjectURL(
      new Blob(data, { type: "application/zip" })
    );

    let a = document.createElement("a");
    a.href = url;
    a.download = "test.xls";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  protected JsonToExcel2() {
    const data = [{ foo: "foo" }, { bar: "bar" }];
    const fileName = "download";
    const exportType = "xls";

    exportFromJSON({ data, fileName, exportType });
  }

  private jsonToCsv() {
    exportUtils.toCsv([{ id: 1, title: "标题" }], "111", "gb2312");
  }

  private popDataList() {
    let dataGrid1 = this.createPopDataList({}, {}, sender => {
      let toolbarItems = sender.toolbarOptions.items;
      toolbarItems.push({
        location: "before",
        widget: "dxButton",
        options: {
          text: "添加",
          icon: "add"
        }
      });
    });
  }

  private async iframe() {
    let [v, p] = dxMyPopup.renderVueFile<UserEditController>(
      await import("../user/edit.vue"),
      {
        width: 500
      },
      [
        {
          text: "确定",
          type: "success",
          onClick: sender => {
            v.testAlert();
            p.hide();
          }
        },
        {
          text: "重置",
          onClick: sender => {
            console.log(sender);
          }
        },
        {
          text: "取消",
          onClick: sender => {
            p.hide();
          }
        }
      ]
    );
  }

  private async iframeList() {
    let edit = await import("../user/list.vue");
    let v = dxMyPopup.renderVueFile<UserListController>(edit, {}, [
      {
        text: "确定",
        type: "success",
        onClick: sender => {
          console.log(sender);
        }
      },
      {
        text: "重置",
        onClick: sender => {
          console.log(sender);
        }
      },
      {
        text: "取消",
        onClick: sender => {
          console.log(sender);
        }
      }
    ]);
  }

  private async hrefLoad() {
    // let [v, p] = dxMyPopup.renderVue<LocalList>(LocalList, {
    //     width: 500
    // }, [
    //         {
    //             text: "确定",
    //             type: "success",
    //             onClick: (sender) => {
    //                 p.hide();
    //             }
    //         },
    //         {
    //             text: "重置",
    //             onClick: (sender) => {
    //                 console.log(sender);
    //             }
    //         },
    //         {
    //             text: "取消",
    //             onClick: (sender) => {
    //                 p.hide();
    //             }
    //         }
    //     ]);
  }

  private async iframeTest() {}

  private popueShow() {
    (this.$refs["arealine"] as any).show(290, {
      width: 500
    });
  }
  private popueShow1() {
    (this.$refs["arealine"] as any).show(275);
  }

  private popueShow_AreaList() {
    (this.$refs["arealist"] as any).show(210, {
      title: "XXX游戏区服列表",
      width: 500
    });
  }
}
