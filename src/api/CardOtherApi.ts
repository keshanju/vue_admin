import { BaseModel2, BaseArray2, BasePager2, BaseResult2 } from "../models/BaseModel";
import { BaseApi } from './BaseApi';
import { CardOtherDefineModel } from '@/models/CardOtherModel';
/**
 * 定义
 */
export class CardOtherDefineApi extends BaseApi {

    /**
     * 获取卡定义列表
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = "/staff/other_cards?account_token=" + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/staff/other_cards/lists?account_token=" + this.token;
        let result: BaseArray2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 添加
     * @param model 
     */
    public async setAdd(data: CardOtherDefineModel) {
        let url = "/staff/other_cards";
        let result: BaseResult2 = await this.httpPost(url, data);
        return result;
    }

    /**
     * 更新
     * @param id 
     * @param model 
     */
    public async setUpdate(id: number, data: CardOtherDefineModel) {
        let url = "/staff/other_cards/" + id;
        let result: BaseResult2 = await this.httpPut(url, data);
        return result;
    }

    /**
     * 删除
     * @param ids 
     */
    public async setDelete(id: number) {
        let url = "/staff/other_cards/" + id + "?account_token=" + this.token;
        let result: BaseResult2 = await this.httpDelete(url);
        return result;
    }

    /**
     * 获取模型
     * @param id 
     */
    public async getModel(id: number) {
        let url = "/staff/other_cards/" + id + "?account_token=" + this.token;
        let result: BaseModel2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 导入充值卡 
     */
    public async importCard(id: number, form: FormData) {
        let url = "/staff/other_cards/" + id + "/import";
        let result: BaseResult2 = await this.upload(url, form);
        return result;
    }
}

/**
 * 废弃
 */
export class CardOtherAbandonApi extends BaseApi {

    /**
     * 废弃卡列表
     * @param id 
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = `/staff/other_cards/${id}/abandon?account_token=` + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }

    /**
     * 废弃卡 
     */
    public async abandonCard(id: number, card_id: number) {
        let url = `/staff/other_cards/${id}/card/${card_id}?account_token=${this.token}`;
        let result: BaseResult2 = await this.httpDelete(url);
        return result;
    }
}

/**
 * 未使用
 */
export class CardOtherUnUsedApi extends BaseApi {
    /**
     * 未使用卡列表
     * @param id 
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = `/staff/other_cards/${id}/card?account_token=` + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }
}

/**
 * 已使用
 */
export class CardOtherUsedApi extends BaseApi {
    /**
     * 已使用卡列表
     * @param id 
     * @param strWhere 
     * @param pageSize 
     * @param pageIndex 
     */
    public async getListPager(id: number, strWhere: string = "", pageSize: number = 15, pageIndex: number = 1) {
        let url: string = `/staff/other_cards/${id}/used?account_token=` + this.token + "&size=" + pageSize + "&page=" + pageIndex + strWhere;
        let result: BasePager2<CardOtherDefineModel> = await this.httpGet(url);
        return result;
    }
}