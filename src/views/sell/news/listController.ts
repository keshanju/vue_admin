import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { NewsApi } from '@/api/NewsApi';
import { CommonUtils } from '@/common/CommonUtils';
import file_uploader from 'devextreme/ui/file_uploader'
import popup from '../../../../node_modules/devextreme/ui/popup'
import { RespCode } from '@/common/RespCode';

import CreateHtml from "./createHtml.vue";

/**
 * 公告列表
 */
@Component({
  components: {
    DxDataGrid, DxForm,
    CreateHtml
  }
})
export default class Home extends BaseVue {

  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private newsAPI = new NewsApi();

  private show_create_html = false;
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "文章管理";
    this.initComponents();
    this.getDataList();
  }

  /**
   * 初始化控件
   */
  private initComponents() {
    this.dxDataGrid1 = this.getDxInstanceByKey(this.dxDataGridKey1);

    let cols: DevExpress.ui.dxDataGridColumn[] = [
      {
        dataField: "id",
        caption: "编号",
        width: 80
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "title",
        caption: "标题",
        width: 120,
      },
      {
        dataField: "class_type",
        caption: "类别",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.class_type, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "summary",
        caption: "摘要",
        width: 200,
        visible: false
      },
      {
        dataField: "tag",
        caption: "引用标记",
        width: 200,
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "hits",
        caption: "点击次数",
        width: 100,
      },
      {
        dataField: "support_type",
        caption: "支持类型",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.support_type, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "publish_status",
        caption: "发布状态",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.publish_status, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "is_top",
        caption: "是否置顶",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.flag, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "publish_time",
        caption: "发布时间",
        width: 160,
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160,
        visible: false,
      },
      {
        dataField: "create_staff_name",
        caption: "创建人",
        width: 80,
        visible: false,
      },
      {
        dataField: "change_time",
        caption: "更新时间",
        width: 160,
        visible: false,
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
        fixed: true,
        fixedPosition: "right",
        dataField: "id",
        alignment: "center",
        caption: "操作",
        width: 200,
        cellTemplate: this.CellEdit
      }
    ];

    let options = this.getDataGridOption({
      onToolbarPreparing: this.onToolbarPreparingHandler,
      columns: cols,
      onRowClick: this.onRowClickHandler,
      // height: () => {
      //   return window.innerHeight - 20;
      // }
    });

    this.dxDataGrid1.option(options);
  }
  /**
    * 双击编辑
    * @param e 
    */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/sell/news/edit/" + sender.key.id);
    });
  }
  /**
* 编辑
* @param cellElement 
* @param option 
*/
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {

    let browserUrl = CommonUtils.GetSettingsVal("Notice_Browser_Url").replace("${id}", option.value);

    let aEdit = this.getCreateLink("编辑", sender => {
      this.redirect("/sell/news/edit/" + option.value);
    });

    let aCreateHtml = this.getCreateLink("生成静态", async sender => {
      try {
        let d = await this.newsAPI.createNewsDetails(option.value);
        if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
          this.toast(() => {

          }, "生成静态成功!");
        } else {
          this.errorCodeMsg(d.code, d.msg);
        }
      } catch (error) {
        this.error(error);
      }

    });

    $("<div>")
      .append(aEdit)
      .append(" | ")
      .append($("<a href='" + browserUrl + "' target='_blank'> 浏览 </a>"))
      .append(" | ")
      .append(aCreateHtml)
      .appendTo(cellElement);
  }
  /**
* 初始化工具条
* @param e 
*/
  private onToolbarPreparingHandler(e: { component?: DevExpress.DOMComponent, element?: DevExpress.core.dxElement, model?: any, toolbarOptions?: DevExpress.ui.dxToolbarOptions }) {
    let dataGrid = e.component;
    let toolbarItems = e.toolbarOptions.items;

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "添加",
        icon: "add",
        onClick: this.onAddHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "刷新",
        icon: "refresh",
        onClick: this.onRefreshHandler
      }
    });

    toolbarItems.push({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: '批量导入',
        icon: 'upload',
        onClick: this.onUploadJsonHandler
      }
    })

    toolbarItems.push({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: '生成新闻JSON列表',
        onClick: () => {
          (this.$refs["CreateHtml1"] as any).show();
        }
      }
    });

    toolbarItems.push({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: '重新生成新闻静态',
        onClick: async () => {
          try {
            let d = await this.newsAPI.reCreateAllNewsDetails();
            if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
              this.toast(() => {
              }, "重新生成新闻静态成功!");
            } else {
              this.errorCodeMsg(d.code, d.msg);
            }
          } catch (error) {
            this.error(error);
          }
        }
      }
    })

    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getDataList();
    });
  }

  /**
* 搜索
* @param e 
*/
  private onRefreshHandler(sender) {
    this.dxDataGrid1.refresh();
  }
  /**
 * 添加
 * @param e 
 */
  private onAddHandler(sender) {
    this.redirect("/sell/news/edit");
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.newsAPI.getListPager(strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }

  private onUploadJsonHandler(sender) {
    let div = $('<div>')
    div.appendTo(sender.element)

    this.popup1 = new popup(div[0], {
      width: 400,
      height: 220,
      title: '批量上传文章',
      contentTemplate: () => {
        let f = new file_uploader($('<div>')[0], {
          multiple: false,
          accept: '*',
          uploadMode: 'instantly',
          uploadMethod: 'POST',
          name: 'filename',
          uploadUrl: this.uploadApi.getNewsUploadPath('json'),
          onUploaded: (e: {
            component?: DevExpress.DOMComponent
            element?: DevExpress.core.dxElement
            model?: any
            file?: File
            jQueryEvent?: JQueryEventObject
            event?: DevExpress.event
            request?: XMLHttpRequest
          }) => {
            this.toast(() => {
              this.popup1.hide()
              this.dxDataGrid1.refresh()
            }, '您的信息已经上传成功!')
          },
          onUploadError: () => {
            console.log('error')
          }
        })
        return f.element()
      },
      toolbarItems: [{
        location: 'after',
        toolbar: 'bottom',
        visible: true,
        widget: 'dxButton',
        options: {
          type: 'success',
          text: '模板文件',
          onClick: () => {
            let a = document.createElement('a');
            a.href = '/static/news_bat.json';
            a.download = 'news.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }
      }]
    })
    this.popup1.show()
  }
}