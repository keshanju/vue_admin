import * as laBaseApi from "@/api/BaseApi";
import * as userpointlogModel from "@/models/UserPointLogModel";
import * as baseModel from "@/models/BaseModel";

/**
 * 用户积分消耗日志
 */

export class UserPointLogApi extends laBaseApi.BaseApi {
  /**
   * 获取积分日志数据
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async UserPointLogListPager(
    user_id:number,
    dbNum: string = "001",
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url = `/staff/member/${user_id}/points/logs?account_token=${this.token}&database_num=${dbNum}&page=${pageIndex}&size=${pageSize}${strWhere}`;
    let result: userpointlogModel.UserPointLogPagerResult = await this.httpGet(
      url
    );
    return result;
  }
  /**
   * 添加积分日志数据
   * @param postData a=1&b=2
   */
  public async userPointLogAdd(postData: string) {
    let url: string = "/staff/session";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑积分日志数据
   * @param postData
   */
  public async userPointLogUpdate(id: number, postData: string) {
    let url: string = "/staff/session/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
   * 获取积分日志模型
   * @param id
   */
  public async getUserPointLogModel(id: number) {
    let url: string = "/staff/appeal/" + id + "?account_token=" + this.token;
    let result: userpointlogModel.UserPointLogSingleResult = await this.httpGet(
      url
    );
    return result;
  }
}
