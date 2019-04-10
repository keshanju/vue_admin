/**
 * 日志封装
 */
export default class LogUtil {
    /**
     * 输出日志
     * @param message 
     * @param optionalParams 
     */
    public static info(message?: any, ...optionalParams: any[]) {
        let env = process.env.NODE_ENV as string;
        if (env && env.toLowerCase() == "development") {
            console.log(message);
        }
    }

    /**
     * 输出错误日志
     * @param message 
     * @param optionalParams 
     */
    public static error(message?: any, ...optionalParams: any[]) {
        let env = process.env.NODE_ENV as string;
        if (env && env.toLowerCase() == "development") {
            console.error(message);
        }
    }

}