import * as laBaseApi from '@/api/BaseApi';
import * as PackageOpLogModel from '@/models/PackageOpLogModel';

/**
 * 套餐操作日志API
 */
export class PackageOpLogApi extends laBaseApi.BaseApi {
/**
     * 获取分页列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/package/oplogs?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex+strWhere;
        let result: PackageOpLogModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/packageopLog?account_token=" + this.token;
        let result: PackageOpLogModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData:string) {
        let url = "/staff/packageopLog";
        let data = postData;
        let result: PackageOpLogModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id:number,postData:string) {
        let url = "/staff/packageopLog/" + id;
        let data = postData;
        let result: PackageOpLogModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/packageopLog/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: PackageOpLogModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/packageopLog/" + id;
        let data = "account_token=" + this.token;
        let result: PackageOpLogModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }
}