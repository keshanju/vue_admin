import * as lsModel from '@/models/BaseModel';

export interface CMSChannelModel{
    account_token?: string;
    id?:number;
    project_id?:number;
    title?:string;
    seo_title?:string;
    keyword?:string;
    description?:string;
    dirname?:string;
    sorts?:number;
    type?:number;
    is_hidden?:number;
    open_mode?:number;
    template_index_path?:string;
    template_info_path?:string;
    create_staff_id?:number;
    create_time?:string;
    change_staff_id?:number;
    change_time?:string;
    delete_staff_id?:number;
    delete_time?:string;
    parent_id?:number;
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
    data: CMSChannelModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<CMSChannelModel>
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
        list: Array<CMSChannelModel>;
    }
}