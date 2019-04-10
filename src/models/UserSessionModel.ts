import * as lsModel from '@/models/BaseModel';

/**
 * 用户事务模型
 */
export interface UserSessionModel {
  account_token?: string,
  id?: number,
  session_no?: number,// 事务编号
  user_id?: number,//用户
  server_id?: number,// 服务器
  hardware_id?: number,// 硬件id
  user_login_sequence?: string,// 用户登录序列
  login_time?: string, // 最后登录
  lan_ip?: string, // 私网ip
  wan_ip?: string, // 公网ip
  rad_session?: string, // vpn控制表
  recv_bytes?: number, // 接收
  send_bytes?: number, // 发送
  line_id?: number, // 线路id
  node_id?: number, // 节点Id
  create_time?: string, // 创建时间
  heart_beat_time?: string, // 心跳时间
  logout_type?: number, // 强制退出类型
  is_logout?: number, // 是否强制退出
  force_logout_reason?: string, // 强制退出原因
  force_logout_time?: string, // 强制退出时间
  login_device_type?: number, // 登录设备类型
  game_id?: number, // 游戏id
  client_version?: string, // 客户端版本号
  os_type?: number, // 操作系统类型 windows android ios 字典
  device_info?: string, // 设备信息
  os_version?: string, // 操作系统版本
  auth_type?: number, // 认证类型
  logout_time?: string, // 退出时间
  expire_time?: string, // 到期时间
  dns?: string, // dns
  compatible_mode?: number, // 兼容模式
  current_signal?: string, // 当前信号
  packet_loss_rate?: string, // 丢包率
}




/**
 * 事务单个返回
 */
export interface UserSessionResult extends lsModel.BaseModel {

}

/**
 * 事务模型返回
 */
export interface UserSessionModelResult extends lsModel.BaseModel {
    data: UserSessionModel
}

/**
 * 事务列表返回
 */
export interface UserSessionListResult extends lsModel.BaseModel {
    data: Array<UserSessionModel>
}

/**
 * 事务分页列表返回
 */
export interface UserSessionPagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserSessionModel>;
    }
}
