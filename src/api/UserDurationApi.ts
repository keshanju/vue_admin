import * as laBaseApi from "@/api/BaseApi";
import * as userdurationModel from "@/models/UserDurationModel";
import * as baseModel from "@/models/BaseModel";

/**
 * 用户时长Api
 */
export class UserDurationApi extends laBaseApi.BaseApi {
  /**
   * 获取用户时长数据
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async UserDurationListPager(
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/member/appeal?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: userdurationModel.UserDurationPagerResult = await this.httpGet(
      url
    );
    return result;
  }

  /**
   * 添加用户时长数据
   * @param postData a=1&b=2
   */
  public async userDurationAdd(postData: string) {
    let url: string = "/staff/appeal";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑用户时长数据
   * @param postData
   */
  public async userDurationUpdate(id: number, postData: string) {
    let url: string = "/staff/member/" + id + "/duration";
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
   * 获取用户时长模型
   * @param id
   */
  public async getUserDurationModel(id: number) {
    let url: string = "/staff/member/" + id + "?account_token=" + this.token;
    let result: userdurationModel.UserDurationSingleResult = await this.httpGet(
      url
    );
    return result;
  }

  /**
   * 设置用户时长
   */
  public async setUserDurationEdit(
    member_id: number,
    reduce_time: string,
    invoice_money: string
  ) {
    let url = `/staff/member/time/${member_id}`;
    let postArgs = `account_token=${
      this.token
    }&reduce_time=${reduce_time}&invoice_money=${invoice_money}`;
    let result: baseModel.BaseResult2 = await this.httpPut(url, postArgs);
    return result;
  }
}
