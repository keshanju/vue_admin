import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { ServerApi } from '@/api/ServerApi';
import { NodeApi } from '@/api/NodeApi';
import { RespCode } from '@/common/RespCode';
/**
 * 节点与服务器关系绑定
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
  private dxTreeView2: DevExpress.ui.dxTreeView;

  private nodeID: number;
  private nodeApi = new NodeApi();

  private serverApi = new ServerApi();

  /**
   * 选择服务器节点
   */
  private selectedServers: any[] = [];
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "服务器组与服务器绑定";
    this.nodeID = Number(this.getParam("id"));
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
      //caption: "绑定组与服务器关系",
      items: [
        {
          itemType: "group",
          colCount: 2,
          items: [
            {
              label: {
                text: "服务器列表"
              },
              dataField: "data_selected_all",
              editorType: "dxTreeView",
              editorOptions: {
                height: 500,
                displayExpr: "title",
                valueExpr: "id",
                searchEnabled: true,
                onItemClick: (e: any) => {
                  if ($.inArray(e.itemData, this.selectedServers) == -1) {
                    this.selectedServers.push(e.itemData);
                    this.dxTreeView2.option({
                      dataSource: this.selectedServers
                    });
                  }
                },
                itemTemplate: function (itemData, itemIndex, itemElement) {
                  return $("<div />").append(
                    $("<span/>").text(itemData.title),
                    $("<span/>").text(" - (" + itemData.server + ":" + itemData.s5_port + ":" + itemData.s5_mobile_port + ") ")
                  );
                }
              }
            },
            {
              label: {
                text: "已选服务器"
              },
              dataField: "data_selected_all_1",
              editorType: "dxTreeView",
              editorOptions: {
                height: 500,
                displayExpr: "title",
                valueExpr: "id",
                searchEnabled: true,
                onItemClick: (e: any) => {
                  let index = this.selectedServers.indexOf(e.itemData);
                  let arr = this.selectedServers.splice(index, 1);
                  this.dxTreeView2.option({
                    dataSource: this.selectedServers
                  });
                },
                itemTemplate: function (itemData, itemIndex, itemElement) {
                  return $("<div />").append(
                    $("<span/>").text(itemData.title),
                    $("<span/>").text(" - (" + itemData.server + ":" + itemData.s5_port + ":" + itemData.s5_mobile_port + ") ")
                  );
                }
              }
            }
          ]
        }
      ]
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
        // {
        //   itemType: "button",
        //   alignment: "center",
        //   buttonOptions: {
        //     text: "移除",
        //     type: "success",
        //     useSubmitBehavior: true,
        //   }
        // },
        // {
        //   itemType: "button",
        //   alignment: "center",
        //   buttonOptions: {
        //     text: "追加",
        //     type: "success",
        //     useSubmitBehavior: true
        //   }
        // },
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
      width: 1000,
      items: items1
    });

    this.dxTreeView1 = this.dxForm1.getEditor("data_selected_all");
    this.dxTreeView2 = this.dxForm1.getEditor("data_selected_all_1");

  }

  /**
   * 获取服务器
   */
  private async getDataListByLines() {
    //节点类型（0： socks 绑定server_type in (0,2)，1： vpn 绑定server_type in (1,2)）

    let dt = await this.nodeApi.getModel(this.nodeID);
    let strWhere = "node_type=" + dt.data.node_type;

    let d = await this.serverApi.getList(strWhere);
    this.dxTreeView1.option({
      dataSource: d.data
    });

    let d2 = await this.nodeApi.getNodeServerSelected(this.nodeID);
    //获取选中的服务器列表
    for (const item of d.data) {
      for (const item2 of d2.data) {
        if (item.id == item2.server_id) {
          this.selectedServers.push(item);
        }
      }
    }

    this.dxTreeView2.option({
      dataSource: this.selectedServers
    });

  }

  /**
   * 获取套餐选择的充值卡
   */
  private async getDataListByPackageLines() {
    let d2 = await this.nodeApi.getNodeServerSelected(this.nodeID);
    let arr = d2.data;
    //获取选中的服务器列表
    this.dxTreeView2.option({
      dataSource: arr
    });
  }

  /**
   * 更新套餐充值卡
   * @param e 
   */
  private async onClickDoHandler(sender) {
    try {
      let nodes = this.dxTreeView2.getNodes();
      let selectedNodes: number[] = [];
      for (const n of nodes) {
        selectedNodes.push(n.key);
      }
      if (selectedNodes.length < 1) {
        this.alert("请至少选择一个选项!再进行提交.");
        return;
      }
      let d = await this.nodeApi.setNodeServerSelected(this.nodeID, selectedNodes);
      if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
        this.toast(() => {
          this.redirect("/server/node/list");
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
    this.redirect("/server/node/list");
  }

}