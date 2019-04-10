import * as lsModel from '@/models/BaseModel';

/**
 * 公告模型
 */
export interface NewsModel {
    account_token?: string;
    id?: number;
    title?: string;
    class_type?: number;
    summary?: string;
    content?: string;
    tag?: string;
    hits?: number;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    support_type?: number;
    publish_status?: number;
    publish_time?: string;
    seo_keywords?: string;
    seo_desc?: string;
    image_url?: string;
    label?: string;
    expiry_time?: string;
    include_region_codes?: string;
    include_region_codes_arr?: number[];
    exclude_region_codes?: string;
    exclude_region_codes_arr?: number[];
    is_top?: number;
    is_client_popup?: number;
}

/**
 * 公告标签模型
 */
export interface NewsLabelModel {
    account_token?: string;
    id?: number;
    group?: string;
    label?: string;
    desc?: string;
    label_sort?: number;
}


/**
 * 公告模型返回
 */
export interface NewsModelResult extends lsModel.BaseModel {
    data: NewsLabelModel
}

/**
 * 新闻单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 新闻模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: NewsModel
}

/**
 * 新闻列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<NewsModel>
}

/**
 * 新闻分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page?: number;
        last_page?: number;
        list: Array<NewsModel>;
    }
}