import '../../public/static/ueditor/ueditor.config.js';
import '../../public/static/ueditor/ueditor.all.js';
import '../../public/static/ueditor/lang/zh-cn/zh-cn.js';

import DevExpress from 'devextreme/bundles/dx.all';
/**
 * 百度编辑器
 */
export class dxUEditorFormItem {
    public static index = 1;
    /**
     * 创建编辑器表单项
     * @param options 
     * @param editorCall 
     */
    public static createUEEditor(options: DevExpress.ui.dxFormSimpleItem = {}, editorCall?: (UE: any) => void) {
        let aObj: DevExpress.ui.dxFormSimpleItem = {
            dataField: 'content',
            label: {
                text: '编辑器'
            },
            editorType:"dxTextArea",
            template: (
                data: {
                    component: DevExpress.ui.dxForm
                    dataField: string
                    editorOptions: any
                    editorType?: string
                },
                aItemEle: JQuery
            ) => {
                this.index++;
                let aParentNode = $("<script id='editor" + this.index + "' type='text/plain' ></script>");
                aParentNode.appendTo(aItemEle);
                let editor = UE.getEditor(aParentNode[0].id, {
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,　　//是否工具栏可浮动
                    initialContent: '',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    BaseUrl: '/static/ueditor/',
                    UEDITOR_HOME_URL: '/static/ueditor/',
                    serverUrl: "http://www.baidu.com",
                    elementPathEnabled: true,
                    enableAutoSave: false
                });
                if (editorCall) {
                    editorCall(editor);
                }
                editor.ready(function () {
                    if (data.editorOptions && data.editorOptions['value']) {
                        let content = data.editorOptions['value'];
                        editor.setContent(content);
                    }
                    editor.addListener('contentChange', () => {
                        data.component.updateData(data.dataField, editor.getContent());
                    })
                });
            }
        }
        aObj = $.extend(aObj, options);
        return aObj;
    }
}

declare const UE;