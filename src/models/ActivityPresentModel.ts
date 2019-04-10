import * as lsModel from '@/models/BaseModel'

export interface ActivityPresentModel {
    account_token?:string;
    id?: number
    activity_id?: number
    type?: number
    title?: string
    ref_id?: number
    money?: number
    price_type?: number
    image?: string
    total_number?: number
    ratio?: number
    desc?: string
    create_staff_id?: number
    create_time?: string
    change_staff_id?: number
    change_time?: string
    is_valid?: number
    delete_staff_id?: number
    delete_time?: string
    is_del?: number,
    present_type?:number;
    fee?:number;
}


/**
 * 单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: ActivityPresentModel
}

/**
 * 列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<ActivityPresentModel>
}

/**
 * 分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<ActivityPresentModel>;
    }
}