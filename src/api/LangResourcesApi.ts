import * as laBaseApi from '@/api/BaseApi';
import * as LangResourcesModel from '@/models/LangResourcesModel';

/**
 * 公告API
 */
export class LangResourcesApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(pid: number = 0, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/language/" + pid + "?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: LangResourcesModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/language/lists?account_token=" + this.token;
        let result: LangResourcesModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/language";
        let data = postData;
        let result: LangResourcesModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/language/" + id;
        let data = postData;
        let result: LangResourcesModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/language/" + id;
        let data = "account_token=" + this.token;
        let result: LangResourcesModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/language/detail/" + id;
        let data = "account_token=" + this.token;
        let result: LangResourcesModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}