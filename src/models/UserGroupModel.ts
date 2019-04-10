import * as lsModel from '@/models/BaseModel';

/**
 * 用户组模型
 */
export interface UserGroupModel {
  account_token?: string,
  id?: number,
  user_type?: number,// 用户类型
  title?: string,// 
  is_reg?: number,// 是否开放注册 0 关闭 1 注册
  desc?: string,// 描述
  staff_id?: number,// 管理Id
  change_time?: string, // 修改时间
  create_time?: string, // 创建时间
  default_vip_level?: number, // 默认用户级别
  default_free_points?: number, // 默认赠送积分
  product_type?:number;
}

/**
 * 单个用户组模型
 */
export interface UserGroupSingleResult extends lsModel.BaseModel {
    data: UserGroupModel
}



/**
 * 用户组分页结果模型
 */
export interface UserGroupPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<UserGroupModel>;
    }
}



//**套餐绑定 */

/**
 * 用户组与套餐关系
 */
export interface GroupPackageModel{
    id?:number;
    group_id?:number;// 分组id
    package_id?:number;
    create_time?: string;
    create_staff_id?: number;
  }
  
  /**
  * 用户组与套餐列表返回
  */
  export interface GroupPackageListResult extends lsModel.BaseModel{
    data:Array<GroupPackageModel>
  }
