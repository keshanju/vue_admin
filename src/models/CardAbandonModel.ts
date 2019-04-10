import * as lsModel from '@/models/BaseModel';

/**
 * 废弃卡模型
 */
export interface CardAbandonModel {
    account_token?: string,
    id?: number,
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
    abandon_time?: string,// 废弃时间
    abandon_staff_id?: string,// 废弃员工
    abandon_reason?: string,// 废弃原因
    price?: string,// 价格
    price_type?: string,// 价格类型
}


/**
 * 废弃卡单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 废弃卡模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: CardAbandonModel
}

/**
 * 布废弃卡列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<CardAbandonModel>
}

/**
 * 废弃卡分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<CardAbandonModel>;
    }
}