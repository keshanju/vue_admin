import * as laBaseApi from "@/api/BaseApi";
import {CommonUtils} from "@/common/CommonUtils";
import {
    StatisticsOrderList,
    StatisticsUserList,
    StatisticsServerOnLineUser,
    ChannelLoginModel,
    StatisticsSpeedLogModel,
    StatisticsOnlineUserLogModel, InvoiceChartList,StatisticsUserModel
} from "@/models/StatisticsModel";
import {BasePager2, BaseArray2,BaseModel2} from "@/models/BaseModel";
import {WallpaperModel} from "@/models/WallpaperModel";

/**
 * API
 */
export class StatisticsApi extends laBaseApi.BaseApi {
    /**
     * 获取销售统计
     */
    public async getOrderList(strWhere: string) {
        let url: string =
            "/staff/statistics/invoice?account_token=" + this.token + strWhere;
        let result: StatisticsOrderList = await this.httpGet(url);
        return result;
    }

    /**
     * 获取销售统计图表数据
     * @param {string} strWhere
     * @returns {Promise<StatisticsOrderList>}
     */
    public async getOrderChartList(strWhere: string) {
        let url: string = "/staff/statistics/invoice/chart?account_token=" + this.token + strWhere;
        let result: InvoiceChartList = await this.httpGet(url);
        return result;
    }

    public async getUserChartList(strWhere: string) {
        let url: string = "/staff/statistics/user/chart?account_token=" + this.token + strWhere;
        let result: BaseArray2<StatisticsUserModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 获取用户统计
     */
    public async getUserList(strWhere: string) {
        let url: string =
            "/staff/statistics/user?account_token=" + this.token + strWhere;
        let result: StatisticsUserList = await this.httpGet(url);
        return result;
    }

    /**
     * 获取充值卡统计
     */
    public getCardList() {
    }

    /**
     * 获取游戏统计
     */
    public getGameList() {
    }

    /**
     * 获取在线人数
     */
    public async getServerOnLineCount() {
        let url: string = `/staff/aggs/user_online?account_token=${this.token}`;
        let result: StatisticsServerOnLineUser = await this.httpGet(url);
        return result;
    }

    /**
     * 登录渠道类型
     * @param strWhere
     */
    public async getChannelLogin(strWhere: string) {
        let url: string =
            "/staff/statistics/login?account_token=" + this.token + strWhere;
        let result: BaseArray2<ChannelLoginModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 获取用户在线日志列表
     */
    public async getUserOnlineLogList(
        start_time: string,
        end_time: string,
        page: number,
        size: number
    ) {
        let url: string = `/staff/statistics/user/online?account_token=${
            this.token
            }&start_time=${start_time}&end_time=${end_time}&page=${page}&size=${size}`;
        let result: BasePager2<StatisticsOnlineUserLogModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 获取加速日志列表
     */
    public async getSpeedLogList(
        start_time: string,
        end_time: string,
        start_speed_time: string,
        end_speed_time: string
    ) {
        let url: string = `/staff/statistics/user/speed?account_token=${
            this.token
            }&start_time=${start_time}&end_time=${end_time}&start_speed_time=${start_speed_time}&end_speed_time=${end_speed_time}`;
        let result: BaseArray2<StatisticsSpeedLogModel> = await this.httpGet(url);
        return result;
    }
}
