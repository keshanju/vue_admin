(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44ace195"],{"2c32":function(e,t,r){"use strict";r.d(t,"a",function(){return p});r("4453");var n=r("ee95"),a=r("eb12"),u=r("ba94"),i=r("5ee8"),s=r("4e86"),c=r("5bc3"),o=r("f322"),p=function(e){function t(){return Object(a["a"])(this,t),Object(i["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),Object(u["a"])(t,[{key:"UserGroupListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,u,i=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:"",r=i.length>1&&void 0!==i[1]?i[1]:15,n=i.length>2&&void 0!==i[2]?i[2]:1,a="/staff/group?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return u=e.sent,e.abrupt("return",u);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"userGroupAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/group",e.next=3,this.httpPost(r,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userGroupUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/group/"+t,e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserGroupModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/group/"+t+"?account_token="+this.token,e.next=3,this.httpGet(r);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getGroupPackageList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/group/"+t+"/package?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setGroupPackage",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/group/"+t+"/package",a={account_token:this.token,package_id:r},e.next=4,this.httpPostJson(n,a);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()}]),t}(o["a"])},"5aa4":function(e,t,r){"use strict";r.d(t,"a",function(){return p});r("4453");var n=r("ee95"),a=r("eb12"),u=r("ba94"),i=r("5ee8"),s=r("4e86"),c=r("5bc3"),o=r("f322"),p=function(e){function t(){return Object(a["a"])(this,t),Object(i["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),Object(u["a"])(t,[{key:"getListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,u,i=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:"",r=i.length>1&&void 0!==i[1]?i[1]:15,n=i.length>2&&void 0!==i[2]?i[2]:1,a="/staff/package?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return u=e.sent,e.abrupt("return",u);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/package/list?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"seteAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package",n=t,e.next=4,this.httpPost(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t,a=r,e.next=4,this.httpPut(n,a);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package/"+t,n="account_token="+this.token+"&ids="+t,e.next=4,this.httpDelete(r+"?"+n);case 4:e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package/"+t,n="account_token="+this.token,e.next=4,this.httpGet(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getPackageLineList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/lines?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageLine",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/lines",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageGameList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/game?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageGame",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/game",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageCardList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/card?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageCard",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/card",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageDiscountList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/discount?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageDiscount",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,u,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/package/"+t+"/discount",u={account_token:this.token,bind_ids:r,bind_ids2:n},e.next=4,this.httpPostJson(a,u);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r,n){return e.apply(this,arguments)}return t}()}]),t}(o["a"])},fcf7:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("DxForm",{ref:e.dxFormKey1})],1)},a=[],u=r("77fe"),i=r.n(u),s=(r("b06f"),r("4453"),r("ee95")),c=r("eb12"),o=r("ba94"),p=r("5ee8"),h=r("4e86"),f=r("5bc3"),l=r("3a61"),g=r("b2e6"),v=r("74a9"),k=r("1639"),d=r("2c32"),m=r("5aa4"),b=r("9b13"),w=function(e){function t(){var e;return Object(c["a"])(this,t),e=Object(p["a"])(this,Object(h["a"])(t).apply(this,arguments)),e.dxFormKey1="dxFormKey1",e.userGroupApi=new d["a"],e.packageApi=new m["a"],e}return Object(f["a"])(t,e),Object(o["a"])(t,[{key:"mounted",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.$parent.content_title="用户组与套餐绑定",this.usergroupID=Number(this.getParam("id")),this.initComponents(),e.next=5,this.getDataListByLines();case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponents",value:function(){this.dxForm1=this.getDxInstanceByKey(this.dxFormKey1);var e=[{itemType:"group",items:[{label:{text:"套餐列表"},dataField:"data_selected_all",editorType:"dxTreeView",editorOptions:{height:500,displayExpr:"title",valueExpr:"id",showCheckBoxesMode:"normal",searchEnabled:!0,onContentReady:this.getDataListByPackageSelected}}]},{itemType:"group",colCount:2,items:[{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:this.submitText,type:"success",useSubmitBehavior:!0,onClick:this.onClickDoHandler}},{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"返回",type:"normal",onClick:this.onClickBackHandler}}]}];this.dxForm1.option({width:400,items:e}),this.dxTreeView1=this.dxForm1.getEditor("data_selected_all")}},{key:"getDataListByLines",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.packageApi.getList();case 2:t=e.sent,this.dxTreeView1.option({dataSource:t.data});case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getDataListByPackageSelected",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var r,n,a,u,s,c,o,p,h;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.component,e.next=3,this.userGroupApi.getGroupPackageList(this.usergroupID);case 3:for(n=e.sent,a=n.data,u=!0,s=!1,c=void 0,e.prev=8,o=i()(a);!(u=(p=o.next()).done);u=!0)h=p.value,r.selectItem(h.package_id);e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](8),s=!0,c=e.t0;case 16:e.prev=16,e.prev=17,u||null==o.return||o.return();case 19:if(e.prev=19,!s){e.next=22;break}throw c;case 22:return e.finish(19);case 23:return e.finish(16);case 24:case"end":return e.stop()}},e,this,[[8,12,16,24],[17,,19,23]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"onClickDoHandler",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var r,n,a,u,s,c,o,p,h,f=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:for(e.prev=0,r=this.dxTreeView1.getNodes(),n=[],a=!0,u=!1,s=void 0,e.prev=6,c=i()(r);!(a=(o=c.next()).done);a=!0)p=o.value,p.selected&&n.push(p.key);e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](6),u=!0,s=e.t0;case 14:e.prev=14,e.prev=15,a||null==c.return||c.return();case 17:if(e.prev=17,!u){e.next=20;break}throw s;case 20:return e.finish(17);case 21:return e.finish(14);case 22:if(!(n.length<1)){e.next=25;break}return this.alert("请至少选择一个选项!再进行提交."),e.abrupt("return");case 25:return e.next=27,this.userGroupApi.setGroupPackage(this.usergroupID,n);case 27:h=e.sent,h.code==b["a"].OK||h.code==b["a"].isSame||h.code==b["a"].isSameSaveData?this.toast(function(){f.redirect("/user/group/list")}):this.errorCodeMsg(h.code,h.msg),e.next=34;break;case 31:e.prev=31,e.t1=e["catch"](0),this.error(e.t1);case 34:case"end":return e.stop()}},e,this,[[0,31],[6,10,14,22],[15,,17,21]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"onClickBackHandler",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.redirect("/user/group/list");case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(k["a"]);w=l["a"]([Object(g["a"])({components:{DxDataGrid:v["DxDataGrid"],DxForm:v["DxForm"],DxTreeView:v["DxTreeView"]}})],w);var x=w,y=x,R=y,O=r("17cc"),j=Object(O["a"])(R,n,a,!1,null,null,null);t["default"]=j.exports}}]);