(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c8d1534"],{3981:function(e,t,n){"use strict";n.d(t,"a",function(){return l});n("4453");var r=n("ee95"),a=n("eb12"),i=n("ba94"),c=n("5ee8"),u=n("4e86"),s=n("5bc3"),o=n("f322"),l=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(s["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a,i,c,u=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"",r=u.length>2&&void 0!==u[2]?u[2]:15,a=u.length>3&&void 0!==u[3]?u[3]:1,i="/staff/cms/project/"+t+"/channel?account_token="+this.token+"&size="+r+"&page="+a+n,e.next=6,this.httpGet(i);case 6:return c=e.sent,e.abrupt("return",c);case 8:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",n="/staff/cms/project/"+t+"/channel/lists?account_token="+this.token,e.next=4,this.httpGet(n);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel",a=n,e.next=4,this.httpPost(r,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n,r){var a,i,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/cms/project/"+t+"/channel/"+n,i=r,e.next=4,this.httpPut(a,i);case 4:return c=e.sent,e.abrupt("return",c);case 6:case"end":return e.stop()}},e,this)}));function t(t,n,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel/"+n,a="account_token="+this.token,e.next=4,this.httpDelete(r+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel/"+n,a="account_token="+this.token,e.next=4,this.httpGet(r+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"createProjectChannelHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/statics",a="account_token="+this.token+"&project_id="+t+"&channel_id="+(-1==n?"":n),e.next=4,this.httpPost(r,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"createWwwHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/queue/cms/statics/www_html_create?create_type=".concat(t),r="account_token=".concat(this.token),e.next=4,this.httpPost(n,r);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"releaseWebHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/release_web_html",n="account_token=".concat(this.token),e.next=4,this.httpPost(t,n);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getHtmlCreateList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/www_html_create?account_token=".concat(this.token),e.next=3,this.httpGet(t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getCreateShellType",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/create_type?account_token=".concat(this.token),e.next=3,this.httpGet(t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}]),t}(o["a"])},"8a58":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("DxDataGrid",{ref:"devDataGridSrc"})],1)},a=[],i=(n("4453"),n("ee95")),c=n("eb12"),u=n("ba94"),s=n("5ee8"),o=n("4e86"),l=n("5bc3"),p=n("3a61"),h=n("b2e6"),f=n("74a9"),d=n("1639"),m=n("3981"),v=n("a60a"),b=n.n(v),g=function(e){function t(){var e;return Object(c["a"])(this,t),e=Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments)),e.devDataGridSrc="devDataGridSrc",e.channelApi=new m["a"],e.create_type=-1,e.isCreateOption=!1,e.is_release=0,e.dataSource=[],e.shellType=[],e}return Object(l["a"])(t,e),Object(u["a"])(t,[{key:"mounted",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$parent.content_title="官网静态页面生成",this.channelApi.getCreateShellType().then(function(e){t.shellType=e.data,t.initComponent(),t.getHtmlCreateList()});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){this.devDataGridUi=this.getDxInstanceByKey(this.devDataGridSrc);var e=[{dataField:"num",caption:"编号",width:40,alignment:"center"},{dataField:"system_type",caption:"平台",width:200,alignment:"center"},{dataField:"html_file",caption:"文件"},{fixed:!0,fixedPosition:"right",dataField:"html_url",alignment:"center",caption:"操作",width:200,cellTemplate:this.CellEdit}],t=this.getDataGridOption({dataSource:this.dataSource,columns:e,pager:{visible:!1},paging:{enabled:!1},onToolbarPreparing:this.toolbarPreparingConf});this.devDataGridUi.option(t)}},{key:"getCreateShellType",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.channelApi.getCreateShellType();case 2:if(t=e.sent,0!=t.code){e.next=7;break}return e.abrupt("return",t.data);case 7:return e.abrupt("return",[]);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getHtmlCreateList",value:function(){var e=this;this.channelApi.getHtmlCreateList().then(function(t){0==t.code&&(e.dataSource=t.data.file_info,e.is_release=t.data.is_release,0==e.dataSource.length?e.isCreateOption=!1:e.isCreateOption=!0,e.devDataGridUi.option({remoteOperations:!0,dataSource:e.dataSource,onToolbarPreparing:e.toolbarPreparingConf}))})}},{key:"createWebHtml",value:function(e){var t=this;this.create_type<0?this.alert("请选择创建类型"):this.channelApi.createWwwHtml(this.create_type).then(function(e){0!=e.code?t.alert(e.msg):t.alert("生成静态HTML任务已添加成功")})}},{key:"CellEdit",value:function(e,t){b()("<div>").append(b()("<a href='"+t.data.html_url+"' target='_blank'> 预览 </a>")).appendTo(e)}},{key:"releaseWebHtml",value:function(){var e=this;1!=this.is_release?this.alert("未检测到创建的HTML文件，如果您已经生成了HTML，请刷新后重试！"):this.channelApi.releaseWebHtml().then(function(t){0!=t.code?e.alert(t.msg):e.alert("发布任务已添加成功")})}},{key:"toolbarPreparingConf",value:function(e){var t=this,n=e.toolbarOptions.items;n.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.getHtmlCreateList}}),n.push({location:"before",widget:"dxSelectBox",group:"group",name:"shell_type",options:{placeholder:"选择生成类型",displayExpr:"title",valueExpr:"id",dataSource:this.shellType,onValueChanged:function(e){t.create_type=e.value}}}),n.push({location:"before",widget:"dxButton",options:{text:"生成/预览",onClick:this.createWebHtml}}),n.push({location:"before",widget:"dxButton",options:{text:"执行发布",onClick:this.releaseWebHtml}})}}]),t}(d["a"]);g=p["a"]([Object(h["a"])({components:{DxDataGrid:f["DxDataGrid"]}})],g);var w=g,k=w,y=k,x=(n("eacc"),n("17cc")),_=Object(x["a"])(y,r,a,!1,null,null,null);t["default"]=_.exports},"98b0":function(e,t,n){},eacc:function(e,t,n){"use strict";var r=n("98b0"),a=n.n(r);a.a}}]);