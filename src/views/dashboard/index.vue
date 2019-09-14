<template>
    <div>
        <div class="row border-bottom dashboard-header">
            <div class="col-sm-6">
                <h3>欢迎光临</h3>
                <p>上次登录的时间:2018-12-12 11:11:11</p>
                <p>最后登录的IP:127.0.0.1</p>
            </div>
            <div class="col-sm-6">
                <div class="row text-left">
                    <div class="col-xs-3">
                        <div class=" m-l-md">
                            <span class="h4 font-bold m-t block">4588</span>
                            <small class="text-muted m-b block">当前在线</small>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <span class="h4 font-bold m-t block">300000</span>
                        <small class="text-muted m-b block">服务器最大人数</small>
                    </div>
                    <div class="col-xs-3">
                        <span class="h4 font-bold m-t block">11111</span>
                        <small class="text-muted m-b block">今日订单数</small>
                    </div>
                    <div class="col-xs-3">
                        <span class="h4 font-bold m-t block">22222</span>
                        <small class="text-muted m-b block">今日总金额</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>{{serverUserCount}}</h3>
                        <p>服务器在线人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>150</h3>
                        <p>新订单</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>50000</h3>
                        <p>今日总金额</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>150</h3>
                        <p>充值卡</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>150</h3>
                        <p>游戏加速</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
            <div class="col-xs-2">
                <div class="small-box bg-aqua">
                    <div class="inner">
                        <h3>15000</h3>
                        <p>访客</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import indexController from "./indexController";

    export default indexController;
</script>

