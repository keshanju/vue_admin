import * as laBaseApi from '@/api/BaseApi';

export class SeometaApi extends laBaseApi.BaseApi {
    public async getAllSeoMeta() {
        let url: string = "/staff/seometa?account_token=" + this.token;
        let result: any = await this.httpGet(url);
        return result;
    }

    public async updateOneSeoMeta(id, data) {
        let url: string = "/staff/seometa/" + id + "?account_token=" + this.token;
        let result: any = await this.httpPut(url, data);
        return result;
    }

    public async createOneSeoMeta(data) {
        let url: string = "/staff/seometa?account_token=" + this.token;
        let result: any = await this.httpPost(url, data);
        return result;
    }

    public async deleteOneSeoMeta(id) {
        let url: string = "/staff/seometa/"+ id +"?account_token=" + this.token;
        let result: any = await this.httpDelete(url);
        return result;
    }
}