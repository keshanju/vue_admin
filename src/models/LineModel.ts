import * as lsModel from '@/models/BaseModel';

/**
 * 线路模型
 */
export interface LineModel {
    account_token?: string;
    line_ids?:number[];
    id?: number,
    title?: string,
    line_level?: number,
    provider?: string,
    in_line_type?: number,
    create_time?: string,
    create_staff_id?: number,
    line_layout_code?: string,
    failover_line_id?: number,
    fault_status?: number,
    fault_desc?: string,
    fault_staff_id?: number,
    fault_time?: string,
    fault_resume_time?: string,
    fault_start_time?: string,
    fault_end_time?: string,
    download_line_id?: number,
    line_type?:number;
}

/**
 * 线路与节点模型
 */
export interface LineNodeModel {
    id?: number,
    line_id?:number;
    node_id?:number;
}

/**
 * 线路列表模型
 */
export interface LineListModel {
    id?: number,
    title?: string,
}

/**
 * 线路单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 线路模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: LineModel
}

/**
 * 线路列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<LineListModel>
}

/**
 * 线路分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<LineModel>;
    }
}

/**
 * 线路与节点
 */
export interface LineNodeListResult extends lsModel.BaseModel {
    data: Array<LineNodeModel>
}