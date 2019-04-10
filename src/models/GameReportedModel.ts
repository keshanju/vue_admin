import * as lsModel from '@/models/BaseModel';

/**
 * 布局模型
 */
export interface GameReportedModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    title?: string;
    contact?: string;
    create_time?: string;
    status?: number;
    staff_id?: number;
    update_time?: string;
    desc?: string;
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
    data: GameReportedModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<GameReportedModel>
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
        list: Array<GameReportedModel>;
    }
}