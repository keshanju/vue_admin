import * as lsModel from '@/models/BaseModel';

/**
 * 菜单模型
 */
export interface MenuModel {
    account_token?: string;
    id?: number;
    menu_name?: string;
    menu_level?: number;
    menu_route?: string;
    menu_controller?: string;
    menu_action?: string;
    menu_pid?: number;
}

/**
 * 添加 修改 删除 结果模型
 */
export interface Result extends lsModel.BaseModel {

}

/**
 * 单个结果模型
 */
export interface SingleResult extends lsModel.BaseModel {
    data: MenuModel
}

/**
 * 菜单集合结果模型
 */
export interface ListResult extends lsModel.BaseModel {
    data: Array<MenuModel>
}


