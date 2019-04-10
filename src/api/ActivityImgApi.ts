import * as laBaseApi from "@/api/BaseApi";
import * as ActivityImgModel from "@/models/ActivityImgModel";

/**
 * 活动A
 */
export class ActivityImgApi extends laBaseApi.BaseApi {
  /**
   * 获取分页列表
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async getListPager(
    activity_id: number,
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/activity/" +
      activity_id +
      "/img?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: ActivityImgModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(activity_id: number, strWhere: string = "") {
    let url: string =
      "/staff/activity/" + activity_id + "/lists?account_token=" + this.token;
    let result: ActivityImgModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async setAdd(activity_id: number, postData: ActivityImgModel.ActivityImgModel) {
    let url = "/staff/activity/" + activity_id + "/img";
    let data = postData;
    let result: ActivityImgModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(activity_id: number, id: number, postData: ActivityImgModel.ActivityImgModel) {
    let url = "/staff/activity/" + activity_id + "/img/" + id;
    let data = postData;
    let result: ActivityImgModel.Result = await this.httpPut(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(activity_id: number, id: number) {
    let url = "/staff/activity/" + activity_id + "/img/" + id;
    let data = "account_token=" + this.token + "&ids=" + id;
    let result: ActivityImgModel.Result = await this.httpDelete(
      url + "?" + data
    );
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(activity_id: number, id: number) {
    let url = "/staff/activity/" + activity_id + "/img/" + id;
    let data = "account_token=" + this.token;
    let result: ActivityImgModel.ModelResult = await this.httpGet(
      url + "?" + data
    );
    return result;
  }
}
