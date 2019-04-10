import * as laBaseApi from '@/api/BaseApi';
import * as LayoutModel from '@/models/LayoutModel';

/**
 * API
 */
export class LayoutApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/layouts?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: LayoutModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/layouts/lists?account_token=" + this.token;
        let result: LayoutModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:string) {
        let url = "/staff/layouts";
        let data = postData;
        let result: LayoutModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:string) {
        let url = "/staff/layouts/" + id;
        let data = postData;
        let result: LayoutModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/layouts/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: LayoutModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/layouts/" + id;
        let data = "account_token=" + this.token;
        let result: LayoutModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}