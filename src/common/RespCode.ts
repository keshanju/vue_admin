/**
 * 返回结果
 */
export class RespCode {

    /**
     * 是否为0
     */
    public static zero = 0;
    /**
     * 是否成功
     */
    public static OK: number = 0;

    /**
     * 是否相同 没有修改
     */
    public static isSame: number = 400009;

    /**
     * 数据库没有任何数据发生改变
     */
    public static isSameSaveData: number = 300001;


        /**
     * 多账号登录
     */
    public static IsSameLogin: number = 400006;

    /**
     * 账号过期
     */
    public static IsLoginTimeOut: number = 400007;
}
