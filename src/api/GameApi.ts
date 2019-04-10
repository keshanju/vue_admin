import * as laBaseApi from '@/api/BaseApi';
import * as gameModel from '@/models/GameModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 游戏Api
 */
export class GameApi extends laBaseApi.BaseApi {
    /**
     * 获取游戏
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async gameListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/game?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: gameModel.GameModelPagerResult = await this.httpGet(url);
        return result;
    }

    /**
   * 添加游戏数据
   * @param postData a=1&b=2 
   */
    public async gameAdd(postData: string) {
        let url: string = "/staff/game";
        let result: baseModel.BaseModel = await this.httpPost(url, postData);
        return result;
    }

    /**
     * 编辑游戏数据
     * @param postData 
     */
    public async gameUpdate(id: number, postData: string) {
        let url: string = "/staff/game/" + id;
        let result: baseModel.BaseModel = await this.httpPut(url, postData);
        return result;
    }

    /**
   * 获取游戏模型
   * @param id 
   */
    public async getGameModel(id: number) {
        let url: string = "/staff/game/" + id + "?account_token=" + this.token;
        let result: gameModel.GameSingleResult = await this.httpGet(url);
        return result;
    }



    /**
    * 获取简单游戏模型
    * @param id 
    */
    public async getListResult() {
        let url: string = "/staff/game/lists?account_token=" + this.token;
        let result: gameModel.GameSimpleListResult = await this.httpGet(url);
        return result;
    }
}