import * as laBaseApi from '@/api/BaseApi';
import * as CMSChannelModel from '@/models/CMSChannelModel';

/**
 * 布局API
 */
export class CMSChannelApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(project_id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/cms/project/" + project_id + "/channel?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: CMSChannelModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(project_id: number, strWhere: string = "") {
        let url: string = "/staff/cms/project/" + project_id + "/channel/lists?account_token=" + this.token;
        let result: CMSChannelModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(project_id: number, postData: string) {
        let url = "/staff/cms/project/" + project_id + "/channel";
        let data = postData;
        let result: CMSChannelModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(project_id: number, id: number, postData: string) {
        let url = "/staff/cms/project/" + project_id + "/channel/" + id;
        let data = postData;
        let result: CMSChannelModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(project_id: number, id: number) {
        let url = "/staff/cms/project/" + project_id + "/channel/" + id;
        let data = "account_token=" + this.token;
        let result: CMSChannelModel.Result = await this.httpDelete(url + "?" + data);
        return result;
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(project_id: number, id: number) {
        let url = "/staff/cms/project/" + project_id + "/channel/" + id;
        let data = "account_token=" + this.token;
        let result: CMSChannelModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 生成频道Html
     */
    public async createProjectChannelHtml(projectId: number, channelId: number) {
        let url = "/staff/cms/statics";
        let data = "account_token=" + this.token + "&project_id=" + projectId + "&channel_id=" + (channelId == -1 ? "" : channelId);
        let result: CMSChannelModel.Result = await this.httpPost(url, data);
        return result;
    }


    /**
     * 生成官网静态
     * @param projectId 
     * @param channelId 
     */
    public async createWwwHtml(create_type) {
        let url =`/staff/queue/cms/statics/www_html_create?create_type=${create_type}`;
        let data = `account_token=${this.token}`;
        let result: CMSChannelModel.Result = await this.httpPost(url, data);
        return result;
    }

    public async releaseWebHtml() {
        let url =`/staff/queue/cms/statics/release_web_html`;
        let data = `account_token=${this.token}`;
        let result: CMSChannelModel.Result = await this.httpPost(url, data);
        return result;
    }

    public async getHtmlCreateList() {
        let url =`/staff/queue/cms/statics/www_html_create?account_token=${this.token}`;
        let result: any = await this.httpGet(url);
        return result;
    }

    public async getCreateShellType() {
        let url =`/staff/queue/cms/statics/create_type?account_token=${this.token}`;
        let result: any = await this.httpGet(url);
        return result;
    }
}