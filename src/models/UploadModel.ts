import * as lsModel from '@/models/BaseModel';

/**
 * 上传模型
 */
export interface UploadModel {
    account_token?: string;
    file_path?:string;
    url?:string;
}


/**
 * 上传单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 上传模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: UploadModel
}

/**
 * 上传列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UploadModel>
}

/**
 * 上传分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UploadModel>;
    }
}