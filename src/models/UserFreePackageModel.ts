import * as lsModel from '@/models/BaseModel';

/**
 * 用户赠送的套餐模型
 */
export interface UserFreePackageModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id 
  user_ip?: string,// 用户ip
  ip_mask?: string,// ip掩码
}

/**
 * 单个赠送的套餐模型
 */
export interface UserFreePackageSingleResult extends lsModel.BaseModel {
    data: UserFreePackageModel
}

/**
 * 赠送的套餐分页结果模型
 */
export interface UserFreePackagePagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserFreePackageModel>;
    }
}
