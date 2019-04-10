
/**
 * 语言包
 */
export class Lang { 
    //#region 公共部分
    public static Submit: string = "提交";
    public static Cancel: string = "取消";
    public static Update: string = "更新";
    public static Delete: string = "删除";
    public static Add: string = "添加";
    public static Search: string = "搜索";
    public static Edit: string = "编辑";
    public static Back: string = "返回";
    public static Normal: string = "正常";
    public static Close: string = "关闭";
    public static Operate: string = "操作";
    public static UserName: string = "账号";
    public static Name: string = "姓名";
    public static Exit: string = "退出";
    public static Version: string = "版本";
    public static CopyRight: string = "版权所有";
    public static confirm_title: string = "确认框";
    public static alert_title: string = "提示信息";
    public static do_Success = "处理成功!";
    public static do_Faild = "处理失败!";
    public static do_Error = "处理异常";
    //#endregion
    public static MinMax: string = "{0}必须是{1}~{2}字符串!";
    //#region 验证提示
    public static lang_valid_required = "{0}不能为空!";
    public static lang_valid_compare = "两次输入的{0}不相同!";
    //#endregion

    //#region 搜索
    public static lang_search_type = "请选择搜索类型";
    public static lang_search_type_1 = "按账号搜索";
    public static lang_search_type_2 = "按名称搜索";
    public static lang_search_input_keyword = "请输入关键词搜索";

    //#endregion

    //#region 登录
    public static lang_login_username = "用户名";
    public static lang_login_password = "密码";
    public static lang_login_captcha = "验证码";
    public static lang_login_captcha_key = "验证码图片";
    public static lang_login_login_button = "登录";
    //#endregion

    //#region 员工
    public static lang_staff_name: string = "员工账号";
    public static lang_staff_pwd: string = "密码";
    public static lang_staff_pwd2: string = "确认密码";
    public static lang_name1: string = "员工姓名";
    public static lang_role_id: string = "角色";
    public static lang_id_number: string = "身份证号";
    public static lang_qq: string = "QQ";
    public static lang_mail: string = "邮箱";
    public static lang_phone: string = "电话";
    public static lang_address: string = "地址";
    public static lang_status: string = "状态";
    public static lang_end_time: string = "过期时间";
    public static lang_limited_ip: string = "有效IP";
    public static lang_last_login_time: string = "最后登录时间";
    //#endregion

    //#region 员工角色
    public static lang_role_name: string = "角色名称";
    public static lang_role_create_staff_id: string = "创建人";
    public static lang_role_create_time: string = "创建时间";
    public static lang_role_menu_ids: string = "菜单列表";
    public static lang_role_data_selected_all: string = "全选";
    //#endregion

    public static ChangeLang(str: string) {
        Lang.Add = "add";
        Lang.Search = "search";

    }
}
