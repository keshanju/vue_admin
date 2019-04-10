import * as lsModel from '@/models/BaseModel';

/**
 * 用户积分日志模型
 */
export interface UserPointLogModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id 
  point?: number,// 积分
  point_from_type?: number,// 积分来源类型，1：系统短期，2：系统长期，3：人工短期，4：人工长期
  point_ref_id?: number,// 积分来源id
  staff_id?: number, // 人工id
  staff_oper_desc?: string,// 人工操作原因
  create_time?: string, // 创建时间
  expiry_time?:string;
  activity_id?:number;
}

/**
 * 单个积分日志模型
 */
export interface UserPointLogSingleResult extends lsModel.BaseModel {
    data: UserPointLogModel
}

/**
 * 积分日志分页结果模型
 */
export interface UserPointLogPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPointLogModel>;
    }
}
