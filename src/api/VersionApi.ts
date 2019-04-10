import * as laBaseApi from '@/api/BaseApi';
import * as VersionModel from '@/models/VersionModel';

/**
 * 版本升级API
 */
export class VersionApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/version?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: VersionModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/version?account_token=" + this.token;
        let result: VersionModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/version";
        let data = postData;
        let result: VersionModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/version/" + id;
        let data = postData;
        let result: VersionModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/version/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: VersionModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/version/" + id;
        let data = "account_token=" + this.token;
        let result: VersionModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}