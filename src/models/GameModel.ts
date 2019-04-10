import * as lsModel from '@/models/BaseModel';

/**
 * 游戏模型
 */
export interface GameModel {
  account_token?: string,
  id?: number,// 编号
  title?: string,// 名称
  keywords?: string,// 搜索关键字
  game_info?: string,// 游戏备注
  game_background?: string,// 游戏背景图
  game_background_url?: string,// 游戏背景图
  game_background_large_url?: string,// 游戏大背景图
  game_pic?: string,// 游戏小图标
  game_pic_url?: string,// 游戏小图标
  game_type?: number,// 游戏分类
  game_h1_title?: string,// 游戏标题
  game_ss_rules?: string,// pc规则
  game_ios_rules?: string,// ios规则
  game_android_rules?: string,// 安卓规则
  game_host_rules?: string,// 主机规则
  game_mac_rules?: string,// mac规则
  game_vpn_rules?: string,// vpn规则
  is_support_windows?: number,// 是否支持windows平台
  is_support_ios?: number,// 是否支持iOS平台
  is_support_android?: number,// 是否支持安卓平台
  is_support_mac?: number,// 是否支持mac平台
  is_support_host_game?: number,// 是否支持主机游戏
  create_time?: string,// 创建时间
  change_time?: string,// 修改时间
  create_staff_id?: number,// 创建人员
  change_staff_id?: number,// 修改人员
  is_valid?: number,// 是否有效
  is_config_id?: number,// 是否配置id
  is_hot?: number; // 是否热门
  android_dns_model?:number; //0:伪装(默认) 1:正常
  sort_num?:number,//(xml排序)
  is_free?:number;
  is_hide_bandwidth?:number; // 是否隐藏带宽
  include_region_codes?:string;
  include_region_codes_arr?:number[];
  exclude_region_codes?:string;
  exclude_region_codes_arr?:number[];

  free_include_region_codes?:string;
  free_include_region_codes_arr?:number[];
  free_exclude_region_codes?:string;
  free_exclude_region_codes_arr?:number[];
  /**
   * 国家代码
   */
  country_code?:string;
  is_perset?:number;
  ios_scheme?:number;
  download_game_url?:string;
  ios_app_id?:string;
  mac_app_id?:string;
  is_download_game?:number;
}

/**
 * 游戏单个结果模型
 */
export interface GameSingleResult extends lsModel.BaseModel {
  data: GameModel
}


/**
* 游戏分页结果模型
*/
export interface GameModelPagerResult extends lsModel.BaseModel {
  data: {
      total: number;
      current_page: number;
      per_page: number;
      last_page: number;
      list: Array<GameModel>;
  }
}

/**
* 游戏结果模型
*/
export interface GameModelListResult extends lsModel.BaseModel {
  data: Array<GameModel>
}











/**
 * 游戏列表模型
 */
export interface GameSimpleModel {
  id?: number,// 编号
  title?: string,// 名称
}

/**
 * 游戏列表返回
 */
export interface GameSimpleListResult extends lsModel.BaseModel {
  data: Array<GameSimpleModel>
}