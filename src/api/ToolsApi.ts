import * as laBaseApi from "@/api/BaseApi";
/**
 * 常用的工具类
 */
export class ToolsApi extends laBaseApi.BaseApi {
  /**
   * 获取国家代码
   */
  public async getCountryCodeList() {
    let result: {
      code: number;
      msg: string;
      data: {
        now_country: number;
        list_country: any;
      };
    } = await this.httpGet("/tools/auth_country");
    return result;
  }
}
