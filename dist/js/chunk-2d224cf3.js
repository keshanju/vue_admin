(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224cf3"],{e25e:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("DxDataGrid",{ref:t.dxDataGridKey1})],1)},n=[],o=(e("4453"),e("ee95")),r=e("eb12"),l=e("ba94"),d=e("5ee8"),c=e("4e86"),s=e("5bc3"),p=e("3a61"),u=e("b2e6"),h=e("a60a"),g=e.n(h),w=e("74a9"),f=e("1639"),m=e("be44"),v=e("84ec"),b=e("4c5d"),F=function(t){function a(){var t;return Object(r["a"])(this,a),t=Object(d["a"])(this,Object(c["a"])(a).apply(this,arguments)),t.dxDataGridKey1="dxDataGrid_Key_1",t.staffAPI=new m["a"],t}return Object(s["a"])(a,t),Object(l["a"])(a,[{key:"mounted",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$parent.content_title="员工管理",this.initComponent(),this.getDataList();case 3:case"end":return t.stop()}},t,this)}));function a(){return t.apply(this,arguments)}return a}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"id",caption:"编号",width:80},{allowFiltering:!0,allowSorting:!0,dataField:"staff_name",caption:v["a"].lang_staff_name,width:140},{allowFiltering:!0,allowSorting:!0,dataField:"name",caption:v["a"].lang_name1,width:100},{dataField:"role_name",caption:"角色组",width:100},{allowFiltering:!0,allowSorting:!0,dataField:"phone",caption:"手机号",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"mail",caption:"邮箱",width:100},{allowFiltering:!0,allowSorting:!0,visible:!1,dataField:"qq",caption:"QQ",width:100},{visible:!1,dataField:"address",caption:"地址",width:100},{allowFiltering:!0,allowSorting:!0,dataField:"limited_ip",caption:"限制IP",width:100},{allowFiltering:!0,allowSorting:!0,dataField:"last_login_ip",caption:"最后登录IP",width:100},{allowFiltering:!0,allowSorting:!0,dataField:"last_login_time",caption:v["a"].lang_last_login_time,width:160},{dataField:"status",caption:"状态",width:100,cellTemplate:function(t,a){var e=0==a.value?"red":"green";g()("<span style='color:"+e+"'>").append(b["a"].getDicText(b["a"].getDictonary().data.status,a.value)).appendTo(t)}},{allowFiltering:!0,allowSorting:!0,dataField:"end_time",caption:"过期时间",width:160},{dataField:"change_time",caption:"修改时间",width:160},{dataField:"create_time",caption:"创建时间",width:160},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:v["a"].Operate,cellTemplate:this.cellEdit}],a=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t});this.dxDataGrid1.option(a)}},{key:"cellEdit",value:function(t,a){var e=this,i=this.getCreateLink("编辑",function(t){e.redirect("/staff/edit/"+a.value)});g()("<div>").append(i).appendTo(t)}},{key:"getDataList",value:function(){var t=this,a=this.getDataGridPager(function(){var a=Object(o["a"])(regeneratorRuntime.mark(function a(e,i,n){return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.staffAPI.staffDataListPager(e,i,n);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}},a)}));return function(t,e,i){return a.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:a})}},{key:"onToolbarPreparingHandler",value:function(t){var a=this,e=(t.component,t.toolbarOptions.items);e.push({location:"before",widget:"dxButton",options:{text:v["a"].Add,icon:"add",onClick:this.onAddHandler}}),e.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),this.createSearchToolbars(e,this.dxDataGrid1.option("columns"),function(){a.getDataList()})}},{key:"onAddHandler",value:function(t){this.redirect("/staff/edit")}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}}]),a}(f["a"]);F=p["a"]([Object(u["a"])({components:{DxDataGrid:w["DxDataGrid"]}})],F);var x=F,D=x,_=D,y=e("17cc"),k=Object(y["a"])(_,i,n,!1,null,null,null);a["default"]=k.exports}}]);