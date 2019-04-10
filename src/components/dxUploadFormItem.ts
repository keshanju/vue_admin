import DevExpress from 'devextreme/bundles/dx.all'
/**
 * 上传表单
 */
export class dxUploadFormItem implements DevExpress.ui.dxFormSimpleItem {
    constructor() {}

    /**
     * 自定义模板
     * @param data
     * @param aItemEle
     */
    template(
        data: {
            component: DevExpress.ui.dxForm
            dataField: string
            editorOptions: any
            editorType?: string
        },
        aItemEle: JQuery
    ) {}

    /**
     * 创建上传图片
     */
    createImage() {
        let aObj: DevExpress.ui.dxFormSimpleItem = {
            template: (
                data: {
                    component: DevExpress.ui.dxForm
                    dataField: string
                    editorOptions: any
                    editorType?: string
                },
                aItemEle: JQuery
            ) => {
                let aHeight: string = 'auto'
                if (data.editorOptions && data.editorOptions['height'])
                    aHeight = data.editorOptions['height'].toString()

                let photoShow ="<img name='image' style='max-height: 100px;height: ${aHeight}; max-width: 500px; border: 0px solid #eee; margin-bottom: 6px'/>";
                let aStr: string =
                    '<div style="border: 0px solid #F0BAB9; padding: 1px;">' +
                    photoShow +
                    ' <div class="dx-field-item-label-content" >' +
                    '   <span name="labelEmpty" class="dx-field-item-label-text">&nbsp;&nbsp;</span>' +
                    '   <label name="fileCombine" style="margin-bottom: 0px;width:50%;">' +
                    //+ '      <input type="file" name="file" style="opacity: 0; width: 0px; height: 1px;display:block;"/>'
                    '      <div name="changeFakeBtn" />' +
                    '   </label> ' +
                    '   <div name="clearBtn" />' +
                    '</div>';
                
            }
        }
        return aObj
    }
}
