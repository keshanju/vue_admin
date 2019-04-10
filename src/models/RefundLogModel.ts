import * as lsModel from '@/models/BaseModel';

/**
 * 退款记录模型
 */
export interface RefundLogModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    invoice_id?: number;
    create_time?: string;
    refund_fee?: number;
    refund_source?: string;
    refund_status?: number;
    staff_id?: number;
    refund_reason?: string;
}


/**
 * 订单退款记录单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 订单退款记录模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: RefundLogModel
}

/**
 * 订单退款记录列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<RefundLogModel>
}

/**
 * 订单退款记录分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<RefundLogModel>;
    }
}