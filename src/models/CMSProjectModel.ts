import * as lsModel from '@/models/BaseModel';

export interface CMSProjectModel {
    account_token?: string;
    id?: number;
    title?: string;
    dirname?: string;
    logo?: string;
    ico?: string;
    domain?: string;
    powerby?: string;
    keyword?: string;
    description?: string;
    beian?: string;
    content?: string;
    create_staff_id?: number;
    create_time?: string;
    change_staff_id?: number;
    change_time?: string;
    delete_staff_id?: number;
    delete_time?: string;
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
    data: CMSProjectModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<CMSProjectModel>
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
        list: Array<CMSProjectModel>;
    }
}