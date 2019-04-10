import * as laBaseApi from "@/api/BaseApi";
import * as serverModel from "@/models/ServerModel";
import { BaseResult2, BasePager2 } from "@/models/BaseModel";
import { ServerNodeErrorModel } from "@/models/ServerNodeErrorModel";

/**
 * 服务器API
 */
export class ServerApi extends laBaseApi.BaseApi {
  /**
   * 获取分页列表
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async getListPager(
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/server?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: serverModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(strWhere: string = "") {
    let url: string =
      "/staff/server/lists?account_token=" + this.token + "&" + strWhere;
    let result: serverModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async setAdd(postData: string) {
    let url = "/staff/server";
    let data = postData;
    let result: serverModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(id: number, postData: any) {
    let url = "/staff/server/" + id;
    let data = postData;
    let result: serverModel.Result = await this.httpPutJson(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(id: number) {
    let url = "/staff/server/" + id;
    let data = "account_token=" + this.token;
    let result: serverModel.Result = await this.httpDelete(url + "?" + data);
    return result;
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(id: number) {
    let url = "/staff/server/" + id;
    let data = "account_token=" + this.token;
    let result: serverModel.ModelResult = await this.httpGet(url + "?" + data);
    return result;
  }

  /**
   * 批量更新
   * @param id
   * @param model
   */
  public async setBatUpdateState(postData: object) {
    let url = "/staff/server/status";
    let data = postData;
    let result: serverModel.Result = await this.httpPutJson(url, data);
    return result;
  }

  /**
   * 服务器在线人数更新
   */
  public async setUpdateServerOnline() {
    let url = "/staff/server/checkOnline";
    let data = "account_token=" + this.token;
    let result: serverModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 获取服务器加速节点错误列表
   * @param start_time 
   * @param end_time 
   * @param page 
   * @param size 
   */
  public async getServerNodeError(
    start_time: string,
    end_time: string,
    page: number = 1,
    size: number = 15
  ) {
    let url = `/staff/statistics/speed/node/error?account_token=${
      this.token
    }&page=${page}&size=${size}&start_time=${start_time}&end_time=${end_time}`;
    let result: BasePager2<ServerNodeErrorModel> = await this.httpGet(url);
    return result;
  }
}
