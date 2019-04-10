import * as lsModel from '@/models/BaseModel';

/**
 * 模型
 */
export interface GameInfoRegionModel {
    account_token?: string,
    id?: number;
    game_id?: number;
    title?: string;
    info?: string;
    keyword?: string;
    region_code?: number;
    create_staff_id?: number;
    create_time?: string;
    change_time?: string;
    change_staff_id?: number;
}


/**
 * 单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: GameInfoRegionModel
}

/**
 * 列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<GameInfoRegionModel>
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
        list: Array<GameInfoRegionModel>;
    }
}