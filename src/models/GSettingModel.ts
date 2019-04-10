import * as lsModel from '@/models/BaseModel';

/**
 * 全局设置模型
 */
export interface GSettingModel {
  account_token?: string,
  id?: number,// 编号
  key?: string,// 变量名称
  value?: string,// 值
  title?: string,// 名称
  key_type?: number,// 变量类别
  create_time?: string// 创建时间
}

/**
 * 员工单个全局设置模型
 */
export interface GSettingSingleResult extends lsModel.BaseModel {
    data: GSettingModel
}

/**
 * 全局设置分页结果模型
 */
export interface GSettingPagerResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<GSettingModel>;
    }
}
