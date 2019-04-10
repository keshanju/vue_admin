import * as laBaseApi from "@/api/BaseApi";
import * as gamehotModel from "@/models/GameHotModel";
import * as baseModel from "@/models/BaseModel";

/**
 * 热门游戏
 */
export class GameHotApi extends laBaseApi.BaseApi {
  /**
   * 获取游戏热度
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async gamehotListPager(
    start_time: string,
    end_time: string,
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string = `/staff/statistics?account_token=${
      this.token
    }&size=${pageSize}&page=${pageIndex}&start_time=${start_time}&end_time=${end_time}${strWhere}`;
    let result: gamehotModel.GameHotModelPagerResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取游戏热度模型
   * @param id
   */
  public async getGameHotModel(id: number) {
    let url: string =
      "/staff/statistics/" + id + "?account_token=" + this.token;
    let result: gamehotModel.GameHotSingleResult = await this.httpGet(url);
    return result;
  }
}
