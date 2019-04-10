import * as laBaseApi from '@/api/BaseApi';
import * as PackagePriceActivityModel from '@/models/PackagePriceActivityModel';

/**
 * 活动API
 */
export class PackagePriceActivityApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(price_id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        // let url: string = "/staff/activity?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let url: string = "/staff/package/price/" + price_id + "/activity?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: PackagePriceActivityModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(price_id: number, postData: object) {
        let url = "/staff/package/price/" + price_id + "/activity";
        let data = postData;
        let result: PackagePriceActivityModel.Result = await this.httpPostJson(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: object) {
        let url = "/staff/package/price/activity/" + id;
        let data = postData;
        let result: PackagePriceActivityModel.Result = await this.httpPutJson(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/activity/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: PackagePriceActivityModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/package/price/activity/" + id;
        let data = "account_token=" + this.token;
        let result: PackagePriceActivityModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

}