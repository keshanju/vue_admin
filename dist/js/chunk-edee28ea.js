(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-edee28ea"],{3981:function(e,t,n){"use strict";n.d(t,"a",function(){return d});n("4453");var r=n("ee95"),a=n("eb12"),i=n("ba94"),o=n("5ee8"),c=n("4e86"),u=n("5bc3"),s=n("f322"),d=function(e){function t(){return Object(a["a"])(this,t),Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a,i,o,c=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:"",r=c.length>2&&void 0!==c[2]?c[2]:15,a=c.length>3&&void 0!==c[3]?c[3]:1,i="/staff/cms/project/"+t+"/channel?account_token="+this.token+"&size="+r+"&page="+a+n,e.next=6,this.httpGet(i);case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",n="/staff/cms/project/"+t+"/channel/lists?account_token="+this.token,e.next=4,this.httpGet(n);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel",a=n,e.next=4,this.httpPost(r,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n,r){var a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/cms/project/"+t+"/channel/"+n,i=r,e.next=4,this.httpPut(a,i);case 4:return o=e.sent,e.abrupt("return",o);case 6:case"end":return e.stop()}},e,this)}));function t(t,n,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel/"+n,a="account_token="+this.token,e.next=4,this.httpDelete(r+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/project/"+t+"/channel/"+n,a="account_token="+this.token,e.next=4,this.httpGet(r+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"createProjectChannelHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/cms/statics",a="account_token="+this.token+"&project_id="+t+"&channel_id="+(-1==n?"":n),e.next=4,this.httpPost(r,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,n){return e.apply(this,arguments)}return t}()},{key:"createWwwHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/queue/cms/statics/www_html_create?create_type=".concat(t),r="account_token=".concat(this.token),e.next=4,this.httpPost(n,r);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"releaseWebHtml",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/release_web_html",n="account_token=".concat(this.token),e.next=4,this.httpPost(t,n);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getHtmlCreateList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/www_html_create?account_token=".concat(this.token),e.next=3,this.httpGet(t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getCreateShellType",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/queue/cms/statics/create_type?account_token=".concat(this.token),e.next=3,this.httpGet(t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}]),t}(s["a"])},"417d":function(e,t,n){"use strict";var r=n("6c85"),a=n.n(r);function i(e){if(a()(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var o=n("ab6b"),c=n.n(o),u=n("ad81"),s=n.n(u);function d(e){if(s()(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return c()(e)}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(e){return i(e)||d(e)||l()}n.d(t,"a",function(){return p})},"50cd":function(e,t,n){"use strict";var r=n("4cf4"),a=n("0763");e.exports=function(e,t,n){t in e?r.f(e,t,a(0,n)):e[t]=n}},7375:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("DxDataGrid",{ref:e.dxDataGridKey1})],1)},a=[],i=n("417d"),o=n("77fe"),c=n.n(o),u=(n("ab56"),n("b06f"),n("4453"),n("ee95")),s=n("eb12"),d=n("ba94"),l=n("5ee8"),p=n("4e86"),h=n("5bc3"),f=n("3a61"),v=n("b2e6"),m=n("a60a"),g=n.n(m),x=n("74a9"),b=n("1639"),w=n("3981"),y=n("84ec"),k=n("4c5d"),_=n("9b13"),R=n("4b0b"),O=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(l["a"])(this,Object(p["a"])(t).apply(this,arguments)),e.dxDataGridKey1="dxDataGrid_Key_1",e.channelApi=new w["a"],e}return Object(h["a"])(t,e),Object(d["a"])(t,[{key:"mounted",value:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$parent.content_title="频道列表",this.initComponent(),this.getDataList();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var e=[{dataField:"id",caption:"编号",width:80},{dataField:"project_title",caption:"所属项目",width:140},{dataField:"title",caption:"频道名称",width:140},{dataField:"seo_title",caption:"SEO标题",width:100},{dataField:"keyword",caption:"关键词",width:100},{dataField:"description",caption:"描述",width:120},{dataField:"dirname",caption:"目录名",width:100},{dataField:"sorts",caption:"排序",width:100},{dataField:"type",caption:"类型",width:100,cellTemplate:function(e,t){g()("<span>").append(k["a"].getDicText(k["a"].getDictonary().data.cms_channel_type,t.value)).appendTo(e)}},{dataField:"is_hidden",caption:"是否隐藏",width:100,cellTemplate:function(e,t){g()("<span>").append(k["a"].getDicText(k["a"].getDictonary().data.cms_channel_hidden,t.value)).appendTo(e)}},{dataField:"open_mode",caption:"打开方式",width:100},{dataField:"template_index_path",caption:"主页模板路径",width:160},{dataField:"template_info_path",caption:"详细模板路径",width:160},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"create_staff_name",caption:"创建人",width:160},{dataField:"change_time",caption:"修改时间",width:160},{dataField:"change_staff_name",caption:"修改人",width:160},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:y["a"].Operate,width:200,cellTemplate:this.cellEdit}],t=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:e});this.dxDataGrid1.option(t)}},{key:"cellEdit",value:function(e,t){var n=this,r=g()("<a href='#' data="+t.value+"> 编辑 </a>");r.bind("click",function(e){var t=g()(e.target).attr("data");n.editForm(Number(t))});var a=this.getCreateLink("删除",function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(r){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.confirm("是否确定删除?");case 2:a=e.sent,a&&n.setDelete(t.value);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}());g()("<div>").append(r).append(" | ").append(a).appendTo(e)}},{key:"editForm",value:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.channelApi.getModel(this.ID,t);case 2:n=e.sent,this.createForm(t,n.data);case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.channelApi.setDelete(this.ID,t);case 3:if(n=e.sent,n.code!=_["a"].OK&&n.code!=_["a"].isSame&&n.code!=_["a"].isSameSaveData){e.next=8;break}this.toast(function(){r.dxDataGrid1.refresh()}),e.next=10;break;case 8:return this.errorCodeMsg(n.code,n.msg),e.abrupt("return",!1);case 10:e.next=16;break;case 12:return e.prev=12,e.t0=e["catch"](0),this.error(e.t0),e.abrupt("return",!1);case 16:case"end":return e.stop()}},e,this,[[0,12]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getDataList",value:function(){var e=this,t=this.getDataGridPager(function(){var t=Object(u["a"])(regeneratorRuntime.mark(function t(n,r,a){var i,o,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.channelApi.getListPager(e.ID,n,r,a);case 2:return i=t.sent,o=[],c=e.getChannel(i.data.list,0,o),t.abrupt("return",{code:i.code,msg:i.msg,data:{total:i.data.total,current_page:i.data.current_page,per_page:i.data.per_page,last_page:i.data.last_page,list:c}});case 6:case"end":return t.stop()}},t)}));return function(e,n,r){return t.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:t})}},{key:"onToolbarPreparingHandler",value:function(e){var t=this,n=(e.component,e.toolbarOptions.items);n.push({location:"before",widget:"dxButton",options:{text:y["a"].Add,icon:"add",onClick:this.onAddHandler}}),n.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),n.push({location:"before",widget:"dxButton",options:{icon:"back",text:"返回项目管理",onClick:function(){t.redirect("/cms/project")}}}),this.createSearchToolbars(n,this.dxDataGrid1.option("columns"),function(){t.getDataList()})}},{key:"onAddHandler",value:function(e){this.createForm(0,{sorts:999,type:1,is_hidden:0,open_mode:0,parent_id:0})}},{key:"getChannel",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=e.filter(function(e,n){return e.parent_id==t});a=a.sort(function(e,t){return e.sorts-t.sorts});var i=!0,o=!1,u=void 0;try{for(var s,d=c()(a);!(i=(s=d.next()).done);i=!0){var l=s.value;if(r>0)for(var p=0;p<r;p++)l.title="-"+l.title;n.push(l);var h=e.filter(function(e,n){return e.parent_id==t});if(h&&h.length>0){var f=r+1;this.getChannel(e,l.id,n,f)}}}catch(v){o=!0,u=v}finally{try{i||null==d.return||d.return()}finally{if(o)throw u}}return n}},{key:"createForm",value:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(){var t,n,r,a,o,c,s,d=this,l=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l.length>0&&void 0!==l[0]?l[0]:0,n=l.length>1&&void 0!==l[1]?l[1]:{parent_id:0},e.next=4,this.channelApi.getList(this.ID);case 4:r=e.sent,a=r.data,o=[],c=[{id:0,title:"顶级栏目"}].concat(Object(i["a"])(this.getChannel(a,0,o))),s=this.createFormItems([{dataField:"title",label:{text:"名称"},editorOptions:{placeholder:"请输入频道名称."},validationRules:[R["a"].getRequired("名称不能为空!")]},{dataField:"parent_id",label:{text:"所属栏目"},editorType:"dxSelectBox",editorOptions:{placeholder:"请选择所属栏目.",dataSource:c,displayExpr:"title",valueExpr:"id"},validationRules:[R["a"].getRequired("所属栏目不能为空!")]},{dataField:"seo_title",label:{text:"SEO标题"},editorOptions:{placeholder:"请输入SEO标题."},validationRules:[R["a"].getRequired("SEO标题不能为空!")]},{dataField:"keyword",label:{text:"关键词"},editorOptions:{placeholder:"请输入关键词."},validationRules:[R["a"].getRequired("关键词不能为空!")]},{dataField:"description",label:{text:"描述"},editorType:"dxTextArea",editorOptions:{height:80,placeholder:"请输入频道描述信息."},validationRules:[R["a"].getRequired("描述不能为空!")]},{dataField:"dirname",label:{text:"目录名"},editorOptions:{placeholder:"请输入生成目录.例:qimiao"},validationRules:[R["a"].getRequired("目录名不能为空!")]},{dataField:"sorts",label:{text:"排序"},editorType:"dxNumberBox",editorOptions:{placeholder:"频道排序，从小到大",min:1},validationRules:[R["a"].getRequired("排序不能为空!")]},{dataField:"type",label:{text:"类型"},editorType:"dxSelectBox",editorOptions:{placeholder:"请选择类型.",displayExpr:"name",valueExpr:"id",dataSource:k["a"].getDictonary().data.cms_channel_type},validationRules:[R["a"].getRequired("类型不能为空!")]},{dataField:"is_hidden",label:{text:"是否隐藏"},editorType:"dxSelectBox",editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:k["a"].getDictonary().data.cms_channel_hidden},validationRules:[R["a"].getRequired("请选择一个操作!")]},{dataField:"open_mode",label:{text:"打开方式"},editorType:"dxSelectBox",editorOptions:{placeholder:"请选择打开方式.",displayExpr:"name",valueExpr:"id",dataSource:k["a"].getDictonary().data.cms_channel_open_type},validationRules:[R["a"].getRequired("打开方式不能为空!")]},{dataField:"template_index_path",label:{text:"主页模板路径"},editorOptions:{placeholder:"请输入主页模板路径.例如:cms/qimiao/cn/index/index"},validationRules:[]},{dataField:"template_info_path",label:{text:"详细模板路径"},editorOptions:{placeholder:"请输入详细模板路径.例如:cms/qimiao/cn/index/index"},validationRules:[]}]),this.createPopForm({title:t>0?"编辑频道":"创建频道",width:800},{formData:n,items:s},{},function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,r=t.option("formData"),r.account_token=d.token,a=d.joinFormParams(r),null!=r.id&&0!=r.id){e.next=10;break}return e.next=7,d.channelApi.setAdd(d.ID,a);case 7:i=e.sent,e.next=13;break;case 10:return e.next=12,d.channelApi.setUpdate(d.ID,r.id,a);case 12:i=e.sent;case 13:if(i.code!=_["a"].OK&&i.code!=_["a"].isSame&&i.code!=_["a"].isSameSaveData){e.next=17;break}d.toast(function(){d.dxDataGrid1.refresh()}),e.next=19;break;case 17:return d.errorCodeMsg(i.code,i.msg),e.abrupt("return",!1);case 19:return e.abrupt("return",!0);case 22:return e.prev=22,e.t0=e["catch"](0),d.error(e.t0),e.abrupt("return",!1);case 26:case"end":return e.stop()}},e,null,[[0,22]])}));return function(t,n){return e.apply(this,arguments)}}());case 10:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onRefreshHandler",value:function(e){this.dxDataGrid1.refresh()}}]),t}(b["a"]);O=f["a"]([Object(v["a"])({components:{DxDataGrid:x["DxDataGrid"]}})],O);var j=O,D=j,F=D,S=n("17cc"),G=Object(S["a"])(F,r,a,!1,null,null,null);t["default"]=G.exports},"8af1":function(e,t,n){"use strict";var r=n("8232"),a=n("471d"),i=n("7182"),o=n("44a7"),c=n("33ef"),u=n("3202"),s=n("50cd"),d=n("0811");a(a.S+a.F*!n("1969")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,a,l,p=i(e),h="function"==typeof this?this:Array,f=arguments.length,v=f>1?arguments[1]:void 0,m=void 0!==v,g=0,x=d(p);if(m&&(v=r(v,f>2?arguments[2]:void 0,2)),void 0==x||h==Array&&c(x))for(t=u(p.length),n=new h(t);t>g;g++)s(n,g,m?v(p[g],g):p[g]);else for(l=x.call(p),n=new h;!(a=l.next()).done;g++)s(n,g,m?o(l,v,[a.value,g],!0):a.value);return n.length=g,n}})},"92dd":function(e,t,n){n("4d6c"),n("8af1"),e.exports=n("836e").Array.from},"97b2":function(e,t,n){var r=n("419b"),a=n("0902")("iterator"),i=n("9191");e.exports=n("836e").isIterable=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||i.hasOwnProperty(r(t))}},a945:function(e,t,n){n("98be"),n("4d6c"),e.exports=n("97b2")},ab6b:function(e,t,n){e.exports=n("92dd")},ad81:function(e,t,n){e.exports=n("a945")}}]);