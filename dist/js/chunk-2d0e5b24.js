(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5b24"],{"961b":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("DxDataGrid",{ref:t.dxDataGridKey1})],1)},a=[],i=(n("4453"),n("ee95")),o=n("eb12"),s=n("ba94"),c=n("5ee8"),u=n("4e86"),d=n("5bc3"),p=n("3a61"),h=n("b2e6"),l=n("74a9"),f=n("1639"),b=n("f322"),v=function(t){function e(){return Object(o["a"])(this,e),Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"UserPointListPager",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n,r,a,i,o=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:"",n=o.length>1&&void 0!==o[1]?o[1]:15,r=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/appeal?account_token="+this.token+"&size="+n+"&page="+r+e,t.next=6,this.httpGet(a);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"getUserPointModel",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/appeal/"+e+"?account_token="+this.token,t.next=3,this.httpGet(n);case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(b["a"]),g=n("84ec"),w=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(c["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.dxDataGridKey1="dxDataGridKey1",t.userPointAPI=new v,t}return Object(d["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.initComponent(),this.getUserPointList();case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"user_id",caption:"用户id",width:80},{dataField:"activity_id",caption:"活动ID",width:80},{dataField:"points",caption:"积分",width:80},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"id",alignment:"center",fixed:!0,fixedPosition:"right",caption:g["a"].Operate,width:200}],e=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t});this.dxDataGrid1.option(e)}},{key:"getUserPointList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this.getDataGridPager(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,r,a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.userPointAPI.UserPointListPager(e,r,a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));return function(e,n,r){return t.apply(this,arguments)}}()),this.dxDataGrid1.option({remoteOperations:!0,dataSource:e});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"onToolbarPreparingHandler",value:function(t){t.component;var e=t.toolbarOptions.items;e.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),e.push({location:"before",widget:"dxButton",options:{text:"返回用户管理",icon:"back",onClick:this.onAddHandler}})}},{key:"onAddHandler",value:function(t){this.redirect("/user/list")}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}}]),e}(f["a"]);w=p["a"]([Object(h["a"])({components:{DxDataGrid:l["DxDataGrid"]}})],w);var x=w,m=x,k=m,y=n("17cc"),O=Object(y["a"])(k,r,a,!1,null,null,null);e["default"]=O.exports}}]);