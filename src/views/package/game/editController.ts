import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackageApi } from '@/api/PackageApi';
import { GameApi } from '@/api/GameApi';
import { RespCode } from '@/common/RespCode';

/**
 * 套餐与游戏绑定关系
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxFormKey1";
  private dxForm1: DevExpress.ui.dxForm;
  private dxTreeView1: DevExpress.ui.dxTreeView;

  private packageID: number;
  private packageApi = new PackageApi();

  private gameApi = new GameApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐绑定游戏";
    this.packageID = Number(this.getParam("id"));
    this.initComponents();
    await this.getDataListByLines();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

    let items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: "绑定套餐游戏",
      items: [{
        label: {
          text: "游戏列表"
        },
        dataField: "data_selected_all",
        editorType: "dxTreeView",
        editorOptions: {
          height: 500,
          displayExpr: "title",
          valueExpr: "id",
          showCheckBoxesMode: "selectAll",
          searchEnabled: true,
          onContentReady: this.getDataListByPackageLines
        }
      }]
    }, {
      itemType: "group",
      colCount: 2,
      items: [
        {
          itemType: "button",
          horizontalAlignment: "center",
          buttonOptions: {
            text: this.submitText,
            type: "success",
            useSubmitBehavior: true,
            onClick: this.onClickDoHandler
          }
        },
        {
          itemType: "button",
          horizontalAlignment: "center",
          buttonOptions: {
            text: "返回",
            type: "normal",
            onClick: this.onClickBackHandler
          }
        }
      ]
    }];

    this.dxForm1.option({
      width: 400,
      items: items1
    });

    this.dxTreeView1 = this.dxForm1.getEditor("data_selected_all");
  }

  /**
   * 获取游戏
   */
  private async getDataListByLines() {
    let d = await this.gameApi.getListResult();
    this.dxTreeView1.option({
      dataSource: d.data
    });
  }

  /**
   * 获取套餐选择的游戏
   */
  private async getDataListByPackageLines(sender) {
    let t = sender.component as DevExpress.ui.dxTreeView;
    let d = await this.packageApi.getPackageGameList(this.packageID, "");
    let arr = d.data;
    for (const ele of arr) {
      t.selectItem(ele.game_id);
    }
  }

  /**
   * 更新套餐游戏关系
   * @param e 
   */
  private async onClickDoHandler(sender) {
    try {
      let nodes = this.dxTreeView1.getNodes();
      let selectedNodes: number[] = [];
      for (const n of nodes) {
        if (n.selected) {
          selectedNodes.push(n.key);
        }
      }
      if(selectedNodes.length<1){
        this.alert("请至少选择一个选项!再进行提交.");
        return;
      }
      let d = await this.packageApi.setPackageGame(this.packageID, selectedNodes);
      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/package/list");
        });
      } else {
        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * 返回列表
   * @param e 
   */
  private async onClickBackHandler(sender) {
    this.redirect("/package/list");
  }
}