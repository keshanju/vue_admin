(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f082ef18"],{bffa3:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("DxDataGrid",{ref:e.dxDataGridKey1})],1)},r=[],i=(a("4453"),a("ee95")),o=a("eb12"),c=a("ba94"),u=a("5ee8"),s=a("4e86"),l=a("5bc3"),p=a("3a61"),d=a("b2e6"),h=a("a60a"),f=a.n(h),w=a("74a9"),m=a("1639"),v=a("d315"),b=a("4c5d"),g=a("84ec"),k=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.dxDataGridKey1="dxDataGridKey1",e.userAPI=new v["a"],e}return Object(l["a"])(t,e),Object(c["a"])(t,[{key:"mounted",value:function(){this.$parent.content_title="申述管理",this.initComponent(),this.getUserAppealList()}},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var e=[{allowFiltering:!0,allowSorting:!0,dataField:"appeal_id",caption:"申诉编号",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"mobile_num",caption:"手机号",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"email",caption:"邮箱",width:160},{allowFiltering:!0,allowSorting:!0,dataField:"new_email",caption:"新邮箱",width:160},{allowFiltering:!0,allowSorting:!0,dataField:"new_mobile_num",caption:"新手机号",width:120},{dataField:"status",caption:"审核状态",width:80,cellTemplate:function(e,t){var a=0==t.value?"red":"green";f()("<span style='color:"+a+"'>").append(b["a"].getDicText(b["a"].getDictonary().data.appeal_status,t.value)).appendTo(e)}},{dataField:"user_desc",caption:"用户说明",width:180},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"op_time",caption:"操作时间",width:160},{dataField:"staff_name",caption:"操作人",width:80},{dataField:"op_desc",caption:"操作说明",width:180},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:g["a"].Operate,width:200,cellTemplate:this.cellEdit}],t=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:e,onRowClick:this.onRowClickHandler});this.dxDataGrid1.option(t)}},{key:"onRowClickHandler",value:function(e){var t=this;this.dbClick(function(){t.redirect("/user/appeal/edit/"+e.key.id)})}},{key:"cellEdit",value:function(e,t){var a=this,n=this.getCreateLink("编辑",function(e){a.redirect("/user/appeal/edit/"+t.value)});f()("<div>").append(n).appendTo(e)}},{key:"getUserAppealList",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this.getDataGridPager(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t,n,r){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.userAPI.UserAppealListPager(t,n,r);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,a,n){return e.apply(this,arguments)}}()),this.dxDataGrid1.option({remoteOperations:!0,dataSource:t});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onToolbarPreparingHandler",value:function(e){var t=this,a=(e.component,e.toolbarOptions.items);a.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),this.createSearchToolbars(a,this.dxDataGrid1.option("columns"),function(){t.getUserAppealList()})}},{key:"onAddHandler",value:function(e){this.redirect("/user/appeal/edit")}},{key:"onRefreshHandler",value:function(e){this.dxDataGrid1.refresh()}}]),t}(m["a"]);k=p["a"]([Object(d["a"])({components:{DxDataGrid:w["DxDataGrid"]}})],k);var x=k,y=x,O=y,D=a("17cc"),j=Object(D["a"])(O,n,r,!1,null,null,null);t["default"]=j.exports},d315:function(e,t,a){"use strict";a.d(t,"a",function(){return l});a("4453");var n=a("ee95"),r=a("eb12"),i=a("ba94"),o=a("5ee8"),c=a("4e86"),u=a("5bc3"),s=a("f322"),l=function(e){function t(){return Object(r["a"])(this,t),Object(o["a"])(this,Object(c["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"UserAppealListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,a,n,r,i,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:"",a=o.length>1&&void 0!==o[1]?o[1]:15,n=o.length>2&&void 0!==o[2]?o[2]:1,r="/staff/member/appeal?account_token="+this.token+"&size="+a+"&page="+n+t,e.next=6,this.httpGet(r);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"userAppealAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/member/appeal",e.next=3,this.httpPost(a,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userAppealUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/appeal/"+t,e.next=3,this.httpPut(n,a);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getUserAppealModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var a,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/member/appeal/"+t+"?account_token="+this.token,e.next=3,this.httpGet(a);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(s["a"])}}]);