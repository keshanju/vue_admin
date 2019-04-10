import { Component, Vue, Prop } from 'vue-property-decorator';
import DevExpress from 'devextreme/bundles/dx.all';
import { DxDataGrid, DxForm, DxTreeView } from 'devextreme-vue';
import $ from 'jquery';
import BaseVue from '@/common/BaseVue';

/**
 * 废弃卡文件
 */
@Component({
  components: {
    DxDataGrid, DxForm, DxTreeView
  }
})
export default class Home extends BaseVue {

    /**
   * 入口
   */
  protected mounted() {

  }

}