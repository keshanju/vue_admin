import * as laBaseApi from '@/api/BaseApi';
import * as GameLogModel from '@/models/GameLogModel';

/**
 * 游戏日志API
 */
export class GameLogApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/game/logs?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: GameLogModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/game/logs?account_token=" + this.token;
        let result: GameLogModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:string) {
        let url = "/staff/game/logs";
        let data = postData;
        let result: GameLogModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:string) {
        let url = "/staff/game/logs/" + id;
        let data = postData;
        let result: GameLogModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/game/logs/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: GameLogModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/game/logs/" + id;
        let data = "account_token=" + this.token;
        let result: GameLogModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}