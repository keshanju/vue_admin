(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14cd6937"],{"42d8":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("DxDataGrid",{ref:t.dxDataGridKey1})],1)},a=[],i=(n("4453"),n("ee95")),u=n("eb12"),o=n("ba94"),c=n("5ee8"),s=n("4e86"),p=n("5bc3"),d=n("3a61"),h=n("b2e6"),l=n("a60a"),f=n.n(l),m=n("74a9"),b=n("1639"),v=n("87cd"),w=n("4c5d"),g=n("84ec"),x=function(t){function e(){var t;return Object(u["a"])(this,e),t=Object(c["a"])(this,Object(s["a"])(e).apply(this,arguments)),t.dxDataGridKey1="dxDataGridKey1",t.userDurationAPI=new v["a"],t}return Object(p["a"])(e,t),Object(o["a"])(e,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.initComponent(),this.getUserDurationList();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"user_nickname",caption:"用户id",width:120},{dataField:"minutes",caption:"分钟数",width:120},{dataField:"op_source",caption:"操作来源",width:120,cellTemplate:function(t,e){f()("<span>").append(w["a"].getDicText(w["a"].getDictonary().data.duration_option_source,e.value)).appendTo(t)}},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"ref_id",caption:"相关流水ID",width:120},{dataField:"change_time_option",caption:"修改时长选项",width:120},{dataField:"id",alignment:"center",fixed:!0,fixedPosition:"right",caption:g["a"].Operate,width:200}],e=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t});this.dxDataGrid1.option(e)}},{key:"getUserDurationList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this.getDataGridPager(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,r,a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.userDurationAPI.UserDurationListPager(e,r,a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));return function(e,n,r){return t.apply(this,arguments)}}()),this.dxDataGrid1.option({remoteOperations:!0,dataSource:e});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"onToolbarPreparingHandler",value:function(t){t.component;var e=t.toolbarOptions.items;e.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),e.push({location:"before",widget:"dxButton",options:{text:"返回用户管理",icon:"back",onClick:this.onAddHandler}})}},{key:"onAddHandler",value:function(t){this.redirect("/user/list")}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}}]),e}(b["a"]);x=d["a"]([Object(h["a"])({components:{DxDataGrid:m["DxDataGrid"]}})],x);var k=x,D=k,y=D,O=n("17cc"),j=Object(O["a"])(y,r,a,!1,null,null,null);e["default"]=j.exports},"87cd":function(t,e,n){"use strict";n.d(e,"a",function(){return p});n("4453");var r=n("ee95"),a=n("eb12"),i=n("ba94"),u=n("5ee8"),o=n("4e86"),c=n("5bc3"),s=n("f322"),p=function(t){function e(){return Object(a["a"])(this,e),Object(u["a"])(this,Object(o["a"])(e).apply(this,arguments))}return Object(c["a"])(e,t),Object(i["a"])(e,[{key:"UserDurationListPager",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n,r,a,i,u=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=u.length>0&&void 0!==u[0]?u[0]:"",n=u.length>1&&void 0!==u[1]?u[1]:15,r=u.length>2&&void 0!==u[2]?u[2]:1,a="/staff/member/appeal?account_token="+this.token+"&size="+n+"&page="+r+e,t.next=6,this.httpGet(a);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"userDurationAdd",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/appeal",t.next=3,this.httpPost(n,e);case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"userDurationUpdate",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r="/staff/member/"+e+"/duration",t.next=3,this.httpPut(r,n);case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"getUserDurationModel",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/member/"+e+"?account_token="+this.token,t.next=3,this.httpGet(n);case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setUserDurationEdit",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n,r){var a,i,u;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a="/staff/member/time/".concat(e),i="account_token=".concat(this.token,"&reduce_time=").concat(n,"&invoice_money=").concat(r),t.next=4,this.httpPut(a,i);case 4:return u=t.sent,t.abrupt("return",u);case 6:case"end":return t.stop()}},t,this)}));function e(e,n,r){return t.apply(this,arguments)}return e}()}]),e}(s["a"])}}]);