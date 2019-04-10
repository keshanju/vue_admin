import * as laBaseApi from '@/api/BaseApi';
import * as DomainWhiteModel from '@/models/DomainWhiteModel';

/**
 * 白名单API
 */
export class DomainWhiteApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/white?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: DomainWhiteModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/white?account_token=" + this.token;
        let result: DomainWhiteModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/white";
        let data = postData;
        let result: DomainWhiteModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/white/" + id;
        let data = postData;
        let result: DomainWhiteModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/white/" + id;
        let data = "account_token=" + this.token + "&id=" + id;
        let result: DomainWhiteModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/white/" + id;
        let data = "account_token=" + this.token;
        let result: DomainWhiteModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
    /**
     * 获取游戏
     *  @param game_id
     **/

    public async getGame(game_id: number) {
        let url = "/staff/game/" + game_id;
        let data = "account_token=" + this.token;
        let result: DomainWhiteModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

}
