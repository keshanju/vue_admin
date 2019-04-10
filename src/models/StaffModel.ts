import * as lsModel from '@/models/BaseModel';

/**
 * 员工模型
 */
export interface StaffModel {
    account_token?: string,
    id?: number;
    staff_name?: string;
    staff_pwd?: string;
    staff_pwd2?:string;
    name?: string;
    role_id?: number;
    id_number?: string;
    qq?: number;
    mail?: string;
    phone?: number;
    address?: string;
    status?: number;
    end_time?: string;
    limited_ip?: string;
    last_login_time?: string;
    super_password?:string;
}

/**
 * 员工单个结果模型
 */
export interface ModelResult extends lsModel.BaseModel {
    data: StaffModel
}

/**
 * 员工分页结果模型
 */
export interface PagerListResult extends lsModel.BaseModel {
    data: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        list: Array<StaffModel>;
    }
}

/**
 * 验证码模型
 */
export interface StaffCaptchaResult {
    data: {
        key: string;
        img: string;
    }
}
/**
 * 登录模型
 */
export interface StaffLoginModel {
    username?: string;
    password?: string;
    captcha?: string;
    captcha_key?: string;
}

/**
 * 登录结果模型
 */
export interface StaffLoginResult extends lsModel.BaseModel {
    data: {
        /**
         * 登录信息
         */
        login_info: {
            /**
             * Token值
             */
            account_token: string;
            /**
             * Token时间
             */
            expiry_time: string;
        }
        /**
         * 用户数据信息
         */
        user_info: {
            id: 0;
            staff_name: string;
            status: 0;
            end_time: string;
            last_login_time: string;
            last_login_ip: string;
            limited_ip: string;
            name: string;
            id_number: string;
            qq: string;
            mail: string;
            phone: string;
            address: string;
            create_time: string;
            change_time: string;
            is_need_sms: string;
            role_id: string;
            role_name?:string;
        }
    }
}

