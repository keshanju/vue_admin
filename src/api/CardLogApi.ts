import * as laBaseApi from '@/api/BaseApi';
import * as cardlogModel from '@/models/CardLogModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 充值卡日志
 */
export class CardLogApi extends laBaseApi.BaseApi {
  /**
   * 获取开卡日志列表
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async getPagerList(cardlogId: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/cards/logs?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: cardlogModel.PagerListResult = await this.httpGet(url);
    return result;
  }

    /**
 * 添加充值卡数据
 * @param postData a=1&b=2 
 */
public async setAdd(postData: string) {
  let url: string = "/staff/cardlog";
  let result: baseModel.BaseModel = await this.httpPost(url, postData);
  return result;
}

/**
 * 编辑充值卡数据
 * @param postData 
 */
public async setUpdate(id: number, postData: string) {
  let url: string = "/staff/cardlog/" + id;
  let result: baseModel.BaseModel = await this.httpPut(url, postData);
  return result;
}

  /**
 * 添加
 * @param model 
 */
  public async cardLog(cardid: number, postData: string) {
    let url = "/staff/cardlog/" + cardid + "/generate";
    let data = postData;
    let result: cardlogModel.Result = await this.httpPost(url, data);
    return result;
  }





    /**
   * 获取充值卡模型
   * @param id 
   */
    public async getModel(id: number) {
      let url: string = "/staff/cardlog/" + id + "?account_token=" + this.token;
      let result: cardlogModel.ModelResult = await this.httpGet(url);
      return result;
    }
}
