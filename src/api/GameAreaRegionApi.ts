import * as laBaseApi from '@/api/BaseApi';
import * as GameAreaRegionModel from '@/models/GameAreaRegionModel';

/**
 * API
 */
export class GameAreaRegionApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/game/area/region?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: GameAreaRegionModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/game/area/lists?account_token=" + this.token;
        let result: GameAreaRegionModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:GameAreaRegionModel.GameAreaRegionModel) {
        let url = "/staff/game/area/region";
        let data = postData;
        data.account_token = this.token;
        let result: GameAreaRegionModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:GameAreaRegionModel.GameAreaRegionModel) {
        let url = "/staff/game/area/region/" + id;
        let data = postData;
        data.account_token = this.token;
        let result: GameAreaRegionModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/game/area/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: GameAreaRegionModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/game/area/region/" + id;
        let data = "account_token=" + this.token;
        let result: GameAreaRegionModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}