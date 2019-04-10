import * as laBaseApi from '@/api/BaseApi';
import * as GameInfoRegionModel from '@/models/GameInfoRegionModel';

/**
 * API
 */
export class GameInfoRegionApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/game/region?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: GameInfoRegionModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/layouts/lists?account_token=" + this.token;
        let result: GameInfoRegionModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: GameInfoRegionModel.GameInfoRegionModel) {
        let url = "/staff/game/region";
        let data = postData;
        data.account_token = this.token;
        let result: GameInfoRegionModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: GameInfoRegionModel.GameInfoRegionModel) {
        let url = "/staff/game/region/" + id;
        let data = postData;
        data.account_token = this.token;
        let result: GameInfoRegionModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/game/region/" + id;
        let data = "account_token=" + this.token;
        let result: GameInfoRegionModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/game/region/" + id;
        let data = "account_token=" + this.token;
        let result: GameInfoRegionModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}