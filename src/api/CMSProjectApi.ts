import * as laBaseApi from '@/api/BaseApi';
import * as CMSProjectModel from '@/models/CMSProjectModel';

/**
 * 布局API
 */
export class CMSProjectApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/cms/project?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: CMSProjectModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/cms/project/lists?account_token=" + this.token;
        let result: CMSProjectModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:object) {
        let url = "/staff/cms/project";
        let data = postData;
        let result: CMSProjectModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:object) {
        let url = "/staff/cms/project/" + id;
        let data = postData;
        let result: CMSProjectModel.Result = await this.httpPutJson(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/cms/project/" + id;
        let result: CMSProjectModel.Result = await this.httpDelete(url+"?account_token=" + this.token);
        return result;
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/cms/project/" + id;
        let data = "account_token=" + this.token;
        let result: CMSProjectModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}