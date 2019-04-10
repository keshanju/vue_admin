import * as lsModel from '@/models/BaseModel';

/**
 * 布局模型
 */
export interface DiscountModel {
    account_token?: string;
    id?: number;
    title?: string;
    code?: string;
    type?: number;
    value?: number;
    is_enable_expired_time?: number;
    begin_time?: string;
    end_time?: string;
    is_enable?: number;
    desc?: string;
    create_staff_id?: number;
    create_time?: string;
    change_staff_id?: number;
    change_time?: string;
    delete_staff_id?: number;
    delete_time?: string;
    package_id?:number;
    discount_id?:number;
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
    data: DiscountModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<DiscountModel>
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
        list: Array<DiscountModel>;
    }
}