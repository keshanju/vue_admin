import * as lsModel from '@/models/BaseModel';

/**
 * 版本模型
 */
export interface UserVipLevelModel {
    account_token?: string;
    id?: number;
    title?: string;
    integral?: number;
    create_time?: string;
    create_staff_id?: number;
    change_time?: string;
    change_staff_id?: number;
    delete_time?: string;
    delete_staff_id?: number;
}


/**
 * 版本单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 版本模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: UserVipLevelModel
}

/**
 *版本列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UserVipLevelModel>
}

/**
 * 版本分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserVipLevelModel>;
    }
}