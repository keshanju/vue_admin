(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224523"],{e046:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("DxDataGrid",{ref:t.dxDataGridKey1})],1)},r=[],i=(a("b06f"),a("612f"),a("ea65"),a("48fb"),a("4453"),a("ee95")),o=a("eb12"),c=a("ba94"),s=a("5ee8"),u=a("4e86"),p=a("5bc3"),l=a("3a61"),d=a("b2e6"),h=a("a60a"),m=a.n(h),f=a("74a9"),g=a("1639"),v=a("f322"),w=function(t){function e(){return Object(o["a"])(this,e),Object(s["a"])(this,Object(u["a"])(e).apply(this,arguments))}return Object(p["a"])(e,t),Object(c["a"])(e,[{key:"getListPager",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a,n,r,i,o=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:"",a=o.length>1&&void 0!==o[1]?o[1]:15,n=o.length>2&&void 0!==o[2]?o[2]:1,r="/staff/game/report?account_token="+this.token+"&size="+a+"&page="+n+e,t.next=6,this.httpGet(r);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"getList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a,n=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",e="/staff/layouts/lists?account_token="+this.token,t.next=4,this.httpGet(e);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"setAdd",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var a,n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a="/staff/layouts",n=e,t.next=4,this.httpPost(a,n);case 4:return r=t.sent,t.abrupt("return",r);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setUpdate",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,a){var n,r,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/game/report/"+e,r=a,t.next=4,this.httpPut(n,r);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,this)}));function e(e,a){return t.apply(this,arguments)}return e}()},{key:"setDelete",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var a,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a="/staff/game/report/"+e,n="account_token="+this.token+"&ids="+e,t.next=4,this.httpDelete(a+"?"+n);case 4:t.sent;case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getModel",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var a,n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a="/staff/game/report/"+e,n="account_token="+this.token,t.next=4,this.httpGet(a+"?"+n);case 4:return r=t.sent,t.abrupt("return",r);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(v["a"]),b=a("fa92"),x=a.n(b),y=a("8591"),k=a.n(y),_=a("8daa"),F=a.n(_),D=a("4b0b"),O=a("9b13"),R=a("4c5d"),T=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(s["a"])(this,Object(u["a"])(e).apply(this,arguments)),t.dxDataGridKey1="dxDataGridKey1",t.gamehotAPI=new w,t._DataForm1={},t._DataFormReset1={},t}return Object(p["a"])(e,t),Object(c["a"])(e,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$parent.content_title="游戏上报",this.initComponent(),t.next=4,this.getGameHotList();case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"initComponent",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"id",caption:"编号",width:80},{allowFiltering:!0,allowSorting:!0,dataField:"user_mobile_num",caption:"所属用户",width:150,cellTemplate:function(t,e){var a=m()("<span>");e.value&&""!=e.value.toString()&&e.data.country_code&&""!=e.data.country_code.toString()&&a.append("(+"+e.data.country_code+")"),a.append(e.value),a.appendTo(t)}},{dataField:"user_mail",caption:"邮箱",width:80},{dataField:"contact_type",caption:"意见反馈",width:150,cellTemplate:function(t,e){m()("<span>").append(R["a"].getDicText(R["a"].getDictonary().data.public_report_contact_type,e.value)).appendTo(t)}},{dataField:"contact_desc",caption:"描述",width:150},{dataField:"contact_url",caption:"图片",width:150,cellTemplate:function(t,e){if(e.value){var a=e.value.split(","),n="";a.forEach(function(t,e){n+='<a href="'+t+'" target="_blank">查看图片'+(e+1)+"/</a>"}),m()("<span>").append(n).appendTo(t)}}},{dataField:"line_type",caption:"网络类型",width:150,cellTemplate:function(t,e){m()("<span>").append(R["a"].getDicText(R["a"].getDictonary().data.public_report_net_type,e.value)).appendTo(t)}},{allowFiltering:!0,allowSorting:!0,dataField:"title",caption:"游戏名称",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"contact",caption:"联系方式",width:100},{allowFiltering:!0,allowSorting:!0,dataField:"create_time",caption:"创建时间",width:160},{dataField:"user_name",caption:"账号",width:100},{dataField:"user_nickname",caption:"昵称",width:100},{dataField:"status",caption:"处理状态",width:80,cellTemplate:function(t,e){var a=0==e.value?"red":"green";m()("<span style='color:"+a+"'>").append(R["a"].getDicText(R["a"].getDictonary().data.game_report_state,e.value)).appendTo(t)}},{dataField:"staff_name",caption:"处理人",width:80},{dataField:"update_time",caption:"处理时间",width:160},{dataField:"desc",caption:"处理说明",width:200},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:"操作",width:200,cellTemplate:this.cellEdit}],e=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t});this.dxDataGrid1.option(e)}},{key:"cellEdit",value:function(t,e){var a=this,n=m()("<a href='#' data="+e.value+"> 处理 </a>");n.bind("click",function(t){var e=m()(t.target).attr("data"),n=m()("<div>").appendTo(m()(t.target));a.onDoGameReported(n[0],Number(e))}),m()("<div>").append(n).appendTo(t)}},{key:"getGameHotList",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this.getDataGridPager(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e,n,r){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.gamehotAPI.getListPager(e,n,r);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));return function(e,a,n){return t.apply(this,arguments)}}()),this.dxDataGrid1.option({remoteOperations:!0,dataSource:e});case 2:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"onToolbarPreparingHandler",value:function(t){var e=this,a=(t.component,t.toolbarOptions.items);a.push({location:"before",widget:"dxButton",options:{icon:"refresh",text:"刷新",onClick:this.onRefreshHandler}}),this.createSearchToolbars(a,this.dxDataGrid1.option("columns"),function(){e.getGameHotList()})}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}},{key:"onDoGameReported",value:function(t,e){var a=this;this.popup1=new x.a(t),this.popup1.option({title:"编辑",showTitle:!1,width:600,height:400,contentTemplate:function(){return a.dxForm1=new F.a(m()("<div />")[0]),a.initFormComponents(e),a.dxForm1.element()}}),this.popup1.show(),this.scroll_view1=new k.a(m()(this.popup1.content())[0],{useNative:!1})}},{key:"initFormComponents",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var a,n,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(e>0)){t.next=5;break}return t.next=3,this.gamehotAPI.getModel(e);case 3:a=t.sent,this._DataForm1=a.data;case 5:n=[{itemType:"group",caption:"处理",items:[{dataField:"title",label:{text:"标题"},template:function(t,e){m()("<span></span>").appendTo(e).text(r._DataForm1.title)}},{dataField:"status",label:{text:"状态"},editorType:"dxSelectBox",editorOptions:{placeholder:"请选择状态",dataSource:R["a"].getDictonary().data.game_report_state,displayExpr:"name",valueExpr:"id",value:0},validationRules:[D["a"].getRequired("请选择状态!")]},{dataField:"desc",label:{text:"处理说明"},editorType:"dxTextArea",editorOptions:{placeholder:"请输入处理说明",height:150},validationRules:[D["a"].getRequired("处理说明不能为空!")]}]},{itemType:"group",colCount:2,items:[{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"确定处理",type:"success",useSubmitBehavior:!0,onClick:this.onFormClickHandler}},{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"返回",type:"normal",onClick:function(){r.popup1.hide()}}}]}],this.dxForm1.option({formData:this._DataForm1,items:n});case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"onFormClickHandler",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,this.validateForm(this.dxForm1)){t.next=3;break}return t.abrupt("return");case 3:return this._DataForm1.account_token=this.token,e=this.joinFormParams(this._DataForm1),t.next=7,this.gamehotAPI.setUpdate(this._DataForm1.id,e);case 7:a=t.sent,a.code==O["a"].OK||a.code==O["a"].isSame||a.code==O["a"].isSameSaveData?this.toast(function(){n.dxDataGrid1.refresh(),n.popup1.hide(),n.popup1.dispose()}):this.errorCodeMsg(a.code,a.msg),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),this.error(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));function e(){return t.apply(this,arguments)}return e}()}]),e}(g["a"]);T=l["a"]([Object(d["a"])({components:{DxDataGrid:f["DxDataGrid"]}})],T);var j=T,G=j,P=G,S=a("17cc"),C=Object(S["a"])(P,n,r,!1,null,null,null);e["default"]=C.exports}}]);