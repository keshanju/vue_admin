import DevExpress from "devextreme/bundles/dx.all";
import dxFileUploader from 'devextreme/ui/file_uploader';
import { CommonUtils } from "@/common/CommonUtils";
import { UploadApi } from "@/api/UploadApi";
import * as UploadModel from '@/models/UploadModel'
import { MsgUtils } from "@/utils/MsgUtils";

/**
 * Dev 控件封装
 */
export class DevUtils {


    /**
     * 获取上传表单项目
     * @param options 表单默认配置项
     * @param imgCallBack 图片地址回调方法 可以做插入图片使用
     * @param imgJQueryCall 缩略图回调方法 默认不用 如果数据在组件初始化赋值 需要 赋值变量
     */
    public static getUploadFormItem(fromItem: { options?: DevExpress.ui.dxFormSimpleItem, imgCallBack?: (imgSrc?: string) => void, imgJQueryCall?: (imgJQuery: JQuery<HTMLElement>) => void }) {
        let uploadApi = new UploadApi();
        let aObj: DevExpress.ui.dxFormSimpleItem = {
            dataField: "image",
            label: {
                text: "图片"
            },
            template: (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: any, editorType?: string, }, aItemEle: JQuery) => {
                let aHeight: string = 'auto';
                if (data.editorOptions && data.editorOptions['height']) {
                    aHeight = data.editorOptions['height'].toString();
                }
                let aSrc = CommonUtils.DEFAULT_PIC_URL;
                if (data.editorOptions && data.editorOptions['value']) {
                    aSrc = uploadApi.getUploadHttp + data.editorOptions['value'].toString();
                }
                let aStr = `<div style="border: 0px solid #F0BAB9; padding: 1px;">`;
                aStr += `<img name='image' style='max-height: 100px;height: ${aHeight}; max-width: 500px; border: 0px solid #eee; margin-bottom: 6px' src='${aSrc}' />`;
                aStr += '<div class="dx-field-item-label-content" >';
                aStr += '<label name="fileCombine" style="margin-bottom: 0px;width:50%;">';
                aStr += '<div name="changeFakeBtn" />';
                aStr += '</label>';
                aStr += '<div name="clearBtn" />';
                aStr += '</div>';
                aStr += '</div>';
                let aParentNode = $(aStr);
                let image = aParentNode.find('[name="image"]');
                let changeFakeBtn = aParentNode.find('[name="changeFakeBtn"]');
                aParentNode.appendTo(aItemEle);
                if (fromItem.imgJQueryCall)
                    fromItem.imgJQueryCall(image);
                let dxFile1 = new dxFileUploader(
                    changeFakeBtn[0],
                    {
                        name: 'filename',
                        multiple: false,
                        accept: 'images/*',
                        uploadMode: 'instantly',
                        uploadUrl: uploadApi.getUploadNormalPath("images"),
                        uploadMethod: 'POST',
                        labelText: '',
                        onUploaded: (e: {
                            component?: DevExpress.DOMComponent
                            element?: DevExpress.core.dxElement
                            model?: any
                            file?: File
                            jQueryEvent?: JQueryEventObject
                            event?: DevExpress.event
                            request?: XMLHttpRequest
                        }) => {
                            try {
                                let ff: UploadModel.ModelResult = JSON.parse(e.request.responseText)
                                if (!ff) {
                                    MsgUtils.alert("上传信息出错!");
                                    return;
                                }
                                if (ff.data.file_path != null) {
                                    let src = uploadApi.getUploadHttp + ff.data.file_path;
                                    data.component.updateData(data.dataField, ff.data.file_path);
                                    image.attr("src", src);
                                    if (fromItem.imgCallBack)
                                        fromItem.imgCallBack(src);
                                } else {
                                    MsgUtils.alert("上传信息出错!");
                                    return;
                                }
                            } catch (error) {
                                MsgUtils.alert("上传信息出错!" + error);
                                return;
                            }
                        },
                        onUploadError: sender => {
                            console.log(sender)
                        }
                    }
                );
            }
        }
        aObj = $.extend(aObj, fromItem.options);
        return aObj;
    }
}