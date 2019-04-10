import * as lsModel from '@/models/BaseModel';

/**
 * 用户短期活动积分模型
 */
export interface UserPointShortModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id 
  points?: number,// 积分
  activity_id?: number,// 活动id
  expiry_time?: string,// 过期时间
  create_time?: string, // 创建时间
  update_time?:string;
}

/**
 * 单个短期活动积分模型
 */
export interface UserPointShortSingleResult extends lsModel.BaseModel {
    data: UserPointShortModel
}

/**
 * 申诉分页结果模型
 */
export interface UserPointShortPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPointShortModel>;
    }
}
