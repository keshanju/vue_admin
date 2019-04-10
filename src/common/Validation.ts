
import * as lang from '@/common/Lang'
/**
 * 验证包
 */
export class Validation {
    //是否合法Url
    private static urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    //手机号
    private static MobileNumber = "^((13[0-9])|(14[5|7])|(15[^4,\\D])|(18[0-9]))\\d{8}$";
    //电话
    private static Tel = "(^((13[0-9])|(14[5|7])|(15[^4,\\D])|(18[0-9]))\\d{8})|(^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?))|(^(0\\d{2}\\d{8}(\\d{1,4})?)|(0\\d{3}\\d{7,8}(\\d{1,4})?))$";
    //密码
    private static Password = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/;
    //车牌号
    private static TruckNO = '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$';
    //驾照
    private static DriverLicenseNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //身份证
    private static IDCardNO = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //营业执照三证合一
    private static UniformSocialCode = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
    //手机号
    private static MobileNumberPatter = /^(13|14|15|17|18)\d{9}$/i;
    //用户效验格式
    //private static UserNamePatter = /^[a-zA-z][1-9][_]\w{3,15}$/;
    private static UserNamePatter = /^[a-zA-Z0-9_]\w{3,15}$/;
    /**
     * 非空
     */
    public static getRequired(msg: string = "登录账号"): object {
        //let str = lang.Lang.lang_valid_required.replace("{0}", msg)
        return {
            type: "required",
            message: msg
        }
    }

    /**
     * 字符长度
     * @param min 
     * @param max 
     * @param msg  {0} {1} 占位符
      */
    public static getStringLength(min: number = 4, max: number = 16, msg: string = "账号"): object {
        //let str = lang.Lang.MinMax.replace("{0}", msg).replace("{1}", String(min)).replace("{2}", String(max));
        return {
            type: "stringLength",
            min: min,
            max: max,
            message: msg
        }
    }

    /**
     * 比较字段
     * @param formField 
     * @param msg 
     */
    public static getCompare(compareHandler: () => void, msg: string = "两次输入的密码不相同!") {
        return {
            type: "compare",
            message: msg,
            comparisonTarget: compareHandler
        };
    }

    /**
     * 邮箱
     * @param msg 
     */
    public static getEmail(msg: string = "不是有效的邮箱!"): object {
        return {
            type: 'pattern',
            pattern: "^([a-z0-9A-Z]+[_|-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$",
            message: msg
        };
    }

    /**
     * 手机号号码
     * @param msg 
     */
    public static getMobile(msg: string = "不是有效的手机号码!"): object {
        return {
            type: 'pattern',
            pattern: "^((13[0-9])|(15[^4,\\D])|(18[0,5-9])|(99[0-9]))\\d{8}$",
            message: msg
        };
    }

    /**
     * 电话
     * @param msg 
     */
    public static getTel(msg: string = "不是有效的电话!"): object {
        return {
            type: 'pattern',
            pattern: this.Tel,
            message: msg
        };
    }

    /**
     * 身份证号码
     * @param msg 
     */
    public static getIdNumber(msg: string = "不是有效的身份证号码!"): object {
        return {
            type: 'pattern',
            //pattern: this.IDCardNO,
            pattern: /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2018)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
            message: msg
        };
    }

    /**
     * 用户名
     * @param msg 
     */
    public static getUserName(msg: string = "不是有效的用户格式!"): object {
        return {
            type: 'pattern',
            pattern: this.UserNamePatter,
            message: msg
        };
    }


    /**
     * 
     * //强：字母+数字+特殊字符^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$    
//中：字母+数字，字母+特殊字符，数字+特殊字符

^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$

//弱：纯数字，纯字母，纯特殊字符
^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$
     * 密码强度
     * @param msg 
     */
    public static getPassword(msg: string = "密码强度不够!"): object {
        return {
            type: 'pattern',
            //pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,}$/,
            pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,}$/,
            message: msg
        };
    }

    /**
     * 会员重置密码
     * @param msg 密码必须6~20位字母+数字组合
     */
    public static getPassword2(msg: string = "密码强度不够!"): object {
        return {
            type: 'pattern',
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: msg
        };
    }

    /**
     * 邮政编码
     * @param msg 
     */
    public static getPostCode(msg: string = ""): object {
        return {
            type: 'pattern',
            pattern: /^[a-zA-Z0-9]{3,12}$/,
            message: msg
        };
    }

    /**
     * IP验证
     * @param msg 
     */
    public static getIP(msg: string = "IP地址无效") {
        return {
            type: 'pattern',
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
            message: msg
        };
    }

    /**
     * 判断是否网址或者IP
     */
    public static getHttp(msg: string = "网址无效") {
        let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@  
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
            + "|" // 允许IP和DOMAIN（域名）  
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
            + "[a-z]{2,6})" // first level domain- .com or .museum  
            + "(:[0-9]{1,4})?" // 端口- :80  
            + "((/?)|" // a slash isn't required if there is no file name  
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        return {
            type: 'pattern',
            pattern: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,
            message: msg
        };
    }

    /**
     * 判断线路布局是否正确
     */
    public static getLayoutCode(msg: string = "线路布局无效") {
        return {
            type: 'pattern',
            //pattern: /[A-Z]{2}-[A-Z]{2}/,
            pattern: /^[a-zA-Z_]\w{3,}$/,
            message: msg
        };
    }


    // public static getHttpIP(msg: string = "网址无效"){
    //      return {
    //         type: 'pattern',
    //         pattern: /^([w-]+.)+((com)|(net)|(org)|(gov.cn)|(info)|(cc)|(com.cn)|(net.cn)|(org.cn)|(com.ru)|(net.ru)|(org.ru)|(name)|(biz)|(hk)|(tv)|(cn))$/,
    //         message: msg
    //     };
    // }

}
