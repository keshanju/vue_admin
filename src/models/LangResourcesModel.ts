import * as lsModel from '@/models/BaseModel';

/**
 * 模型
 */
export interface LangResourcesModel {
    account_token?: string,
    id?: number;
    pid?: number;
    title?: string;
    type?: number;
    lang?: string;
    create_staff_id?: number;
    create_time?: string;
    change_staff_id?: number;
    change_time?: string;
    delete_staff_id?: number;
    delete_time?: string;
}


/**
 *单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: LangResourcesModel
}

/**
 *列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<LangResourcesModel>
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
        list: Array<LangResourcesModel>;
    }
}