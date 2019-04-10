import * as lsModel from '@/models/BaseModel';

/**
 * 游戏日志模型
 */
export interface GameLogModel {
    account_token?: string;
    id?: number;
    title?: string;
    keywords?: string;
    game_info?: string;
    game_background?: string;
    game_pic?: string;
    game_type?: number;
    game_h1_title?: string;
    game_ss_rules?: string;
    game_ios_rules?: string;
    game_host_rules?: string;
    game_mac_rules?: string;
    game_vpn_rules?: string;
    game_android_rules?: string;
    is_support_windows?: number;
    is_support_mac?: number;
    is_support_android?: number;
    is_support_ios?: number;
    is_support_host_game?: number;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    is_valid?: number;
    is_config_id?: number;
    is_hot?: number;
    client_launch_config?: string;
}


/**
 * 布局单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 布局模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: GameLogModel
}

/**
 * 布局列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<GameLogModel>
}

/**
 * 布局分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<GameLogModel>;
    }
}