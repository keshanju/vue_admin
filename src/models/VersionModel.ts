import * as lsModel from '@/models/BaseModel';

/**
 * 版本模型
 */
export interface VersionModel {
    account_token?:string;
    id?: number;
    buildnum?: string;
    gamelib_version?: string;
    upgrade_remark?: string;
    min_upgrade_app_version?: string;
    not_upgrade_fail_url?: string;
    app_version?: string;
    base_remote_url?: string;
    create_time?: string;
    app_platform_type?: number;
    is_enterprise?:number;
}


/**
 * 版本单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 版本模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: VersionModel
}

/**
 *版本列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<VersionModel>
}

/**
 * 版本分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<VersionModel>;
    }
}