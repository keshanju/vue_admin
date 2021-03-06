import * as laBaseApi from '@/api/BaseApi';
import * as DiscountModel from '@/models/DiscountModel';

/**
 * 布局API
 */
export class DiscountApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/discount?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: DiscountModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/discount/lists?account_token=" + this.token;
        let result: DiscountModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:object) {
        let url = "/staff/discount";
        let data = postData;
        let result: DiscountModel.Result = await this.httpPostJson(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:object) {
        let url = "/staff/discount/" + id;
        let data = postData;
        let result: DiscountModel.Result = await this.httpPutJson(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/discount/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: DiscountModel.Result = await this.httpDelete(url + "?" + data);
        return result;
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/discount/" + id;
        let data = "account_token=" + this.token;
        let result: DiscountModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

}