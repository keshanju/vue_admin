import * as lsModel from '@/models/BaseModel';

/**
 * 黑名单模型
 */
export interface DomainBlackModel {
    account_token?: string,
    id?: number;
    domain?: string;
    create_time?: string;
    create_staff_id?: number;
    change_time?: string;
    change_staff_id?: number;
}


/**
 * 黑名单单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 黑名单模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: DomainBlackModel
}

/**
 *黑名单列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<DomainBlackModel>
}

/**
 * 黑名单分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<DomainBlackModel>;
    }
}