import * as laBaseApi from '@/api/BaseApi';
import * as packagePriceModel from '@/models/PackagePriceModel';

/**
 * 套餐价格API
 */
export class PackagePriceApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(packageid: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/package/" + packageid + "/price?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: packagePriceModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(packageid: number, strWhere: string = "") {
        let url: string = "/staff/package/" + packageid + "/price/lists?account_token=" + this.token;
        let result: packagePriceModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(packageid: number, postData: string) {
        let url = "/staff/package/" + packageid + "/price";
        let data = postData;
        let result: packagePriceModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(packageid: number, id: number, postData: string) {
        let url = "/staff/package/" + packageid + "/price/" + id;
        let data = postData;
        let result: packagePriceModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/package/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: packagePriceModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(packageid: number, id: number) {
        let url = "/staff/package/" + packageid + "/price/" + id;
        let data = "account_token=" + this.token;
        let result: packagePriceModel.Result = await this.httpGet(url + "?" + data);
        return result;
    }
}