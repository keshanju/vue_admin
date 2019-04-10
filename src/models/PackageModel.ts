import * as lsModel from '@/models/BaseModel';

/**
 * 套餐模型
 */
export interface PackageModel {
    account_token?: string;
    id?: number,
    /**
     * 套餐名称
     */
    title?: string,
    /**
     * 套餐编号
     */
    package_no?: string,
    /**
     * 套餐是否有效, 0：无效，1：有效，默认：0
     */
    is_valid?: number,
    /**
     * 方式
     */
    billing_type?: number,
    /**
     * 价格类型，1：人民币：2：美元
     */
    price_type?: number,
    /**
     * 排序位置，默认999
     */
    order_position?: number,
    /**
     * 短备注
     */
    short_desc?: string,
    /**
     * 备注
     */
    desc?: string,
    /**
     * 短期活动积分, 默认：0
     */
    short_points?: number,
    /**
     * 短期推荐人积分, 默认：0
     */
    short_ref_points?: number,
    /**
     * 活动ID, 默认：0
     */
    short_activity_id?: number;
    /**
     * 是否允许用户自定义连接数,0：不允许，1：允许， 默认：0
     */
    is_order_connects?: number;
    /**
     * 最大连接数
     */
    total_max_connects?: number;
    /**
     * PC连接数
     */
    pc_max_connects?: number;
    /**
     * 手机连接数
     */
    mobile_max_connects?: number;
    /**
     * 上传速度 0 不限制，默认：0
     */
    up_speed_rate?: number;
    /**
     * 下载速度 0 不限制，默认：0
     */
    down_speed_rate?: number;
    /**
     * 赠送分钟数，默认：0
     */
    free_add_time?: number;
    /**
     * 是否拥有全部线路，0：否，1：是，默认：0
     */
    is_own_all_lines?: number;
    /**
     * 是否拥有全部游戏，0：否，1：是，默认：0
     */
    is_own_all_games?: number;
    /**
     * 版本号
     */
    package_version_no?: string;
    /**
     * 允许全额退款天数，默认：0
     */
    package_refund_allow_days?: number;
    /**
     * 手续费,默认：0
     */
    gateway_fee?: number;
    /**
     * 是否启用时长有效,0：否，1：是 默认：0
     */
    is_duration_valid?: number;
    /**
     * 是否配置id,0：否，1：是 默认：0
     */
    is_config_id?: number;
    create_staff_id?: number,
    create_staff_name?: string,
    change_staff_id?: number,
    change_staff_name?: string;
    /**
     * 套餐唯一编号
     */
    package_level?: number;
    include_region_codes?: string;
    include_region_codes_arr?: number[];
    exclude_region_codes?: string;
    exclude_region_codes_arr?: number[];
}

/**
 * 套餐单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 套餐模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: PackageModel
}

/**
 * 套餐列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<PackageModel>
}

/**
 * 套餐分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<PackageModel>;
    }
}

//**线路 */

/**
 * 套餐与线路关系
 */
export interface PackageLineModel {
    id?: number;
    package_id?: number;
    line_id?: number;
}

/**
 * 套餐与线路列表返回
 */
export interface PackageLinesListResult extends lsModel.BaseModel {
    data: Array<PackageLineModel>
}



//**游戏 */

/**
 * 套餐与游戏关系
 */
export interface PackageGameModel {
    id?: number;
    package_id?: number;
    game_id?: number;
}

/**
 * 套餐与游戏列表返回
 */
export interface PackageGameListResult extends lsModel.BaseModel {
    data: Array<PackageGameModel>
}

//**充值卡 */

/**
 * 套餐与充值卡关系
 */
export interface PackageCardModel {
    id?: number;
    package_id?: number;
    card_define_id?: number;
}

/**
 * 套餐与游戏列表返回
 */
export interface PackageCardListResult extends lsModel.BaseModel {
    data: Array<PackageCardModel>
}

