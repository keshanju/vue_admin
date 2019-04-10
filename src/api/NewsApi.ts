import * as laBaseApi from '@/api/BaseApi';
import * as NewsModel from '@/models/NewsModel';
import {NewsLabelModel} from "@/models/NewsModel";
import {Result} from "@/models/NewsModel";
import {NewsModelResult} from "@/models/NewsModel";

/**
 * 公告API
 */
export class NewsApi extends laBaseApi.BaseApi {
    /**
     * 获取分页列表
     * @param strWhere
     * @param pageSize
     * @param pageIndex
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/news?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: NewsModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取标签列表
     * @param {string} strWhere
     * @param {number} pageSize
     * @param {number} pageIndex
     * @returns {Promise<PagerListResult>}
     */
    public async getLabelList(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/news/label?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: NewsModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取标签详情
     * @param {number} id
     * @returns {Promise<ModelResult>}
     */
    public async getLableDetail(id: number) {
        let url = "/staff/news/label/" + id;
        let data = "account_token=" + this.token;
        let result: NewsModel.NewsModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 修改标签
     * @param {number} id
     * @param {string} postData
     * @returns {Promise<Result>}
     */
    public async setUpdateNewsLabel(id: number, postData: string) {
        let url = "/staff/news/label/" + id;
        let data = postData;
        let result: NewsModel.NewsModelResult = await this.httpPut(url, data);
        return result;
    }

    /**
     * 新增标签
     * @param {string} postData
     * @returns {Promise<Result>}
     */
    public async setAddNewsLabel(postData: string) {
        let url = "/staff/news/label";
        let data = postData;
        let result: NewsModel.NewsModelResult = await this.httpPost(url, data);
        return result;
    }

    /**
     * 删除标签
     * @param {number} id
     * @returns {Promise<ModelResult>}
     */
    public async deleteNewsLabel(id: number) {
        let url = "/staff/news/label/" + id;
        let data = "account_token=" + this.token;
        let result: NewsModel.NewsModelResult = await this.httpDelete(url + "?" + data);
        return result;
    }


    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/news/lists?account_token=" + this.token;
        let result: NewsModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model
     */
    public async setAdd(postData: string) {
        let url = "/staff/news";
        let data = postData;
        let result: NewsModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id
     * @param model
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/news/" + id;
        let data = postData;
        let result: NewsModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids
     */
    public async setDelete(id: number) {
        let url = "/staff/news/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: NewsModel.Result = await this.httpDelete(url + "?" + data);
    }

    /**
     * 获取模型
     * @param id
     */
    public async getModel(id: number) {
        let url = "/staff/news/" + id;
        let data = "account_token=" + this.token;
        let result: NewsModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 生成咨询Json列表
     * @param type  0：公告，1：帮助，2：咨询，3：问答
     */
    public async createNewsJson(type: string = "") {
        let url = "/staff/cms/statics/news_json_list";
        let data = "account_token=" + this.token + "&class_type=" + type;
        let result: NewsModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 生成咨询详情Html
     * @param news_ids    资讯ID，多个以逗号隔开
     */
    public async createNewsDetails(news_ids: string) {
        let url = "/staff/cms/statics/news_info";
        let data = "account_token=" + this.token + "&news_ids=" + news_ids;
        let result: NewsModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 重新生成新闻所有详细
     */
    public async reCreateAllNewsDetails() {
        let url = "/staff/queue/cms/statics/news_info";
        let data = "account_token=" + this.token;
        let result: NewsModel.Result = await this.httpPost(url, data);
        return result;
    }
}