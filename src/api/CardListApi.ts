import * as laBaseApi from '@/api/BaseApi';
import * as cardlistModel from '@/models/CardListModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 卡列表
 */
export class CardListApi extends laBaseApi.BaseApi {
  /**
   * 获取充值列表
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async cardlistListPager(cardlistId: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/cards/"+ cardlistId +"?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + "&cards_type=0" + strWhere;
    let result: cardlistModel.CardListModelPagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加
 * @param model 
 */
  public async cardlist(cardid: number, postData: string) {
    let url = "/staff/card/" + cardid + "/generate";
    let data = postData;
    let result: cardlistModel.CardListModelListResult = await this.httpPost(url, data);
    return result;
  }

  /**
   * 卡列表里 废弃
   */
  public async carddelete(id: number) {
    let data = "account_token=" + this.token + "&id[]=" + id + "&abandon_reason=后台操作";
    let url = "/staff/cards?" + data;
    let result: cardlistModel.CardListModelListResult = await this.httpDelete(url);
  }





  //   /**
  //  * 获取充值卡模型
  //  * @param id 
  //  */
  //   public async getCardsModel(id: number) {
  //     let url: string = "/staff/card/" + id + "?account_token=" + this.token;
  //     let result: cardsModel.CardsSingleResult = await this.httpGet(url);
  //     return result;
  //   }
}
