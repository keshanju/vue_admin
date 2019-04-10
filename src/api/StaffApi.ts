import * as laBaseApi from '@/api/BaseApi';
import * as staffModel from '@/models/StaffModel';
import * as baseModel from '@/models/BaseModel';
import * as staffRoleModel from '@/models/StaffRoleModel';

/**
 * 员工Api
 */
export class StaffApi extends laBaseApi.BaseApi {

    //#region 登录 登出

    /**
     * 获取验证码
     */
    public async getCaptcha() {
        let result: staffModel.StaffCaptchaResult = await this.httpGet("/staff/captcha", false);
        return result;
    }
    /**
     * 判断用户登录
     * @param loginData 
     */
    public async loginCheck(loginData: any) {
        let result: staffModel.StaffLoginResult = await this.httpPost("/staff/login", loginData);
        return result;
    }

    /**
     * 用户登出
     */
    public async loginOut() {
        let url = "/staff/logout";
        let data = "account_token" + this.token;
        return await this.httpDelete(url + "?" + data, false);
    }

    //#endregion

    //#region 员工管理


    /**
     *  获取员工记录集合
     * @param strWhere  查询条件
     * @param pageSize  分页大小
     * @param pageIndex  当前页码
     */
    public async staffDataListPager(strWhere: string, pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/users?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: staffModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加管理员数据
     * @param postData a=1&b=2 
     */
    public async staffAdd(postData: string) {
        let url: string = "/staff/users";
        let result: baseModel.BaseModel = await this.httpPost(url, postData);
        return result;
    }

    /**
     * 编辑管理员数据
     * @param postData 
     */
    public async staffUpdate(id: number, postData: string) {
        let url: string = "/staff/users/" + id;
        let result: baseModel.BaseModel = await this.httpPut(url, postData);
        return result;
    }
    
    /**
     * 编辑管理员数据
     * @param postData 
     */
    public async staffUpdateJson(id: number, postData: object) {
        let url: string = "/staff/users/" + id;
        let result: baseModel.BaseModel = await this.httpPutJson(url, postData);
        return result;
    }

    /**
     * 获取员工模型
     * @param id 
     */
    public async getStaffModel(id: number) {
        let url: string = "/staff/users/" + id + "?account_token=" + this.token;
        let result: staffModel.ModelResult = await this.httpGet(url);
        return result;
    }

    /**
   * 删除员工模型
   * @param id 
   */
    public async delStaffModel(id: number) {
        let url: string = "/staff/users/" + id + "?account_token=" + this.token;
        return await this.httpGet(url);
    }
    //#endregion

    //#region   员工分组

    /**
     * 获取员工分组
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async staffRoleGroupListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/role?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: staffRoleModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 员工组添加
     * @param model 
     */
    public async staffRoleGroupAdd(name: string, menu_ids: string) {
        let url = "/staff/role";
        let data = "account_token=" + this.token + "&name=" + name + "&menu_ids=" + menu_ids;
        return await this.httpPost(url, data);
    }

    /**
     * 员工组更新
     * @param id 
     * @param model 
     */
    public async staffRoleGroupUpdate(id: number, name: string, menu_ids: string) {
        let url = "/staff/role/" + id;
        let data = "account_token=" + this.token + "&name=" + name + "&menu_ids=" + menu_ids;
        return await this.httpPut(url, data);
    }

    /**
     * 批量删除员工组
     * @param ids 
     */
    public async staffRoleGroupDeleteBat(ids: string) {
        let url = "/staff/role";
        let data = "account_token=" + this.token + "&ids=" + ids;
        return await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取员工组模型
     * @param id 
     */
    public async staffRoleGroupModel(id: number) {
        let url = "/staff/role/" + id;
        let data = "account_token=" + this.token;
        let result: staffRoleModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
    //#endregion

    /**
     * 验证超级密码是否正确
     * @param super_password 
     */
    public async getStaffSupperPassword(super_password: string) {
        let url = "/staff/users/super";
        let data = "account_token=" + this.token + "&super_password=" + super_password;
        let result: staffRoleModel.Result = await this.httpPost(url, data);
        return result;
    }
}
