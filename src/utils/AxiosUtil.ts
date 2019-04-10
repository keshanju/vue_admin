import axios, { AxiosResponse } from 'axios';
import { CommonUtils } from '@/common/CommonUtils';
export class AxiosUtil {

    /**
     * http get
     * @param url 
     */
    public static async get<T>(url: string) {
        let d = await Promise.resolve(axios.get(CommonUtils.apiUrl + url));
        return d.data as T;
    }

    /**
     * http post
     * @param url 
     * @param data 
     */
    public static async post<T>(url: string, data: any) {
        let d = await Promise.resolve(axios.post(CommonUtils.apiUrl + url, data));
        return d.data as T;
    }

    /**
     * http put
     * @param url 
     * @param data 
     */
    public static async put<T>(url: string, data: any) {
        let d = await Promise.resolve(axios.put(CommonUtils.apiUrl + url, data));
        return d.data as T;
    }

    /**
     * http delete
     * @param url 
     */
    public static async delete<T>(url: string) {
        let d = await Promise.resolve(axios.delete(CommonUtils.apiUrl + url));
        return d.data as T;
    }

    /**
     * http 上传
     * @param url 
     * @param data 
     */
    public static async upload<T>(url: string, data: any) {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        let d = await Promise.resolve(axios.post(CommonUtils.apiUrl + url, data,config));
        return d.data as T;
    }
}