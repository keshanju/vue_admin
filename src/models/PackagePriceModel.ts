import * as lsModel from '@/models/BaseModel';

/**
 * 套餐价格模型
 */
export interface PackagePriceModel{
    account_token?:string;
    id?:number;
    package_id?:number;
    title?:string;
    order_num?:number;
    short_desc?:string;
    desc?:string;
    points?:number;
    ref_points?:number;
    free_add_time?:number;
    price?:number;
    create_time?:string;
    change_time?:string;
    create_staff_id?:number;
    change_staff_id?:number;
    package_version?:string;
    extend_time?:number;
    extend_type?:number;
    type?:number;
    is_recommend?:number;
    short_points?:number;
    short_ref_points?:number;
    apple_commodity_id?:string;
    ref_add_time?:number;
    ref_add_self_time?:number;
    max_ref_add_time?:number;
    max_ref_add_self_time?:number;
    price_type?:number;
    round_times_type?:number;
    // include_region_codes?:string;
    // include_region_codes_arr?:number[];
    // exclude_region_codes?:string;
    // exclude_region_codes_arr?:number[];
}

/**
 * 套餐价格单个返回
 */
export interface Result extends lsModel.BaseModel{

}

/**
 * 套餐价格模型返回
 */
export interface Result extends lsModel.BaseModel{
    data:PackagePriceModel
}

/**
 * 套餐价格列表返回
 */
export interface ListResult extends lsModel.BaseModel{
    data:Array<PackagePriceModel>
}

/**
 * 套餐价格分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel{
    data:{
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<PackagePriceModel>;
    }
}
