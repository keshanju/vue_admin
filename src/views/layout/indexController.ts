import { Component, Vue, Prop } from 'vue-property-decorator';
import { DxTreeView } from 'devextreme-vue';
import BaseVue from '@/common/BaseVue';

/**
 * 登录
 */
@Component({
    components: {
        DxTreeView
    }
})
export default class IndexController extends BaseVue {

    // 入口
    protected mounted() {

    }

    /**
     * 控件初始化
     */
    private initComponent() {

    }
}