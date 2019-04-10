import * as lsModel from '@/models/BaseModel';

/**
 * 用户外网ip模型
 */
export interface UserWanipModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id 
  user_ip?: string,// 用户ip
  ip_mask?: string,// ip掩码
}

/**
 * 单个外网ip模型
 */
export interface UserWanipSingleResult extends lsModel.BaseModel {
    data: UserWanipModel
}

/**
 * 外网ip分页结果模型
 */
export interface UserWanipPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserWanipModel>;
    }
}
