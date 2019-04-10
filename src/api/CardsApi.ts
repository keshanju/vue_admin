import * as laBaseApi from '@/api/BaseApi';
import * as cardsModel from '@/models/CardsModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 充值卡类别
 */
export class CardsApi extends laBaseApi.BaseApi {
  /**
   * 获取充值卡
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async cardsListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/card?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: cardsModel.CardsModelPagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加充值卡数据
 * @param postData a=1&b=2 
 */
  public async cardsAdd(postData: string) {
    let url: string = "/staff/card";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑充值卡数据
   * @param postData 
   */
  public async cardsUpdate(id: number, postData: string) {
    let url: string = "/staff/card/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取充值卡模型
 * @param id 
 */
  public async getCardsModel(id: number) {
    let url: string = "/staff/card/" + id + "?account_token=" + this.token;
    let result: cardsModel.CardsSingleResult = await this.httpGet(url);
    return result;
  }



  /**
   * 创建充值卡数据
   * @param postData 
   */
  public async cardsGenerate(id: number, postData: string) {
    let url: string = "/staff/card/" + id + "/generate";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }


  /**
  * 获取简单充值卡模型
  * @param id 
  */
  public async getSimpleListResult() {
    let url: string = "/staff/card/list?account_token=" + this.token;
    let result: cardsModel.CardsSimpleListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 充值卡导出
   */
  public async getCardsExportData(id: number, super_password: string) {
    let url: string = "/staff/cards/export";
    let data = {
      account_token: this.token,
      id: id,
      super_password: super_password
    }
    let result = await this.httpPostJsonDownFile(url, data, "export_cards.xlsx");
    return result;
  }
}