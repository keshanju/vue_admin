(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c8547aa4"],{"417d":function(t,e,n){"use strict";var r=n("6c85"),a=n.n(r);function i(t){if(a()(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var o=n("ab6b"),s=n.n(o),u=n("ad81"),c=n.n(u);function p(t){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return s()(t)}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){return i(t)||p(t)||l()}n.d(e,"a",function(){return d})},"50cd":function(t,e,n){"use strict";var r=n("4cf4"),a=n("0763");t.exports=function(t,e,n){e in t?r.f(t,e,a(0,n)):t[e]=n}},8887:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("DxDataGrid",{ref:t.dxDataGridKey1}),n("myEdit",{ref:"myEdit"})],1)},a=[],i=(n("4453"),n("ee95")),o=n("eb12"),s=n("ba94"),u=n("5ee8"),c=n("4e86"),p=n("5bc3"),l=n("3a61"),d=n("b2e6"),h=n("74a9"),f=n("a60a"),v=n.n(f),m=n("1639"),w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("dx-popup",{attrs:{visible:t.options.visible,title:t.options.title,toolbarItems:t.options.toolbarItems,width:t.options.width,height:t.options.height,onHidden:t.options.onHidden},on:{"update:visible":function(e){return t.$set(t.options,"visible",e)}}},[n("dx-scroll-view",[n("dx-form",{ref:"dxForm1"})],1)],1)},b=[],x=n("417d"),g=n("4b0b"),k=n("ef99"),y=n("9b13"),O=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(u["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.WallpaperApi=new k["a"],t.options={visible:!1,title:"新增/修改壁纸分类",toolbarItems:[],width:400,height:280},t.formData={account_token:"",id:0},t}return Object(p["a"])(e,t),Object(s["a"])(e,[{key:"created",value:function(){var t=this;this.options.toolbarItems.push({location:"after",toolbar:"bottom",widget:"dxButton",options:{text:"修改保存",type:"success",onClick:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var n,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t.validateForm(t.dxForm1)){e.next=2;break}return e.abrupt("return");case 2:if(e.prev=2,n=t.dxForm1.option("formData"),r=n.id,n.account_token=t.token,r!=y["a"].zero){e.next=12;break}return e.next=9,t.WallpaperApi.setAdd(n);case 9:a=e.sent,e.next=15;break;case 12:return e.next=14,t.WallpaperApi.setUpdate(r,n);case 14:a=e.sent;case 15:a.code==y["a"].OK||a.code==y["a"].isSame||a.code==y["a"].isSameSaveData?t.toast(function(){t.options.visible=!1,t.options.onHidden(!0)},a.msg):t.errorCodeMsg(a.code,a.msg),e.next=21;break;case 18:e.prev=18,e.t0=e["catch"](2),t.error(e.t0);case 21:case"end":return e.stop()}},e,null,[[2,18]])}));function n(){return e.apply(this,arguments)}return n}()}}),this.options.toolbarItems.push({location:"after",toolbar:"bottom",widget:"dxButton",options:{text:"取消",type:"normal",onClick:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t.options.visible=!1,t.options.onHidden(!0);case 2:case"end":return e.stop()}},e)}));function n(){return e.apply(this,arguments)}return n}()}})}},{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.WallpaperApi.getList();case 2:e=t.sent,n=[{id:0,name:"顶级",name_en:"top",pid:0}].concat(Object(x["a"])(e.data)),r=this.createFormItems([{dataField:"pid",label:{text:"壁纸分类"},editorType:"dxSelectBox",editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:n},validationRules:[g["a"].getRequired("游戏分类不能为空!")]},{dataField:"name",label:{text:"请输入分类名称"},editorOptions:{mode:"text",placeholder:"请输入分类名称"},validationRules:[g["a"].getRequired("分类名称不能为空!")]},{dataField:"name_en",label:{text:"请输入分类英文名称"},editorOptions:{mode:"text",placeholder:"请输入分类名称"},validationRules:[g["a"].getRequired("分类英文名称不能为空!")]},{dataField:"order",label:{text:"请输入分类排序"},editorOptions:{mode:"text",placeholder:"请输入分类排序"}}]),this.dxForm1=this.getDxInstanceByKey("dxForm1"),this.dxForm1.option({items:r,formData:this.formData});case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"show",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n,r,a=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=a.length>1&&void 0!==a[1]?a[1]:0,this.options.visible=!0,this.options.onHidden=e.onHidden,!(n>0)){t.next=8;break}return t.next=6,this.WallpaperApi.getDetailList(n);case 6:r=t.sent,this.dxForm1.option({formData:r.data});case 8:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(m["a"]);O=l["a"]([Object(d["a"])({components:{DxDataGrid:h["DxDataGrid"],DxForm:h["DxForm"],DxPopup:h["DxPopup"],DxScrollView:h["DxScrollView"]}})],O);var D=O,R=D,j=R,F=n("17cc"),G=Object(F["a"])(j,w,b,!1,null,null,null),_=G.exports,A=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(u["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.dxDataGridKey1="dxDataGridKey1",t.WallpaperApi=new k["a"],t}return Object(p["a"])(e,t),Object(s["a"])(e,[{key:"mounted",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$parent.content_title="壁纸分类管理",this.initComponents(),this.getDataList();case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"initComponents",value:function(){this.dxDataGrid1=this.getDxInstanceByKey(this.dxDataGridKey1);var t=[{dataField:"id",caption:"编号",width:80},{allowFiltering:!0,allowSorting:!0,dataField:"name",caption:"分类名称",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"name_en",caption:"分类英文名称",width:120},{allowFiltering:!0,allowSorting:!0,dataField:"order",caption:"排序",width:80},{dataField:"create_time",caption:"创建时间",width:160},{dataField:"create_staff_name",caption:"创建人",width:80},{dataField:"change_time",caption:"更新时间",width:160},{dataField:"change_staff_name",caption:"更新人",width:80},{fixed:!0,fixedPosition:"right",dataField:"id",alignment:"center",caption:"操作",width:200,cellTemplate:this.CellEdit}],e=this.getDataGridOption({onToolbarPreparing:this.onToolbarPreparingHandler,columns:t,onRowClick:this.onRowClickHandler});this.dxDataGrid1.option(e)}},{key:"onRowClickHandler",value:function(t){var e=this;this.dbClick(function(){e.redirect("/sell/news/label/edit/"+t.key.id)})}},{key:"CellEdit",value:function(t,e){var n=this,r=this.getCreateLink("编辑",function(t){n.$refs["myEdit"].show({onHidden:function(t){t&&n.dxDataGrid1.refresh()}},e.value)}),a=this.getCreateLink("删除",function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(r){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.delCate(e.value);case 2:n.getDataList();case 3:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}());v()("<div>").append(r).append(" | ").append(a).appendTo(t)}},{key:"onToolbarPreparingHandler",value:function(t){var e=this,n=(t.component,t.toolbarOptions.items);n.push({location:"before",widget:"dxButton",options:{text:"添加",icon:"add",onClick:this.onAddHandler}}),n.push({location:"before",widget:"dxButton",options:{text:"刷新",icon:"refresh",onClick:this.onRefreshHandler}}),this.createSearchToolbars(n,this.dxDataGrid1.option("columns"),function(){e.getDataList()})}},{key:"onRefreshHandler",value:function(t){this.dxDataGrid1.refresh()}},{key:"onAddHandler",value:function(t){var e=this;this.$refs["myEdit"].show({onHidden:function(t){t&&e.dxDataGrid1.refresh()}})}},{key:"getDataList",value:function(){var t=this,e=this.getDataGridPager(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(n,r,a){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.WallpaperApi.getListPager(n,r,a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t,n,r){return e.apply(this,arguments)}}());this.dxDataGrid1.option({remoteOperations:!0,dataSource:e})}},{key:"delCate",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.confirm("确认删除？");case 2:if(!t.sent){t.next=7;break}return t.next=5,this.WallpaperApi.setDelete(e);case 5:n=t.sent,n.code==y["a"].OK||n.code==y["a"].isSame||n.code==y["a"].isSameSaveData?this.toast(function(){},n.msg):this.errorCodeMsg(n.code,n.msg);case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(m["a"]);A=l["a"]([Object(d["a"])({components:{DxDataGrid:h["DxDataGrid"],DxForm:h["DxForm"],myEdit:_}})],A);var C=A,S=C,H=S,L=Object(F["a"])(H,r,a,!1,null,null,null);e["default"]=L.exports},"8af1":function(t,e,n){"use strict";var r=n("8232"),a=n("471d"),i=n("7182"),o=n("44a7"),s=n("33ef"),u=n("3202"),c=n("50cd"),p=n("0811");a(a.S+a.F*!n("1969")(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,a,l,d=i(t),h="function"==typeof this?this:Array,f=arguments.length,v=f>1?arguments[1]:void 0,m=void 0!==v,w=0,b=p(d);if(m&&(v=r(v,f>2?arguments[2]:void 0,2)),void 0==b||h==Array&&s(b))for(e=u(d.length),n=new h(e);e>w;w++)c(n,w,m?v(d[w],w):d[w]);else for(l=b.call(d),n=new h;!(a=l.next()).done;w++)c(n,w,m?o(l,v,[a.value,w],!0):a.value);return n.length=w,n}})},"92dd":function(t,e,n){n("4d6c"),n("8af1"),t.exports=n("836e").Array.from},"97b2":function(t,e,n){var r=n("419b"),a=n("0902")("iterator"),i=n("9191");t.exports=n("836e").isIterable=function(t){var e=Object(t);return void 0!==e[a]||"@@iterator"in e||i.hasOwnProperty(r(e))}},a945:function(t,e,n){n("98be"),n("4d6c"),t.exports=n("97b2")},ab6b:function(t,e,n){t.exports=n("92dd")},ad81:function(t,e,n){t.exports=n("a945")},ef99:function(t,e,n){"use strict";n.d(e,"a",function(){return p});n("4453");var r=n("ee95"),a=n("eb12"),i=n("ba94"),o=n("5ee8"),s=n("4e86"),u=n("5bc3"),c=n("f322"),p=function(t){function e(){return Object(a["a"])(this,e),Object(o["a"])(this,Object(s["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),Object(i["a"])(e,[{key:"getListPager",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n,r,a,i,o=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:"",n=o.length>1&&void 0!==o[1]?o[1]:15,r=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/wallpaper/cate?account_token="+this.token+"&size="+n+"&page="+r+e,t.next=6,this.httpGet(a);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"getList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n,r=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r.length>0&&void 0!==r[0]?r[0]:"",e="/staff/wallpaper/cate/lists?account_token="+this.token,t.next=4,this.httpGet(e);case 4:return n=t.sent,t.abrupt("return",n);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"setAdd",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper/cate",r=e,t.next=4,this.httpPost(n,r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setUpdate",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r="/staff/wallpaper/cate/"+e,a=n,t.next=4,this.httpPut(r,a);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"getDetailList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper/cate/"+e+"?account_token="+this.token,t.next=3,this.httpGet(n);case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setDelete",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper/cate/"+e,r="account_token="+this.token+"&ids="+e,t.next=4,this.httpDelete(n+"?"+r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getWallListPager",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n,r,a,i,o=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:"",n=o.length>1&&void 0!==o[1]?o[1]:15,r=o.length>2&&void 0!==o[2]?o[2]:1,a="/staff/wallpaper?account_token="+this.token+"&size="+n+"&page="+r+e,t.next=6,this.httpGet(a);case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"setWallDelete",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper/"+e,r="account_token="+this.token+"&ids="+e,t.next=4,this.httpDelete(n+"?"+r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getCateSimpleList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e="/staff/wallpaper/cate/lists?account_token="+this.token,t.next=3,this.httpGet(e);case 3:return n=t.sent,t.abrupt("return",n);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},{key:"setWallAdd",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper",r=e,t.next=4,this.httpPost(n,r);case 4:return a=t.sent,t.abrupt("return",a);case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"setWallUpdate",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r="/staff/wallpaper/"+e,a=n,t.next=4,this.httpPut(r,a);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"getWallDetailList",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/staff/wallpaper/"+e+"?account_token="+this.token,t.next=3,this.httpGet(n);case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]),e}(c["a"])}}]);