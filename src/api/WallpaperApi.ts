import * as laBaseApi from '@/api/BaseApi';
import {WallpaperModel} from '@/models/WallpaperModel';
import {BaseArray2, BasePager2, BaseModel2, BaseResult2} from '@/models/BaseModel';


/**
 * 壁纸相关api
 */
export class WallpaperApi extends laBaseApi.BaseApi {
    /**
     * 获取分页列表
     * @param strWhere
     * @param pageSize
     * @param pageIndex
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/wallpaper/cate?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/wallpaper/cate/lists?account_token=" + this.token;
        let result: BaseArray2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model
     */
    public async setAdd(postData: string) {
        let url = "/staff/wallpaper/cate";
        let data = postData;
        let result: BaseModel2<WallpaperModel> = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id
     * @param model
     */
    public async setUpdate(id: number, postData: string) {
        let url = "/staff/wallpaper/cate/" + id;
        let data = postData;
        let result: BaseModel2<WallpaperModel> = await this.httpPut(url, data);
        return result;
    }

    /**
     * 获取分类详情
     * @param id
     */
    public async getDetailList(id: number) {
        let url: string = "/staff/wallpaper/cate/" + id + "?account_token=" + this.token;
        let result: BaseArray2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 删除
     * @param ids
     */
    public async setDelete(id: number) {
        let url = "/staff/wallpaper/cate/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: BaseModel2<WallpaperModel>= await this.httpDelete(url + "?" + data);
        return result;
    }

    /**
     * 获取分页列表
     * @param strWhere
     * @param pageSize
     * @param pageIndex
     */
    public async getWallListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/wallpaper?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 删除
     * @param ids
     */
    public async setWallDelete(id: number) {
        let url = "/staff/wallpaper/" + id;
        let data = "account_token=" + this.token + "&ids=" + id;
        let result: BaseArray2<WallpaperModel>= await this.httpDelete(url + "?" + data);
        return result;
    }

    /**
     * 获取分类简单列表
     */
    public async getCateSimpleList() {
        let url: string = "/staff/wallpaper/cate/lists?account_token=" + this.token;
        let result: BaseArray2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 新增壁纸
     * @param postData
     */
    public async setWallAdd(postData: string) {
        let url = "/staff/wallpaper";
        let data = postData;
        let result: BaseModel2<WallpaperModel> = await this.httpPost(url, data);
        return result;
    }

    /**
     * 修改壁纸
     * @param id
     * @param postData
     */
    public async setWallUpdate(id: number, postData: string) {
        let url = "/staff/wallpaper/" + id;
        let data = postData;
        let result: BaseModel2<WallpaperModel> = await this.httpPut(url, data);
        return result;
    }


    /**
     * 获取壁纸详情
     * @param id
     */
    public async getWallDetailList(id: number) {
        let url: string = "/staff/wallpaper/" + id + "?account_token=" + this.token;
        let result: BaseModel2<WallpaperModel> = await this.httpGet(url);
        return result;
    }

}