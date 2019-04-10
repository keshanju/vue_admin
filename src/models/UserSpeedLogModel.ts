import * as lsModel from '@/models/BaseModel';

/**
 * 用户加速日志模型
 */
export interface UserSpeedLogModel {
    account_token?: string;
    id?: number;
    user_id?: number;
    game_id?: number;
    start_time?: string;
    end_time?: string;
    speed_status?: number;
    line_id?: number;
    node_id?: number;
    server_id?: number;
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
    data: UserSpeedLogModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UserSpeedLogModel>
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
        list: Array<UserSpeedLogModel>;
    }
}