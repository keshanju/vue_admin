<template>
    <div id="wrapper">
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i></div>
            <div class="sidebar-collapse" v-slimscroll="{ height:'100%', size:0 }">
                <ul class="nav" id="side-menu">
<!--                    头像与昵称-->
                    <li class="nav-header">
                        <div style="text-align: center;" class="dropdown profile-element">
                            <img alt="image" class="img-circle" src="/static/avatar.png" style="width:64px;">
                            <a data-toggle="dropdown" class="dropdown-toggle clear" href="javascript: void(0);">
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
                        <a href="javascript: void(0);">
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
                        <a href="javascript: void(0);">
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
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header">
                        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" @click="toggleMini"><i
                                class="fa fa-bars"></i></a>
                        <span style="margin-left: 10px;line-height: 58px;">{{title}}</span>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="hidden-xs">
                            <span class="m-r-sm text-muted welcome-message">欢迎您! {{staffNickName}} {{staffRoleName}}</span>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a aria-expanded="false">
                                <i class="fa fa-user"></i> <a @click="UserChangePassword">修改密码</a>
                            </a>
                        </li>
                        <li class="dropdown hidden-xs">
                            <a aria-expanded="false">
                                <i class="fa fa-tasks"></i> <a @click="logOut">{{exit}}</a>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="content-header">
                <ol class="breadcrumb">
                    <li><a @click="href_link('/dashboard')"><i class="fa fa-home"></i>首页</a></li>
                    <li class="active">{{content_title}}</li>
                </ol>
            </div>
            <div class="row J_mainContent" id="content-main">
                <div class="page-container">
                    <div class="page-content">
                        <router-view></router-view>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
            <div class="row footer">
                <p class="pull-left">&copy; 版权所有:2019~ {{title}}</p>
            </div>
        </div>
        <user_change_password ref="user_change_password"></user_change_password>
    </div>
</template>

<script lang="ts">
    import IndexController from "./mainController";
    export default IndexController;
</script>

<style scoped>
    .page-container {
        width: 100%;
    }

    .page-container .page-header {
        margin: 0 auto;
        position: relative;
        padding: 20px;
        background: 0 0;
        border-bottom: none;
    }

    .page-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 18px;
    }

    .page-container .page-content {
        padding: 20px;
    }

    .page-header + .page-content {
        padding-top: 0;
    }

    .content-header {
        position: relative;
        padding: 10px 15px 0 15px;
    }

    .content-header > h1 {
        margin: 0;
        font-size: 24px;
    }

    .content-header > h1 > small {
        font-size: 15px;
        display: inline-block;
        padding-left: 4px;
        font-weight: 300;
    }

    .content-header > .breadcrumb {
        background: transparent;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 14px;
        border-radius: 2px;
    }

    .breadcrumb > li {
        display: inline-block;
    }

    .breadcrumb > .active {
        color: #777;
    }

    .content-header > .breadcrumb > li > a {
        color: #444;
        text-decoration: none;
        display: inline-block;
    }

    .content-header > .breadcrumb > li > a > .fa, .content-header > .breadcrumb > li > a > .glyphicon, .content-header > .breadcrumb > li > a > .ion {
        margin-right: 5px;
    }

    .breadcrumb > li + li:before {
        padding: 0 5px;
        color: #ccc;
        content: "/\00a0";
    }

    .content-header > .breadcrumb > li + li:before {
        content: '>\00a0';
    }
</style>
