import * as laBaseApi from "@/api/BaseApi";
import * as ActivityPresentModel from "@/models/ActivityPresentModel";

/**
 * 活动API
 */
export class ActivityPresentApi extends laBaseApi.BaseApi {
  /**
   * 获取分页列表
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async getListPager(
    activityId: number,
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/activity/" +
      activityId +
      "/present/?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: ActivityPresentModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(strWhere: string = "") {
    let url: string = "/staff/activity/lists?account_token=" + this.token;
    let result: ActivityPresentModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async setAdd(activityId: number, postData: string) {
    let url = `/staff/activity/${activityId}/present/`;
    let data = postData;
    let result: ActivityPresentModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(activityId: number, id: number, postData: string) {
    let url = `/staff/activity/${activityId}/present/` + id;
    let data = postData;
    let result: ActivityPresentModel.Result = await this.httpPut(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(active_id: number, id: number) {
    let url = "/staff/activity/" + active_id + "/present/" + id;
    let data = "account_token=" + this.token + "&ids=" + id;
    let result: ActivityPresentModel.Result = await this.httpDelete(
      url + "?" + data
    );
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(active_id: number, id: number) {
    let url = `/staff/activity/${active_id}/present/` + id;
    let data = "account_token=" + this.token;
    let result: ActivityPresentModel.ModelResult = await this.httpGet(
      url + "?" + data
    );
    return result;
  }
}
