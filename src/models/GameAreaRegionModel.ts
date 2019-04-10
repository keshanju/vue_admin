import * as lsModel from '@/models/BaseModel';

/**
 * 模型
 */
export interface GameAreaRegionModel {
    account_token?: string,
    id?: number,
    game_id?: number,
    area_id?: number,
    title?: string,
    remark?: string,
    region_code?: number,
    create_time?: string,
    create_staff_id?: number,
    change_time?: string,
    change_staff_id?: number,
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
    data: GameAreaRegionModel
}

/**
 * 列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<GameAreaRegionModel>
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
        list: Array<GameAreaRegionModel>;
    }
}