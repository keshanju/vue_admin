import * as lsModel from '@/models/BaseModel';

/**
 * 活动模型
 */
export interface PackagePriceActivityModel {
    account_token?: string;
    id?: number;
    activity_id?: number;
    price_id?: number;
    short_points?: number;
    short_ref_points?: number;
    create_staff_id?: number;
    create_time?: string;
    change_staff_id?: number;
    change_time?: string;
    is_valid?: number;
    delete_staff_id?: number;
    delete_time?: string;
    start_time?: string;
    end_time?: string;
    max_short_points?:number;//` int(11) DEFAULT '0' COMMENT '最大赠送短期积分',
    max_short_ref_points?:number;//` int(11) DEFAULT '0' COMMENT '最大推荐赠送短期积分',
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
    data: PackagePriceActivityModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<PackagePriceActivityModel>
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
        list: Array<PackagePriceActivityModel>;
    }
}