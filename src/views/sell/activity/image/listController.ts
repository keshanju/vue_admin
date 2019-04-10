import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import DevExpress from "devextreme/bundles/dx.all";
import {
  DxDataGrid,
  DxForm,
  DxTreeView,
  DxPopup,
  DxScrollView
} from "devextreme-vue";
import $ from "jquery";
import BaseVue from "@/common/BaseVue";
import { Validation } from "@/common/Validation";
import { CommonUtils } from "@/common/CommonUtils";
import { Lang } from "@/common/Lang";
import { dxMyPopuForm } from "@/components/dxMyPopuForm";
import { AreaModel } from "@/models/AreaModel";
import { BaseModel } from "@/models/BaseModel";
import { AreaApi } from "@/api/AreaApi";
import { GameApi } from "@/api/GameApi";
import { RespCode } from "@/common/RespCode";
import LogUtil from "@/utils/LogUtil";
import { ActivityImgApi } from "@/api/ActivityImgApi";
import Image_Edit from "./edit.vue";

@Component({
  components: {
    DxDataGrid,
    DxForm,
    DxTreeView,
    DxPopup,
    DxScrollView,
    Image_Edit
  }
})
export default class ListController extends BaseVue {
  @Prop()
  public visible!: boolean;

  @Watch("visible")
  private watch_visible(newVal: boolean, oldVal: boolean) {
    this.options.visible = newVal;
  }

  @Prop()
  public id!: number;

  @Watch("id")
  private watch_id(newVal: boolean, oldVal: boolean) {
    this.options.id = newVal;
    this.getDataListPager();
  }

  /**
   * 选项
   */
  private options: any = {
    visible: false,
    title: "活动图片列表",
    toolbarItems: [],
    width: $(window).width() - 200,
    height: $(window).height() - 200,
    onHidden: null
  };

  private image_edit_dialog: any = {
    visible: false,
    onHide: (flag: boolean) => {
      this.image_edit_dialog.visible = false;
    }
  };

  private dxDataGrid1: DevExpress.ui.dxDataGrid;

  mounted() {
    this.options.visible = this.visible ? true : false;

    this.options.onHidden = () => {
      this.$emit("onHide", false);
    };

    this.options.toolbarItems.push({
      location: "after",
      toolbar: "bottom",
      widget: "dxButton",
      options: {
        text: "取消",
        type: "normal",
        onClick: sender => {
          this.$emit("onHide", false);
        }
      }
    });

    this.dxDataGrid1 = this.getDxInstanceByKey("dxDataGrid1");

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "key",
        caption: "图片类型",
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(
              CommonUtils.getDicText(
                CommonUtils.getDictonary().data.img_key_type,
                option.value
              )
            )
            .appendTo(cellElement);
        }
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 100
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "change_staff_name",
        caption: "修改人",
        width: 100
      },
      {
        dataField: "change_time",
        caption: "修改时间",
        width: 160
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: "操作",
        width: 250,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let aEdit = this.getCreateLink("编辑图片", () => {
            this.image_edit_dialog.visible = true;
            this.image_edit_dialog.id = option.value;
            this.image_edit_dialog.activity_id = this.options.id;
            this.image_edit_dialog.onHide = (flag: boolean) => {
              this.image_edit_dialog.visible = false;
              if (flag) {
                this.dxDataGrid1.refresh();
              }
            };
          });

          $("<span>")
            .append(aEdit)
            .appendTo(cellElement);
        }
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols
    });

    this.dxDataGrid1.option(options);
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
    let toolbarItems = e.toolbarOptions.items;

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "添加",
        icon: "add",
        onClick: () => {
          // this.image_edit_dialog.visible = true;
          // this.image_edit_dialog.id = 0;
          // this.image_edit_dialog.activity_id = this.options.id;
          let cc = (this.$refs["image_edit"] as any);
          cc.Add();
          
          this.image_edit_dialog.onHide = (flag: boolean) => {
            this.image_edit_dialog.visible = false;
            if (flag) {
              this.dxDataGrid1.refresh();
            }
          };
        }
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        icon: "refresh",
        text: "刷新",
        onClick: () => {
          this.dxDataGrid1.refresh();
        }
      }
    });
    //创建搜索工具条
    this.createSearchToolbars(
      toolbarItems,
      this.dxDataGrid1.option("columns"),
      () => {
        //this.getDataListPager();
      }
    );
  }

  /**
   * 获取充值卡列表
   */
  private async getDataListPager() {
    // 数据源
    let ds = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await new ActivityImgApi().getListPager(
          this.options.id,
          strWhere,
          pageSize,
          pageIndex
        )
    );
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}
