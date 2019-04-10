import dxPopup from 'devextreme/ui/popup';
import DevExpress from 'devextreme/bundles/dx.all';
import scroll_view from 'devextreme/ui/scroll_view'
import Vue from 'vue';

/**
 * 自定义弹窗
 */
export class dxMyPopup {

    /**
     * 渲染Vue组件
     * @param vue_file_instance  Vue文件实例     let vue = await import('xxx.vue')
     * @param option 弹窗配置
     * @param toolbars 底部按钮组
     */
    public static renderVueFile<T>(
        vue_file_instance: typeof import("*.vue"),
        option: {
            title?: string,
            width?: number,
            height?: number,
            fullScreen?: boolean
        },
        toolbars: {
            text?: string,
            type?: string,
            onClick?: (sender) => void
        }[]): [T, dxPopup] {
        let default_option = {
            src: "#",
            title: "弹窗",
            width: window.innerWidth,
            height: window.innerHeight,
            fullScreen: false
        }
        let new_option = $.extend({}, default_option, option);
        //工具条
        let toolbarItems: DevExpress.ui.dxPopupToolbarItem[] = [];
        if (toolbars) {
            for (const toolbar of toolbars) {
                toolbarItems.push({
                    location: 'after',
                    toolbar: 'bottom',
                    visible: true,
                    widget: 'dxButton',
                    options: {
                        type: !toolbar.type ? 'normal' : toolbar.type,
                        text: toolbar.text,
                        onClick: toolbar.onClick
                    }
                });
            }
        }
        let VueInstance = vue_file_instance.default as any;
        let v: any;
        let tempPop = $("<div id='pop_iframe_111' />");
        tempPop.appendTo($('body'));
        let popup1: dxPopup = new dxPopup(tempPop[0], {
            title: new_option.title,
            fullScreen: new_option.fullScreen,
            maxHeight: new_option.height,
            maxWidth: new_option.width,
            resizeEnabled: true,
            dragEnabled: true,
            onHidden: () => {
                tempPop.remove();
            },
            contentTemplate: (contentElement: Element) => {
                let app = $("<div id='app1111'></div>");
                contentElement.appendChild(app[0]);
                v = new VueInstance({
                    el: "#" + app[0].id
                });
            },
            toolbarItems: toolbarItems
        });
        popup1.show();
        //添加滚动条
        let scroll_view1 = new scroll_view($(popup1.content())[0], {
            useNative: false
        });
        return [v, popup1];
    }

    /**
     * 加载 Vue
     * @param VueInstance 
     * @param option 
     * @param toolbars 
     */
    public static renderVue<T>(
        VueInstance: typeof Vue,
        option: {
            title?: string,
            width?: number,
            height?: number,
            fullScreen?: boolean
        },
        toolbars: {
            text?: string,
            type?: string,
            onClick?: (sender) => void
        }[]): [T, dxPopup] {

        let default_option = {
            src: "#",
            title: "弹窗",
            width: window.innerWidth,
            height: window.innerHeight,
            fullScreen: false
        }
        let new_option = $.extend({}, default_option, option);
        //工具条
        let toolbarItems: DevExpress.ui.dxPopupToolbarItem[] = [];
        if (toolbars) {
            for (const toolbar of toolbars) {
                toolbarItems.push({
                    location: 'after',
                    toolbar: 'bottom',
                    visible: true,
                    widget: 'dxButton',
                    options: {
                        type: !toolbar.type ? 'normal' : toolbar.type,
                        text: toolbar.text,
                        onClick: toolbar.onClick
                    }
                });
            }
        }
        let m_vue: any;
        let tempPop = $("<div id='pop_iframe_111' />");
        tempPop.appendTo($('body'));
        let m_popup: dxPopup = new dxPopup(tempPop[0], {
            title: new_option.title,
            fullScreen: new_option.fullScreen,
            maxHeight: new_option.height,
            maxWidth: new_option.width,
            resizeEnabled: true,
            dragEnabled: true,
            onHidden: () => {
                tempPop.remove();
            },
            contentTemplate: (contentElement: Element) => {
                let app = $("<div id='app1111'></div>");
                contentElement.appendChild(app[0]);
                m_vue = new VueInstance({
                    el: "#" + app[0].id
                });
            },
            toolbarItems: toolbarItems
        });
        m_popup.show();
        //添加滚动条
        let scroll_view1 = new scroll_view($(m_popup.content())[0], {
            useNative: false
        });
        return [m_vue, m_popup];
    }
}