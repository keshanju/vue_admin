import * as laBaseApi from '@/api/BaseApi';
import * as StaffRoleModel from '@/models/StaffRoleModel';
import { BaseModel } from '@/models/BaseModel';
import * as StatffRoleRouteModel from '@/models/StaffRoleRouteModel';

/**
 * 员工角色Api
 */
export class StaffRoleApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/role?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: StaffRoleModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/role/lists?account_token=" + this.token;
        let result: StaffRoleModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/role";
        let data = postData;
        let result: StaffRoleModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/role/" + id;
        let data = postData;
        let result: StaffRoleModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/role/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: StaffRoleModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/role/" + id;
        let data = "account_token=" + this.token;
        let result: StaffRoleModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
 * 更新用员工角色与路由地址绑定
 * @param id 
 * @param model 
 */
    public async setStaffRoleRoutePath(roleId: number, bind_ids1: number[]) {
        let url = "/staff/role/" + roleId + "/route";
        let json = {
            account_token: this.token,
            route_ids: bind_ids1
        }
        let result: BaseModel = await this.httpPostJson(url, json);
        return result;
    }

    /**
     * 获取角色与路由关系
     * @param roleId 
     */
    public async getRoleRotePathRelation(roleId: number) {
        let url: string = "/staff/role/" + roleId + "/route/relation?account_token=" + this.token;
        let result: StatffRoleRouteModel.ListResult = await this.httpGet(url);
        return result;
    }
}