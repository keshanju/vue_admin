import * as lsModel from '@/models/BaseModel';

/**
 * 活动模型
 */
export interface ActivityModel {
    account_token?: string;
    id?: number;
    fee?: number;
    title?: string;
    type?: number;
    plat_type?: number;
    label?: string;
    image?: string;
    summary?: string;
    content?: string;
    prize?: string;
    start_time?: string;
    end_time?: string;
    create_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    change_time?: string;
    hits?:number;
    url_type?:number;
    url?:string;
    seo_keywords?:string;
    seo_desc?:string;
    include_region_codes?:string;
    include_region_codes_arr?:number[];
    exclude_region_codes?:string;
    exclude_region_codes_arr?:number[];
    attend_num_appoint?:number;
    attend_num_randon?:number;
    is_pay_user?:number;
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
    data: ActivityModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<ActivityModel>
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
        list: Array<ActivityModel>;
    }
}