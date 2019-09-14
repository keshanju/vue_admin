import Vue from 'vue';
import Router from 'vue-router';
import main from './views/layout/main.vue';

Vue.use(Router);
export const constantRouterMap = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        name: 'main',
        path: '/index',
        component: main,
    },
    {
        name: 'Dashboard',
        path: '/',
        component: () => import('@/views/layout/main.vue'),
        redirect: '/dashboard',
        children: [
            // 框架
            {path: 'dashboard', component: () => import('@/views/dashboard/index.vue')},
            // 用户
            {path: 'user/list', component: () => import('@/views/user/list.vue')},
            {path: 'user/edit/:id?', component: () => import('@/views/user/edit.vue')},
            {path: 'user/vip/list', component: () => import('@/views/user/vip/list.vue')},
            {path: 'user/vip/edit/:id?', component: () => import('@/views/user/vip/edit.vue')},
            {path: 'user/repasswd/:id?', component: () => import('@/views/user/repasswd.vue')},
            {path: 'user/:id/point/list', component: () => import('@/views/user/point/list.vue')},
            {path: 'user/:id/point_short/list/:db_num', component: () => import('@/views/user/point_short/list.vue')},
            {path: 'user/:id/free_package/list', component: () => import('@/views/user/free_package/list.vue')},
            {path: 'user/:id/wanip/list', component: () => import('@/views/user/wanip/list.vue')},
            {path: 'user/:id/wanip/edit/:wan_id?', component: () => import('@/views/user/wanip/edit.vue')},
            {path: 'user/:id/duration/list', component: () => import('@/views/user/duration/list.vue')},
            {path: 'user/:id/duration/edit/:duration_id?', component: () => import('@/views/user/duration/edit.vue')},
            {path: 'user/:id/point_log/list/:db_num', component: () => import('@/views/user/point_log/list.vue')},
            // { path: 'user/:id/point_log/edit/:point_log_id?', component: () => import('@/views/user/point_log/edit.vue') },
            {path: 'user/:id/pause_log/list', component: () => import('@/views/user/pause_log/list.vue')},
            {path: 'user/:id/pause_log/edit/:pause_log_id?', component: () => import('@/views/user/pause_log/edit.vue')},
            {path: 'user/:id/pause/edit/:user_id?', component: () => import('@/views/user/pause/edit.vue')},
            {path: 'user/:id/speed_log/list/:db_num?', component: () => import('@/views/user/speed_log/list.vue')},
            //退款申请表
            {path: 'user/:id/approval/apply', component: () => import('@/views/user/approval/apply.vue')},
            {path: 'user/approval/list', component: () => import('@/views/user/approval/list.vue')},
            {path: 'user/approval/edit/:id?', component: () => import('@/views/user/approval/edit.vue')},
            //用户组
            {path: 'user/group/list', component: () => import('@/views/user/group/list.vue')},
            {path: 'user/group/edit/:id?', component: () => import('@/views/user/group/edit.vue')},
            {path: 'user/group/:id/package/edit', component: () => import('@/views/user/group/package.vue')},
            //
            {path: 'user/appeal/list', component: () => import('@/views/user/appeal/list.vue')},
            {path: 'user/appeal/edit/:id?', component: () => import('@/views/user/appeal/edit.vue')},
            {path: 'user/session/list', component: () => import('@/views/user/session/list.vue')},
            {path: 'user/session/edit/:id?', component: () => import('@/views/user/session/edit.vue')},
            {path: 'user/:id/session/force_logout/:user_id/:session_id', component: () => import('@/views/user/session/force_logout.vue')},
            {path: 'user/forceloginout/list', component: () => import('@/views/user/forceloginout/list.vue')},
            {path: 'user/forceloginout/edit:id?', component: () => import('@/views/user/forceloginout/edit.vue')},
            // 订单
            {path: 'order/list', component: () => import('@/views/order/list.vue')},
            {path: 'order/edit/:id?', component: () => import('@/views/order/edit.vue')},
            {path: 'order/:id/cancel/edit/:cancel_id?', component: () => import('@/views/order/cancel/edit.vue')},
            {path: 'order/refund/list', component: () => import('@/views/order/refund/list.vue')},
            {path: 'order/refund/edit/:id?', component: () => import('@/views/order/refund/edit.vue')},
            // 套餐
            {path: 'package/list', component: () => import('@/views/package/list.vue')},
            {path: 'package/edit/:id?', component: () => import('@/views/package/edit.vue')},
            {path: 'package/:id/price', component: () => import('@/views/package/price/list.vue')},
            {path: 'package/:id/price/edit/:price_id?', component: () => import('@/views/package/price/edit.vue')},
            {path: 'package/:id/line/edit', component: () => import('@/views/package/line/edit.vue')},
            {path: 'package/:id/game/edit', component: () => import('@/views/package/game/edit.vue')},
            {path: 'package/:id/card/edit', component: () => import('@/views/package/card/edit.vue')},
            {path: 'package/:id/refund/list', component: () => import('@/views/package/refund/list.vue')},
            {path: 'package/:id/refund/edit/:refund_id?', component: () => import('@/views/package/refund/edit.vue')},
            {path: 'package/:id/op_log/list', component: () => import('@/views/package/op_log/list.vue')},
            {path: 'package/discount/list', component: () => import('@/views/package/discount/list.vue')},
            // 充值卡
            {path: 'card/list', component: () => import('@/views/card/list.vue')},
            {path: 'card/edit/:id?', component: () => import('@/views/card/edit.vue')},// 添加卡类型
            {path: 'card/:id/open/edit/:open_id?', component: () => import('@/views/card/open/edit.vue')},// 开卡
            {path: 'card/:id/open/list', component: () => import('@/views/card/list/list.vue')},
            {path: 'card/:id/open/list/edit/:list_id?', component: () => import('@/views/card/list/edit.vue')},
            {path: 'card/log/list', component: () => import('@/views/card/log/list.vue')},
            {path: 'card/log/edit/:id?', component: () => import('@/views/card/log/edit.vue')},
            {path: 'card/:id/abandon/list', component: () => import('@/views/card/abandon/list.vue')},
            {path: 'card/:id/abandon/edit/:abandon_id', component: () => import('@/views/card/abandon/edit.vue')},
            {path: 'card/:id/used/list', component: () => import('@/views/card/used/list.vue')},
            {path: 'card/:id/used/edit/:card_id?', component: () => import('@/views/card/used/edit.vue')},
            //第三方充值卡
            {path: 'card_other/list', component: () => import('@/views/card_other/list.vue')},
            // 服务器管理
            {path: 'server/list', component: () => import('@/views/server/list.vue')},
            {path: 'server/edit/:id?', component: () => import('@/views/server/edit.vue')},
            {path: 'server/line/list', component: () => import('@/views/server/line/list.vue')},
            {path: 'server/line/edit/:id?', component: () => import('@/views/server/line/edit.vue')},
            {path: 'server/line/maintain/:id?', component: () => import('@/views/server/line/maintain.vue')},
            {path: 'server/line/node/edit/:id', component: () => import('@/views/server/line/node.vue')},
            {path: 'server/node/list', component: () => import('@/views/server/node/list.vue')},
            {path: 'server/node/edit/:id?', component: () => import('@/views/server/node/edit.vue')},
            {path: 'server/node/server/edit/:id', component: () => import('@/views/server/node/server.vue')},
            {path: 'server/layout/list', component: () => import('@/views/server/layout/list.vue')},
            {path: 'server/layout/edit/:id?', component: () => import('@/views/server/layout/edit.vue')},
            {path: 'server/layout/:id/log/list', component: () => import('@/views/server/layout/loglist.vue')},
            {path: 'server/region/list', component: () => import('@/views/server/region/list.vue')},
            {path: 'server/region/edit/:id?', component: () => import('@/views/server/region/edit.vue')},
            // 游戏管理
            {path: 'game/list', component: () => import('@/views/game/list.vue')},
            {path: 'game/:id/log/list', component: () => import('@/views/game/loglist.vue')},
            {path: 'game/edit/:id?', component: () => import('@/views/game/edit.vue')},
            {path: 'game/area/list', component: () => import('@/views/game/area/list.vue')},
            {path: 'game/area/edit/:id?', component: () => import('@/views/game/area/edit.vue')},
            {path: 'game/area/:id/line/edit', component: () => import('@/views/game/area/line.vue')},
            {path: 'game/statistics/list', component: () => import('@/views/game/statistics/list.vue')},
            {path: 'game/reported/list', component: () => import('@/views/game/reported/list.vue')},
            // 系统管理
            {path: 'system/settings/list', component: () => import('@/views/system/settings/list.vue')},
            {path: 'system/settings/edit/:id?', component: () => import('@/views/system/settings/edit.vue')},
            {path: 'staff/list', component: () => import('@/views/staff/list.vue')},
            {path: 'staff/edit/:id?', component: () => import('@/views/staff/edit.vue')},
            {path: 'staff/role/list', component: () => import('@/views/staff/role/list.vue')},
            {path: 'staff/role/edit/:id?', component: () => import('@/views/staff/role/edit.vue')},
            {path: 'staff/role/:id/route/edit/', component: () => import('@/views/staff/role/route.vue')},
            {path: 'system/log/list', component: () => import('@/views/system/log/list.vue')},
            {path: 'system/domainwhite/list', component: () => import('@/views/system/domainwhite/list.vue')},
            {path: 'system/domainwhite/edit/:id?', component: () => import('@/views/system/domainwhite/edit.vue')},
            {path: 'system/domainblack/list', component: () => import('@/views/system/domainblack/list.vue')},
            {path: 'system/domainblack/edit/:id?', component: () => import('@/views/system/domainblack/edit.vue')},
            {path: 'system/version/list', component: () => import('@/views/system/version/list.vue')},
            {path: 'system/version/edit/:id?', component: () => import('@/views/system/version/edit.vue')},
            {path: 'system/lang/list', component: () => import('@/views/system/lang/list.vue')},
            //营销管理
            //新闻管理
            {path: 'sell/news/list', component: () => import('@/views/sell/news/list.vue')},
            {path: 'sell/news/label', component: () => import('@/views/sell/news/labelList.vue')},
            {path: 'sell/news/label/edit/:id?', component: () => import('@/views/sell/news/editLabel.vue')},
            {path: 'sell/news/edit/:id?', component: () => import('@/views/sell/news/edit.vue')},
            {path: 'sell/seometa/list', component: () => import('@/views/sell/seometa/list.vue')},
            {path: 'cms/project', component: () => import('@/views/cms/project.vue')},
            {path: 'cms/channel/:id', component: () => import('@/views/cms/channel.vue')},
            {path: 'cms/html', component: () => import('@/views/cms/html.vue')},
            {path: 'cms/html/web', component: () => import('@/views/cms/htmlweb.vue')},
            //活动管理
            {path: 'sell/activity/list', component: () => import('@/views/sell/activity/list.vue')},
            {path: 'sell/activity/edit/:id?', component: () => import('@/views/sell/activity/edit.vue')},
            {path: 'user/prize/list', component: () => import('@/views/user/prize/list.vue')},
            //统计报表
            {path: 'statistics/order/list', component: () => import('@/views/statistics/order/list.vue')},
            {path: 'statistics/user/list', component: () => import('@/views/statistics/user/list.vue')},
            {path: 'statistics/channel/list', component: () => import('@/views/statistics/channel/list.vue')},
            {path: 'statistics/card/list', component: () => import('@/views/statistics/card/list.vue')},
            {path: 'statistics/speed/list', component: () => import('@/views/statistics/speed/list.vue')},
            {path: 'statistics/online/list', component: () => import('@/views/statistics/online/list.vue')},
            // 壁纸管理
            {path: 'wallpaper/list', component: () => import('@/views/wallpaper/paper/list.vue')},
            {path: 'wallpaper/cate/list', component: () => import('@/views/wallpaper/category/list.vue')},

            //TODO:继续增加菜单
            {path: 'demo/tree_list/list', component: () => import('@/views/demo/tree_list/list.vue')},
            {path: 'demo/index', component: () => import('@/views/demo/index.vue')},
            {path: 'demo/test', component: () => import('@/views/demo/test.vue')},
        ]
    }
];
let routes: any = constantRouterMap;
let rr = new Router({
    mode: 'history',
    routes
});
export default rr
