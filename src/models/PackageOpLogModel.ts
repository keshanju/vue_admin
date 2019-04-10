import * as lsModel from '@/models/BaseModel';

/**
 * 套餐操作日志模型
 */
export interface PackageOpLogModel {
    account_token?: string;
    package_id?: number;
    package_no?: string;
    package_title?: string;
    package_is_valid?: number;
    package_billing_type?: number;
    package_price_type?: number;
    package_order_position?: number;
    package_short_desc?: string;
    package_desc?: string;
    package_create_staff_id?: number;
    package_change_staff_id?: number;
    package_short_points?: number;
    package_short_ref_points?: number;
    package_short_activity_id?: number;
    package_is_order_connects?: number
    package_total_max_connects?: number
    package_pc_max_connects?: number;
    package_mobile_max_connects?: number;
    package_up_speed_rate?: number;
    package_down_speed_rate?: number;
    package_change_time?: string;
    package_create_time?: string;
    package_is_own_all_lines?: number;
    package_is_own_all_games?: number;
    package_refund_allow_days?: number;
    package_gateway_fee?: number;
    package_version?: string;
    package_price_id?: number
    package_price_title?: string;
    package_price_order_num?: number
    package_price_short_desc?: string;
    package_price_desc?: string,
    package_price_points?: number;
    package_price_ref_points?: number;
    package_price_free_add_time?: number;
    package_price_price?: number;
    package_price_create_time?: string;
    package_price_change_time?: string;
    package_price_create_staff_id?: number;
    package_price_change_staff_id?: number;
    package_price_version?: string;
    package_price_extend_time?: number;
    package_price_extend_type?: number
    paacage_price_is_sale?: number
    create_time?: string;
}


/**
 * 套餐操作日志单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 套餐操作日志模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: PackageOpLogModel
}

/**
 * 套餐操作日志列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<PackageOpLogModel>
}

/**
 * 套餐操作日志分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<PackageOpLogModel>;
    }
}