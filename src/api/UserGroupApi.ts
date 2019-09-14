import * as laBaseApi from '@/api/BaseApi';
import * as usergroupModel from '@/models/UserGroupModel';
import * as baseModel from '@/models/BaseModel';

/**
 * 用户组Api
 */
export class UserGroupApi extends laBaseApi.BaseApi {
    /**
     * 获取用户组
     * @param strWhere
     * @param pageSize
     * @param pageIndex
     */
    public async UserGroupListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/group?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: usergroupModel.UserGroupPagerResult = await this.httpGet(url);
        return result;
    }


    /**
     * 添加用户组数据
     * @param postData a=1&b=2
     */
    public async userGroupAdd(postData: string) {
        let url: string = "/staff/group";
        let result: baseModel.BaseModel = await this.httpPost(url, postData);
        return result;
    }

    /**
     * 编辑用户组数据
     * @param postData
     */
    public async userGroupUpdate(id: number, postData: string) {
        let url: string = "/staff/group/" + id;
        let result: baseModel.BaseModel = await this.httpPut(url, postData);
        return result;
    }

    /**
     * 获取用户组模型
     * @param id
     */
    public async getUserGroupModel(id: number) {
        let url: string = "/staff/group/" + id + "?account_token=" + this.token;
        let result: usergroupModel.UserGroupSingleResult = await this.httpGet(url);
        return result;
    }


    /**
     * 获取用户组绑定套餐列表
     */
    public async getGroupPackageList(groupId: number, strWhere: string = "") {
        let url: string = "/staff/group/" + groupId + "/package?account_token=" + this.token;
        let result: usergroupModel.GroupPackageListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 更新用户组绑定游戏
     * @param id
     * @param model
     */
    public async setGroupPackage(groupId: number, bind_ids1: number[]) {
        let url = "/staff/group/" + groupId + "/package";
        let json = {
            account_token: this.token,
            package_id: bind_ids1
        }
        let result: usergroupModel.UserGroupSingleResult = await this.httpPostJson(url, json);
        return result;
    }

}
