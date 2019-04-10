import * as laBaseApi from '@/api/BaseApi';
import * as lineBindModel from '@/models/LineBindModel';

/**
 * 线路API
 */
export class LineBindApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(master_id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/line/" + master_id + "/bind?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: lineBindModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(master_id: number, postData: string) {
        let url = "/staff/line/" + master_id + "/bind";
        let data = postData;
        let result: lineBindModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/line/bind/" + id;
        let data = postData;
        let result: lineBindModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param id
     */
    public async setDelete(id: number) {
        let url = "/staff/line/bind/" + id;
        let data = "account_token=" + this.token;
        let result: lineBindModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/line/bind/" + id;
        let data = "account_token=" + this.token;
        let result: lineBindModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}