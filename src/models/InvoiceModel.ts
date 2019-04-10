import * as lsModel from '@/models/BaseModel';

/**
 * 订单模型
 */
export interface InvoiceModel {
    account_token?: string,
    id?: number;
    user_id?: number;
    oem_type?: number;
    agent_id?: number;
    invoice_type?: number;
    status?: number;
    cancel_desc?: string;
    process_time?: string;
    invoice_no?: string;
    lcid?: string;
    num?: number;
    card_type?: number;
    package_id?: number;
    package_version?: string;
    payment_type?: number;
    paycard_id?: string;
    create_time?: string;
    process_type?: number;
    process_staff_id?: number;
    transaction_no?: string;
    transaction_time?: string;
    transaction_status?: number;
    transaction_desc?: string;
    money_type?: number;
    money?: number;
    price_id?: number;
}


/**
 *订单单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 订单模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: InvoiceModel
}

/**
 *订单列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<InvoiceModel>
}

/**
 * 订单分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<InvoiceModel>;
    }
}