<template>
    <div id="wrapper">
<!--        侧边栏导航-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i></div>
            <div class="sidebar-collapse" v-slimscroll="{ height:'100%', size:0 }">
                <ul class="nav" id="side-menu">
<!--                    头像与昵称-->
                    <li class="nav-header">
                        <div style="text-align: center;height: 65px;" class="dropdown profile-element">
                            <img class="img-circle" src="/static/avatar.png" style="width:65px;float: left;margin-right: 10px;">
                            <a style="float: left;margin-top: 10px;" data-toggle="dropdown" class="dropdown-toggle clear" href="javascript: void(0);">
                                <span class="block m-t-xs"><strong class="font-bold">{{staffNickName}}</strong></span>
                                <span class="text-muted text-xs block">{{staffRoleName}}<b class="caret"></b></span>
                            </a>
                            <!--下拉列表-->
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li class="divider"></li>
                                <li><a @click="logOut">{{exit}}</a></li>
                            </ul>
                        </div>
                        <div class="logo-element">{{shortSiteTitle}}</div>
                    </li>
<!--                    主页与首页-->
                    <li>
                        <a href="#">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">主页</span>
                            <span class="fa arrow"></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li>
                                <a @click="href_link('/dashboard')" class="J_menuItem" :class="{link_active:$route.path=='/dashboard'}" data-index="0">首页</a>
                            </li>
                        </ul>
                    </li>
<!--                    默认的一级按钮列表-->
                    <li v-for="(item,index) in menuItems" :key="item.id">
                        <a href="#">
                            <i :class="'fa '+getMenuIcon(index)"></i>
                            <span class="nav-label">{{item.text}}</span>
                            <span class="fa arrow"></span>
                        </a>
<!--                        展开的二级按钮列表-->
                        <ul class="nav nav-second-level">
                            <li v-for="item2 in item.items" :key="item2.id">
                                <a @click="href_link('/'+item2.href)" class="J_menuItem" :class="{link_active:$route.path=='/'+item2.href}" :data-index="item2.id">{{item2.text}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div id="page-wrapper" class="gray-bg dashbard-1">
<!--        顶部导航-->
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
<!--                    左边tab切换按钮-->
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" @click="toggleMini">
                            <i class="fa fa-bars"></i>
                        </a>
                        <span style="margin-left: 10px;line-height: 58px;">{{title}}</span>
                    </div>
<!--                    右边用户信息-->
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="hidden-xs">
                            <span class="m-r-sm text-muted welcome-message">欢迎您! {{staffNickName}} {{staffRoleName}}</span>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a aria-expanded="false">
                                <i class="fa fa-user"></i>
                                <a @click="UserChangePassword">修改密码</a>
                            </a>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a aria-expanded="false">
                                <i class="fa fa-tasks"></i>
                                <a @click="logOut">{{exit}}</a>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
<!--            顶部面包屑-->
            <div class="content-header">
                <ol class="breadcrumb">
                    <li><a @click="href_link('/dashboard')"><i class="fa fa-home"></i>首页</a></li>
                    <li class="active"><a href="javascript: void (0);">{{content_title}}</a></li>
                </ol>
            </div>
<!--            页面主内容-->
            <div class="row J_mainContent" id="content-main">
                <div class="page-container">
                    <div class="page-content">
                        <router-view></router-view>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
<!--            底部信息-->
            <div class="row footer">
                <p class="pull-left">&copy; 版权所有:2019~ {{title}}</p>
            </div>
        </div>
        <user_change_password ref="user_change_password"></user_change_password>
    </div>
</template>

<script lang="ts">
    import MainController from "./mainController";
    export default MainController;
</script>
