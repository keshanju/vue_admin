import * as lsModel from '@/models/BaseModel';

export interface UserChangeTimeLogModel {
    account_token?: string,
    id?: number;
    user_id?: number;
    duration?: number;
    duration_type?: number;
    op_source?: number;
    create_time?: string;
    ref_id?: string;
    change_time_option?: number;
}


/**
 * 布局单个返回
 */
export interface UserChangeTimeLogResult extends lsModel.BaseModel {

}

/**
 * 布局模型返回
 */
export interface UserChangeTimeLogModelResult extends lsModel.BaseModel {
    data: UserChangeTimeLogModel
}

/**
 * 布局列表返回
 */
export interface UserChangeTimeLogListResult extends lsModel.BaseModel {
    data: Array<UserChangeTimeLogModel>
}

/**
 * 布局分页列表返回
 */
export interface UserChangeTimeLogPagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserChangeTimeLogModel>;
    }
}