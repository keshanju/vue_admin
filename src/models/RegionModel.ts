import * as lsModel from '@/models/BaseModel';

/**
 * 区域模型
 */
export interface RegionModel {
    account_token?: string;
    id?: number;
    title?: string;
    short?: string;
    longitude?: string;
    latitude?: string;
}


/**
 * 区域单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 区域模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: RegionModel
}

/**
 * 区域列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<RegionModel>
}

/**
 * 区域分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<RegionModel>;
    }
}