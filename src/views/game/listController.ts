import { Component, Vue, Prop } from 'vue-property-decorator';
import $ from 'jquery';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView, DxPopup } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

import { GameApi } from '@/api/GameApi';

import { CommonUtils } from '@/common/CommonUtils';
import { Lang } from '@/common/Lang';
import { SearchFormModel } from '@/models/SearchModel';
import { Validation } from '@/common/Validation';
import { GameInfoRegionApi } from '@/api/GameInfoRegionApi';
import { GameInfoRegionModel } from '@/models/GameInfoRegionModel';
import { BaseModel } from '@/models/BaseModel';
import { RespCode } from '@/common/RespCode';
import AreaList from './area/arealist.vue';
import { ConditionSearchEnum as ConditionSearchEnum } from '@/common/ConditionSearch';
/**
 * 游戏列表
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView, DxPopup, AreaList
  }
})
export default class Home extends BaseVue {

  private dxFormKey1: string = "dxForm_Key_1";
  private dxSearchForm1: DevExpress.ui.dxForm;
  // 控件初始化
  private dxDataGridKey1: string = "dxDataGridKey1";
  private dxDataGrid1: DevExpress.ui.dxDataGrid;
  private gameAPI = new GameApi();

  private mySearchFormModel: SearchFormModel = {
    type: 0,
    title: ""
  };

  // 入口
  protected async mounted() {
    (this.$parent as any).content_title = "游戏管理";
    this.initComponent();
    await this.getGameList();
  }

  // 初始化组件
  private initComponent() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    const cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        dataField: "title",
        caption: '游戏名',
        width: 180,
      },
      {
        dataField: "game_type",
        caption: '游戏分类',
        width: 120,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.game_area, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "game_h1_title",
        caption: '游戏H5页面标题',
        width: 120
      },
      {
        dataField: "is_hot",
        width: 100,
        caption: '是否热门',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "include_region_codes",
        caption: "包含区域",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let arr: string[] = [];
          try {
            let region_codes_arr = (option.value as string).toString().split(',');
            for (const item of region_codes_arr) {
              if (item && item != "") {
                arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
              }
            }
          } catch (ex) {

          }
          $("<span>")
            .append(arr.join(','))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "exclude_region_codes",
        caption: "排除区域",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let arr: string[] = [];
          try {
            let region_codes_arr = (option.value as string).toString().split(',');
            for (const item of region_codes_arr) {
              if (item && item != "") {
                arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
              }
            }
          } catch (ex) {

          }
          $("<span>")
            .append(arr.join(','))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "free_include_region_codes",
        caption: "限免包含区域",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let arr: string[] = [];
          try {
            let region_codes_arr = (option.value as string).toString().split(',');
            for (const item of region_codes_arr) {
              if (item && item != "") {
                arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
              }
            }
          } catch (ex) {

          }
          $("<span>")
            .append(arr.join(','))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "free_exclude_region_codes",
        caption: "限免排除区域",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let arr: string[] = [];
          try {
            let region_codes_arr = (option.value as string).toString().split(',');
            for (const item of region_codes_arr) {
              if (item && item != "") {
                arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
              }
            }
          } catch (ex) {

          }
          $("<span>")
            .append(arr.join(','))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_support_windows",
        width: 160,
        caption: '是否支持windows',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_support_android",
        width: 120,
        caption: '是否支持安卓',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_support_host_game",
        width: 170,
        caption: '是否支持主机游戏',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_support_ios",
        width: 120,
        caption: '是否支持ios',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_support_mac",
        width: 120,
        caption: '是否支持mac',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_config_id",
        caption: '是否启用区服配置',
        width: 160,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        },
      },
      {
        dataField: "is_valid",
        width: 100,
        caption: '是否有效',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        visible:false,
        dataField: "android_dns_model",
        width: 170,
        caption: '安卓DNS',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.android_dns_model, option.value))
            .appendTo(cellElement);
        }
      },
      {
        visible:false,
        dataField: "sort_num",
        width: 80,
        caption: 'Xml排序'
      },
      {
        dataField: "is_free",
        width: 80,
        caption: '是否限免',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_hide_bandwidth",
        width: 85,
        caption: '是否隐藏带宽',
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          let color = option.value == 0 ? "red" : "green";
          $("<span style='color:" + color + "'>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        visible:false,
        dataField: "change_staff_name",
        caption: '修改人',
        width: 80,
      },
      {
        visible:false,
        dataField: "change_time",
        caption: '修改时间',
        width: 200,
      },
      {
        visible:false,
        dataField: "create_staff_name",
        caption: '创建人',
        width: 80,
      },
      {
        visible:false,
        dataField: "create_time",
        caption: '创建时间',
        width: 160,
      },
      {
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: Lang.Operate,
        width: 280,
        cellTemplate: this.cellEdit
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      paging: {
        pageSize: 20
      },
      onRowClick: this.onRowClickHandler
    });

    this.dxDataGrid1.option(options);


    this.dxSearchForm1 = this.getDxInstanceByKey(this.dxFormKey1);
    this.dxSearchForm1.option({
      formData: this.mySearchFormModel,
      width: 800,
      colCount: 3,
      items: [
        {
          label: {
            text: "游戏平台类型"
          },
          dataField: "type",
          editorType: "dxSelectBox",
          editorOptions: {
            placeholder: "请选择游戏平台类型",
            width: 150,
            displayExpr: "text",
            valueExpr: "id",
            dataSource: [
              {
                text: "PC",
                id: 0
              },
              {
                text: "Android",
                id: 1
              },
              {
                text: "iOS",
                id: 2
              },
              {
                text: "Mac",
                id: 3
              },
              {
                text: "主机",
                id: 4
              }
            ],
            value: 0
          },
          validationRules: [
            Validation.getRequired("游戏平台类型不能为空!")
          ]
        },
        // {
        //   label: {
        //     text: "关键词"
        //   },
        //   dataField: "title",
        //   editorType: "dxTextBox",
        //   editorOptions: {
        //     placeholder: "请根据类型输入关键词进行查询!",
        //     width: 280
        //   },
        //   validationRules: [
        //     Validation.getRequired("关键词不能为空!")
        //   ]
        // },
        {
          itemType: "button",
          horizontalAlignment: "left",
          buttonOptions: {
            text: "搜索游戏",
            icon: "search",
            type: "success",
            onClick: this.SearchFormHandler
          }
        }
      ]
    });
  }

  private SearchFormHandler() {
    if (!this.validateForm(this.dxSearchForm1)) {
      return;
    }

    this.dxDataGrid1.clearFilter();

    let type = this.mySearchFormModel.type;
    let title = this.mySearchFormModel.title;
    let strWhere = "";
    switch (type) {
      case 0:
        strWhere = "&search=is_support_windows__equal__1";
        break;
      case 1:
        strWhere = "&search=is_support_android__equal__1";
        break;
      case 2:
        strWhere = "&search=is_support_ios__equal__1";
        break;
      case 3:
        strWhere = "&search=is_support_mac__equal__1";
        break;
      case 4:
        strWhere = "&search=is_support_host_game__equal__1";
        break;
    }
    this.setSearchKeywords(strWhere);
    this.dxDataGrid1.refresh();
  }
  /**
    * 双击编辑
    * @param sender 
    */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/game/edit/" + sender.key.id);
    });
  }
  /**
 * 编辑
 * @param container 
 * @param option 
 */
  private cellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let aLocal = $("<a href='javascript:void(0)'> 区域设置 </a>");
    aLocal.bind("click", (sender) => {
      this.regionDataList(option.value);
    });

    let aEdit = this.getCreateLink("编辑", (sender) => {
      this.redirect("/game/edit/" + option.value);
    });

    let aLogs = this.getCreateLink("修改记录", (sender) => {
      this.redirect("/game/" + option.value + "/log/list");
    });

    let aAreaList = this.getCreateLink("游戏区服列表", (sender: any) => {
      (this.$refs["AreaList"] as any).show(option.value, {
        title: "游戏区服列表"
      });
    });

    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append(aAreaList)
      .append(" | ")
      .append(aLocal)
      .append(" | ")
      .append(aLogs)
      .appendTo(cellElement);
  }

  /**
 * 获取游戏列表
 */
  private async getGameList() {
    // 数据源
    let ds = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => {
      let d = await this.gameAPI.gameListPager(strWhere, pageSize, pageIndex);
      return d;
    });
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  private onToolbarPreparingHandler(e: {
    component?: DevExpress.DOMComponent,
    element?: DevExpress.core.dxElement,
    model?: any,
    toolbarOptions?: DevExpress.ui.dxToolbarOptions
  }) {
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
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getGameList();
    },"title",ConditionSearchEnum.contain);

  }

  /**
   * 添加游戏
   * @param sender 
   */
  private onAddHandler(sender) {
    this.redirect("/game/edit");
  }

  /**
* 刷新
* @param sender 
*/
  private onRefreshHandler(sender) {
    this.setSearchKeywords("");
    this.dxDataGrid1.refresh();
  }

  //#region 本地化
  private grid_region: DevExpress.ui.dxDataGrid;
  private gameInfoRegionApi = new GameInfoRegionApi();

  /**
   * 本地化列表
   * @param game_id 
   */
  private regionDataList(game_id: number) {
    this.grid_region = this.createPopDataList({
      title: "本地化列表"
    },
      {
        columns: [
          {
            dataField: "id",
            caption: '编号',
            width: 80,
          },
          {
            dataField: "game_title",
            caption: '所属游戏',
            width: 100,
          },
          {
            dataField: "region_code",
            caption: '区域代码',
            width: 100,
            cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
              $("<span>")
                .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, option.value))
                .appendTo(cellElement);
            }
          },
          {
            dataField: "title",
            caption: '标题',
            width: 160,
          },
          {
            dataField: "info",
            caption: '信息',
            width: 160,
          },
          {
            dataField: "keyword",
            caption: '关键词',
            width: 160,
          },
          {
            dataField: "create_staff_name",
            caption: '创建管理员',
            width: 160,
          },
          {
            dataField: "create_time",
            caption: '创建时间',
            width: 160,
          },
          {
            dataField: "update_staff_name",
            caption: '修改管理员',
            width: 160,
          },
          {
            dataField: "change_time",
            caption: '修改时间',
            width: 160,
          },
          {
            fixed: true,
            fixedPosition: "right",
            dataField: "id",
            alignment: "center",
            caption: "操作",
            width: 200,
            cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
              let aEdit = $("<a href='javascript:void(0)'> 编辑 </a>");
              aEdit.bind("click", async (sender) => {
                let d = await this.gameInfoRegionApi.getModel(option.value);
                this.regionDataEdit(d.data);
              });
              $("<div>")
                .append(aEdit)
                .appendTo(cellElement);
            }
          }
        ]
      }, (sender) => {
        let toolbarItems = sender.toolbarOptions.items;
        toolbarItems.push({
          location: 'before',
          widget: 'dxButton',
          options: {
            text: '添加',
            icon: 'add',
            onClick: sender => {
              this.regionDataEdit({
                id: 0,
                game_id: game_id
              });
            }
          }
        });

        toolbarItems.push({
          location: 'before',
          widget: 'dxButton',
          options: {
            text: '刷新',
            icon: 'refresh',
            onClick: sender => {
              this.grid_region.refresh();
            }
          }
        });

        //创建搜索工具条
        this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
          this.getLocalDataList();
        });

      });
    this.setSearchKeywords("&game_id=" + game_id);
    this.getLocalDataList();
  }

  private getLocalDataList() {


    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.gameInfoRegionApi.getListPager(
          strWhere,
          pageSize,
          pageIndex
        )
    );
    this.grid_region.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  /**
   * 本地化编辑
   * @param model 
   */
  private regionDataEdit(model: GameInfoRegionModel = {
    id: 0
  }) {
    let items = this.createFormItems([
      {
        dataField: "region_code",
        label: {
          text: '区域代码'
        },
        editorType: "dxSelectBox",
        editorOptions: {
          placeholder: "请选择区域代码",
          dataSource: CommonUtils.getDictonary().data.region_code,
          displayExpr: "name",
          valueExpr: "id",
        },
        validationRules: [Validation.getRequired("区域代码不能为空!")]
      },
      {
        dataField: "title",
        label: {
          text: '标题'
        },
        editorOptions: {
          placeholder: "请选输入标题"
        },
        validationRules: [Validation.getRequired("标题不能为空!")]
      },
      {
        dataField: "keyword",
        label: {
          text: '关键词'
        },
        editorOptions: {
          placeholder: "请输入关键词.",
        },
        validationRules: [Validation.getRequired("关键词不能为空!")]
      },
      {
        dataField: "info",
        label: {
          text: '信息'
        },
        editorType: "dxTextArea",
        editorOptions: {
          placeholder: "请输入信息.",
          height: 80
        },
        validationRules: [Validation.getRequired("信息不能为空!")]
      }
    ]);

    let form = this.createPopForm({
      title: "编辑本地化",
      width: 400,
      height: 300
    }, {
        formData: model,
        items: items
      }, {}, async (v, p) => {
        try {
          if (!this.validateForm(v)) {
            return false;
          }
          let dxFormData1 = v.option("formData") as GameInfoRegionModel;
          let result: BaseModel;
          if (dxFormData1.id == RespCode.zero) {
            result = await this.gameInfoRegionApi.setAdd(dxFormData1);
          } else {
            result = await this.gameInfoRegionApi.setUpdate(dxFormData1.id, dxFormData1);
          }
          if (result.code == RespCode.OK || result.code == RespCode.isSame || result.code == RespCode.isSameSaveData) {
            await this.toast(() => {
              this.grid_region.refresh();
            });
            return true;
          } else {
            this.errorCodeMsg(result.code, result.msg);
          }
        } catch (error) {
          this.error(error);
        }
        return false;
      });
  }
  //#endregion
}