import * as lsModel from '@/models/BaseModel';

/**
 * 线路布局日志模型
 */
export interface LayoutLogModel {
    account_token?: string;
    id?: number;
    content?: string;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    layout_code?: string;
    desc?: string;
}


/**
 * 线路布局日志单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 线路布局日志模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: LayoutLogModel
}

/**
 * 线路布局日志列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<LayoutLogModel>
}

/**
 * 线路布局日志分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<LayoutLogModel>;
    }
}