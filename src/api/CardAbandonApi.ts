import * as laBaseApi from '@/api/BaseApi';
import * as CardAbandonModel from '@/models/CardAbandonModel';

/**
 * 已废弃充值卡API
 */
export class CardAbandonApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(cardDefineId: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/cards/" + cardDefineId + "?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + "&cards_type=2" + strWhere;
        let result: CardAbandonModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/cardabandon?account_token=" + this.token;
        let result: CardAbandonModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/cardabandon";
        let data = postData;
        let result: CardAbandonModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/cardabandon/" + id;
        let data = postData;
        let result: CardAbandonModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/cardabandon/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: CardAbandonModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/cardabandon/" + id;
        let data = "account_token=" + this.token;
        let result: CardAbandonModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}