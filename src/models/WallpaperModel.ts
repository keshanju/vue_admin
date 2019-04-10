import * as lsModel from '@/models/BaseModel';
import array_store from "devextreme/data/array_store";

/**
 *
 */
export interface WallpaperCateModel {
    account_token?: string;
    id?: number;
    pid?: number;
    name?: string;
    name_en?: string;
    order?: number;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    delete_time?: string;
    delete_staff_id?: number;
    create_staff_name?: string;
    free_include_region_codes?: string,
    free_include_region_codes_arr?:number[],
    free_exclude_region_codes?:string,
    free_exclude_region_codes_arr?:number[]
}
export interface WallpaperModel {
    account_token?: string;
    id?: number;
    pid?: number;
    title?: string;
    img_url?: string;
    order?: number;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    delete_time?: string;
    delete_staff_id?: number;
    create_staff_name?: string;
    free_include_region_codes?: string,
    free_include_region_codes_arr?:number[],
    free_exclude_region_codes?:string,
    free_exclude_region_codes_arr?:number[]
}
