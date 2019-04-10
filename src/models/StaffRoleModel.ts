import * as lsModel from '@/models/BaseModel';

/**
 * 员工角色模型
 */
export interface StaffRoleModel {
    id?: number;
    name?: string;
    create_staff_id?: number;
    create_time?: string;
    menu_ids?: string;
    data_selected_all?: boolean;
}

/**
 * 员工角色操作
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 员工角色单个结果模型
 */
export interface ModelResult extends lsModel.BaseModel {
    data: StaffRoleModel
}

/**
 * 员工角色结果模型
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<StaffRoleModel>
}

/**
 * 员工角色分页结果模型
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<StaffRoleModel>;
    }
}
