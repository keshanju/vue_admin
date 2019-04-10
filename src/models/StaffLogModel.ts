import * as lsModel from '@/models/BaseModel';

/**
 * 系统日志模型
 */
export interface StaffLogModel {
    account_token?: string,
    id?: number;
    staff_id?: number;
    ip?: string;
    op_type?: number;
    create_time?: string;
    op_user_id?: number;
    op_desc?: string;
    op_staff_id?: number;
}


/**
 * 系统日志单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 系统日志模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: StaffLogModel
}

/**
 *系统日志列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<StaffLogModel>
}

/**
 * 系统日志分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<StaffLogModel>;
    }
}