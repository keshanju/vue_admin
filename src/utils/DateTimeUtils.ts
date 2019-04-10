/**
let d1 = new Date('2016/03/28 10:17:22');
let d2 = new Date('2016/03/28 11:17:22');
console.log(parseInt(d2 - d1));//两个时间相差的毫秒数
console.log(parseInt(d2 - d1) / 1000);//两个时间相差的秒数
console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的分钟数
console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的小时数
 */
export enum DateTimeEnum {
    Year,
    Month,
    Date,
    Week,
    Hour,
    Minute,
    Second,
    Milliscond
}

export class DateTimeUtils {

    /**
     * 比较时间
     * @param curTime 
     * @param destTime 
     */
    public compareDate(curTime: Date, destTime: Date) {
        // let curTime = new Date();
        // //2把字符串格式转换为日期类
        // let startTime = new Date(Date.parse(kc.begintime));
        // let endTime = new Date(Date.parse(kc.endtime));
        // return (curTime>=startTime && curTime<=endTime);
    }

    /**
     * 格式化时间
     * @param date 
     */
    public static parserDate(date: string) {
        let t = Date.parse(date);
        if (!isNaN(t)) {
            return new Date(Date.parse(date.replace(/-/g, "/")));
        } else {
            return new Date();
        }
    };

    /**
     * 
     * @param fmt 
     */
    public static getNow(fmt: string = "yyyy-MM-dd HH:mm:ss"): string {
        let d = new Date();
        let o = {
            "M+": d.getMonth() + 1, //月份 
            "d+": d.getDate(), //日 
            "H+": d.getHours(), //小时 
            "m+": d.getMinutes(), //分 
            "s+": d.getSeconds(), //秒 
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 转换时间
     * @param d 
     */
    public static convertDate(d: Date, fmt: string = "yyyy-MM-dd HH:mm:ss") {
        //let fmt: string = "yyyy-MM-dd HH:mm:ss";
        let o = {
            "M+": d.getMonth() + 1, //月份 
            "d+": d.getDate(), //日 
            "H+": d.getHours(), //小时 
            "m+": d.getMinutes(), //分 
            "s+": d.getSeconds(), //秒 
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
            "S": d.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 根据类型 添加时间
     * @param time 
     * @param type 
     * @param timeNumber 
     */
    public static AddTime(time: string, type: DateTimeEnum, timeNumber: number): string {
        let date = this.parserDate(time);
        switch (type) {
            case DateTimeEnum.Milliscond:
                date.setMilliseconds(date.getMilliseconds() + timeNumber);
                break;
            case DateTimeEnum.Date:
                date.setDate(date.getDate() + timeNumber);
                break;
            case DateTimeEnum.Month:
                date.setMonth(date.getMonth() + timeNumber);
                break;
            case DateTimeEnum.Week:
                date.setDate(date.getDate() + (timeNumber * 7));
                break;
        }
        return this.convertDate(date);
    }

    /**
     * 时间整合
     * @param date3 
     */
    public static TimeIntegrate(date3: number): string {
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)
        //alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
        let strTime = "";
        if (days > 0) {
            strTime += " " + days + "天 ";
        }

        if (hours > 0) {
            strTime += " " + hours + "小时 ";
        }

        if (minutes > 0) {
            strTime += " " + minutes + "分钟 ";
        }

        if (seconds > 0) {
            strTime += " " + seconds + "秒 ";
        }
        return strTime;
    }

    /**
     * 计算小时和分钟
     */
    public static TimeIntegrate2(date3: number): string {
        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)
        //alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
        let strTime = "";
        if (days > 0) {
            //strTime += " " + days + "天 ";
            hours += days * 24;
        }

        if (hours > 0) {
            strTime += " " + hours + "小时 ";
        }

        if (minutes > 0) {
            strTime += " " + minutes + "分钟 ";
        }

        // if (seconds > 0) {
        //     strTime += " " + seconds + "秒 ";
        // }
        return strTime;
    }
}