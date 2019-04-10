import BaseVue from "@/common/BaseVue";
import Component from "vue-class-component";
import { DxSelectBox, DxTreeView, DxButton, DxForm } from "devextreme-vue";
import DevExpress from "devextreme/bundles/dx.all";
import { CMSProjectApi } from "@/api/CMSProjectApi";
import { CMSChannelApi } from "@/api/CMSChannelApi";
import { CMSChannelModel } from "@/models/CMSChannelModel";
import DxLoadPanel from "devextreme/ui/load_panel";
import { CommonUtils } from "@/common/CommonUtils";

@Component({
  components: {
    DxSelectBox,
    DxTreeView,
    DxButton,
    DxForm
  }
})
export default class htmlController extends BaseVue {
  private dxFormKey1: string = "dxFormKey1";

  private dxForm1: DevExpress.ui.dxForm;
  private projectApi = new CMSProjectApi();
  private channelApi = new CMSChannelApi();

  protected async mounted() {
    (this.$parent as any).content_title = "生成静态";
    this.dxForm1 = this.getDxInstanceByKey(this.dxFormKey1);

    //全部项目
    let dsProject = await this.getProjectDataList();

    dsProject = [{ id: -1, title: "全部" }, ...dsProject];

    let items = this.createFormItems([
      {
        dataField: "projectid",
        label: {
          text: "项目列表"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: dsProject,
          displayExpr: "title",
          valueExpr: "id",
          value: -1,
          onValueChanged: async sender => {
            let channel_editor = this.dxForm1.getEditor(
              "channelid"
            ) as DevExpress.ui.dxSelectBox;
            if (sender.value != -1) {
              let d = await this.channelApi.getList(sender.value);
              if (d.data && d.data.length > 0) {
                let list_dest: CMSChannelModel[] = [];
                let aaaaa = this.getChannel(d.data, 0, list_dest);

                let dsChannel = [{ id: -1, title: "全部栏目" }, ...aaaaa];
                channel_editor.option({
                  dataSource: dsChannel
                });
              } else {
                channel_editor.option({
                  dataSource: []
                });
              }
            } else {
              channel_editor.option({
                dataSource: []
              });
            }
          }
        }
      },
      {
        dataField: "channelid",
        label: {
          text: "栏目列表"
        },
        editorType: "dxSelectBox",
        editorOptions: {
          displayExpr: "title",
          valueExpr: "id",
          value: -1
        }
      },
      {
        itemType: "group",
        colCount: 2,
        items: [
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "全站生成",
              type: "default",
              onClick: this.onClickAllCreateHandler
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "生成指定栏目",
              type: "success",
              onClick: this.onClickSelectedCreateHandler
            }
          }
        ]
      },
      {
        itemType: "group",
        caption: "生成官网",
        items: [
          {
            dataField: "create_type",
            label: {
              text: "生成类型"
            },
            editorType: "dxSelectBox",
            editorOptions: {
              dataSource: CommonUtils.getDictonary().data.create_www_html,
              displayExpr: "name",
              valueExpr: "id",
              value: 0
            }
          },
          {
            itemType: "button",
            horizontalAlignment: "center",
            buttonOptions: {
              text: "生成官网",
              type: "default",
              onClick: async () => {
                let loadPanel = $("<div></div>").appendTo($("body"));
                let load = new DxLoadPanel(loadPanel[0], {
                  message: "正在生成中,请稍后......"
                });
                load.show();

                let create_type = this.dxForm1.option("formData").create_type;

                let d = await new CMSChannelApi().createWwwHtml(create_type);
                if (d.code == 0) {
                  load.hide();
                  loadPanel.remove();
                  this.alert("生成官网成功!");
                } else {
                  load.hide();
                  loadPanel.remove();
                  this.errorCodeMsg(d.code, d.msg);
                }
              }
            }
          }
        ]
      }
    ]);

    this.dxForm1.option({
      items: items,
      width: 400
    });
  }

  /**
   * 获取频道
   * @param list
   * @param parent_id
   */
  private getChannel(
    list: CMSChannelModel[],
    parent_id: number,
    list_dest: CMSChannelModel[],
    depath: number = 0
  ) {
    let dd = list.filter((val, index) => {
      return val.parent_id == parent_id;
    });

    dd = dd.sort((a, b) => {
      return a.sorts - b.sorts;
    });

    for (const item of dd) {
      if (depath > 0) {
        for (let index = 0; index < depath; index++) {
          item.title = "-" + item.title;
        }
      }
      list_dest.push(item);
      let cc = list.filter((val, index) => {
        return val.parent_id == parent_id;
      });
      if (cc && cc.length > 0) {
        let haha = depath + 1;
        this.getChannel(list, item.id, list_dest, haha);
      }
    }
    return list_dest;
  }

  private async onClickAllCreateHandler(sender) {
    try {
      let formData: {
        projectid: number;
        channelid: number;
      } = this.dxForm1.option("formData");

      if (!formData.projectid || formData.projectid == -1) {
        this.alert("请选择一个项目再进行操作!");
        return;
      }

      if (!formData.channelid) {
        this.alert("请选择一个栏目再进行操作!");
        return;
      }

      let loadPanel = $("<div></div>").appendTo($("body"));
      let load = new DxLoadPanel(loadPanel[0], {
        message: "正在生成中,请稍后......"
      });
      load.show();

      let d = await this.channelApi.createProjectChannelHtml(
        formData.projectid,
        -1
      );
      if (d.code == 0) {
        load.hide();
        loadPanel.remove();
        this.alert("生成成功!");
      } else {
        load.hide();
        loadPanel.remove();
        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      this.error(error);
    }
  }

  private async onClickSelectedCreateHandler() {
    try {
      let formData: {
        projectid: number;
        channelid: number;
      } = this.dxForm1.option("formData");

      if (!formData.projectid || formData.projectid == -1) {
        this.alert("请选择一个项目再进行操作!");
        return;
      }

      if (!formData.channelid) {
        this.alert("请选择一个栏目再进行操作!");
        return;
      }

      let loadPanel = $("<div></div>").appendTo($("body"));
      let load = new DxLoadPanel(loadPanel[0], {
        message: "正在生成中,请稍后......"
      });
      load.show();

      let d = await this.channelApi.createProjectChannelHtml(
        formData.projectid,
        formData.channelid
      );
      if (d.code == 0) {
        load.hide();
        loadPanel.remove();
        this.alert("生成成功!");
      } else {
        load.hide();
        loadPanel.remove();
        this.errorCodeMsg(d.code, d.msg);
      }
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * 获取项目列表
   */
  private async getProjectDataList() {
    let d = await this.projectApi.getList();
    return d.data;
  }
}
