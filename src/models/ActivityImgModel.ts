import * as lsModel from '@/models/BaseModel';

/**
 * 活动图片列表
 */
export interface ActivityImgModel{
    account_token?: string;
    id?:number;//` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动图片ID',
    activity_id?:number;//` int(11) NOT NULL COMMENT '活动ID',
    key?:number;//` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片key',
    img_url?:string;//` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片url',
    create_time?:string;//` datetime NOT NULL COMMENT '创建时间',
    create_staff_id?:number;//` int(11) NOT NULL COMMENT '创建员工id',
    change_time?:string;//` datetime DEFAULT NULL COMMENT '修改时间',
    change_staff_id?:string;//?:number;//` int(11) NOT NULL DEFAULT '0' COMMENT '修改员工id',
    delete_time?:string;//` datetime DEFAULT NULL COMMENT '删除时间',
    delete_staff_id?:number;//` int(11) NOT NULL DEFAULT '0' COMMENT '删除员工',
}


/**
 * 单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 布局模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: ActivityImgModel
}

/**
 * 列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<ActivityImgModel>
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
        list: Array<ActivityImgModel>;
    }
}