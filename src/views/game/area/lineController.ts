import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { AreaApi } from '@/api/AreaApi';
import { LineApi } from '@/api/LineApi';
import { RespCode } from '@/common/RespCode';

/**
 * 区服线路绑定关系
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
  private areaApi = new AreaApi();

  private lineApi = new LineApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "绑定区服与线路关系";
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
      //caption: "绑定区服线路关系",
      items: [{
        label: {
          text: "线路列表"
        },
        dataField: "data_selected_all",
        editorType: "dxTreeView",
        editorOptions: {
          height: 500,
          displayExpr: "title",
          valueExpr: "id",
          showCheckBoxesMode: "normal",
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
   * 获取节点列表
   */
  private async getDataListByLines() {
    let d = await this.lineApi.getList();
    this.dxTreeView1.option({
      dataSource: d.data
    });
  }

  /**
   * 获取更新的节点
   */
  private async getDataListByPackageLines(sender) {
    let t = sender.component as DevExpress.ui.dxTreeView;
    let d = await this.areaApi.getAreaLineSelected(this.packageID);
    let arr = d.data;
    for (const ele of arr) {
      t.selectItem(ele.line_id);
    }
  }

  /**
   * 更新套餐充值卡
   * @param sender 
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
      if (selectedNodes.length < 1) {
        this.alert("请至少选择一个选项!再进行提交.");
        return;
      }
      let d = await this.areaApi.setAreaLineSelected(this.packageID, selectedNodes);
      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.alert("处理成功!").then(() => {
          this.redirect("/game/area/list");
        });
      } else {
        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      this.error(error);
    }

  }

  /**
   * 返回
   * @param sender 
   */
  private async onClickBackHandler(sender) {
    this.redirect("/game/area/list");
  }
}