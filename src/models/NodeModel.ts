
import * as lsModel from '@/models/BaseModel';

/**
 * 节点模型
 */
export interface NodeModel {
    account_token?:string;
    id?: number;
    name?: string;
    remark?: string;
    create_time?: string;
    change_time?: string;
    create_staff_id?: number;
    change_staff_id?: number;
    is_online?: number;
    min_vip_level?: number;
    node_type?:number;
}

/**
 * 节点与服务器模型
 */
export interface NodeServerModel {
    id?: number;
    node_id?:number;
    server_id?:number;
}

/**
 * 节点单个返回
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 节点模型返回
 */
export interface ModelResult extends lsModel.BaseModel {
    data: NodeModel
}

/**
 * 节点列表返回
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<NodeModel>
}

/**
 * 节点分页列表返回
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<NodeModel>;
    }
}

/**
 * 关系列表
 */
export interface NodeServerListResult extends lsModel.BaseModel {
    data: Array<NodeServerModel>
}