import * as lsModel from '@/models/BaseModel';

/**
 * 路由地址模型
 */
export interface RoutePathModel {
    account_token?: string;
    id?: number;
    title?: string;
    path?: string;
    type?: number;
    op_type?: number;
    method?: string;
    is_effective?: number;
    change_staff_id?: number;
    create_time?: string;
    change_time?: string;
}


/**
 * 路由地址单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 路由地址模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: RoutePathModel
}

/**
 * 路由地址列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<RoutePathModel>
}

/**
 * 路由地址分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<RoutePathModel>;
    }
}