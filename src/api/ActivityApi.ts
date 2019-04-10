import * as laBaseApi from '@/api/BaseApi';
import * as ActivityModel from '@/models/ActivityModel';

/**
 * 活动A
 */
export class ActivityApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/activity?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: ActivityModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/activity/lists?account_token=" + this.token;
        let result: ActivityModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:string) {
        let url = "/staff/activity";
        let data = postData;
        let result: ActivityModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:string) {
        let url = "/staff/activity/" + id;
        let data = postData;
        let result: ActivityModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/activity/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: ActivityModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/activity/" + id;
        let data = "account_token=" + this.token;
        let result: ActivityModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 更新活动缓存
     */
    public async setStatic() {
        let url = "/staff/activity/static";
        let data = "account_token=" + this.token;
        let result: ActivityModel.Result = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 发布活动状态
     */
    public async setActiveStatus(id:number){
        let url = `/staff/activity/${id}/release`;
        let data = "account_token=" + this.token;
        let result: ActivityModel.Result = await this.httpPost(url,data);
        return result;
    }
    /**
     * 取消发布活动状态
     */
    public async setActiveStatusCancel(id:number){
        let url = `/staff/activity/${id}/release`;
        let data = "account_token=" + this.token;
        let result: ActivityModel.Result = await this.httpDelete(url+"?"+data);
        return result;
    }
}