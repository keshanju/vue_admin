import { Component, Vue, Prop } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import dialog from "devextreme/ui/dialog";

import { BaseModel } from "@/models/BaseModel";
import { RespCode } from "@/common/RespCode";
import { CommonUtils } from "@/common/CommonUtils";
import LogUtil from "@/utils/LogUtil";

/**
 * API 基类
 * ,{
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
 */
export class BaseApi {
  //Api基本Url
  protected baseURL: string = CommonUtils.apiUrl;
  //Token
  protected token: string = CommonUtils.getToken().token;
  /**
   * GET请求
   * @param url
   */
  protected async httpGet(url: string, isLogin = true) {
    let d = await Promise.resolve(axios.get(this.baseURL + url));
    return this.getDataReturn(d, isLogin);
  }

  /**
   * Post
   * @param url
   * @param data
   */
  protected async httpPost(url: string, data: any, isLogin = true) {
    //axios.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded";
    let d = await Promise.resolve(axios.post(this.baseURL + url, data));
    return this.getDataReturn(d, isLogin);
  }

  /**
   * Put
   * @param url
   * @param data
   */
  protected async httpPut(url: string, data: any, isLogin = true) {
    let d = await Promise.resolve(axios.put(this.baseURL + url, data));
    return this.getDataReturn(d, isLogin);
  }

  /**
   * Delete
   * @param url
   * @param data
   */
  protected async httpDelete(url: string, isLogin = true) {
    let d = await Promise.resolve(axios.delete(this.baseURL + url));
    return this.getDataReturn(d, isLogin);
  }

  //#region http Json
  /**
   * PostJson数据
   * @param url
   * @param data
   */
  protected async httpPostJson(url: string, data: any, isLogin = true) {
    //LogUtil.info(data);
    //处理数据为空的json键值对
    for (const item in data) {
      let val = data[item];
      if (val == undefined || val == null) {
        delete data[item];
      }
    }
    let d = await Promise.resolve(axios.post(this.baseURL + url, data));
    return this.getDataReturn(d, isLogin);
  }

  /**
   * PutJson数据
   * @param url
   * @param data
   */
  protected async httpPutJson(
    url: string,
    data: any,
    isLogin = true
  ) {
    //处理数据为空的json键值对
    // for (let item of data) {
    //     let val = data[item];
    //     if (val == undefined || val == null || val == "") {
    //         delete data[item];
    //     }
    // }
    for (const item in data) {
        let val = data[item];
        if (val == undefined || val == null) {
          delete data[item];
        }
      }
    let d = await Promise.resolve(axios.put(this.baseURL + url, data));
    return this.getDataReturn(d, isLogin);
  }

  /**
   * 下载文件
   * @param url
   * @param data
   * @param fileName
   * @param isLogin
   */
  protected async httpPostJsonDownFile(
    url: string,
    data: any,
    fileName: string,
    isLogin = true
  ) {
    let d = await Promise.resolve(
      axios.post(this.baseURL + url, data, {
        responseType: "blob"
      })
    );
    if (d.data) {
      if (d.data.type == "application/json") {
        let ss = await this.GetBlobString(d.data);
        let jj = JSON.parse(ss);
        return jj;
      }
      let blob = d.data;
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  /**
   * 获取二进制文本
   * @param url
   */
  public async GetBlobString(url: Blob): Promise<string> {
    var promise = new Promise<string>(resolve => {
      var reader = new FileReader();
      reader.readAsText(url, "utf-8");
      reader.onload = e => {
        resolve(reader.result.toString());
      };
    });
    return promise;
  }
  //#endregion

  /**
   * 检查同意账号登录情况
   * @param d
   * @param isLogin
   */
  private getDataReturn(d: AxiosResponse<any>, isLogin = true) {
    if (isLogin) {
      let data: BaseModel = d.data;
      if (!CommonUtils.isAlert) {
        if (
          data.code == RespCode.IsSameLogin ||
          data.code == RespCode.IsLoginTimeOut
        ) {
          dialog
            .alert("您的登录已过期,请重新登录!", "提示信息")
            .then((d: any) => {
              CommonUtils.isAlert = true;
              CommonUtils.Router.push({ path: "/login" });
            });
          return null;
        } else {
          return d.data;
        }
      }
      return d.data;
    } else {
      return d.data;
    }
  }

  /**
   * http 上传
   * @param url
   * @param data
   */
  public async upload<T>(url: string, data: any) {
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    let d = await Promise.resolve(axios.post(this.baseURL + url, data, config));
    return d.data as T;
  }
}
