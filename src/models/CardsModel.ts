import { CardsModel } from '@/models/CardsModel';
import * as lsModel from '@/models/BaseModel';

/**
 * 充值卡类别模型
 */
export interface CardsModel {
  account_token?: string,
  id?: number,// 编号
  title?: string,// 卡名称
  card_prefix?: string,
  is_valid?: number,// 是否有效
  price?: number,// 美元价格
  price_type?: number,// 价格类型
  minutes?: string,// 分钟数
  create_staff_id?: string,// 创建人
  create_staff_name?: string,// 创建人姓名
  create_time?: string// 创建时间
  recharge_type?:number//充值卡开发类型
  desc?:string;
  card_type?:number;
  max_used_count?:number;
}

/**
 * 充值卡单个模型
 */
export interface CardsSingleResult extends lsModel.BaseModel {
  data: CardsModel
}


/**
* 充值卡分页结果模型
*/
export interface CardsModelPagerResult extends lsModel.BaseModel {
  data: {
      total: number;
      current_page: number;
      per_page: number;
      last_page: number;
      list: Array<CardsModel>;
  }
}

/**
* 充值卡结果模型
*/
export interface CardsModelListResult extends lsModel.BaseModel {
  data: Array<CardsModel>
}






export interface CardsSimpleModel {
  id?: number,// 编号
  title?: string,// 卡名称
}

export interface CardsSimpleListResult extends lsModel.BaseModel {
  data: Array<CardsSimpleModel>
}








