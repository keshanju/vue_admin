(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7499174e"],{"5c079":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("DxDataGrid",{ref:t.dxDataGridKey1})],1)},a=[],i=(n("4453"),n("ee95")),o=n("eb12"),s=n("ba94"),u=n("5ee8"),c=n("4e86"),p=n("5bc3"),l=n("3a61"),f=n("b2e6"),h=n("74a9"),d=n("1639"),g=n("f322"),w=function(t){function e(){return Object(o["a"])(this,e),Object(u["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(p["a"])(e,t),Object(s["a"])(e,[{key:"getListPager",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n,r,a,i,o=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:"",n=o.length>1&&void 0!==o[1]?o[1]:15,r=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/system/logs?account_token="+this.token+"&size="+n+"&page="+r+e,t.next=6,this.httpGet(a);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"getList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n,r=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r.length>0&&void 0!==r[0]?r[0]:"",e="/staff/stafflog?account_token="+this.token,t.next=4,this.httpGet(e);case 4:return n=t.sent,t.abrupt("return",n);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"setAdd",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/stafflog",r=e,t.next=4,this.httpPost(n,r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setUpdate",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,n){var r,a,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r="/staff/stafflog/"+e,a=n,t.next=4,this.httpPut(r,a);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"setDelete",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/stafflog/"+e,r="account_token="+this.token+"&ids="+e,t.next=4,this.httpDelete(n+"?"+r);case 4:t.sent;case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getModel",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/stafflog/"+e,r="account_token="+this.token,t.next=4,this.httpGet(n+"?"+r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(g["a"]),v=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(u["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.dxDataGridKey1="dxDataGrid_Key_1",t.staffLogApi=new w,t}return Object(p["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$parent.content_title="系统日志",this.initComponent(),this.getPagerList();case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"id",caption:"编号",width:80},{dataField:"staff_name",caption:"操作人",width:80,filterOperations:["=","contains"]},{allowFiltering:!0,allowSorting:!0,dataField:"ip",caption:"IP",width:120,filterOperations:["=","contains"]},{dataField:"op_type_title",caption:"操作类型",width:120,filterOperations:["=","contains"]},{allowFiltering:!0,allowSorting:!0,dataField:"create_time",caption:"操作时间",width:160,filterOperations:["=","contains"]},{allowFiltering:!0,allowSorting:!0,dataField:"op_user_nickname",caption:"操作用户",width:100,filterOperations:["=","contains"]},{dataField:"op_desc",caption:"操作说明",width:180,filterOperations:["=","contains"]},{dataField:"op_staff_name",caption:"操作员工",width:120,filterOperations:["=","contains"]}],e=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t});this.dxDataGrid1.option(e)}},{key:"onToolbarPreparingHandler",value:function(t){t.component;var e=t.toolbarOptions.items;e.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}})}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}},{key:"getPagerList",value:function(){var t=this,e=this.getDataGridPager(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(n,r,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.staffLogApi.getListPager(n,r,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:e})}}]),e}(d["a"]);v=l["a"]([Object(f["a"])({components:{DxDataGrid:h["DxDataGrid"],DxForm:h["DxForm"],DxTreeView:h["DxTreeView"]}})],v);var m=v,b=m,x=b,k=n("17cc"),O=Object(k["a"])(x,r,a,!1,null,null,null);e["default"]=O.exports}}]);