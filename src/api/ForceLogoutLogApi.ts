import * as laBaseApi from '@/api/BaseApi';
import * as ForceLogoutLogModel from '@/models/ForceLogoutLogModel';

/**
 * 强制退出API
 */
export class ForceLogoutLogApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/member/force_logout?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: ForceLogoutLogModel.ForceLogoutLogPagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/member/force_logout?account_token=" + this.token;
        let result: ForceLogoutLogModel.ForceLogoutLogListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/member/force_logout";
        let data = postData;
        let result: ForceLogoutLogModel.ForceLogoutLogResult = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/member/force_logout/" + id;
        let data = postData;
        let result: ForceLogoutLogModel.ForceLogoutLogResult = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/member/force_logout/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: ForceLogoutLogModel.ForceLogoutLogResult = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/member/force_logout/" + id;
        let data = "account_token=" + this.token;
        let result: ForceLogoutLogModel.ForceLogoutLogModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}