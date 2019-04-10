import * as lsModel from '@/models/BaseModel';

/**
 * 布局模型
 */
export interface LayoutModel {
    account_token?: string;
    id?: number;
    content?: string;
    create_time?:string;
    change_time?:string;
    create_staff_id?:number;
    change_staff_id?:number;
    layout_code?:string;
    desc?:string;
    is_enable?:number;
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
    data: LayoutModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<LayoutModel>
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
        list: Array<LayoutModel>;
    }
}