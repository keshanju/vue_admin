import * as laBaseApi from '@/api/BaseApi';
import * as ApprovalModel from '@/models/ApprovalModel';

/**
 * 审批API
 */
export class ApprovalApi extends laBaseApi.BaseApi {
    /**
         * 获取分页列表
         * @param strWhere 
         * @param pageSize 
         * @param pageIndex 
         */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/member/refund/approval?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: ApprovalModel.PagerListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/member/refund/approval/lists?account_token=" + this.token;
        let result: ApprovalModel.ListResult = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(postData: string) {
        let url = "/staff/member/refund/approval";
        let data = postData;
        let result: ApprovalModel.Result = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/member/refund/approval/" + id;
        let data = postData;
        let result: ApprovalModel.Result = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/member/refund/approval/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: ApprovalModel.Result = await this.httpDelete(url + "?" + data);
    }
    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/member/refund/approval/" + id;
        let data = "account_token=" + this.token;
        let result: ApprovalModel.ModelResult = await this.httpGet(url + "?" + data);
        return result;
    }


    /**
  * 获取模型
  * @param user_id 
  */
    public async getModelRefundInfo(user_id: number) {
        let url = "/staff/member/" + user_id + "/refund";
        let data = "account_token=" + this.token;
        let result: ApprovalModel.RefundInfoModelResult = await this.httpGet(url + "?" + data);
        return result;
    }

    /**
     * 添加退款信息
     * @param model 
     */
    public async setAddRefundInfo(member_id: number, postData: string) {
        let url = "/staff/member/"+member_id+"/refund";
        let data = postData;
        let result: ApprovalModel.Result = await this.httpPost(url, data);
        return result;
    }


    /**
     * 更新审批
     * @param id 
     * @param postData 
     */
    public async setUpdateApproval(id:number,postData:object){
        let url = "/staff/member/refund/approval/" + id;
        let data = postData;
        let result: ApprovalModel.Result = await this.httpPostJson(url, data);
        return result;
    }
}