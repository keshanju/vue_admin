(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21c2eb14"],{"39ba":function(e,t,a){"use strict";a.d(t,"a",function(){return d});a("4453");var r=a("ee95"),n=a("eb12"),i=a("ba94"),s=a("5ee8"),o=a("4e86"),u=a("5bc3"),c=a("f322"),d=function(e){function t(){return Object(n["a"])(this,t),Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,a,r,n,i,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:"",a=s.length>1&&void 0!==s[1]?s[1]:15,r=s.length>2&&void 0!==s[2]?s[2]:1,n="/staff/role?account_token="+this.token+"&size="+a+"&page="+r+t,e.next=6,this.httpGet(n);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,a,r=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r.length>0&&void 0!==r[0]?r[0]:"",t="/staff/role/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a,r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/role",r=t,e.next=4,this.httpPost(a,r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a){var r,n,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/role/"+t,n=a,e.next=4,this.httpPut(r,n);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/role/"+t,r="account_token="+this.token+"&ids="+t,e.next=4,this.httpDelete(a+"?"+r);case 4:e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a,r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/role/"+t,r="account_token="+this.token,e.next=4,this.httpGet(a+"?"+r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setStaffRoleRoutePath",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a){var r,n,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/role/"+t+"/route",n={account_token:this.token,route_ids:a},e.next=4,this.httpPostJson(r,n);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}()},{key:"getRoleRotePathRelation",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/role/"+t+"/route/relation?account_token="+this.token,e.next=3,this.httpGet(a);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(c["a"])},fb20:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("DxForm",{ref:e.dxFormKey1})],1)},n=[],i=(a("4453"),a("ee95")),s=a("eb12"),o=a("ba94"),u=a("5ee8"),c=a("4e86"),d=a("5bc3"),l=a("3a61"),p=a("b2e6"),h=a("a60a"),f=a.n(h),m=a("74a9"),x=a("1639"),v=a("be44"),b=a("39ba"),g=a("9b13"),w=a("84ec"),k=a("4b0b"),y=a("4c5d"),R=a("019a"),F=a.n(R),_=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(u["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.dxFormKey1="dxForm_Key_1",e.dxForm1=null,e.dxSelectBox1=null,e.dxFormData1={status:1,super_password:""},e.dxFormDataReset1={},e.staffAPI=new v["a"],e.staffRoleAPI=new b["a"],e}return Object(d["a"])(t,e),Object(o["a"])(t,[{key:"mounted",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.$parent.content_title="员工编辑",this.dxFormData1.id=0,this.dxFormData1.account_token=this.token,this.ID!==g["a"].zero&&(this.submitText=w["a"].Update),this.initComponent(),this.getRoleUserList(),this.ID===g["a"].zero){e.next=9;break}return e.next=9,this.getStaffModel(this.ID);case 9:this.dxFormDataReset1=f.a.extend(!0,{},this.dxFormData1);case 10:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){var e=this;this.dxForm1=this.getDxInstanceByKey(this.dxFormKey1);var t=[],a=!1;this.ID>0&&(a=!0),t.push({dataField:"staff_name",label:{text:"账号"},editorOptions:{placeholder:"请输入4-16位的字母、数字、下划线!",readOnly:a,disabled:a},validationRules:[k["a"].getRequired("账号不能为空!"),k["a"].getUserName("请输入4-16位的字母、数字、下划线!")]});var r=[],n=[];this.ID==g["a"].zero?(r=[k["a"].getRequired("密码不能为空!"),k["a"].getPassword("密码强度弱了至少8个字符,数字,字母,特殊符号!")],n=[k["a"].getRequired("确认密码不能为空!"),k["a"].getCompare(function(){return e.dxFormData1.staff_pwd},"两次输入的密码不一致!")]):(r=[k["a"].getPassword("密码强度弱了至少8个字符,数字,字母,特殊符号!")],n=[k["a"].getCompare(function(){return e.dxFormData1.staff_pwd},"两次输入的密码不一致!")]),t.push({dataField:"staff_pwd",label:{text:"密码"},editorOptions:{mode:"password",placeholder:"请输入8位以上的密码"},validationRules:r}),t.push({dataField:"staff_pwd2",label:{text:"确认密码"},editorOptions:{mode:"password",placeholder:"请再次输入密码"},validationRules:n}),t.push({dataField:"super_password",label:{text:"超级密码"},editorOptions:{mode:"password",placeholder:"请输入超级密码,主要员工操作二次确认,比如导出卡"},validationRules:[k["a"].getPassword("密码强度弱了至少8个字符,数字,字母,特殊符号!")]}),t.push({dataField:"name",label:{text:"员工姓名"},editorOptions:{placeholder:"请输入合法的员工姓名"},validationRules:[k["a"].getRequired("员工姓名不能为空!")]}),t.push({dataField:"role_id",editorType:"dxSelectBox",label:{text:w["a"].lang_role_id},editorOptions:{placeholder:"请选择一个角色",displayExpr:"name",valueExpr:"id",searchEnabled:!0},validationRules:[k["a"].getRequired("请选择一个角色!")]}),t.push({dataField:"id_number",label:{text:w["a"].lang_id_number},editorOptions:{placeholder:"请输入有效的身份证号码"},validationRules:[k["a"].getRequired("身份证号码不能为空!"),k["a"].getIdNumber("不是有效的身份证号码!")]}),t.push({dataField:"qq",label:{text:w["a"].lang_qq},editorOptions:{placeholder:"QQ号码"},validationRules:[]}),t.push({dataField:"mail",label:{text:w["a"].lang_mail},editorOptions:{placeholder:"邮箱地址"},validationRules:[k["a"].getEmail("不是有效的邮箱!")]}),t.push({dataField:"phone",label:{text:w["a"].lang_phone},editorOptions:{placeholder:"手机号码"},validationRules:[k["a"].getMobile("不是有效的手机号!")]}),t.push({dataField:"address",label:{text:w["a"].lang_address},editorType:"dxTextArea",editorOptions:{placeholder:"地址信息"}}),t.push({dataField:"status",editorType:"dxSelectBox",label:{text:w["a"].lang_status},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.status}}),t.push({dataField:"end_time",editorType:"dxDateBox",label:{text:w["a"].lang_end_time},editorOptions:{placeholder:"账号过期时间",type:"datetime",displayFormat:"yyyy-MM-dd HH:mm:ss",dateSerializationFormat:"yyyy-MM-dd HH:mm:ss",showClearButton:!0,min:new Date}});var i=[];i.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:this.ID>0?w["a"].Update:w["a"].Add,type:"success",useSubmitBehavior:!0,onClick:this.onClickDoHandler}}),i.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"重置",type:"normal",onClick:this.onResetHandler}}),i.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:w["a"].Back,type:"normal",onClick:this.onClickBackHandler}});var s=[];s.push({itemType:"group",items:t},{itemType:"group",colCount:3,items:i});var o={formData:this.dxFormData1,items:s,width:500};this.dxForm1.option(o),this.dxSelectBox1=this.dxForm1.getEditor("role_id")}},{key:"getRoleUserList",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.staffRoleAPI.getList();case 2:t=e.sent,this.dxSelectBox1.option({dataSource:t.data});case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onClickDoHandler",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,a,r,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,this.validateForm(this.dxForm1)){e.next=3;break}return e.abrupt("return");case 3:if(this.dxFormData1.account_token=this.token,t=f.a.extend(!0,{},this.dxFormData1),""!=t.staff_pwd&&(t.staff_pwd=F()(t.staff_pwd),t.staff_pwd2=F()(t.staff_pwd2)),t.super_password&&""!=t.super_password&&(t.super_password=F()(t.super_password)),a=this.joinFormParams(t),this.dxFormData1.id!=g["a"].zero){e.next=14;break}return e.next=11,this.staffAPI.staffAdd(a);case 11:r=e.sent,e.next=17;break;case 14:return e.next=16,this.staffAPI.staffUpdate(t.id,a);case 16:r=e.sent;case 17:r.code==g["a"].OK||r.code==g["a"].isSame||r.code==g["a"].isSameSaveData?this.toast(function(){n.redirect("/staff/list")}):this.errorCodeMsg(r.code,r.msg),e.next=23;break;case 20:e.prev=20,e.t0=e["catch"](0),this.error(e.t0);case 23:case"end":return e.stop()}},e,this,[[0,20]])}));function t(){return e.apply(this,arguments)}return t}()},{key:"onResetHandler",value:function(e){this.dxFormData1=f.a.extend(!0,{},this.dxFormDataReset1),this.dxForm1.option("formData",this.dxFormData1)}},{key:"onClickBackHandler",value:function(){this.redirect("/staff/list")}},{key:"getStaffModel",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.staffAPI.getStaffModel(t);case 2:a=e.sent,this.dxFormData1=a.data,this.dxForm1.option("formData",this.dxFormData1);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(x["a"]);_=l["a"]([Object(p["a"])({components:{DxForm:m["DxForm"],DxPopup:m["DxPopup"]}})],_);var O=_,D=O,j=D,P=a("17cc"),S=Object(P["a"])(j,r,n,!1,null,null,null);t["default"]=S.exports}}]);