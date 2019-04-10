import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { NodeApi } from '@/api/NodeApi';
import { LineApi } from '@/api/LineApi';
import { RespCode } from '@/common/RespCode';

/**
 * 线路与节点绑定关系
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

  private lineID: number;
  private lineApi = new LineApi();

  private nodeApi = new NodeApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "线路绑定服务器组";
    this.lineID = Number(this.getParam("id"));
    this.initComponents();
    await this.getDataListByNode();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

    let items1: Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem | DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem> = [{
      itemType: "group",
      //caption: "绑定线路节点关系",
      items: [{
        label: {
          text: "列表"
        },
        dataField: "data_selected_all",
        editorType: "dxTreeView",
        editorOptions: {
          height: 500,
          displayExpr: "name",
          valueExpr: "id",
          showCheckBoxesMode: "selectAll",
          searchEnabled: true,
          onContentReady: this.getDataListByNodeSelecteds
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
            useSubmitBehavior: true,
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
  private async getDataListByNode() {
    //过滤节点类型 line_type
    /*
     0： socks (绑定node_type为 0）； 
    1 ：vpn （pptp,l2tp,ikv2) （绑定node_type为1）；
    2 ：本地虚拟网卡+socks （绑定node_type为0）
    */
    let dt = await this.lineApi.getModel(this.lineID);
    let strWhere = "line_type="+dt.data.line_type;

    let d = await this.nodeApi.getList(strWhere);
    this.dxTreeView1.option({
      dataSource: d.data
    });
  }

  /**
   * 获取节点更新的数据
   */
  private async getDataListByNodeSelecteds(sender) {
    let t = sender.component as DevExpress.ui.dxTreeView;
    let d = await this.lineApi.getNodeServerSelected(this.lineID);
    let arr = d.data;
    for (const ele of arr) {
      t.selectItem(ele.node_id);
    }
  }

  /**
   * 更新套餐充值卡
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
      if (selectedNodes.length < 1) {
        this.alert("请至少选择一个选项!再进行提交.");
        return;
      }
      let d = await this.lineApi.setNodeServerSelected(this.lineID, selectedNodes);
      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/server/line/list");
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
   * @param e 
   */
  private async onClickBackHandler(sender) {
    this.redirect("/server/line/list");
  }

}