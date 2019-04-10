import * as laBaseApi from '@/api/BaseApi';
import * as areaModel from '@/models/AreaModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 区服Api
 */
export class AreaApi extends laBaseApi.BaseApi {
  /**
   * 获取区服
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async AreaListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/area?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: areaModel.AreaPagerResult = await this.httpGet(url);
    return result;
  }

  public async getListResult(strWhere: string = "", game_id: string = "") {
    let url: string = "/staff/area/lists?account_token=" + this.token + "&game_id=" + game_id;
    let result: areaModel.AreaPagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加区服数据
 * @param postData a=1&b=2 
 */
  public async areaAdd(postData: string) {
    let url: string = "/staff/area";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑区服数据
   * @param postData 
   */
  public async areaUpdate(id: number, postData: string) {
    let url: string = "/staff/area/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取区服模型
 * @param id 
 */
  public async getAreaModel(id: number) {
    let url: string = "/staff/area/" + id + "?account_token=" + this.token;
    let result: areaModel.AreaSingleResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取勾选关系
   * @param id 
   */
  public async getAreaLineSelected(id: number) {
    let url: string = "/staff/area/" + id + "/line?account_token=" + this.token;
    let result: areaModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 更新勾选关系
   */
  public async setAreaLineSelected(id: number, bind_ids: number[]) {
    let url: string = "/staff/area/" + id + "/line?account_token=" + this.token;
    let json = {
      account_token: this.token,
      line_ids: bind_ids
    };
    let result: areaModel.Result = await this.httpPostJson(url, json);
    return result;
  }
}