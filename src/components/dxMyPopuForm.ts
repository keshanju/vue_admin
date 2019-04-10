import BaseVue from "@/common/BaseVue";
import Component from "vue-class-component";
import DevExpress from "devextreme/bundles/dx.all";

@Component({
    components: {

    },
    template: `
    <dx-popup :visible.sync="options.visible" :title="options.title" :toolbarItems="options.toolbarItems">
        <dx-scroll-view>
            <dx-form ref="dxForm1"></dx-form>
        </dx-scroll-view>
    </dx-popup>
    `
})
export class dxMyPopuForm extends BaseVue {

    /**
     * 选项
     */
    public options: {
        title?: string;
        visible?: boolean;
        toolbarItems?: any[];
        onHide?: () => void;
    } = {
            title: "弹窗",
            visible: false,
            toolbarItems: []
        };

    public dxForm1: DevExpress.ui.dxForm;
    /**
     * 挂载后
     */
    mounted() {
        this.dxForm1 = this.getDxInstanceByKey("dxForm1");
    }

    /**
     *显示
    */
    public show(config: any) {
        Object.assign(this.options, config);
        this.options.visible = true;
    }

    /**
     *隐藏
     */
    public hide() {
        this.options.visible = false;
        if (this.options.onHide) {
            this.options.onHide();
        }
    }

    /**
     * 添加工具条
     */
    public addToolBarItems(){

    }

    /**
     * 添加弹窗工具按钮
     */
    public addPopuToolBarItems(){

    }
}