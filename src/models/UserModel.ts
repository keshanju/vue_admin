import * as lsModel from '@/models/BaseModel';

/**
 * 会员模型
 */
export interface UserModel {
  account_token?: string,
  id?: number,
  user_name?: string,// 账号
  password?: string,// 密码
  sequence_num?: number,// 序列号 用户序列号,从0开始递增
  nickname?: string,// 昵称
  mobile_contact_type?: number,// 即时通讯联系类型
  mobile_contact_number?: number,// 联系号码
  mail?: string,// 邮件
  mobile_num?: string,// 手机号
  address?: string,// 地址
  group_id?: number,// 用户组
  package_id?: number,// 套餐ID 用户所选套餐
  public_ip?: string,// 注册IP
  status?: number,// 状态 0正常 1 无效 2 锁定
  stoped_remaining?: number,// 是否提醒 0提醒 1关闭
  user_level?: number,// 用户等级 充值总
  ver_from?: number,// 验证来源 字典
  oem_type?: number,// OEMID 渠道来源
  recommend_userid?: number,// 推荐用户
  user_from?: number,// 用户来源 字典关联
  sex?: number,// 性别 1:男 2:女 0:未设置 默认：0
  locked_ip?: string,// 锁定IP
  wan_ip?: number,// 外网IP 子表
  change_time?: string,// 修改时间
  last_login_time?: string,// 最后登录时间
  country_id?: number,// 国家
  province_id?: number,// 省份
  city_id?: number,// 城市
  county_id?: number,// 县区
  lang_id?: number,// 语言
  postcode?: string,// 邮编
  package_order_connects?: number,// 订阅连接数
  create_time?: string, // 创建时间
  ver_type?: number,// 验证类型 0:不用验证 1:手机 2:邮箱
//   left_time_type?: number,// 剩余时间类型
  expired_time?: string,// 到期时间
  left_minutes?: number,// 剩余分钟数
  user_earn_minutes?: number,// 用户赢取分钟数
  last_pause_time?: string,// 最新暂停时间
  pause_status?: number, // 暂停状态 0:未暂停 1:暂停中
  database_num?: number,// 分库编号
  admin_password?: string,// 管理员密码
  vip_level?: number, // 会员级别 0:超级会员
  user_url?: string,// 用户头像
  random_key?: string,// 随机Key
  is_duration_valid?: number,// 是否时长有效
  duration_time?: string,// 时长时间
  new_password?: string,// 新密码
  new_password_confirmation?:string;
  search_type?:number;
  search_title?:string;
  master_account?:number;
}

export interface Result extends lsModel.BaseModel {
   
}

/**
 * 单个会员模型
 */
export interface UserSingleResult extends lsModel.BaseModel {
    data: UserModel
}

/**
 * 会员结果模型
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<UserModel>
}

/**
 * 会员分页结果模型
 */
export interface UserPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserModel>;
    }
}
