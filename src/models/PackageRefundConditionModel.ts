import * as lsModel from '@/models/BaseModel';

/**
 * 套餐退款条件模型
 */
export interface PackageRefundConditionModel {
    account_token?: string;
    id?: number;
    package_id?: number;
    days?: number;
    price?: number;
    label?: string;
}


/**
 * 套餐退款条件单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 套餐退款条件模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: PackageRefundConditionModel
}

/**
 * 套餐退款条件列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<PackageRefundConditionModel>
}

/**
 * 套餐退款条件分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<PackageRefundConditionModel>;
    }
}