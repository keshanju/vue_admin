(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2528"],{"242b":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("DxDataGrid",{ref:e.dxDataGridKey1})],1)},i=[],r=(n("4453"),n("ee95")),o=n("eb12"),c=n("ba94"),d=n("5ee8"),s=n("4e86"),u=n("5bc3"),l=n("3a61"),p=n("b2e6"),h=n("74a9"),f=n("a60a"),b=n.n(f),g=n("1639"),m=n("be44"),v=n("84ec"),w=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(d["a"])(this,Object(s["a"])(t).apply(this,arguments)),e.dxDataGridKey1="dxDataGrid_Key_1",e.staffAPI=new m["a"],e}return Object(u["a"])(t,e),Object(c["a"])(t,[{key:"mounted",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$parent.content_title="员工角色管理",this.initComponent(),this.getRoleList();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var e=[{dataField:"id",caption:"编号",width:80},{allowFiltering:!0,allowSorting:!0,dataField:"name",caption:v["a"].lang_role_name,width:160},{dataField:"create_staff_name",caption:"创建人",width:80},{dataField:"create_time",caption:v["a"].lang_role_create_time,width:170},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:v["a"].Operate,width:200,cellTemplate:this.CellEdit}],t=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:e});this.dxDataGrid1.option(t)}},{key:"onToolbarPreparingHandler",value:function(e){e.component;var t=e.toolbarOptions.items;t.push({location:"before",widget:"dxButton",options:{text:v["a"].Add,icon:"add",onClick:this.onAddHandler}}),t.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}})}},{key:"onRefreshHandler",value:function(e){this.dxDataGrid1.refresh()}},{key:"getRoleList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this.getDataGridPager(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a,i){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.staffAPI.staffRoleGroupListPager(t,a,i);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,n,a){return e.apply(this,arguments)}}()),this.dxDataGrid1.option({remoteOperations:!0,dataSource:t});case 2:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"CellEdit",value:function(e,t){var n=this,a=this.getCreateLink("编辑菜单",function(e){n.redirect("/staff/role/edit/"+t.value)}),i=this.getCreateLink("编辑路由",function(e){n.redirect("/staff/role/"+t.value+"/route/edit")});b()("<div>").append(a).append(" | ").append(i).appendTo(e)}},{key:"onAddHandler",value:function(e){this.redirect("/staff/role/edit")}}]),t}(g["a"]);w=l["a"]([Object(p["a"])({components:{DxDataGrid:h["DxDataGrid"]}})],w);var x=w,k=x,y=k,D=n("17cc"),G=Object(D["a"])(y,a,i,!1,null,null,null);t["default"]=G.exports}}]);