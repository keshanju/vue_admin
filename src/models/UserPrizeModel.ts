import * as lsModel from '@/models/BaseModel';

/**
 * 模型
 */
export interface UserPrizeModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    activity_id?: number;
    present_id?: number;
    present_type?: number;
    instance_id?: number;
    card_defined_id?: number;
    card_no?: string;
    card_pwd?: string;
    card_secert?: string;
    status?: number;
    phone?: string;
    email?: string;
    address?: string;
    country_code?: string;
    details?: string;
    create_time?: string;
    delivery_time?: string;
    receive_time?: string;
    delivery_staff_id?: number;
    money?: number;
    price_type?: number;
    expire_time?: string;
}


/**
 * 单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: UserPrizeModel
}

/**
 * 列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UserPrizeModel>
}

/**
 * 分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserPrizeModel>;
    }
}