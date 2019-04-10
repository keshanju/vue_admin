import * as lsModel from '@/models/BaseModel';

/**
 * 游戏热度模型
 */
export interface GameHotModel {
  account_token?: string,
  id?: number,// 编号
  game_id?: number,
  day_value?: string,
  value?: number
}

/**
 * 游戏热度单个结果模型
 */
export interface GameHotSingleResult extends lsModel.BaseModel {
  data: GameHotModel
}


/**
* 游戏热度分页结果模型
*/
export interface GameHotModelPagerResult extends lsModel.BaseModel {
  data: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    list: Array<GameHotModel>;
  }
}

/**
* 游戏热度结果模型
*/
export interface GameHotModelListResult extends lsModel.BaseModel {
  data: Array<GameHotModel>
}

