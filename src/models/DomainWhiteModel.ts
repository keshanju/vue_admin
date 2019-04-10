import * as lsModel from '@/models/BaseModel';

/**
 * 白名单模型
 */
export interface DomainWhiteModel {
    account_token?: string;
    id?: number;
    domain?:string;
    game_id?: number;
    game_title?: string;
    create_time?:string;
    change_time?:string;
    create_staff_id?:number;
    change_staff_id?:number;
    create_staff_name?:string;
    change_staff_name?:string;
    title?:string;
    composer?:number;
}


/**
 * 白名单单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 白名单模型返回
 */
export interface ModelResult
 extends lsModel.BaseModel {
    data: DomainWhiteModel
}

/**
 * 白名单列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<DomainWhiteModel>
}

/**
 * 白名单分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<DomainWhiteModel>;
    }
}