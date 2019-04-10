import * as lsModel from '@/models/BaseModel';

/**
 * 用户申诉模型
 */
export interface UserAppealModel {
  account_token?: string,
  id?: number,
  appeal_id?: number,// 申诉编号
  user_id?: number,//申诉人id 
  mobile_num?: number,// 手机号
  email?: string,// 邮箱
  new_email?: string,// 新邮箱
  new_mobile_num?: number, // 新手机号
  create_time?: string, // 创建时间
  op_time?: string, // 操作时间
  status?: number, // 审核状态 0:待审核 1:审核通过 2:审核不通过
  staff_id?: number, // 操作人
  op_desc?: string, // 操作说明
  user_desc?: string, // 用户说明
  appeal_source?: number, // 申诉来源
  appeal_voucher1?: string, // 申诉凭证1 截图最大为500k
  appeal_voucher2?: string, // 申诉凭证2 截图最大为500k
  user_nickname?:string
}

/**
 * 单个申诉模型
 */
export interface UserAppealSingleResult extends lsModel.BaseModel {
    data: UserAppealModel
}

/**
 * 申诉分页结果模型
 */
export interface UserAppealPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserAppealModel>;
    }
}
