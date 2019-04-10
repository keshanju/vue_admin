import * as laBaseApi from '@/api/BaseApi';
import * as UserPointShortModel from '@/models/UserPointsShortModel';
import { UserPointsShortModel } from '@/models/UserPointsShortModel';

/**
 * 用户活动积分API
 */
export class UserPointsShortApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(memberid: number,dbNum:string, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        //let url: string = "/staff/member/" + memberid + "/points?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let url =`/staff/member/${memberid}/points?account_token=${this.token}&database_num=${dbNum}&size=${pageSize}&page=${pageIndex}${strWhere}`;
        let result: UserPointShortModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 修改增加用户积分
     * @param member_id 
     */
    public async changeUserPoints(member_id:number,dbNum:string,model:UserPointsShortModel){
        let url = `/staff/member/${member_id}/points`;
        model.account_token = this.token;
        model.database_num = dbNum;
        let result = await this.httpPutJson(url,model);
        return result;
    } 
}