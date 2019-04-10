import * as laBaseApi from '@/api/BaseApi';

import * as dictionaryModel from '@/models/DictionaryModel';

/**
 * 字典API
 */
export class DictionaryApi extends laBaseApi.BaseApi {

    /**
     * 获取列表
     */
    public async getList(strWhere: string = "") {
        let url: string = "/tools/dictionary";
        let result: dictionaryModel.DictionaryListResult = await this.httpGet(url);
        return result;
    }
}