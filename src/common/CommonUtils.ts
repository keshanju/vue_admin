import { Component, Vue, Prop } from 'vue-property-decorator';
import * as staffModel from '@/models/StaffModel';
import { DictionaryModel, DictionaryListResult } from '@/models/DictionaryModel';
import { GSettingApi } from '@/api/GSettingApi';
import { GSettingModel } from '@/models/GSettingModel';
import VueRouter from 'vue-router';
/**
 * 公共类库
 */
export class CommonUtils {

    // Api地址
    public static apiUrl: string = SITE_API_PATH; //"http://api.leigod.top";
    /**
     * 上传图片地址
     */
    public static uploadUrl: string = SITE_PIC_PATH;//window.SITE_API_PATH;
    // 后台标题
    public static siteName: string = SITE_TITLE;
    // 版本号
    public static version: string = "1.0";
    // 是否开发者模式
    public static isDebug: boolean = true;
    //默认图片
    public static DEFAULT_PIC_URL = "/static/empty.png";

    /**
     * 获取全局Token
     */
    public static getToken() {
        let uu = this.getStaffLoginInfo();
        if (uu == null) {
            return {
                token: "",
                token_time: ""
            }
        }
        let token = uu.data.login_info.account_token;// localStorage.getItem("Token");
        let token_time = uu.data.login_info.expiry_time;// localStorage.getItem("Token_Time");
        return {
            token,
            token_time
        };
    }

    /**
     * 设置用户登录信息
     * @param str 
     */
    public static setStaffLoginInfo(result: staffModel.StaffLoginResult) {
        localStorage.setItem("staff_login_info", JSON.stringify(result));
    }

    /**
     * 获取员工登录信息
     */
    public static getStaffLoginInfo(): staffModel.StaffLoginResult {
        let itemInfo = localStorage.getItem("staff_login_info");
        let staffLoginInfo: staffModel.StaffLoginResult = JSON.parse(itemInfo);
        return staffLoginInfo;
    }

    /**
     * 移除后台登录信息
     */
    public static removeStaffLoginInfo() {
        localStorage.removeItem("staff_login_info");
    }

    /**
     * 设置字典
     */
    public static setDictionary(dicModel: DictionaryListResult) {
        localStorage.setItem("set_dictionary_info", JSON.stringify(dicModel));
    }

    /**
     * 获取字典
     */
    public static getDictonary(): DictionaryListResult {
        let dic = JSON.parse(localStorage.getItem("set_dictionary_info")) as DictionaryListResult;
        return dic;
    }

    /**
     * 移除字典信息
     */
    public static removeDictionary() {
        localStorage.removeItem("set_dictionary_info");
    }

    /**
     * 根据字典获取对应的值
     * @param dic 
     * @param index 
     */
    public static getDicText(dic: Array<DictionaryModel>, index: number): string {
        if (dic != null || dic.length != 0) {
            let dd = dic.filter((ele, num) => {
                return ele.id == index;
            });
            if (dd.length > 0) {
                return dic.filter((ele, num) => {
                    return ele.id == index;
                })[0].name;
            }
            return "";
        }
        return "";
    }

    /**
     * 是否弹窗过
     */
    public static isAlert: boolean = false;

    /**
     * 
     */
    public static Router: VueRouter;

    //#region  设置全局
    /**
     * 设置全局
     */
    public static async SetSettings(list: Array<GSettingModel>) {
        localStorage.setItem("settings_dic", JSON.stringify(list));
    }

    // /**
    //  * 获取全局设置
    //  */
    public static GetSettings() {
        let dic = JSON.parse(localStorage.getItem("settings_dic")) as Array<GSettingModel>;
        return dic;
    }

    /**
     * 获取全局设置值
     * @param key 
     */
    public static GetSettingsVal(key: string): string {
        try {
            let dic = JSON.parse(localStorage.getItem("settings_dic")) as Array<GSettingModel>;
            let d = dic.filter((item, index) => {
                return item.key == key;
            });
            return d[0].value;
        } catch (sender) {
            return sender;
        }
    }
    //#endregion

    //#region  国家代码
    public static setCountryCode(dic:any){
        localStorage.setItem("settings_country_dic", JSON.stringify(dic));
    }

    public static getCountryCode(){
        let dic = JSON.parse(localStorage.getItem("settings_country_dic")) as Array<any>;
        return dic;
    }
    //#endregion
}


