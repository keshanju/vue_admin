import * as laBaseApi from '@/api/BaseApi';
import * as userpauselogModel from '@/models/UserPauseLogModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户暂停Api
 */
export class UserPauseLogApi extends laBaseApi.BaseApi {
 /**
   * 获取暂停日志数据
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  // public async UserPauseLogListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
  //   let url: string = "/staff/appeal?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
  //   let result: userpauselogModel.UserPauseLogPagerResult = await this.httpGet(url);
  //   return result;
  // }
  public async UserPauseLogListPager(dbNum: string = "001", strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/member/branch/" + dbNum + "/pause_logs?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: userpauselogModel.UserPauseLogPagerResult = await this.httpGet(url);
    return result;
}

  /**
 * 添加暂停日志数据
 * @param postData a=1&b=2 
 */
  public async userPauseLogAdd(postData: string) {
    let url: string = "/staff/appeal";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑暂停日志数据
   * @param postData 
   */
  public async userPauseLogUpdate(id: number, postData: string) {
    let url: string = "/staff/appeal/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取暂停日志模型
 * @param id 
 */
  public async getUserPauseLogModel(id: number) {
    let url: string = "/staff/appeal/" + id + "?account_token=" + this.token;
    let result: userpauselogModel.UserPauseLogSingleResult = await this.httpGet(url);
    return result;
  }
}