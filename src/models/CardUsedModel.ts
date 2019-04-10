import * as lsModel from '@/models/BaseModel';

/**
 * 已使用卡模型
 */
export interface CardUsedModel {
    account_token?: string,
    id?: number,
    user_id?: number,// 使用者id
    card_no?: number,//卡号
    password?: number,// 卡密
    checkcode?: number,// 校验码
    minutes?: string,// 分钟数
    create_time?: number,// 创建时间
    card_define_id?: string,// 卡定义id
    create_staff_id?: string,// 创建员工id
    batch_no?: string,// 批次号
    card_prefix?: string,// 卡前缀
    expired_time?: string,// 超期时间
    charge_time?: string,// 充值时间
    charge_source?: string,// 充值来源
    source_ref?: string,// 充值相关的流水id
    price?: string,// 价格
    price_type?: string,// 价格类型
}


/**
 * 已使用卡单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 已使用卡模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: CardUsedModel
}

/**
 * 已使用卡列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<CardUsedModel>
}

/**
 * 已使用卡分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<CardUsedModel>;
    }
}