import * as laBaseApi from "@/api/BaseApi";
import * as packageModel from "@/models/PackageModel";
import * as discountModel from "@/models/DiscountModel";

/**
 * 套餐API
 */
export class PackageApi extends laBaseApi.BaseApi {
  /**
   * 获取分页列表
   * @param strWhere
   * @param pageSize
   * @param pageIndex
   */
  public async getListPager(
    strWhere: string = "",
    pageSize: number = 15,
    pageIndex: number = 1
  ) {
    let url: string =
      "/staff/package?account_token=" +
      this.token +
      "&size=" +
      pageSize +
      "&page=" +
      pageIndex +
      strWhere;
    let result: packageModel.PagerListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 获取列表
   */
  public async getList(strWhere: string = "") {
    let url: string = "/staff/package/list?account_token=" + this.token;
    let result: packageModel.ListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 添加
   * @param model
   */
  public async seteAdd(postData: string) {
    let url = "/staff/package";
    let data = postData;
    let result: packageModel.Result = await this.httpPost(url, data);
    return result;
  }

  /**
   * 更新
   * @param id
   * @param model
   */
  public async setUpdate(id: number, postData: string) {
    let url = "/staff/package/" + id;
    let data = postData;
    let result: packageModel.Result = await this.httpPut(url, data);
    return result;
  }

  /**
   * 删除
   * @param ids
   */
  public async setDelete(id: number) {
    let url = "/staff/package/" + id;
    let data = "account_token=" + this.token + "&ids=" + id;
    let result: packageModel.Result = await this.httpDelete(url + "?" + data);
  }
  /**
   * 获取模型
   * @param id
   */
  public async getModel(id: number) {
    let url = "/staff/package/" + id;
    let data = "account_token=" + this.token;
    let result: packageModel.ModelResult = await this.httpGet(url + "?" + data);
    return result;
  }

  /**
   * 获取套餐线路绑定列表
   */
  public async getPackageLineList(packageId: number, strWhere: string = "") {
    let url: string =
      "/staff/package/" + packageId + "/lines?account_token=" + this.token;
    let result: packageModel.PackageLinesListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 更新取套餐线路绑定
   * @param id
   * @param model
   */
  public async setPackageLine(packageId: number, bind_ids: number[]) {
    let url = "/staff/package/" + packageId + "/lines";
    let json = {
      account_token: this.token,
      bind_ids: bind_ids
    };
    let result: packageModel.Result = await this.httpPostJson(url, json);
    return result;
  }

  /**
   * 获取套餐游戏绑定列表
   */
  public async getPackageGameList(packageId: number, strWhere: string = "") {
    let url: string =
      "/staff/package/" + packageId + "/game?account_token=" + this.token;
    let result: packageModel.PackageGameListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 更新取套餐游戏绑定
   * @param id
   * @param model
   */
  public async setPackageGame(packageId: number, bind_ids: number[]) {
    let url = "/staff/package/" + packageId + "/game";
    let json = {
      account_token: this.token,
      bind_ids: bind_ids
    };
    let result: packageModel.Result = await this.httpPostJson(url, json);
    return result;
  }

  /**
   * 获取套餐充值卡绑定列表
   */
  public async getPackageCardList(packageId: number, strWhere: string = "") {
    let url: string =
      "/staff/package/" + packageId + "/card?account_token=" + this.token;
    let result: packageModel.PackageCardListResult = await this.httpGet(url);
    return result;
  }

  /**
   * 更新取套餐充值卡绑定
   * @param id
   * @param model
   */
  public async setPackageCard(packageId: number, bind_ids: number[]) {
    let url = "/staff/package/" + packageId + "/card";
    let json = {
      account_token: this.token,
      bind_ids: bind_ids
    };
    let result: packageModel.Result = await this.httpPostJson(url, json);
    return result;
  }

  //#region 打折
  /**
   * 获取打折绑定列表
   */
  public async getPackageDiscountList(
    packageId: number,
    strWhere: string = ""
  ) {
    let url: string =
      "/staff/package/" + packageId + "/discount?account_token=" + this.token;
    let result: {
      code: number;
      msg: string;
      data: {
        discount_ids: number[];
        package_id: number;
        price_ids: number[];
      };
    } = await this.httpGet(url);
    return result;
  }

  /**
   * 更新取打折绑定
   * @param id
   * @param model
   */
  public async setPackageDiscount(
    packageId: number,
    bind_ids: number[],
    selectedNodes_price: number[]
  ) {
    let url = "/staff/package/" + packageId + "/discount";
    let json = {
      account_token: this.token,
      bind_ids: bind_ids,
      bind_ids2: selectedNodes_price
    };
    let result: packageModel.Result = await this.httpPostJson(url, json);
    return result;
  }
  //#endregion
}
