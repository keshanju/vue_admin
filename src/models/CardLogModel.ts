import * as lsModel from '@/models/BaseModel';

/**
 * 充值卡日志模型
 */
export interface CardLogModel {
    account_token?: string,
    id?: number,
    card_define_id?: number,//卡定义id
    batch_no?: number,// 批次号
    card_count?: number,// 生成卡数量
    create_time?: string,// 创建时间
    create_staff_id?: number,// 创建人id
    card_no_prefix?: string,// 卡号前缀
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
    data: CardLogModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<CardLogModel>
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
        list: Array<CardLogModel>;
    }
}