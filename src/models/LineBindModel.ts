import * as lsModel from '@/models/BaseModel';

/**
 * 线路模型
 */
export interface LineBindModel {
    account_token?: string;
    id?: number,
    master_id?: number,
    slave_id?: number,
    key?: string,
    create_time?: string,
    is_del?: number,
}

/**
 * 线路单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 线路模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: LineBindModel
}

/**
 * 线路列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<LineBindModel>
}

/**
 * 线路分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<LineBindModel>;
    }
}