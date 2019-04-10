import * as lsModel from '@/models/BaseModel'

/**
 * 服务器模型
 */
export interface ServerModel {
    account_token?: string
    ids?: number[]
    id?: number
    server?: string
    title?: string
    is_valid?: number
    online_users?: number
    online_max_users?: number
    server_type?: number
    s5_port?: number
    s5_end_port?: number
    create_time?: string
    change_time?: string
    create_staff_id?: number
    change_staff_id?: number
    lan_delay?: number
    lan_loss?: number
    s5_mobile_port?: number
    s5_mobile_end_port?: number
    is_online?: number
    desc?: string
    ikv2_connect_port?: number
    ikv2_transfer_port?: number
    pptp_port?: number
    l2tp_port?: number
    l2tp_secret_key?: string
    is_auto_latitude?: number
    latitude?: string;
    longitude?: string;
    isp?: string;
    match_groups?: string;//服务器组  0~9
    match_groups_arr?: number[];//服务器组  0~9
}

/**
 * 服务器列表模型
 */
export interface ServeListModel {
    id?: number
    title?: string
    server?: string
    s5_port?: number
    s5_mobile_port?: number
}

/**
 * 服务器单个返回
 */
export interface Result extends lsModel.BaseModel { }

/**
 * 服务器模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: ServerModel
}

/**
 * 服务器列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<ServeListModel>
}

/**
 * 服务器分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number
        current_page: number
        per_page: number
        last_page: number
        list: Array<ServerModel>
    }
}
