import * as lsModel from '@/models/BaseModel';

/**
 * 用户短期活动积分模型
 */
export interface UserPointsShortModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    points?: number;
    activity_id?: number;
    expiry_time ?: string;
    create_time ?: string;
    update_time ?: string;
    staff_operate_desc ?: string;
    database_num ?: string;
}


/**
 * 布局单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 布局模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: UserPointsShortModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UserPointsShortModel>
}

/**
 * 布局分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPointsShortModel>;
    }
}