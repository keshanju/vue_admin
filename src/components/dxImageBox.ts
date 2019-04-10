import DevExpress from 'devextreme/bundles/dx.all';
/**
 * 上传图片
 */
export class DXImageBox implements DevExpress.ui.dxFormSimpleItem {

   public template = (data: { component: DevExpress.ui.dxForm, dataField: string, editorOptions: object, editorType?: string }, aItemEle: JQuery) => {
        let aHtmlText =`
        <div style="border: 0px solid #F0BAB9; padding: 1px;">
            <img name="image" style=" height: 100px; width: 100%; max-width: 500px; border: 0px solid #eee; margin-bottom: 6px" />
            <div class="dx-field-item-label-content">
                <span name="label" class="dx-field-item-label-text"></span>
                <span class="dx-field-item-required-mark" name="mark">&nbsp;*</span>
                <span name="labelEmpty" class="dx-field-item-label-text">&nbsp;&nbsp;</span>
                <div style="float: right;">
                    <label name="fileCombine" style="margin-bottom: 0px;">
                        <input type="file" name="file" style="opacity: 0; width: 1px; height: 0px;" />
                        <div name="changeFakeBtn" />
                    </label>
                    <div name="clearBtn" />
                </div>
            </div>
        </div>
        `;
        $(aHtmlText).appendTo(aItemEle);
    }
}