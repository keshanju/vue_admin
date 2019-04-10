import * as laBaseApi from '@/api/BaseApi';
import * as userappealModel from '@/models/UserAppealModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 申述Api
 */
export class UserAppealApi extends laBaseApi.BaseApi {
 /**
   * 获取申诉数据
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async UserAppealListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/member/appeal?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: userappealModel.UserAppealPagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加申诉数据
 * @param postData a=1&b=2 
 */
  public async userAppealAdd(postData: string) {
    let url: string = "/staff/member/appeal";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑申诉数据
   * @param postData 
   */
  public async userAppealUpdate(id: number, postData: string) {
    let url: string = "/staff/member/appeal/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取申诉模型
 * @param id 
 */
  public async getUserAppealModel(id: number) {
    let url: string = "/staff/member/appeal/" + id + "?account_token=" + this.token;
    let result: userappealModel.UserAppealSingleResult = await this.httpGet(url);
    return result;
  }
}