(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b9c8457"],{3787:function(e,t,r){"use strict";r.d(t,"a",function(){return p});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),u=r("5ee8"),s=r("4e86"),o=r("5bc3"),c=r("f322"),p=function(e){function t(){return Object(a["a"])(this,t),Object(u["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(o["a"])(t,e),Object(i["a"])(t,[{key:"UserListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,u=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=u.length>0&&void 0!==u[0]?u[0]:"",r=u.length>1&&void 0!==u[1]?u[1]:15,n=u.length>2&&void 0!==u[2]?u[2]:1,a="/staff/member?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/group/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"userAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member",e.next=3,this.httpPost(r,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"userRePasswd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t+"/password",e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member/"+t+"?account_token="+this.token,e.next=3,this.httpGet(r);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdatePause",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/member/branch/"+t+"/pause/"+r,e.next=3,this.httpPostJson(a,n);case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}},e,this)}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,a="account_token=".concat(this.token,"&delete_explain=").concat(r),e.next=4,this.httpDelete(n+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserRefListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,u,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s.length>2&&void 0!==s[2]?s[2]:"",n=s.length>3&&void 0!==s[3]?s[3]:15,a=s.length>4&&void 0!==s[4]?s[4]:1,i="/staff/member/refer?account_token="+this.token+"&size="+n+"&page="+a+"&member_id=".concat(t,"&refer_member_id=").concat(r),e.next=7,this.httpGet(i);case 7:return u=e.sent,e.abrupt("return",u);case 9:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserOpLogsListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,u,s,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=o.length>2&&void 0!==o[2]?o[2]:"",a=o.length>3&&void 0!==o[3]?o[3]:15,i=o.length>4&&void 0!==o[4]?o[4]:1,u="/staff/member/".concat(t,"/operate/log/").concat(r,"?account_token=").concat(this.token,"&page=").concat(i,"&size=").concat(a).concat(n),e.next=6,this.httpGet(u);case 6:return s=e.sent,e.abrupt("return",s);case 8:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()}]),t}(c["a"])},c118:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("DxDataGrid",{ref:e.dxDataGridKey1})],1)},a=[],i=(r("4453"),r("ee95")),u=(r("48fb"),r("eb12")),s=r("ba94"),o=r("5ee8"),c=r("4e86"),p=r("5bc3"),h=r("3a61"),d=r("b2e6"),l=r("a60a"),f=r.n(l),m=r("74a9"),b=r("1639"),v=r("f322"),g=function(e){function t(){return Object(u["a"])(this,t),Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(p["a"])(t,e),Object(s["a"])(t,[{key:"UserPointLogListPager",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n,a,i,u,s,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=o.length>1&&void 0!==o[1]?o[1]:"001",n=o.length>2&&void 0!==o[2]?o[2]:"",a=o.length>3&&void 0!==o[3]?o[3]:15,i=o.length>4&&void 0!==o[4]?o[4]:1,u="/staff/member/".concat(t,"/points/logs?account_token=").concat(this.token,"&database_num=").concat(r,"&page=").concat(i,"&size=").concat(a).concat(n),e.next=7,this.httpGet(u);case 7:return s=e.sent,e.abrupt("return",s);case 9:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userPointLogAdd",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/session",e.next=3,this.httpPost(r,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userPointLogUpdate",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/session/"+t,e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserPointLogModel",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/appeal/"+t+"?account_token="+this.token,e.next=3,this.httpGet(r);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(v["a"]),w=r("4c5d"),k=r("3787"),y=function(e){function t(){var e;return Object(u["a"])(this,t),e=Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.dxFormKey1="dxForm_Key_1",e.dxDataGridKey1="dxDataGridKey1",e.userPointLogAPI=new g,e.dbNum="001",e.userId=0,e.mySearchFormModel={type:0,title:""},e}return Object(p["a"])(t,e),Object(s["a"])(t,[{key:"mounted",value:function(){this.$parent.content_title="积分日志",this.userId=this.ID,this.dbNum=this.getParam("db_num"),this.initComponent(),this.getPagerList()}},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var e=[{dataField:"id",caption:"编号",width:80},{dataField:"user_mobile_num",caption:"所属用户",width:150,cellTemplate:function(e,t){var r=f()("<span>");t.value&&""!=t.value.toString()&&t.data.country_code&&""!=t.data.country_code.toString()&&r.append("(+"+t.data.country_code+")"),r.append(t.value),r.appendTo(e)}},{dataField:"user_mail",caption:"邮箱",width:150},{dataField:"user_name",caption:"账号",width:100},{dataField:"user_nickname",caption:"昵称",width:100},{dataField:"activity_title",caption:"活动标题",width:120},{dataField:"point",caption:"积分",width:120},{dataField:"point_from_type",caption:"积分来源",width:120,cellTemplate:function(e,t){f()("<span>").append(w["a"].getDicText(w["a"].getDictonary().data.public_user_point_edit_type,t.value)).appendTo(e)}},{allowFiltering:!0,allowSorting:!0,dataField:"point_ref_id",caption:"积分来源编号",width:120},{dataField:"expiry_time",caption:"失效时间",width:160},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"staff_name",caption:"操作员工",width:80},{dataField:"staff_operate_desc",caption:"员工操作原因",width:120},{dataField:"create_time",caption:"创建时间",width:160,visible:!1}],t=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:e});this.dxDataGrid1.option(t)}},{key:"orderSearchHandler",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.validateForm(this.dxSearchForm1)){e.next=2;break}return e.abrupt("return");case 2:t=this.mySearchFormModel.type,r=this.mySearchFormModel.title,n="",e.t0=t,e.next=0===e.t0?8:1===e.t0?10:2===e.t0?12:14;break;case 8:return n="&search=mobile_num__equal__"+r,e.abrupt("break",14);case 10:return n="&search=user_name__equal__"+r,e.abrupt("break",14);case 12:return n="&search=mail__equal__"+r,e.abrupt("break",14);case 14:return a=new k["a"],e.next=17,a.UserListPager(n);case 17:if(i=e.sent,!(null==i.data||null==i.data.list||0==i.data.list.length||i.data.list.length>1)){e.next=21;break}return this.alert("没有查询到用户信息"),e.abrupt("return");case 21:u=i.data.list[0],this.dbNum=u.database_num.toString(),this.setSearchKeywords("&search=user_id__equal__"+u.id),this.getPagerList();case 25:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onToolbarPreparingHandler",value:function(e){e.component;var t=e.toolbarOptions.items;t.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),t.push({location:"before",widget:"dxButton",options:{text:"返回用户管理",icon:"back",onClick:this.onAddHandler}})}},{key:"onAddHandler",value:function(e){this.redirect("/user/list")}},{key:"onRefreshHandler",value:function(e){this.setSearchKeywords(""),this.dxDataGrid1.refresh()}},{key:"getPagerList",value:function(){var e=this;try{var t=this.getDataGridPager(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(r,n,a){var i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.userPointLogAPI.UserPointLogListPager(e.userId,e.dbNum,r,n,a);case 2:if(i=t.sent,0!=i.code){t.next=7;break}return t.abrupt("return",i);case 7:e.errorCodeMsg(i.code,i.msg);case 8:case"end":return t.stop()}},t)}));return function(e,r,n){return t.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:t})}catch(r){this.error(r)}}}]),t}(b["a"]);y=h["a"]([Object(d["a"])({components:{DxDataGrid:m["DxDataGrid"],DxForm:m["DxForm"],DxTreeView:m["DxTreeView"]}})],y);var x=y,_=x,O=_,R=r("17cc"),j=Object(R["a"])(O,n,a,!1,null,null,null);t["default"]=j.exports}}]);