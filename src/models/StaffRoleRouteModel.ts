import * as lsModel from '@/models/BaseModel';

/**
 * 线路布局日志模型
 */
export interface StatffRoleRouteModel {
    account_token?: string;
    staff_role_id?: number;
    api_route_id?: number;
    create_time?: string;
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
    data: StatffRoleRouteModel
}

/**
 * 线路布局日志列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<StatffRoleRouteModel>
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
        list: Array<StatffRoleRouteModel>;
    }
}