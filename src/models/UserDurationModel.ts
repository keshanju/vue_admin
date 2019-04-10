import * as lsModel from "@/models/BaseModel";

/**
 * 用户时长模型
 */
export interface UserDurationModel {
  account_token?: string;
  id?: number;
  user_id?: number; //用户id
  minutes?: number; // 分钟数
  op_source?: number; // 操作来源 0:暂停恢复赠送的时长 1:后台赠送 2:注册赠送 3:充值卡 4:订单(续费和新开)
  create_time?: string; // 创建时间
  ref_id?: number; // 相关流水ID 若op_source为0则不判断,否则则为相关操作ID 如果为充值卡,填写充值卡号.
  change_time_option?: number; // 修改时长选项 0:过期时间 1:赢取时间
}

/**
 * 单个用户时长模型
 */
export interface UserDurationSingleResult extends lsModel.BaseModel {
  data: UserDurationModel;
}

/**
 * 外网用户时长结果模型
 */
export interface UserDurationPagerResult extends lsModel.BaseModel {
  data: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    list: Array<UserDurationModel>;
  };
}