import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

import { PackagePriceApi } from '@/api/PackagePriceApi';
import { CommonUtils } from '@/common/CommonUtils';
import { PackagePriceActivityApi } from '@/api/PackagePriceActivityApi';
import { Validation } from '@/common/Validation';
import { PackagePriceActivityModel, Result } from '@/models/PackagePriceActivityModel';
import { RespCode } from '@/common/RespCode';
import { ActivityApi } from '@/api/ActivityApi';
import { DateTimeUtils } from '@/utils/DateTimeUtils';
import { LangUtils } from '@/common/LangUtils';
/**
 * 套餐价格列表
 */
@Component({
  components: {
    DxDataGrid, DxForm
  }
})
export default class Home extends BaseVue {

  protected dxDataGridKey1: string = "dxDataGridKey1";
  protected dxDataGrid1: DevExpress.ui.dxDataGrid;

  private packagePriceAPI = new PackagePriceApi();
  private packagePriceActivityApi = new PackagePriceActivityApi();
  private priceId: number = 0;
  private grid: DevExpress.ui.dxDataGrid;
  private activityApi = new ActivityApi();
  /**
   * 入口
   */
  protected async mounted() {
    (this.$parent as any).content_title = "套餐价格";
    this.dsLang = await LangUtils.getLangResourceDic();

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
        caption: "价格名称",
        width: 180,
        cellTemplate: async (cellElement: DevExpress.core.dxElement, option: any) => {
          let title = await LangUtils.getLangResourceTitle(this.dsLang, option.value);
          $("<span></span>")
            .append(title)
            .appendTo(cellElement);
        }
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "price",
        caption: "价格(分)",
        width: 180
      },

