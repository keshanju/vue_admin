import * as lsModel from '@/models/BaseModel';

/**
 * 强制退出模型
 */
export interface ForceLogoutLogModel {
    id?: number;
    account_token?: string;
    user_id?: number; // 用户Id
    create_time?: string;// 创建时间
    account_admin_ip?: string;// 管理员IP
    user_ip?: string; // user_ip
    force_logout_type?: number;// 下线类型
    account_admin_desc?: string; // 下线说明
}


/**
 * 强制退出单个返回
 */
export interface ForceLogoutLogResult extends lsModel.BaseModel {

}

/**
 * 强制退出模型返回
 */
export interface ForceLogoutLogModelResult extends lsModel.BaseModel {
    data: ForceLogoutLogModel
}

/**
 * 强制退出列表返回
 */
export interface ForceLogoutLogListResult extends lsModel.BaseModel {
    data: Array<ForceLogoutLogModel>
}

/**
 * 强制退出分页列表返回
 */
export interface ForceLogoutLogPagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<ForceLogoutLogModel>;
    }
}