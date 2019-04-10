import * as lsModel from '@/models/BaseModel';

/**
 * 区服模型
 */
export interface AreaModel {
    account_token?: string,
    id?: number,
    game_id?: number,// 游戏Id
    title?: string,// 区服名字
    remark?: string,// 备注
    order_id?: any,// 排序Id
    game_ss_rules?: string,// pc规则
    game_ios_rules?: string,// IOS规则
    game_android_rules?: string,// 安卓规则
    game_host_rules?: string,// 主机规则
    game_mac_rules?: string,// Mac规则
    game_vpn_rules?: string,// 路由规则
    parent_area_id?: number,// 父级区服id
    hint?: string // 玩家提醒
    pic?:string;
    include_region_codes?:string;
    include_region_codes_arr?:number[];
    exclude_region_codes?:string;
    exclude_region_codes_arr?:number[];
    background_game_id?:number;
}

/**
 * 区服与线路关系模型
 */
export interface AreaLineModel {
    id?: number,
    area_id?: number;
    line_id?: number;
}

export interface Result extends lsModel.BaseModel {

}
/**
 * 员工单个区服模型
 */
export interface AreaSingleResult extends lsModel.BaseModel {
    data: AreaModel
}


export interface ListResult extends lsModel.BaseModel {
    data: Array<AreaLineModel>
}

/**
 * 区服分页结果模型
 */
export interface AreaPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<AreaModel>;
    }
}
