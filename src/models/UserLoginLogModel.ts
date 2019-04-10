import * as lsModel from '@/models/BaseModel';

export interface UserLoginLogModel {
    account_token?: string,
    id?: number;//` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    user_id?: number;//` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID',
    login_ip?: string;//` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '登录IP',
    login_time?: string;//` datetime NOT NULL COMMENT '登录时间',
    login_type?: number;//` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录类型，0：官网：1：客户端',
    login_account_type?: number;//` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录账号类型，0：手机号，1：邮箱，2：账号，3：微信，4：QQ，5：新浪微博，6：谷歌，7：fecebook',
    login_country_code?: number;//` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '登录区域编码',
    login_country_iso_code?: string;//` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '登录国家iso代码',
}


/**
 * 布局单个返回
 */
export interface UserLoginLogResult extends lsModel.BaseModel {

}

/**
 * 布局模型返回
 */
export interface UserLoginLogModelResult extends lsModel.BaseModel {
    data: UserLoginLogModel
}

/**
 * 布局列表返回
 */
export interface UserLoginLogListResult extends lsModel.BaseModel {
    data: Array<UserLoginLogModel>
}

/**
 * 布局分页列表返回
 */
export interface UserLoginLogPagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserLoginLogModel>;
    }
}