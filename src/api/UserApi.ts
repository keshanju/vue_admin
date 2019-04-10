import * as laBaseApi from "@/api/BaseApi";
import * as userModel from "@/models/UserModel";
import * as baseModel from "@/models/BaseModel";

/**
 * 用户Api
 */
export class UserApi extends laBaseApi.BaseApi {
  /**
   * 获取会员
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async UserListPager(
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/member?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: userModel.UserPagerResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取用户组简单列表
   */
  public async getList(strWhere: string = "") {
    let url: string = "/staff/group/lists?account_token=" + this.token;
    let result: userModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加会员数据
   * @param postData a=1&b=2
   */
  public async userAdd(postData: string) {
    let url: string = "/staff/member";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑会员数据
   * @param postData
   */
  public async userUpdate(id: number, postData: string) {
    let url: string = "/staff/member/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
   * 后台修改会员密码
   * @param postData
   */
  public async userRePasswd(id: number, postData: string) {
    let url: string = "/staff/member/" + id + "/password";
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
   * 获取会员模型
   * @param id
   */
  public async getUserModel(id: number) {
    let url: string = "/staff/member/" + id + "?account_token=" + this.token;
    let result: userModel.UserSingleResult = await this.httpGet(url);
    return result;
  }

  /**
   * 编辑会员数据
   * @param postData
   */
  public async userUpdatePause(dbNum: number, id: number, postData: object) {
    let url: string = "/staff/member/branch/" + dbNum + "/pause/" + id;
    let result: baseModel.BaseModel = await this.httpPostJson(url, postData);
    return result;
  }

  /**
   * 删除用户
   * http://api.leigod.top/staff/member/{member_id}
   * @param dbNum
   * @param id
   * @param postData
   */
  public async setDelete(id: number, delete_explain: string) {
    let url: string = "/staff/member/" + id;
    let data = `account_token=${this.token}&delete_explain=${delete_explain}`;
    let result: baseModel.BaseModel = await this.httpDelete(url + "?" + data);
    return result;
  }

  /**
   * 获取推荐人 被推荐人关系列表
   * @param member_id 
   * @param refer_member_id 
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async getUserRefListPager(
    member_id:string,
    refer_member_id:string,
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/member/refer?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +`&member_id=${member_id}&refer_member_id=${refer_member_id}`
      strWhere;
    let result: userModel.UserPagerResult = await this.httpGet(url);
    return result;
  } 

  /**
   * 用户操作日志
   * @param member_id 
   * @param db_id 
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async getUserOpLogsListPager(
    member_id:number,
    db_id:string,
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url = `/staff/member/${member_id}/operate/log/${db_id}?account_token=${this.token}&page=${pageIndex}&size=${pageSize}${strWhere}`;
    let result = await this.httpGet(url);
    return result;
  } 
}
