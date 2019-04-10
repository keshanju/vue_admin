import * as laBaseApi from '@/api/BaseApi';
import * as lineModel from '@/models/LineModel';
import { CommonUtils } from '@/common/CommonUtils';

/**
 * 上传API
 */
export class UploadApi extends laBaseApi.BaseApi {

    /**
     * 获取上传访问路径
     */
    get getUploadHttp(): string {
        return CommonUtils.uploadUrl;
    }
    /**
     * 获取游戏背景上传地址
     */
    get getUploadGameBackGroundPath(): string {
        return this.baseURL + "/staff/game/background?account_token=" + this.token;
    }

    /**
     * 获取游戏小图标上传地址
     */
    get getUploadGamePicPath(): string {
        return this.baseURL + "/staff/game/pic?account_token=" + this.token;
    }

    /**
     * 获取标准上传文件路径
     */
    getUploadNormalPath(folder_name: string): string {
        return this.baseURL + "/staff/upload?account_token=" + this.token + "&folder_name=" + folder_name;
    }

    /**
     * 获取活动路径
     */
    getActivityUploadPath(folder_name: string): string {
        return this.baseURL + "/staff/activity/static?account_token=" + this.token + "&folder_name=" + folder_name;
    }

 /**
     * 获取新闻路径
     */
    getNewsUploadPath(folder_name: string): string {
        return this.baseURL + "/staff/news/batch?account_token=" + this.token + "&folder_name=" + folder_name;
    }
}