import * as laBaseApi from '@/api/BaseApi';
import * as UserPrizeModel from '@/models/UserPrizeModel';

/**
 * 用户积分Api
 */
export class UserPrizeApi extends laBaseApi.BaseApi {
  /**
    * 获取用户积分数据
    * present_type
     string
     (query)	
     奖品类型（0:充值卡 1:现金红包 2:实物）不传查所有
 
     status
     string
     (query)	
     领奖状态，0. 未领取，1. 客户已申请，2. 已发出，3. 已领取 不传查所有
    * @param strWhere 
    * @param pageSize 
    * @param pageIndex 
    */
  public async UserPrizeListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/member/receive?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: UserPrizeModel.PagerListResult = await this.httpGet(url);
    return result;
  }


  /**
   * 审核用户中奖纪录
   * @param prize_id 
   * @param status 
   * @param details 
   */
  public async setPrizeUpdate(prize_id: number, status: number, details: string) {
    let url: string = "/staff/member/receive/examine?account_token=" + this.token;
    let result: UserPrizeModel.Result = await this.httpPostJson(url, {
      account_token: this.token,
      prize_id: prize_id,
      status: status,
      details: details
    });
    return result;
  }
}