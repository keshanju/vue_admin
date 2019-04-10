import * as laBaseApi from '@/api/BaseApi';
import * as usersessionModel from '@/models/UserSessionModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户事务Api
 */
export class UserSessionApi extends laBaseApi.BaseApi {
  /**
    * 获取事务
    * @param strWhere 
    * @param pageSize 
    * @param pageIndex 
    */
  public async UserSessionListPager(db_num: string="1", strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/member/session?database_num=" + db_num + "&account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: usersessionModel.UserSessionPagerListResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加事务数据
 * @param postData a=1&b=2 
 */
  public async userSessionAdd(postData: string) {
    let url: string = "/staff/member/session";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑事务数据
   * @param postData 
   */
  public async userSessionUpdate(id: number, postData: string) {
    let url: string = "/staff/member/session/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取事务模型
 * @param id 
 */
  public async getUserSessionModel(id: number) {
    let url: string = "/staff/member/session/" + id + "?account_token=" + this.token;
    let result: usersessionModel.UserSessionModelResult = await this.httpGet(url);
    return result;
  }


    /**
   * 用户事务强制下线
   * @param postData 
   */
  public async userSessionUpdateForce(id: number, postData: object) {
    let url: string = "/staff/member/session/down";
    let result: baseModel.BaseModel = await this.httpPostJson(url, postData);
    return result;
  }
}