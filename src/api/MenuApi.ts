import * as lsApi from '@/api/BaseApi';
import * as menuModel from "@/models/MenuModel";

/**
 * 菜单Api
 */
export class MenuApi extends lsApi.BaseApi {

    /**
     * 获取菜单数据
     * @param token 
     */
    public async getList() {
        let result: menuModel.ListResult = await this.httpGet("/staff/menu?account_token=" + this.token);
        return result;
    }
}
