import notify from 'devextreme/ui/notify'
import dialog from 'devextreme/ui/dialog'

/**
 * 消息封装
 */
export class MsgUtils{
/**
     * 弹出信息
     * @param aMsg
     * @param type success error
     */
    public static toast(
        call: (component: any, ele: Element, model: object) => void = null,
        aMsg: string = '你提交的信息已经完成!',
        types = 'success'
    ) {
        let aOptions: object = {
            message: aMsg,
            type: types,
            //position: { my: "top center", at: "top center", of: window, offset: "0 200" },
            position: { my: 'center center', at: 'center center', of: window },
            width: Math.min(aMsg.length * 15 + 60, 800),
            onHidden: call
        }
        notify(aOptions)
    }

    /**
     * 弹窗信息
     * @param aMsg
     * @param aTitle
     */
    public static alert(
        aMsg: string,
        aTitle: string = "提示"
    ): JQueryPromise<void> {
        return dialog.alert(aMsg, aTitle)
    }

    /**
     *
     * @param aMsg
     * @param aTitle
     */
    public static error(
        aMsg: string,
        aTitle: string = '错误信息'
    ): JQueryPromise<void> {
        return dialog.alert(aMsg, aTitle)
    }

    /**
     *
     * @param code
     * @param msg
     */
    public static errorCodeMsg(code: number, msg: string): JQueryPromise<void> {
        //  return this.error("<span style='color:red'>错误代码</span>: " + code + " <br/><span style='color:red'>错误信息</span>: " + msg);
        return this.error("<span style='color:red'>错误信息</span>: " + msg)
    }

    /**
     * 对话框信息
     * @param aMsg
     * @param aTitle
     */
    public static confirm(
        aMsg: string,
        aTitle: string = "确认"
    ): JQueryPromise<boolean> {
        return dialog.confirm(
            '<div style="min-width: 200px; text-align: center; padding: 10px">' +
                aMsg +
                '</div>',
            aTitle
        )
    }
}