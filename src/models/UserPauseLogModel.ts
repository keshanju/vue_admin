import * as lsModel from '@/models/BaseModel';

/**
 * 暂停日志模型
 */
export interface UserPauseLogModel {
  account_token?: string,
  id?: number,
  user_id?: number,//用户id 
  status?: number,// 操作 0:暂停 1:恢复
  pause_time?: string,// 暂停时间
  resume_time?: string,// 恢复时间
  pause_ip?: string,// 暂停IP 暂停的人所在的外网IP
  resume_ip?: string,// 恢复ip 恢复的人所在的外网ip
  staff_id?: number,// 后台操作人员
  staff_desc?: string,// 操作描述 后台操作描述
  op_source?: number,// 操作来源 0:用户 1:后台操作
}

/**
 * 单个暂停日志模型
 */
export interface UserPauseLogSingleResult extends lsModel.BaseModel {
    data: UserPauseLogModel
}

/**
 * 暂停分页结果模型
 */
export interface UserPauseLogPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPauseLogModel>;
    }
}
