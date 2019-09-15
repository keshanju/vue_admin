import { Component } from 'vue-property-decorator';
import BaseVue from '@/common/BaseVue';
import { StatisticsApi } from '@/api/StatisticsApi';

@Component({})
export default class IndexController extends BaseVue {

  public serverUserCount: number = 0;//服务器在线人数
  public serverOtherUser: number = 0;//游客人数
  public create_time: string = "";//数据创建时间
  public ServeRequestModel: object = {
    bandwidth: 0,
    create_time: "",
    id: 0,
    online_users: 0,
    online_users_other: 0,
    type: 0
  };//返回数据model


  public async created() {
    (this.$parent as any).content_title = "控制面板";
    await this.getUserLineCount();
  }

  public async getUserLineCount() {
    let d = await new StatisticsApi().getServerOnLineCount();
    this.serverUserCount = d.data.online_users;
    this.serverOtherUser = d.data.online_users_other;
    this.create_time = d.data.create_time;
    this.ServeRequestModel = d.data;
  }
}
