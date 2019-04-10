import * as laBaseApi from '@/api/BaseApi';
import * as userfreepackageModel from '@/models/UserFreePackageModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户赠送套餐Api
 */
export class UserFreePackageApi extends laBaseApi.BaseApi {
 /**
   * 获取数据
   * @param strWhere 
   * @param pageSize 
   * @param pageIndex 
   */
  public async UserFreePackageListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
    let url: string = "/staff/member/package?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
    let result: userfreepackageModel.UserFreePackagePagerResult = await this.httpGet(url);
    return result;
  }

  /**
 * 添加数据
 * @param postData a=1&b=2 
 */
  public async userFreePackageAdd(postData: string) {
    let url: string = "/staff/member/package";
    let result: baseModel.BaseModel = await this.httpPost(url, postData);
    return result;
  }

  /**
   * 编辑数据
   * @param postData 
   */
  public async userFreePackageUpdate(id: number, postData: string) {
    let url: string = "/staff/member/package/" + id;
    let result: baseModel.BaseModel = await this.httpPut(url, postData);
    return result;
  }

  /**
 * 获取模型
 * @param id 
 */
  public async getUserFreePackageModel(id: number) {
    let url: string = "/staff/member/" + id + "/package/?account_token=" + this.token;
    let result: userfreepackageModel.UserFreePackageSingleResult = await this.httpGet(url);
    return result;
  }
}