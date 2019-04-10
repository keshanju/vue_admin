import * as laBaseApi from "@/api/BaseApi";
import * as lineModel from "@/models/LineModel";
import { BaseResult2, BaseModel2 } from "@/models/BaseModel";
import { LineLimitModel } from "@/models/LineLimitModel";

/**
 * 线路API
 */
export class LineApi extends laBaseApi.BaseApi {
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
      "/staff/line?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: lineModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(strWhere: string = "") {
    let url: string = "/staff/line/lists?account_token=" + this.token;
    let result: lineModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async setAdd(postData: string) {
    let url = "/staff/line";
    let data = postData;
    let result: lineModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(id: number, postData: string) {
    let url = "/staff/line/" + id;
    let data = postData;
    let result: lineModel.Result = await this.httpPut(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(id: number) {
    let url = "/staff/line/" + id;
    let data = "account_token=" + this.token + "&ids=" + id;
    let result: lineModel.Result = await this.httpDelete(url + "?" + data);
    return result;
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(id: number) {
    let url = "/staff/line/" + id;
    let data = "account_token=" + this.token;
    let result: lineModel.ModelResult = await this.httpGet(url + "?" + data);
    return result;
  }

  /**
   * 获取勾选关系
   * @param id
   */
  public async getNodeServerSelected(id: number) {
    let url: string = "/staff/line/" + id + "/node?account_token=" + this.token;
    let result: lineModel.LineNodeListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 更新勾选关系
   */
  public async setNodeServerSelected(id: number, bind_ids: number[]) {
    let url: string = "/staff/line/" + id + "/node?account_token=" + this.token;
    let json = {
      account_token: this.token,
      node_ids: bind_ids
    };
    let result: lineModel.Result = await this.httpPostJson(url, json);
    return result;
  }

  /**
   * 批量维护更新
   * @param id
   * @param model
   */
  public async setBatUpdateLine(postData: lineModel.LineModel) {
    let url = "/staff/line/batch";
    let result: lineModel.Result = await this.httpPostJson(url, postData);
    return result;
  }
}

/**
 * 线路限制
 */
export class LineLimitApi extends laBaseApi.BaseApi {
  public async getModel(line_id: number) {
    let url = `/staff/line/bandwidth/sync/${line_id}?account_token=${this.token}`;
    let r: BaseModel2<LineLimitModel> = await this.httpGet(url);
    return r;
  }

  public async setPost(line_id: number, post: LineLimitModel) {
    let url = `/staff/line/bandwidth/sync/${line_id}`;
    let r: BaseResult2 = await this.httpPostJson(url, post);
    return r;
  }

  public async setPut(line_id: number, post: LineLimitModel) {
    let url = `/staff/line/bandwidth/sync/${line_id}`;
    let r: BaseResult2 = await this.httpPutJson(url, post);
    return r;
  }

  public async setDelete(line_id: number) {
    let url = `/staff/line/bandwidth/sync/${line_id}?account_token=${this.token}`;
    let r: BaseResult2 = await this.httpDelete(url);
    return r;
  }
}
