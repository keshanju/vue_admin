import {Component, Vue, Prop} from "vue-property-decorator";
import {DxTreeView} from "devextreme-vue";
import BaseVue from "@/common/BaseVue";
import * as MenuApi from "@/api/MenuApi";
import * as StaffApi from "@/api/StaffApi";
import DevExpress from "devextreme/bundles/dx.all";
import {CommonUtils} from "@/common/CommonUtils";
import {Lang} from "@/common/Lang";
import {RespCode} from "@/common/RespCode";
import VueSlimScroll from "vue-slimscroll";

import "@/assets/hplus/js/jquery.min.js";
import "@/assets/hplus/js/bootstrap.min.js";
import "@/assets/hplus/js/plugins/metisMenu/jquery.metisMenu.js";
import "@/assets/hplus/js/contabs.min.js";
import "@/assets/hplus/js/plugins/pace/pace.min.js";
import "@/assets/hplus/js/hplus.min.js?v=4.1.0";
/* 全局 css  */
import "@/assets/hplus/css/bootstrap.min.css";
import "@/assets/hplus/css/font-awesome.min93e3.css";
import "@/assets/hplus/css/animate.min.css";
import "@/assets/hplus/css/style.min862f.css?v=4.1.0";

import user_change_password from "@/views/staff/password/password.vue";

Vue.use(VueSlimScroll);
/**
 * 登录
 */
@Component({
    components: {
        DxTreeView,
        user_change_password
    }
})
export default class IndexController extends BaseVue {
    private dxTreeViewKey1: string = "dxTreeView_Key_1";
    private dxTreeView1: DevExpress.ui.dxTreeView;
    private menuAPI: MenuApi.MenuApi = new MenuApi.MenuApi();
    private staffAPI: StaffApi.StaffApi = new StaffApi.StaffApi();
    private title: string = CommonUtils.siteName;
    private version: string = CommonUtils.version;
    private exit: string = Lang.Exit;
    private copyrightText = Lang.CopyRight;
    private versionText = Lang.Version;
    private staffName: string = "";
    private staffNickName: string = "";
    private staffRoleName: string = "";
    private shortSiteTitle = SITE_SHORT_TITLE;
    public menuItems: any[] = [];
    //菜单图标
    public menuIcons: string[] = [
        "fa-user",
        "fa-bars",
        "fa-cube",
        "fa-bars",
        "fa-server",
        "fa-gamepad",
        "fa-cog",
        "fa-bars",
        "fa-bars",
        "fa-bars",
        "fa-bars",
    ];

    public getMenuIcon(index: number = 0): string {
        return this.menuIcons[index];
    }

    //用户信息
    public userInfo: object;

    public userChangePassWordControl: BaseVue | any;

    // 入口
    protected async mounted() {
        let d = CommonUtils.getStaffLoginInfo();
        if (d != null) {
            this.staffName = d.data.user_info.staff_name;
            this.staffNickName = d.data.user_info.name;
            this.staffRoleName = d.data.user_info.role_name;
        }
        await this.getMenu();
        //菜单
        $("#side-menu").metisMenu();

        //高度
        $("#content-main").height($(window).height() - 130);

        this.userChangePassWordControl = this.$refs["user_change_password"] as any;
    }

    /**
     * 获取菜单数据
     */
    private async getMenu() {
        let ds = [];
        let d = await this.menuAPI.getList();
        if (d != null && d.code == RespCode.zero) {
            let ss = d.data.filter((element, index) => {
                return element.menu_level == 1;
            });
            for (const ele of ss) {
                const p_id = ele.id;

                let aa: any = {
                    id: ele.id,
                    level: ele.menu_level,
                    pid: ele.menu_pid,
                    text: ele.menu_name,
                    href: ele.menu_route,
                    expanded: true,
                    items: [] = []
                };
                let ww = d.data.filter((element, index) => {
                    return element.menu_level == 2 && element.menu_pid == p_id;
                });

                for (const ele2 of ww) {
                    aa.items.push({
                        id: ele2.id,
                        level: ele2.menu_level,
                        pid: ele2.menu_pid,
                        text: ele2.menu_name,
                        href: ele2.menu_route
                    });
                }
                ds.push(aa);
            }
            // this.dxTreeView1.option({ dataSource: ds });
            this.menuItems = ds;
        }
    }

    /**
     * 切换侧边栏
     */
    public toggleMini() {
        $("body").toggleClass("mini-navbar");
        $("body").hasClass("mini-navbar")
            ? $("body").hasClass("fixed-sidebar")
            ? ($("#side-menu").hide(),
                setTimeout(function () {
                    $("#side-menu").fadeIn(500);
                }, 300))
            : $("#side-menu").removeAttr("style")
            : ($("#side-menu").hide(),
                setTimeout(function () {
                    $("#side-menu").fadeIn(500);
                }, 100));
    }

    /**
     * 退出登录
     */
    private async logOut() {
        try {
            //移除后台Token
            CommonUtils.removeStaffLoginInfo();
            CommonUtils.removeDictionary();
            let d = await this.staffAPI.loginOut();
        } catch (error) {
            console.log(error);
        }
        this.redirect("/login");
    }

    private href_link(link: string) {
        this.$router.push({path: link});
    }

    /**
     * 修改密码
     */
    public UserChangePassword() {
        this.userChangePassWordControl.Show();
    }
}
