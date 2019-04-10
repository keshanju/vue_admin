import * as laBaseApi from "@/api/BaseApi";
import * as InvoiceModel from "@/models/InvoiceModel";

/**
 * 订单API
 */
export class InvoiceApi extends laBaseApi.BaseApi {
  /**
   * 获取分页列表
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async getListPager(
    dbNum: string = "001",
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/branch/" +
      dbNum +
      "/invoice?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: InvoiceModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(strWhere: string = "") {
    let url: string = "/staff/invoice?account_token=" + this.token;
    let result: InvoiceModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async setAdd(postData: string) {
    let url = "/staff/invoice";
    let data = postData;
    let result: InvoiceModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(id: number, postData: string) {
    let url = "/staff/invoice/" + id;
    let data = postData;
    let result: InvoiceModel.Result = await this.httpPut(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(id: number) {
    let url = "/staff/invoice/" + id;
    let data = "account_token=" + this.token + "&ids=" + id;
    let result: InvoiceModel.Result = await this.httpDelete(url + "?" + data);
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(id: number) {
    let url = "/staff/invoice/" + id;
    let data = "account_token=" + this.token;
    let result: InvoiceModel.ModelResult = await this.httpGet(url + "?" + data);
    return result;
  }

  /**
   * 取消订单
   * @param dbNum
   * @param id
   * @param postData
   */
  public async setUpdateCancel(
    dbNum: string = "001",
    id: number,
    postData: object
  ) {
    let url = "/staff/branch/" + dbNum + "/invoice/cancel/" + id;
    let data = postData;
    let result: InvoiceModel.Result = await this.httpPostJson(url, data);
    return result;
  }

  public async getListPager_invoice(
    invoice_no: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    console.log(invoice_no);
    let url=`/staff/invoice_no?account_token=${this.token}&invoice_no=${invoice_no}&size=${pageSize}&page=${pageIndex}`;
    let result: InvoiceModel.PagerListResult = await this.httpGet(url);
    return result;
  }

}

/**
 * 订单错误
 */
export class InvoiceErrorApi extends laBaseApi.BaseApi {
  public async getListPager(
    dbNum: string = "",
    invoice_no: string = "",
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url = `/staff/branch/invoice/logs?account_token=${
      this.token
    }&invoice_no=${invoice_no}&db_id=${dbNum}&size=${pageSize}&page=${pageIndex}${strWhere}`;
    let result: InvoiceModel.PagerListResult = await this.httpGet(url);
    return result;
  }
}
