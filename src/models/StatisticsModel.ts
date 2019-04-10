import * as lsModel from "@/models/BaseModel";

export interface StatisticsOrderModel {
    id?: number;
    channel_type?: number;
    pay_type?: number;
    product_type?: number;
    dateline?: string;
    invoice_complete_num?: number;
    invoice_num?: number;
    invoice_complete_money?: number;
    create_time?: string;
    src_channel?: string;
    region_code?: number;
    os_type?: number;
    package_id?: number;
    package_name?: string;
}

export interface InvoiceChartModel {
    dateline?: string;
    invoice_complete_money?: number;
    invoice_complete_num?: number;
    invoice_num?: number;
}

export interface InvoiceChartList extends lsModel.BaseModel {
    data: Array<InvoiceChartModel>;
}

export interface StatisticsOrderList extends lsModel.BaseModel {
    data: Array<StatisticsOrderModel>;
}

export interface StatisticsUserModel {
    id?: number;
    user_num?: number;
    pay_user_num?: number;
    dateline?: string;
}

export interface StatisticsUserList extends lsModel.BaseModel {
    data: Array<StatisticsUserModel>;
}

/**
 * 服务器在线人数
 */
export interface ServerOnLineUser {
    id?: number;
    online_users?: number;
    online_users_other?: number;
    bandwidth?: number;
    create_time?: string;
}

export interface StatisticsServerOnLineUser extends lsModel.BaseModel {
    data?: ServerOnLineUser;
}

/**
 * 渠道登录模型
 */
export interface ChannelLoginModel {
    src_channel?: string;
    active_user_num?: number;
    login_num?: number;
    login_type?: number;
}

/**
 * 在线用户模型
 */
export interface StatisticsOnlineUserLogModel {
    id?: number;
    online_users?: number;
    online_users_other?: number;
    bandwidth?: number;
    create_time?: string;
}

/**
 * 加速日志模型
 */
export interface StatisticsSpeedLogModel {
    user_num?: number;
    speed_num?: number;
    os_type?: number;
    region_code?: number;
}

