(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bdc5246","chunk-7bb24280"],{1787:function(e,t,r){"use strict";var n=r("4f1d"),a=r("6b32"),i=r("5f84"),o=r("7182"),u=r("ed52"),c=Object.assign;e.exports=!c||r("7f67")(function(){var e={},t={},r=Symbol(),n="abcdefghijklmnopqrst";return e[r]=7,n.split("").forEach(function(e){t[e]=e}),7!=c({},e)[r]||Object.keys(c({},t)).join("")!=n})?function(e,t){var r=o(e),c=arguments.length,s=1,l=a.f,h=i.f;while(c>s){var p,d=u(arguments[s++]),f=l?n(d).concat(l(d)):n(d),m=f.length,b=0;while(m>b)h.call(d,p=f[b++])&&(r[p]=d[p])}return r}:c},"18c6":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("dxUserSearchForm",{on:{onSearch:e.onSearch}}),r("br"),r("DxDataGrid",{ref:e.dxDataGridKey1})],1)},a=[],i=(r("48fb"),r("4453"),r("ee95")),o=r("eb12"),u=r("ba94"),c=r("5ee8"),s=r("4e86"),l=r("5bc3"),h=r("3a61"),p=r("b2e6"),d=r("74a9"),f=r("a60a"),m=r.n(f),b=r("1639"),v=r("f322"),g=function(e){function t(){return Object(o["a"])(this,t),Object(c["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(u["a"])(t,[{key:"getListPager",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o,u,c=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:"001",r=c.length>1&&void 0!==c[1]?c[1]:0,n=c.length>2&&void 0!==c[2]?c[2]:"",a=c.length>3&&void 0!==c[3]?c[3]:15,i=c.length>4&&void 0!==c[4]?c[4]:1,o="/staff/member/speed?account_token="+this.token+"&database_num="+t+"&member_id="+r+"&size="+a+"&page="+i+n,e.next=8,this.httpGet(o);case 8:return u=e.sent,e.abrupt("return",u);case 10:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/layouts/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/layouts",n=t,e.next=4,this.httpPost(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/layouts/"+t,a=r,e.next=4,this.httpPut(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/layouts/"+t,n="account_token="+this.token+"&ids="+t,e.next=4,this.httpDelete(r+"?"+n);case 4:e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/layouts/"+t,n="account_token="+this.token,e.next=4,this.httpGet(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(v["a"]),y=r("4c5d"),x=r("3787"),_=r("efc6"),w=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.dxFormKey1="dxForm_Key_1",e.dxDataGridKey1="dxDataGrid_Key_1",e.userSpeedLogApi=new g,e.db_num="1",e.mySearchFormModel={type:0,title:""},e}return Object(l["a"])(t,e),Object(u["a"])(t,[{key:"mounted",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$parent.content_title="加速日志",this.initComponent();case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var e=[{dataField:"id",caption:"编号",width:80},{dataField:"user_mobile_num",caption:"手机号",width:150,cellTemplate:function(e,t){var r=m()("<span>");t.value&&""!=t.value.toString()&&t.data.country_code&&""!=t.data.country_code.toString()&&r.append("(+"+t.data.country_code+")"),r.append(t.value),r.appendTo(e)}},{dataField:"user_mail",caption:"邮箱",width:150},{dataField:"user_name",caption:"账号",width:100},{dataField:"user_nickname",caption:"昵称",width:100},{dataField:"game_title",caption:"所属游戏",width:160},{allowFiltering:!0,allowSorting:!0,dataField:"start_time",caption:"开始时间",width:160},{allowFiltering:!0,allowSorting:!0,dataField:"end_time",caption:"结束时间",width:160},{dataField:"speed_status",caption:"加速状态",width:80,cellTemplate:function(e,t){var r=0==t.value?"red":"green";m()("<span style='color:"+r+"'>").append(y["a"].getDicText(y["a"].getDictonary().data.speed_status,t.value)).appendTo(e)}},{dataField:"line_title",caption:"加速线路",width:120},{dataField:"node_title",caption:"加速节点",width:120},{dataField:"server_ip",caption:"加速服务器",width:120}],t=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:e});this.dxDataGrid1.option(t)}},{key:"orderSearchHandler",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.validateForm(this.dxSearchForm1)){e.next=2;break}return e.abrupt("return");case 2:t=this.mySearchFormModel.type,r=this.mySearchFormModel.title,n="",e.t0=t,e.next=0===e.t0?8:1===e.t0?10:2===e.t0?12:14;break;case 8:return n="&search=mobile_num__equal__"+r,e.abrupt("break",14);case 10:return n="&search=user_name__equal__"+r,e.abrupt("break",14);case 12:return n="&search=mail__equal__"+r,e.abrupt("break",14);case 14:return a=new x["a"],e.next=17,a.UserListPager(n);case 17:if(i=e.sent,!(null==i.data||null==i.data.list||0==i.data.list.length||i.data.list.length>1)){e.next=21;break}return this.alert("没有查询到用户信息"),e.abrupt("return");case 21:o=i.data.list[0],this.db_num=o.database_num.toString(),this.setSearchKeywords("&search=user_id__equal__"+o.id),this.getPagerList();case 25:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onToolbarPreparingHandler",value:function(e){e.component;var t=e.toolbarOptions.items;t.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}})}},{key:"onRefreshHandler",value:function(e){this.dxDataGrid1.refresh()}},{key:"getPagerList",value:function(){var e=this,t=this.getDataGridPager(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(r,n,a){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.userSpeedLogApi.getListPager(e.db_num,0,r,n,a);case 2:return i=t.sent,t.abrupt("return",i);case 4:case"end":return t.stop()}},t)}));return function(e,r,n){return t.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:t})}},{key:"onSearch",value:function(e,t,r){this.db_num=r,this.setSearchKeywords("&search=user_id__equal__"+t),this.getPagerList()}}]),t}(b["a"]);w=h["a"]([Object(p["a"])({components:{DxDataGrid:d["DxDataGrid"],DxForm:d["DxForm"],DxTreeView:d["DxTreeView"],dxUserSearchForm:_["a"]}})],w);var k=w,O=k,j=O,R=r("17cc"),S=Object(R["a"])(j,n,a,!1,null,null,null);t["default"]=S.exports},"208e":function(e,t,r){e.exports=r("8b64")},3787:function(e,t,r){"use strict";r.d(t,"a",function(){return l});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),o=r("5ee8"),u=r("4e86"),c=r("5bc3"),s=r("f322"),l=function(e){function t(){return Object(a["a"])(this,t),Object(o["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),Object(i["a"])(t,[{key:"UserListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:"",r=o.length>1&&void 0!==o[1]?o[1]:15,n=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/member?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/group/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"userAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member",e.next=3,this.httpPost(r,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"userRePasswd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t+"/password",e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member/"+t+"?account_token="+this.token,e.next=3,this.httpGet(r);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdatePause",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/member/branch/"+t+"/pause/"+r,e.next=3,this.httpPostJson(a,n);case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}},e,this)}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,a="account_token=".concat(this.token,"&delete_explain=").concat(r),e.next=4,this.httpDelete(n+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserRefListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,u=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return u.length>2&&void 0!==u[2]?u[2]:"",n=u.length>3&&void 0!==u[3]?u[3]:15,a=u.length>4&&void 0!==u[4]?u[4]:1,i="/staff/member/refer?account_token="+this.token+"&size="+n+"&page="+a+"&member_id=".concat(t,"&refer_member_id=").concat(r),e.next=7,this.httpGet(i);case 7:return o=e.sent,e.abrupt("return",o);case 9:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserOpLogsListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,u,c=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=c.length>2&&void 0!==c[2]?c[2]:"",a=c.length>3&&void 0!==c[3]?c[3]:15,i=c.length>4&&void 0!==c[4]?c[4]:1,o="/staff/member/".concat(t,"/operate/log/").concat(r,"?account_token=").concat(this.token,"&page=").concat(i,"&size=").concat(a).concat(n),e.next=6,this.httpGet(o);case 6:return u=e.sent,e.abrupt("return",u);case 8:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()}]),t}(s["a"])},6896:function(e,t,r){var n=r("471d");n(n.S+n.F,"Object",{assign:r("1787")})},"8b64":function(e,t,r){r("6896"),e.exports=r("836e").Object.assign},efc6:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("DxForm",{ref:"dxSearchFormKey1"})],1)},a=[],i=(r("3a23"),r("612f"),r("48fb"),r("4453"),r("ee95")),o=r("208e"),u=r.n(o),c=r("eb12"),s=r("ba94"),l=r("5ee8"),h=r("4e86"),p=r("5bc3"),d=r("3a61"),f=r("b2e6"),m=r("1639"),b=r("4b0b"),v=r("3787"),g=r("4c5d"),y=r("f042"),x=r.n(y),_=r("74a9"),w=function(e){function t(){var e;return Object(c["a"])(this,t),e=Object(l["a"])(this,Object(h["a"])(t).apply(this,arguments)),e.options={is_search_user:!1},e.mySearchFormModel={search_type:0,search_country_code:86,search_keyword:""},e}return Object(p["a"])(t,e),Object(s["a"])(t,[{key:"isEmptyObject",value:function(e){for(var t in e)return!1;return!0}},{key:"mounted",value:function(){this.options.is_search_user=!!this.is_search_user&&this.is_search_user;var e=0;e=null==this.col_count?12:0,u()(this.options,{col_count:e}),this.initControls()}},{key:"initControls",value:function(){var e=this;this.dxSearchForm1=this.getDxInstanceByKey("dxSearchFormKey1"),this.dxSearchForm1.option({formData:this.mySearchFormModel,colCount:this.options.col_count,items:[{colSpan:2,label:{text:"搜索类型"},dataField:"search_type",editorType:"dxSelectBox",editorOptions:{placeholder:"请选择搜索类型",displayExpr:"text",valueExpr:"id",dataSource:[{text:"手机号",id:0},{text:"账号",id:1},{text:"邮箱",id:2}],value:0,onValueChanged:function(t){var r=t.value,n=e.dxSearchForm1.getEditor("search_country_code");0==r?n.option({disabled:!1}):n.option({disabled:!0})}},validationRules:[b["a"].getRequired("搜索类型不能为空!")]},{colSpan:2,label:{text:"国家区号"},dataField:"search_country_code",editorType:"dxSelectBox",editorOptions:{searchEnabled:!0,placeholder:"请选择国家区号查询!",dataSource:g["a"].getCountryCode(),displayExpr:"id",valueExpr:"id"},validationRules:[b["a"].getRequired("国家区号不能为空!")]},{colSpan:3,label:{text:"关键词"},dataField:"search_keyword",editorType:"dxTextBox",editorOptions:{placeholder:"请根据类型输入关键词进行查询!精确查询数据."},validationRules:[b["a"].getRequired("关键词不能为空!")]},{colSpan:2,itemType:"button",horizontalAlignment:"left",buttonOptions:{text:"搜索",icon:"search",type:"success",onClick:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var r,n,a,i,o,u,c,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e.validateForm(e.dxSearchForm1)){t.next=2;break}return t.abrupt("return");case 2:if(r=[],0==e.mySearchFormModel.search_type?(r.push({name:"mobile_num",filter:"equal",keyword:e.mySearchFormModel.search_keyword}),r.push({name:"country_code",filter:"equal",keyword:e.mySearchFormModel.search_country_code.toString()})):1==e.mySearchFormModel.search_type?r.push({name:"user_name",filter:"equal",keyword:e.mySearchFormModel.search_keyword}):2==e.mySearchFormModel.search_type&&r.push({name:"mail",filter:"equal",keyword:e.mySearchFormModel.search_keyword}),e.options.is_search_user){t.next=21;break}return n=[],x.a.from(r).forEach(function(e){n.push("".concat(e.name,"__").concat(e.filter,"__").concat(e.keyword))}),a="&search="+n.join("|"),i=new v["a"],t.next=11,i.UserListPager(a);case 11:if(o=t.sent,null!=o.data&&null!=o.data.list&&0!=o.data.list.length){t.next=15;break}return e.alert("没有查询到用户信息"),t.abrupt("return");case 15:u=o.data.list[0],c=u.id,s=u.database_num.toString(),e.$emit("onSearch",r,c,s),t.next=22;break;case 21:e.$emit("onSearch",r,0,0);case 22:case"end":return t.stop()}},t)}));function r(){return t.apply(this,arguments)}return r}()}}]})}}]),t}(m["a"]);d["a"]([Object(f["b"])()],w.prototype,"is_search_user",void 0),d["a"]([Object(f["b"])()],w.prototype,"col_count",void 0),w=d["a"]([Object(f["a"])({components:{DxDataGrid:_["DxDataGrid"],DxForm:_["DxForm"],DxTreeView:_["DxTreeView"],DxPopup:_["DxPopup"],DxTextArea:_["DxTextArea"]}})],w);var k=w,O=k,j=r("17cc"),R=Object(j["a"])(O,n,a,!1,null,null,null);t["a"]=R.exports}}]);