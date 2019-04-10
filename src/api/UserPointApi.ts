import * as laBaseApi from '@/api/BaseApi';
import * as userpointModel from '@/models/UserPointModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户积分Api
 */
export class UserPointApi extends laBaseApi.BaseApi {
 /**
   * 获取用户积分数据
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async UserPointListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/appeal?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: userpointModel.UserPointPagerResult = await this.httpGet(url);
    return result;
  }


  /**
 * 获取用户积分模型
 * @param id 
 */
  public async getUserPointModel(id: number) {
    let url: string = "/staff/appeal/" + id + "?account_token=" + this.token;
    let result: userpointModel.UserPointSingleResult = await this.httpGet(url);
    return result;
  }
}