      {
        dataField: "price_type",
        caption: "价格类型",
        width: 100,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
            .appendTo(cellElement);
        },
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "free_add_time",
        caption: "赠送分钟数",
        width: 180
      },
      // {
      //   dataField: "include_region_codes",
      //   caption: "包含区域",
      //   width: 100,
      //   cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      //     let arr: string[] = [];
      //     try {
      //       let region_codes_arr = (option.value as string).toString().split(',');
      //       for (const item of region_codes_arr) {
      //         if (item && item != "") {
      //           arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
      //         }
      //       }
      //     } catch (ex) {

      //     }
      //     $("<span>")
      //       .append(arr.join(','))
      //       .appendTo(cellElement);
      //   },
      // },
      // {
      //   dataField: "exclude_region_codes",
      //   caption: "排除区域",
      //   width: 100,
      //   cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
      //     let arr: string[] = [];
      //     try {
      //       let region_codes_arr = (option.value as string).toString().split(',');
      //       for (const item of region_codes_arr) {
      //         if (item && item != "") {
      //           arr.push(CommonUtils.getDicText(CommonUtils.getDictonary().data.region_code, Number(item)));
      //         }
      //       }
      //     } catch (ex) {

      //     }
      //     $("<span>")
      //       .append(arr.join(','))
      //       .appendTo(cellElement);
      //   },
      // },
      {
        dataField: "extend_type",
        caption: "时长类型",
        width: 180,
        cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
          $("<span>")
            .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.duration_date_type, option.value))
            .appendTo(cellElement);
        }
      },
      {
        dataField: "extend_time",
        caption: "延长时间",
        width: 180
      }, {
        allowFiltering: true,
        allowSorting: true,
        dataField: "points",
        caption: "积分",
        width: 180
      },
      {
        allowFiltering: true,
        allowSorting: true,
        dataField: "order_num",
        caption: "排序",
        width: 180
      },
      {
        dataField: "short_desc",
        caption: "简介",
        width: 180,
        cellTemplate: async (cellElement: DevExpress.core.dxElement, option: any) => {
          let title = await LangUtils.getLangResourceTitle(this.dsLang, option.value);
          $("<span></span>")
            .append(title)
            .appendTo(cellElement);
        }
      },
      {
        dataField: "apple_commodity_id",
        caption: "苹果商品ID",
        width: 180
      },
      {
        visible: false,
        dataField: "ref_add_time",
        caption: "推荐人赠送时长（分钟）",
        width: 180
      },
      {
        visible: false,
        dataField: "ref_add_self_time",
        caption: "购买人赠送时长（分钟）",
        width: 180
      },
      {
        visible: false,
        dataField: "max_ref_add_time",
        caption: "推荐用户免费最大获得时间值（分钟",
        width: 240
      },
      {
        visible: false,
        dataField: "max_ref_add_self_time",
        caption: "推荐人免费最大获得时间值（分钟）",
        width: 240
      },
      {
        dataField: "create_time",
        caption: "创建时间",
        width: 160
      },
      {
        dataField: "staff_create_name",
        caption: "创建人",
        width: 80
      },
      {
        dataField: "change_time",
        caption: "修改时间",
        width: 160
      },
      {
        dataField: "update_staff_name",
        caption: "修改人",
        width: 80
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
      onRowClick: this.onRowClickHandler
    });

    this.dxDataGrid1.option(options);
  }

  /**
    * 双击编辑
    * @param e 
    */
  private onRowClickHandler(sender) {
    this.dbClick(() => {
      this.redirect("/package/" + this.ID + "/price/edit/" + sender.key.id);
    });
  }
  /**
* 编辑
* @param cellElement 
* @param option 
*/
  private CellEdit(cellElement: DevExpress.core.dxElement, option: any) {
    let aBindActivity = $(`<a href='javascript:void(0)' data='${option.value}'>绑定活动</a>`)
      .bind("click", (sender) => {
        this.priceId = Number(option.value);
        this.grid = this.createPopDataList({
          title: "绑定活动"
        }, {
            columns: [
              {
                dataField: 'id',
                caption: '编号',
                width: 80
              },
              {
                dataField: 'activity_title',
                caption: '所属活动',
                width: 100
              },
              {
                dataField: 'price_title',
                caption: '所属套餐价格',
                width: 100
              },
              {
                dataField: "price_type",
                caption: "价格类型",
                width: 100,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                  $("<span>")
                    .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.price_type, option.value))
                    .appendTo(cellElement);
                },
              },
              {
                dataField: 'short_points',
                caption: '短期活动积分',
                width: 100
              },
              {
                dataField: 'short_ref_points',
                caption: '短期推荐人积分',
                width: 100
              },
              {
                dataField: 'max_short_points',
                caption: '最大赠送短期积分',
                width: 100
              },
              {
                dataField: 'max_short_ref_points',
                caption: '最大推荐赠送短期积分',
                width: 100
              },
              {
                dataField: 'is_valid',
                caption: '是否有效',
                width: 80,
                cellTemplate: (cellElement: DevExpress.core.dxElement, option: any) => {
                  let color = option.value == 0 ? "red" : "green";
                  $("<span style='color:" + color + "'>")
                    .append(CommonUtils.getDicText(CommonUtils.getDictonary().data.valid, option.value))
                    .appendTo(cellElement);
                },
              },
              {
                dataField: 'start_time',
                caption: '活动开始时间',
                width: 160
              },
              {
                dataField: 'end_time',
                caption: '活动结束时间',
                width: 160
              },
              {
                dataField: 'create_staff_name',
                caption: '创建人',
                width: 100
              },
              {
                dataField: 'create_time',
                caption: '创建时间',
                width: 160
              },
              {
                dataField: 'change_staff_name',
                caption: '修改人',
                width: 100
              },
              {
                dataField: 'change_time',
                caption: '修改时间',
                width: 160
              },

              {
                fixed: true,
                fixedPosition: 'right',
                dataField: 'id',
                alignment: 'center',
                caption: '操作',
                width: 200,
                cellTemplate: (cellElement1: DevExpress.core.dxElement, option1: any) => {
                  let aEdit = $("<a href='javascript:void(0)' data='" + option1.value + "'> 编辑 </a>")
                    .bind('click', async  sender => {
                      let id = Number($(sender.target).attr('data'));

                      let model = await this.packagePriceActivityApi.getModel(id);
                      this.editPriceActivityForm(model.data);
                    });

                  $('<div>')
                    .append(aEdit)
                    .appendTo(cellElement1);
                }
              }
            ]
          },
          sender => {
            let toolbarItems = sender.toolbarOptions.items;
            toolbarItems.push({
              location: 'before',
              widget: 'dxButton',
              options: {
                text: '添加',
                icon: 'add',
                onClick: (sender) => {
                  this.editPriceActivityForm();
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
                  this.grid.refresh();
                }
              }
            });

            //创建搜索工具条
            this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
              this.getPackagePriceActivityDataList();
            });
          });


        this.getPackagePriceActivityDataList();
      });

    let aEdit = this.getCreateLink("编辑", sender => {
      this.redirect("/package/" + this.ID + "/price/edit/" + option.value);
    });

    $("<div>")
      .append(aBindActivity)
      .append(" | ")
      .append(aEdit)
      .appendTo(cellElement);
  }

  private getPackagePriceActivityDataList() {
    let ds: any = this.getDataGridPager(
      async (strWhere, pageSize, pageIndex) =>
        await this.packagePriceActivityApi.getListPager(
          this.priceId,
          strWhere,
          pageSize,
          pageIndex
        )
    )
    this.grid.option({
      remoteOperations: true,
      dataSource: ds
    })
  }

  /**
   * 编辑价格绑定活动
   * @param formData 
   */
  private async editPriceActivityForm(
    formData: PackagePriceActivityModel = {
      id: 0,
      activity_id: -1,
      is_valid: 1,
      short_points: 0,
      short_ref_points: 0,
      start_time: DateTimeUtils.getNow(),
      end_time: DateTimeUtils.getNow(),
    }
  ) {

    let d = await this.activityApi.getList();

    //let dsActivity = [{ id: -1, title: "请选择活动" }, ...d.data];
    let dsActivity = d.data;
    if(!dsActivity || dsActivity.length==0){
      this.alert("活动不存在!没有任何有效的活动.");
      return;
    }
    if (formData.activity_id == -1)
      formData.activity_id = dsActivity[0].id;

    let form = this.createPopForm(
      {
        title: '价格活动编辑',
        maxWidth: 800,
        maxHeight: 400
      },
      {
        formData: formData,
        colCount: 2,
        items: [
          {
            colSpan: 2,
            dataField: 'activity_id',
            label: {
              text: '所属活动'
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: '请选择所属活动',
              hint: '请选择所属活动',
              dataSource: dsActivity,
              displayExpr: 'title',
              valueExpr: 'id',
            },
            validationRules: [
              Validation.getRequired('所属活动不能为空!')
            ]
          },
          {
            colSpan: 2,
            dataField: 'short_points',
            label: {
              text: '短期活动积分'
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: '请输入短期活动积分',
              hint: '请输入短期活动积分',
              min: 0
            },
            validationRules: [
              Validation.getRequired('短期活动积分不能为空!')
            ]
          },
          {
            colSpan: 2,
            dataField: 'short_ref_points',
            label: {
              text: '短期推荐人积分'
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: '请输入短期推荐人积分',
              hint: '请输入短期推荐人积分',
              min: 0
            },
            validationRules: [
              Validation.getRequired('短期推荐人积分不能为空!')
            ]
          },
          {
            colSpan: 2,
            dataField: 'max_short_points',
            label: {
              text: '最大赠送短期积分'
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: '请输入最大赠送短期积分',
              hint: '请输入最大赠送短期积分',
              min: 0
            },
            validationRules: [
              Validation.getRequired('最大赠送短期积分不能为空!')
            ]
          },
          {
            colSpan: 2,
            dataField: 'max_short_ref_points',
            label: {
              text: '最大推荐赠送短期积分'
            },
            editorType: "dxNumberBox",
            editorOptions: {
              placeholder: '请输入最大推荐赠送短期积分',
              hint: '请输入最大推荐赠送短期积分',
              min: 0
            },
            validationRules: [
              Validation.getRequired('最大推荐赠送短期积分不能为空!')
            ]
          },
          {
            colSpan: 2,
            dataField: 'is_valid',
            label: {
              text: '是否有效'
            },
            editorType: "dxSelectBox",
            editorOptions: {
              placeholder: '请选择状态',
              hint: '请选择状态',
              dataSource: CommonUtils.getDictonary().data.valid,
              displayExpr: "name",
              valueExpr: "id",
            },
            validationRules: [
              Validation.getRequired('状态不能为空!')
            ]
          },
          // {
          //   colSpan: 2,
          //   dataField: 'start_time',
          //   label: {
          //     text: '活动开始时间'
          //   },
          //   editorType: "dxDateBox",
          //   editorOptions: {
          //     placeholder: '活动开始时间',
          //     hint: '请输入活动开始时间',
          //     type: "datetime",
          //     displayFormat: 'yyyy-MM-dd HH:mm:ss',
          //     dateSerializationFormat: 'yyyy-MM-dd HH:mm:ss',
          //     min: DateTimeUtils.getNow(),
          //     onValueChanged: (e: any) => {
          //       form.getEditor('end_time').option({
          //         min: e.value,
          //         value: e.value
          //       })
          //     }
          //   },
          //   validationRules: [
          //     Validation.getRequired('活动开始时间不能为空!')
          //   ]
          // },
          // {
          //   colSpan: 2,
          //   dataField: 'end_time',
          //   label: {
          //     text: '活动结束时间'
          //   },
          //   editorType: "dxDateBox",
          //   editorOptions: {
          //     placeholder: '活动结束时间',
          //     hint: '请输入活动结束时间',
          //     type: "datetime",
          //     displayFormat: 'yyyy-MM-dd HH:mm:ss',
          //     dateSerializationFormat: 'yyyy-MM-dd HH:mm:ss',
          //     min: DateTimeUtils.getNow()
          //   },
          //   validationRules: [
          //     Validation.getRequired('活动结束时间不能为空!')
          //   ]
          // }, 

        ]
      },
      {},
      async (form, pop) => {
        let data = form.option('formData') as PackagePriceActivityModel
        try {
          data.account_token = this.token;
          //let postData = this.joinFormParams(data);
          let d: Result;
          if (data.id == RespCode.zero) {
            d = await this.packagePriceActivityApi.setAdd(this.priceId, {
              account_token: data.account_token,
              id: data.id,
              activity_id: [data.activity_id],
              price_id: data.price_id,
              short_points: data.short_points,
              short_ref_points: data.short_ref_points,
              create_staff_id: data.create_staff_id,
              create_time: data.create_time,
              change_staff_id: data.change_staff_id,
              change_time: data.change_time,
              is_valid: data.is_valid,
              delete_staff_id: data.delete_staff_id,
              delete_time: data.delete_time,
              start_time: data.start_time,
              end_time: data.end_time,
              max_short_points:data.max_short_points,
              max_short_ref_points:data.max_short_ref_points
            })
          } else {
            d = await this.packagePriceActivityApi.setUpdate(
              data.id,
              data
            )
          }
          if (d.code == RespCode.OK || d.code == RespCode.isSame || d.code == RespCode.isSameSaveData) {
            this.toast(() => {
              this.grid.refresh()
            })
            return true
          } else {
            this.errorCodeMsg(d.code, d.msg)
          }
        } catch (error) {
          this.error(error)
        }
        return false
      }
    );
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
        onClick: this.onSearchHandler
      }
    });

    toolbarItems.push({
      location: "before",
      widget: "dxButton",
      options: {
        text: "返回套餐列表",
        icon: "back",
        onClick: this.onBackListHandler
      }
    });

    //创建搜索工具条
    this.createSearchToolbars(toolbarItems, this.dxDataGrid1.option("columns"), () => {
      this.getDataList();
    });
  }

  /**
* 搜索
* @param e 
*/
  private onSearchHandler(sender) {
    this.dxDataGrid1.refresh();
  }

  /**
 * 添加信息
 * @param e 
 */
  private onAddHandler(sender) {
    this.redirect("/package/" + this.ID + "/price/edit");
  }

  /**
   * 返回
   * @param e 
   */
  private onBackListHandler(sender) {
    this.redirect("/package/list");
  }

  /**
   * 获取数据列表
   */
  private getDataList() {
    let ds: any = this.getDataGridPager(async (strWhere, pageSize, pageIndex) => await this.packagePriceAPI.getListPager(this.ID, strWhere, pageSize, pageIndex));
    this.dxDataGrid1.option({
      remoteOperations: true,
      dataSource: ds
    });
  }
}