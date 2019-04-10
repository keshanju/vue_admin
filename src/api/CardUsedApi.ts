import * as laBaseApi from '@/api/BaseApi';
import * as CardUsedModel from '@/models/CardUsedModel';

/**
 * 已使用充值卡API
 */
export class CardUsedApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(cardDefineId: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/cards/" + cardDefineId + "?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+"&cards_type=1" + strWhere;
        let result: CardUsedModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/cards?account_token=" + this.token;
        let result: CardUsedModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/cards";
        let data = postData;
        let result: CardUsedModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/cards/" + id;
        let data = postData;
        let result: CardUsedModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/cards/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: CardUsedModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/cards/" + id;
        let data = "account_token=" + this.token;
        let result: CardUsedModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}