import * as lsModel from '@/models/BaseModel';

/**
 * 用户积分模型
 */
export interface UserPointModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id
  activity_id?: number,// 活动id
  points?: string,// 积分
  create_time?: string, // 创建时间
}

/**
 * 单个用户积分模型
 */
export interface UserPointSingleResult extends lsModel.BaseModel {
    data: UserPointModel
}

/**
 * 用户积分分页结果模型
 */
export interface UserPointPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPointModel>;
    }
}
