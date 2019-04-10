import * as laBaseApi from '@/api/BaseApi';
import * as nodeModel from '@/models/NodeModel';

/**
 * 节点API
 */
export class NodeApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/node?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: nodeModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/node/lists?account_token=" + this.token+"&"+strWhere;
        let result: nodeModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/node";
        let data = postData;
        let result: nodeModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/node/" + id;
        let data = postData;
        let result: nodeModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/node/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: nodeModel.Result = await this.httpDelete(url + "?" + data);
        return result;
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/node/" + id;
        let data = "account_token=" + this.token;
        let result: nodeModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }


    /**
   * 获取勾选关系
   * @param id 
   */
    public async getNodeServerSelected(id: number) {
        let url: string = "/staff/node/" + id + "/server?account_token=" + this.token;
        let result: nodeModel.NodeServerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 更新勾选关系
     */
    public async setNodeServerSelected(id: number, bind_ids: number[]) {
        let url: string = "/staff/node/" + id + "/server?account_token=" + this.token;
        let json = {
            account_token: this.token,
            server_ids: bind_ids
        };
        let result: nodeModel.Result = await this.httpPostJson(url, json);
        return result;
    }
}