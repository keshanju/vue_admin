import { CardListModel } from '@/models/CardListModel';
import * as lsModel from '@/models/BaseModel';


/**
 * 充值卡开卡模型
 */
export interface CardListModel {
  account_token?: string,
  id?: number,// 编号
  card_no?: string,// 卡号
  minutes?: number,// 分钟数
  create_time?: string,// 创建时间
  is_export?: number,// 是否导出
  batch_no?: string,// 批次号
  card_define_id?: number,// 卡定义id
  card_define_title?: number,// 
  create_staff_id?: number,// 创建员工id
  create_staff_name?: number
}


/**
 * 充值卡列表单个模型
 */
export interface CardListSingleResult extends lsModel.BaseModel {
  data: CardListModel
}


/**
* 充值卡列表分页结果模型
*/
export interface CardListModelPagerResult extends lsModel.BaseModel {
  data: {
      total: number;
      current_page: number;
      per_page: number;
      last_page: number;
      list: Array<CardListModel>;
  }
}

/**
* 充值卡列表结果模型
*/
export interface CardListModelListResult extends lsModel.BaseModel {
  data: Array<CardListModel>
}