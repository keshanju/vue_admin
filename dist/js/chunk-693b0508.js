(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-693b0508"],{"22c6":function(e,t,r){"use strict";r.d(t,"a",function(){return l});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),o=r("5ee8"),s=r("4e86"),u=r("5bc3"),c=r("f322"),l=function(e){function t(){return Object(a["a"])(this,t),Object(o["a"])(this,Object(s["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:"",r=o.length>1&&void 0!==o[1]?o[1]:15,n=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/server?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:"",r="/staff/server/lists?account_token="+this.token+"&"+t,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/server",n=t,e.next=4,this.httpPost(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/server/"+t,a=r,e.next=4,this.httpPutJson(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/server/"+t,n="account_token="+this.token,e.next=4,this.httpDelete(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/server/"+t,n="account_token="+this.token,e.next=4,this.httpGet(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setBatUpdateState",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/server/status",n=t,e.next=4,this.httpPutJson(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdateServerOnline",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t="/staff/server/checkOnline",r="account_token="+this.token,e.next=4,this.httpPost(t,r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getServerNodeError",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=s.length>2&&void 0!==s[2]?s[2]:1,a=s.length>3&&void 0!==s[3]?s[3]:15,i="/staff/statistics/speed/node/error?account_token=".concat(this.token,"&page=").concat(n,"&size=").concat(a,"&start_time=").concat(t,"&end_time=").concat(r),e.next=5,this.httpGet(i);case 5:return o=e.sent,e.abrupt("return",o);case 7:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()}]),t}(c["a"])},c7cc:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("DxForm",{ref:e.dxFormKey1})],1)},a=[],i=(r("4453"),r("ee95")),o=r("eb12"),s=r("ba94"),u=r("5ee8"),c=r("4e86"),l=r("5bc3"),d=r("3a61"),p=r("b2e6"),h=r("74a9"),m=r("a60a"),v=r.n(m),x=r("1639"),f=r("22c6"),b=r("4c5d"),g=r("9b13"),y=r("4b0b"),k=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.dxFormKey1="dxFormKey1",e.dxFormData1={id:0,is_valid:1,is_online:1},e.dxFormDataReset1={},e.serverAPI=new f["a"],e}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"mounted",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.initComponents(),!(this.ID>g["a"].zero)){e.next=4;break}return e.next=4,this.getDataModel(this.ID);case 4:this.dxFormDataReset1=v.a.extend(!0,{},this.dxFormData1);case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponents",value:function(){this.dxForm1=this.getDxInstanceByKey(this.dxFormKey1);var e=[{itemType:"group",caption:this.ID>g["a"].zero?"更新":"添加",items:[{dataField:"title",label:{text:"服务器名称"},editorOptions:{placeholder:"请输入服务器名称"},validationRules:[y["a"].getRequired("服务器名称不能为空!")]},{dataField:"server",label:{text:"服务器ip地址"},editorOptions:{placeholder:"请输入服务器IP地址"},validationRules:[y["a"].getRequired("服务器ip地址不能为空!"),y["a"].getIP("服务器IP地址不正确!")]},{dataField:"is_valid",label:{text:"服务器是否有效"},editorType:"dxSelectBox",editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:b["a"].getDictonary().data.valid},validationRules:[y["a"].getRequired("请选择服务器是否有效!")]},{dataField:"online_max_users",label:{text:"服务器最大允许在线人数"},editorType:"dxNumberBox",editorOptions:{value:0,min:0},validationRules:[y["a"].getRequired("服务器最大允许在线人数")]},{dataField:"server_type",label:{text:"服务器类型"},editorType:"dxSelectBox",editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:b["a"].getDictonary().data.server_type},validationRules:[y["a"].getRequired("请选择服务器类型")]},{itemType:"group",colCount:2,items:[{dataField:"s5_port",label:{text:"服务端口"},editorType:"dxNumberBox",editorOptions:{value:430,min:0},validationRules:[y["a"].getRequired("服务端口不能为空!")]},{dataField:"s5_end_port",label:{text:"S5出端口"},editorType:"dxNumberBox",editorOptions:{value:430,min:0},validationRules:[y["a"].getRequired("s5出端口不能为空!")]}]},{colCount:2,itemType:"group",items:[{dataField:"s5_mobile_port",label:{text:"移动端服务端口"},editorType:"dxNumberBox",editorOptions:{value:430,min:0},validationRules:[y["a"].getRequired("移动端服务端口不能为空!")]},{dataField:"s5_mobile_end_port",label:{text:"移动端服务出端口"},editorType:"dxNumberBox",editorOptions:{value:430,min:0},validationRules:[y["a"].getRequired("移动端服务出端口不能为空!")]}]},{dataField:"lan_delay",label:{text:"专线延迟(KB)"},editorType:"dxNumberBox",editorOptions:{value:0,min:0},validationRules:[y["a"].getRequired("专线延迟不能为空")]},{dataField:"lan_loss",label:{text:"内网丢包率(KB)"},editorOptions:{value:0,min:0},validationRules:[y["a"].getRequired("内网丢包率不能为空")]},{dataField:"is_online",label:{text:"是否可用于分配"},editorType:"dxSelectBox",editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:b["a"].getDictonary().data.flag},validationRules:[y["a"].getRequired("请选择是否可用于分配")]},{dataField:"desc",label:{text:"备注"},editorType:"dxTextArea",editorOptions:{placeholder:"请输入备注信息!"},validationRules:[]}]},{itemType:"group",colCount:3,items:[{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:this.ID>g["a"].zero?"更新":"添加",type:"success",useSubmitBehavior:!0,onClick:this.onClickDoHandler}},{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"重置",type:"normal",onClick:this.onResetHandler}},{itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"返回",type:"normal",onClick:this.onClickBackHandler}}]}],t={formData:this.dxFormData1,items:e,width:500,validationGroup:"customerData"};this.dxForm1.option(t)}},{key:"onResetHandler",value:function(e){this.dxFormData1=v.a.extend(!0,{},this.dxFormDataReset1),this.dxForm1.option("formData",this.dxFormData1)}},{key:"getDataModel",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.serverAPI.getModel(t);case 2:r=e.sent,this.dxFormData1=r.data,this.dxForm1.option({formData:this.dxFormData1});case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"onClickDoHandler",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,this.validateForm(this.dxForm1)){e.next=3;break}return e.abrupt("return");case 3:if(this.dxFormData1.account_token=this.token,r=this.joinFormParams(this.dxFormData1),this.dxFormData1.id!=g["a"].zero){e.next=11;break}return e.next=8,this.serverAPI.setAdd(r);case 8:n=e.sent,e.next=14;break;case 11:return e.next=13,this.serverAPI.setUpdate(this.ID,r);case 13:n=e.sent;case 14:n.code==g["a"].OK||n.code==g["a"].isSame||n.code==g["a"].isSameSaveData?this.toast(function(){a.redirect("/server/list")}):this.errorCodeMsg(n.code,n.msg),e.next=20;break;case 17:e.prev=17,e.t0=e["catch"](0),this.error(e.t0);case 20:case"end":return e.stop()}},e,this,[[0,17]])}));function t(t){return e.apply(this,arguments)}return t}()},{key:"onClickBackHandler",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.redirect("/server/list");case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(x["a"]);k=d["a"]([Object(p["a"])({components:{DxDataGrid:h["DxDataGrid"],DxForm:h["DxForm"],DxTreeView:h["DxTreeView"]}})],k);var R=k,w=R,O=w,D=r("17cc"),F=Object(D["a"])(O,n,a,!1,null,null,null);t["default"]=F.exports}}]);