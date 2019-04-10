import * as laBaseApi from '@/api/BaseApi';
import * as userwanipModel from '@/models/UserWanipModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户外网Api
 */
export class UserWanipApi extends laBaseApi.BaseApi {
  /**
    * 获取数据
    * @param strWhere 
    * @param pageSize 
    * @param pageIndex 
    */
  public async getUserWanipListPager(id: number) {
    let url: string = "/staff/member/" + id + "/wanip?account_token=" + this.token;
    let result: userwanipModel.UserWanipSingleResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加数据
 * @param postData a=1&b=2 
 */
  public async userWanipAdd(wanipid: number, postData: string) {
    let url: string = "/staff/member/" + wanipid + "/wanip";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑数据
   * @param postData 
   */
  public async userWanipUpdate(wanipid: number, id: number, postData: string) {
    let url: string = "/staff/member/" + wanipid + "/wanip/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

    /**
   * 删除数据
   * @param postData 
   */
  public async userWanipDelete(wanipid: number, id: number) {
    let url: string = "/staff/member/" + wanipid + "/wanip/"+ id + "?account_token=" + this.token;
    let result: baseModel.BaseModel = await this.httpDelete(url);
    return result;
  }

  /**
 * 获取模型
 * @param memeberId 
 */
  public async getUserWanipModel(memeberId: number, wanipid: number) {
    let url = "/staff/member/" + memeberId + "/wanip/" + wanipid;
    let data = "account_token=" + this.token;
    let result: userwanipModel.UserWanipSingleResult = await this.httpGet(url + "?" + data);
    return result;
  }
}