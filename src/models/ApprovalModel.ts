import * as lsModel from '@/models/BaseModel';

/**
 * 申述模型
 */
export interface ApprovalModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    db_num?: number;
    refund_id?: number;
    state?: number;//'审核状态 0：待审核 1：初步审核通过 -1：初步审核不通过 2：确认审核通过 -2 确认审核不通过 3：已经退款',
    first_approval_desc?: string;//'初步审核备注',
    first_approval_staff_id?: number;//'初步审核人ID',
    first_approval_time?: string;//'初步确认时间',
    confirm_approval_desc?: string;//'确认审核备注',
    confirm_approval_staff_id?: number;//确认审核人ID',
    confirm_approval_time?: string;//'确认审核人时间',
    refund_desc?: string;//'退款备注',
    refund_staff_id?: number;//'退款人ID',
    refund_time?: string;//'退款时间',
    create_time?: string;//'记录创建时间',
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
    data: ApprovalModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<ApprovalModel>
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
        list: Array<ApprovalModel>;
    }
}


/**
 * 退款信息模型
 */
export interface RefundInfoModel {
    id?: number;
    account_token?: string;
    refund_explain?: string[];
    refund_money?: string;
    price_type?: number;
    member_id?: number;
    refund_reason?: string;
    first_approval_desc?: string;
}

/**
 * 退款信息模型返回
 */
export interface RefundInfoModelResult extends lsModel.BaseModel {
    data: RefundInfoModel
}