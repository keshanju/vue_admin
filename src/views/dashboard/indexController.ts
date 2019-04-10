import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseVue from '@/common/BaseVue';
import { CommonUtils } from '@/common/CommonUtils';
import box from 'devextreme/ui/box';
import DevExpress from 'devextreme/bundles/dx.all';
import { exportUtils } from '@/utils/exportUtils';
import { StatisticsApi } from '@/api/StatisticsApi';

/**
 * 首页文件
 */
@Component({
  components: {

  }
})
export default class IndexController extends BaseVue {

  private serverUserCount = 0;

  protected mounted() {
    (this.$parent as any).content_title = "控制面板";
    this.getUserLineCount();
  }

  private async getUserLineCount() {
    let d = await new StatisticsApi().getServerOnLineCount();
    this.serverUserCount = d.data.online_users;
  }

  
}