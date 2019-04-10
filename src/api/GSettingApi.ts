import * as laBaseApi from '@/api/BaseApi';
import * as gsettingModel from '@/models/GSettingModel';
import * as baseModel from '@/models/BaseModel';


/**
 * 全局设置
 */
export class GSettingApi extends laBaseApi.BaseApi {
  /**
   * 获取全局设置
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async GSettingListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/setting?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
    let result: gsettingModel.GSettingPagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加全局设置数据
 * @param postData a=1&b=2 
 */
  public async gsettingAdd(postData: string) {
    let url: string = "/staff/setting";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑全局设置数据
   * @param postData 
   */
  public async gsettingUpdate(id: number, postData: string) {
    let url: string = "/staff/setting/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取全局设置模型
 * @param id 
 */
  public async getGSettingModel(id: number) {
    let url: string = "/staff/setting/" + id + "?account_token=" + this.token;
    let result: gsettingModel.GSettingSingleResult = await this.httpGet(url);
    return result;
  }
}