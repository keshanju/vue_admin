(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6300e148"],{3787:function(e,t,r){"use strict";r.d(t,"a",function(){return h});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),s=r("5ee8"),o=r("4e86"),u=r("5bc3"),c=r("f322"),h=function(e){function t(){return Object(a["a"])(this,t),Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"UserListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:"",r=s.length>1&&void 0!==s[1]?s[1]:15,n=s.length>2&&void 0!==s[2]?s[2]:1,a="/staff/member?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/group/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"userAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member",e.next=3,this.httpPost(r,t);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"userRePasswd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t+"/password",e.next=3,this.httpPut(n,r);case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/member/"+t+"?account_token="+this.token,e.next=3,this.httpGet(r);case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"userUpdatePause",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/member/branch/"+t+"/pause/"+r,e.next=3,this.httpPostJson(a,n);case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}},e,this)}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/member/"+t,a="account_token=".concat(this.token,"&delete_explain=").concat(r),e.next=4,this.httpDelete(n+"?"+a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserRefListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,s,o=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return o.length>2&&void 0!==o[2]?o[2]:"",n=o.length>3&&void 0!==o[3]?o[3]:15,a=o.length>4&&void 0!==o[4]?o[4]:1,i="/staff/member/refer?account_token="+this.token+"&size="+n+"&page="+a+"&member_id=".concat(t,"&refer_member_id=").concat(r),e.next=7,this.httpGet(i);case 7:return s=e.sent,e.abrupt("return",s);case 9:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getUserOpLogsListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,s,o,u=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=u.length>2&&void 0!==u[2]?u[2]:"",a=u.length>3&&void 0!==u[3]?u[3]:15,i=u.length>4&&void 0!==u[4]?u[4]:1,s="/staff/member/".concat(t,"/operate/log/").concat(r,"?account_token=").concat(this.token,"&page=").concat(i,"&size=").concat(a).concat(n),e.next=6,this.httpGet(s);case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()}]),t}(c["a"])},"5aa4":function(e,t,r){"use strict";r.d(t,"a",function(){return h});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),s=r("5ee8"),o=r("4e86"),u=r("5bc3"),c=r("f322"),h=function(e){function t(){return Object(a["a"])(this,t),Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:"",r=s.length>1&&void 0!==s[1]?s[1]:15,n=s.length>2&&void 0!==s[2]?s[2]:1,a="/staff/package?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/package/list?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"seteAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package",n=t,e.next=4,this.httpPost(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t,a=r,e.next=4,this.httpPut(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package/"+t,n="account_token="+this.token+"&ids="+t,e.next=4,this.httpDelete(r+"?"+n);case 4:e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/package/"+t,n="account_token="+this.token,e.next=4,this.httpGet(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getPackageLineList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/lines?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageLine",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/lines",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageGameList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/game?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageGame",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/game",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageCardList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/card?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageCard",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/package/"+t+"/card",a={account_token:this.token,bind_ids:r},e.next=4,this.httpPostJson(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"getPackageDiscountList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.length>1&&void 0!==a[1]?a[1]:"",r="/staff/package/"+t+"/discount?account_token="+this.token,e.next=4,this.httpGet(r);case 4:return n=e.sent,e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setPackageDiscount",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,i,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a="/staff/package/"+t+"/discount",i={account_token:this.token,bind_ids:r,bind_ids2:n},e.next=4,this.httpPostJson(a,i);case 4:return s=e.sent,e.abrupt("return",s);case 6:case"end":return e.stop()}},e,this)}));function t(t,r,n){return e.apply(this,arguments)}return t}()}]),t}(c["a"])},"897d":function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"===typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"===typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("97a9"),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!==typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(e){return"object"===typeof e&&e.buffer&&e.buffer.constructor===ArrayBuffer});var createOutputMethod=function(e){return function(t){return new Md5(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Md5},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"===typeof e)return crypto.createHash("md5").update(e,"utf8").digest("hex");if(null===e||void 0===e)throw ERROR;return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===Buffer?crypto.createHash("md5").update(new Buffer(e)).digest("hex"):method(e)};return nodeMethod};function Md5(e){if(e)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var t=new ArrayBuffer(68);this.buffer8=new Uint8Array(t),this.blocks=new Uint32Array(t)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(e){if(!this.finalized){var t,r=typeof e;if("string"!==r){if("object"!==r)throw ERROR;if(null===e)throw ERROR;if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!Array.isArray(e)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(e)))throw ERROR;t=!0}var n,a,i=0,s=e.length,o=this.blocks,u=this.buffer8;while(i<s){if(this.hashed&&(this.hashed=!1,o[0]=o[16],o[16]=o[1]=o[2]=o[3]=o[4]=o[5]=o[6]=o[7]=o[8]=o[9]=o[10]=o[11]=o[12]=o[13]=o[14]=o[15]=0),t)if(ARRAY_BUFFER)for(a=this.start;i<s&&a<64;++i)u[a++]=e[i];else for(a=this.start;i<s&&a<64;++i)o[a>>2]|=e[i]<<SHIFT[3&a++];else if(ARRAY_BUFFER)for(a=this.start;i<s&&a<64;++i)n=e.charCodeAt(i),n<128?u[a++]=n:n<2048?(u[a++]=192|n>>6,u[a++]=128|63&n):n<55296||n>=57344?(u[a++]=224|n>>12,u[a++]=128|n>>6&63,u[a++]=128|63&n):(n=65536+((1023&n)<<10|1023&e.charCodeAt(++i)),u[a++]=240|n>>18,u[a++]=128|n>>12&63,u[a++]=128|n>>6&63,u[a++]=128|63&n);else for(a=this.start;i<s&&a<64;++i)n=e.charCodeAt(i),n<128?o[a>>2]|=n<<SHIFT[3&a++]:n<2048?(o[a>>2]|=(192|n>>6)<<SHIFT[3&a++],o[a>>2]|=(128|63&n)<<SHIFT[3&a++]):n<55296||n>=57344?(o[a>>2]|=(224|n>>12)<<SHIFT[3&a++],o[a>>2]|=(128|n>>6&63)<<SHIFT[3&a++],o[a>>2]|=(128|63&n)<<SHIFT[3&a++]):(n=65536+((1023&n)<<10|1023&e.charCodeAt(++i)),o[a>>2]|=(240|n>>18)<<SHIFT[3&a++],o[a>>2]|=(128|n>>12&63)<<SHIFT[3&a++],o[a>>2]|=(128|n>>6&63)<<SHIFT[3&a++],o[a>>2]|=(128|63&n)<<SHIFT[3&a++]);this.lastByteIndex=a,this.bytes+=a-this.start,a>=64?(this.start=a-64,this.hash(),this.hashed=!0):this.start=a}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[t>>2]|=EXTRA[3&t],t>=56&&(this.hashed||this.hash(),e[0]=e[16],e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.bytes<<3,e[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var e,t,r,n,a,i,s=this.blocks;this.first?(e=s[0]-680876937,e=(e<<7|e>>>25)-271733879<<0,n=(-1732584194^2004318071&e)+s[1]-117830708,n=(n<<12|n>>>20)+e<<0,r=(-271733879^n&(-271733879^e))+s[2]-1126478375,r=(r<<17|r>>>15)+n<<0,t=(e^r&(n^e))+s[3]-1316259209,t=(t<<22|t>>>10)+r<<0):(e=this.h0,t=this.h1,r=this.h2,n=this.h3,e+=(n^t&(r^n))+s[0]-680876936,e=(e<<7|e>>>25)+t<<0,n+=(r^e&(t^r))+s[1]-389564586,n=(n<<12|n>>>20)+e<<0,r+=(t^n&(e^t))+s[2]+606105819,r=(r<<17|r>>>15)+n<<0,t+=(e^r&(n^e))+s[3]-1044525330,t=(t<<22|t>>>10)+r<<0),e+=(n^t&(r^n))+s[4]-176418897,e=(e<<7|e>>>25)+t<<0,n+=(r^e&(t^r))+s[5]+1200080426,n=(n<<12|n>>>20)+e<<0,r+=(t^n&(e^t))+s[6]-1473231341,r=(r<<17|r>>>15)+n<<0,t+=(e^r&(n^e))+s[7]-45705983,t=(t<<22|t>>>10)+r<<0,e+=(n^t&(r^n))+s[8]+1770035416,e=(e<<7|e>>>25)+t<<0,n+=(r^e&(t^r))+s[9]-1958414417,n=(n<<12|n>>>20)+e<<0,r+=(t^n&(e^t))+s[10]-42063,r=(r<<17|r>>>15)+n<<0,t+=(e^r&(n^e))+s[11]-1990404162,t=(t<<22|t>>>10)+r<<0,e+=(n^t&(r^n))+s[12]+1804603682,e=(e<<7|e>>>25)+t<<0,n+=(r^e&(t^r))+s[13]-40341101,n=(n<<12|n>>>20)+e<<0,r+=(t^n&(e^t))+s[14]-1502002290,r=(r<<17|r>>>15)+n<<0,t+=(e^r&(n^e))+s[15]+1236535329,t=(t<<22|t>>>10)+r<<0,e+=(r^n&(t^r))+s[1]-165796510,e=(e<<5|e>>>27)+t<<0,n+=(t^r&(e^t))+s[6]-1069501632,n=(n<<9|n>>>23)+e<<0,r+=(e^t&(n^e))+s[11]+643717713,r=(r<<14|r>>>18)+n<<0,t+=(n^e&(r^n))+s[0]-373897302,t=(t<<20|t>>>12)+r<<0,e+=(r^n&(t^r))+s[5]-701558691,e=(e<<5|e>>>27)+t<<0,n+=(t^r&(e^t))+s[10]+38016083,n=(n<<9|n>>>23)+e<<0,r+=(e^t&(n^e))+s[15]-660478335,r=(r<<14|r>>>18)+n<<0,t+=(n^e&(r^n))+s[4]-405537848,t=(t<<20|t>>>12)+r<<0,e+=(r^n&(t^r))+s[9]+568446438,e=(e<<5|e>>>27)+t<<0,n+=(t^r&(e^t))+s[14]-1019803690,n=(n<<9|n>>>23)+e<<0,r+=(e^t&(n^e))+s[3]-187363961,r=(r<<14|r>>>18)+n<<0,t+=(n^e&(r^n))+s[8]+1163531501,t=(t<<20|t>>>12)+r<<0,e+=(r^n&(t^r))+s[13]-1444681467,e=(e<<5|e>>>27)+t<<0,n+=(t^r&(e^t))+s[2]-51403784,n=(n<<9|n>>>23)+e<<0,r+=(e^t&(n^e))+s[7]+1735328473,r=(r<<14|r>>>18)+n<<0,t+=(n^e&(r^n))+s[12]-1926607734,t=(t<<20|t>>>12)+r<<0,a=t^r,e+=(a^n)+s[5]-378558,e=(e<<4|e>>>28)+t<<0,n+=(a^e)+s[8]-2022574463,n=(n<<11|n>>>21)+e<<0,i=n^e,r+=(i^t)+s[11]+1839030562,r=(r<<16|r>>>16)+n<<0,t+=(i^r)+s[14]-35309556,t=(t<<23|t>>>9)+r<<0,a=t^r,e+=(a^n)+s[1]-1530992060,e=(e<<4|e>>>28)+t<<0,n+=(a^e)+s[4]+1272893353,n=(n<<11|n>>>21)+e<<0,i=n^e,r+=(i^t)+s[7]-155497632,r=(r<<16|r>>>16)+n<<0,t+=(i^r)+s[10]-1094730640,t=(t<<23|t>>>9)+r<<0,a=t^r,e+=(a^n)+s[13]+681279174,e=(e<<4|e>>>28)+t<<0,n+=(a^e)+s[0]-358537222,n=(n<<11|n>>>21)+e<<0,i=n^e,r+=(i^t)+s[3]-722521979,r=(r<<16|r>>>16)+n<<0,t+=(i^r)+s[6]+76029189,t=(t<<23|t>>>9)+r<<0,a=t^r,e+=(a^n)+s[9]-640364487,e=(e<<4|e>>>28)+t<<0,n+=(a^e)+s[12]-421815835,n=(n<<11|n>>>21)+e<<0,i=n^e,r+=(i^t)+s[15]+530742520,r=(r<<16|r>>>16)+n<<0,t+=(i^r)+s[2]-995338651,t=(t<<23|t>>>9)+r<<0,e+=(r^(t|~n))+s[0]-198630844,e=(e<<6|e>>>26)+t<<0,n+=(t^(e|~r))+s[7]+1126891415,n=(n<<10|n>>>22)+e<<0,r+=(e^(n|~t))+s[14]-1416354905,r=(r<<15|r>>>17)+n<<0,t+=(n^(r|~e))+s[5]-57434055,t=(t<<21|t>>>11)+r<<0,e+=(r^(t|~n))+s[12]+1700485571,e=(e<<6|e>>>26)+t<<0,n+=(t^(e|~r))+s[3]-1894986606,n=(n<<10|n>>>22)+e<<0,r+=(e^(n|~t))+s[10]-1051523,r=(r<<15|r>>>17)+n<<0,t+=(n^(r|~e))+s[1]-2054922799,t=(t<<21|t>>>11)+r<<0,e+=(r^(t|~n))+s[8]+1873313359,e=(e<<6|e>>>26)+t<<0,n+=(t^(e|~r))+s[15]-30611744,n=(n<<10|n>>>22)+e<<0,r+=(e^(n|~t))+s[6]-1560198380,r=(r<<15|r>>>17)+n<<0,t+=(n^(r|~e))+s[13]+1309151649,t=(t<<21|t>>>11)+r<<0,e+=(r^(t|~n))+s[4]-145523070,e=(e<<6|e>>>26)+t<<0,n+=(t^(e|~r))+s[11]-1120210379,n=(n<<10|n>>>22)+e<<0,r+=(e^(n|~t))+s[2]+718787259,r=(r<<15|r>>>17)+n<<0,t+=(n^(r|~e))+s[9]-343485551,t=(t<<21|t>>>11)+r<<0,this.first?(this.h0=e+1732584193<<0,this.h1=t-271733879<<0,this.h2=r-1732584194<<0,this.h3=n+271733878<<0,this.first=!1):(this.h0=this.h0+e<<0,this.h1=this.h1+t<<0,this.h2=this.h2+r<<0,this.h3=this.h3+n<<0)},Md5.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3;return HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[n>>4&15]+HEX_CHARS[15&n]+HEX_CHARS[n>>12&15]+HEX_CHARS[n>>8&15]+HEX_CHARS[n>>20&15]+HEX_CHARS[n>>16&15]+HEX_CHARS[n>>28&15]+HEX_CHARS[n>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,n=this.h3;return[255&e,e>>8&255,e>>16&255,e>>24&255,255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&n,n>>8&255,n>>16&255,n>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(16),t=new Uint32Array(e);return t[0]=this.h0,t[1]=this.h1,t[2]=this.h2,t[3]=this.h3,e},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var e,t,r,n="",a=this.array(),i=0;i<15;)e=a[i++],t=a[i++],r=a[i++],n+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[63&(e<<4|t>>>4)]+BASE64_ENCODE_CHAR[63&(t<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return e=a[i],n+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[e<<4&63]+"==",n};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("60ac"),__webpack_require__("66fa"))},d344:function(e,r,n){"use strict";n.r(r);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"show_container"},[r("DxForm",{ref:e.dxFormKey1})],1)},i=[],s=(n("4453"),n("ee95")),o=n("eb12"),u=n("ba94"),c=n("5ee8"),h=n("4e86"),l=n("5bc3"),p=n("3a61"),d=n("b2e6"),f=n("74a9"),v=n("a60a"),b=n.n(v),g=n("1639"),m=n("3787"),y=n("4c5d"),x=n("84ec"),_=n("9b13"),R=n("4b0b"),k=n("897d"),w=n.n(k),E=(n("fc1e"),n("ffba")),O=n.n(E),A=(n("7415"),n("96f8")),S=n.n(A);
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.0
 *
 */
(function(e){jQuery.fn.extend({slimScroll:function(r){var n=e.extend({width:"auto",height:"250px",size:"4px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},r);return this.each(function(){function a(t){if(h){t=t||window.event;var r=0;t.wheelDelta&&(r=-t.wheelDelta/120),t.detail&&(r=t.detail/3),e(t.target||t.srcTarget||t.srcElement).closest("."+n.wrapperClass).is(x.parent())&&i(r,!0),t.preventDefault&&!y&&t.preventDefault(),y||(t.returnValue=!1)}}function i(e,t,r){y=!1;var a=e,i=x.outerHeight()-R.outerHeight();t&&(a=S()(R.css("top"))+e*S()(n.wheelStep)/100*R.outerHeight(),a=Math.min(Math.max(a,0),i),a=0<e?Math.ceil(a):Math.floor(a),R.css({top:a+"px"})),b=S()(R.css("top"))/(x.outerHeight()-R.outerHeight()),a=b*(x[0].scrollHeight-x.outerHeight()),r&&(a=e,e=a/x[0].scrollHeight*x.outerHeight(),e=Math.min(Math.max(e,0),i),R.css({top:e+"px"})),x.scrollTop(a),x.trigger("slimscrolling",~~a),u(),c()}function s(){window.addEventListener?(this.addEventListener("DOMMouseScroll",a,!1),this.addEventListener("mousewheel",a,!1),this.addEventListener("MozMousePixelScroll",a,!1)):document.attachEvent("onmousewheel",a)}function o(){v=Math.max(x.outerHeight()/x[0].scrollHeight*x.outerHeight(),m),R.css({height:v+"px"});var e=v==x.outerHeight()?"none":"block";R.css({display:e})}function u(){o(),clearTimeout(d),b==~~b?(y=n.allowPageScroll,g!=b&&x.trigger("slimscroll",0==~~b?"top":"bottom")):y=!1,g=b,v>=x.outerHeight()?y=!0:(R.stop(!0,!0).fadeIn("fast"),n.railVisible&&k.stop(!0,!0).fadeIn("fast"))}function c(){n.alwaysVisible||(d=setTimeout(function(){n.disableFadeOut&&h||l||p||(R.fadeOut("slow"),k.fadeOut("slow"))},1e3))}var h,l,p,d,f,v,b,g,m=30,y=!1,x=e(this);if(x.parent().hasClass(n.wrapperClass)){var _=x.scrollTop(),R=x.parent().find("."+n.barClass),k=x.parent().find("."+n.railClass);if(o(),e.isPlainObject(r)){if("height"in r&&"auto"==r.height){x.parent().css("height","auto"),x.css("height","auto");var w=x.parent().parent().height();x.parent().css("height",w),x.css("height",w)}if("scrollTo"in r)_=S()(n.scrollTo);else if("scrollBy"in r)_+=S()(n.scrollBy);else if("destroy"in r)return R.remove(),k.remove(),void x.unwrap();i(_,!1,!0)}}else{n.height="auto"==n.height?x.parent().height():n.height,_=e("<div></div>").addClass(n.wrapperClass).css({position:"relative",width:n.width,height:n.height}),x.css({width:n.width,height:n.height});k=e("<div></div>").addClass(n.railClass).css({width:n.size,height:"100%",position:"absolute",top:0,display:n.alwaysVisible&&n.railVisible?"block":"none","border-radius":n.railBorderRadius,background:n.railColor,opacity:n.railOpacity,zIndex:90}),R=e("<div></div>").addClass(n.barClass).css({background:n.color,width:n.size,position:"absolute",top:0,opacity:n.opacity,display:n.alwaysVisible?"block":"none","border-radius":n.borderRadius,BorderRadius:n.borderRadius,MozBorderRadius:n.borderRadius,WebkitBorderRadius:n.borderRadius,zIndex:99}),w="right"==n.position?{right:n.distance}:{left:n.distance};k.css(w),R.css(w),x.wrap(_),x.parent().append(R),x.parent().append(k),n.railDraggable&&R.bind("mousedown",function(r){var n=e(document);return p=!0,t=O()(R.css("top")),pageY=r.pageY,n.bind("mousemove.slimscroll",function(e){currTop=t+e.pageY-pageY,R.css("top",currTop),i(0,R.position().top,!1)}),n.bind("mouseup.slimscroll",function(e){p=!1,c(),n.unbind(".slimscroll")}),!1}).bind("selectstart.slimscroll",function(e){return e.stopPropagation(),e.preventDefault(),!1}),k.hover(function(){u()},function(){c()}),R.hover(function(){l=!0},function(){l=!1}),x.hover(function(){h=!0,u(),c()},function(){h=!1,c()}),x.bind("touchstart",function(e,t){e.originalEvent.touches.length&&(f=e.originalEvent.touches[0].pageY)}),x.bind("touchmove",function(e){y||e.originalEvent.preventDefault(),e.originalEvent.touches.length&&(i((f-e.originalEvent.touches[0].pageY)/n.touchScrollStep,!0),f=e.originalEvent.touches[0].pageY)}),o(),"bottom"===n.start?(R.css({top:x.outerHeight()-R.outerHeight()}),i(0,!0)):"top"!==n.start&&(i(e(n.start).position().top,null,!0),n.alwaysVisible||R.hide()),s()}}),this}}),jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);var H=n("e202"),D=n("5aa4"),C=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(c["a"])(this,Object(h["a"])(t).apply(this,arguments)),e.dxFormKey1="dxForm_Key_1",e.userAPI=new m["a"],e.dxFormData1={id:0,user_name:"",mobile_num:"",mail:"",group_id:1,mobile_contact_type:1,status:0,sex:0,lang_id:0,stoped_remaining:0,ver_type:1,pause_status:0,vip_level:0},e.dxFormDataReset1={},e}return Object(l["a"])(t,e),Object(u["a"])(t,[{key:"mounted",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.$parent.content_title="用户编辑",this.submitText=x["a"].Add,this.ID!==_["a"].zero&&(this.submitText=x["a"].Update),this.ID===_["a"].zero){e.next=6;break}return e.next=6,this.getUserModel(this.ID);case 6:this.initComponent(),this.getUserGroupList(),this.dxFormDataReset1=b.a.extend(!0,{},this.dxFormData1);case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"initComponent",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,s,o,u,c,h,l,p;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.dxForm1=this.getDxInstanceByKey(this.dxFormKey1),t=[],t.push({dataField:"user_name",label:{text:"账号"},editorOptions:{placeholder:"请输入4-16位的字母、数字、下划线!"},validationRules:[R["a"].getUserName("请输入4-16位的字母、数字、下划线!")]}),r=[],n=[],a=[],i=[],this.ID==_["a"].zero&&(r=[R["a"].getRequired("手机号不能为空!")],n=[R["a"].getRequired("密码不能为空!"),R["a"].getPassword2()],a=[R["a"].getRequired("名称不能为空!")],i=[R["a"].getRequired("用户组不能为空！")]),t.push({dataField:"group_id",editorType:"dxSelectBox",label:{text:"用户组"},editorOptions:{displayExpr:"title",valueExpr:"id"},validationRules:i}),t.push({dataField:"mobile_num",label:{text:"手机号"},editorOptions:{placeholder:"请输入手机号"},validationRules:r}),t.push({dataField:"password",label:{text:"密码"},editorOptions:{mode:"password",placeholder:"密码必须6~20位字母+数字组合"},validationRules:n}),t.push({dataField:"nickname",label:{text:"昵称"},editorOptions:{placeholder:"请输入有效的昵称"},validationRules:a}),t.push({dataField:"birthday",editorType:"dxDateBox",label:{text:"出生年月"},editorOptions:{placeholder:"出生年月",type:"datetime",displayFormat:"yyyy-MM-dd",dateSerializationFormat:"yyyy-MM-dd",showClearButton:!0}}),t.push({dataField:"mail",label:{text:"邮箱"},editorOptions:{placeholder:"有效邮箱"},validationRules:[R["a"].getEmail("不是有效的邮箱!")]}),t.push({dataField:"mobile_contact_type",editorType:"dxSelectBox",label:{text:"即时通讯联系类型"},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.mobile_contact_type},validationRules:[]}),t.push({dataField:"mobile_contact_number",label:{text:"联系号码"},editorType:"dxNumberBox",editorOptions:{placeholder:"有效联系号码"},validationRules:[R["a"].getTel("不是有效的电话号码")]}),t.push({dataField:"address",label:{text:"地址"},editorType:"dxTextArea",editorOptions:{placeholder:"有效地址"},validationRules:[]}),t.push({dataField:"status",editorType:"dxSelectBox",label:{text:"状态"},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.user_status}}),t.push({dataField:"stoped_remaining",editorType:"dxSelectBox",label:{text:"是否提醒"},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.flag}}),t.push({dataField:"sex",editorType:"dxSelectBox",label:{text:"性别"},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.user_sex}}),t.push({dataField:"locked_ip",editorType:"dxTextArea",label:{text:"锁定IP"},editorOptions:{placeholder:"锁定IP"}}),t.push({dataField:"lang_id",editorType:"dxSelectBox",label:{text:"语言"},editorOptions:{displayExpr:"name",valueExpr:"id",dataSource:y["a"].getDictonary().data.user_lang}}),t.push({dataField:"postcode",label:{text:"邮编"},editorOptions:{placeholder:"邮编"},validationRules:[R["a"].getPostCode("不是有效的邮编!")]}),t.push({dataField:"admin_password",label:{text:"管理密码"},editorOptions:{placeholder:"管理密码"}}),t.push({dataField:"vip_level",editorType:"dxSelectBox",label:{text:"会员级别"},editorOptions:{placeholder:"请选择一个用户级别",displayExpr:"title",valueExpr:"id"},validationRules:[R["a"].getRequired("请选择一个用户级别!")]}),t.push({dataField:"package_id",editorType:"dxSelectBox",label:{text:"指定套餐"},editorOptions:{placeholder:"指定套餐",displayExpr:"title",valueExpr:"id"},validationRules:[R["a"].getRequired("请指定一个套餐!")]}),t.push({dataField:"refer_code",label:{text:"自定义推荐码"},editorOptions:{placeholder:"自定义推荐码,主要给特殊人群使用,比如主播"},validationRules:[]}),this.ID,_["a"].zero,s=[],s.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:this.ID>0?x["a"].Update:x["a"].Add,type:"success",useSubmitBehavior:!0,onClick:this.onClickDoHandler}}),s.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:"重置",type:"normal",onClick:this.onResetHandler}}),s.push({itemType:"button",horizontalAlignment:"center",buttonOptions:{text:x["a"].Back,type:"normal",useSubmitBehavior:!0,onClick:this.onClickBackHandler}}),o=[],o.push({itemType:"group",items:t},{itemType:"group",colCount:3,items:s}),u={formData:this.dxFormData1,items:o,width:500},this.dxForm1.option(u),this.dxSelectBox1=this.dxForm1.getEditor("group_id"),c=new H["a"],e.next=40,c.getList();case 40:return h=e.sent,this.dxForm1.getEditor("vip_level").option({dataSource:h.data}),l=new D["a"],e.next=45,l.getList();case 45:p=e.sent,this.dxForm1.getEditor("package_id").option({dataSource:p.data});case 47:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onResetHandler",value:function(e){this.dxFormData1=b.a.extend(!0,{},this.dxFormDataReset1),this.dxForm1.option("formData",this.dxFormData1)}},{key:"onClickDoHandler",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.validateForm(this.dxForm1)){e.next=2;break}return e.abrupt("return");case 2:if(this.dxFormData1.account_token=this.token,t=b.a.extend(!0,{},this.dxFormData1),0==t.id?t.password=w()(t.password):null!=t.password&&""!=t.password&&(t.password=w()(t.password)),r=this.joinFormParams(t),this.dxFormData1.id!=_["a"].zero){e.next=12;break}return e.next=9,this.userAPI.userAdd(r);case 9:n=e.sent,e.next=15;break;case 12:return e.next=14,this.userAPI.userUpdate(this.dxFormData1.id,r);case 14:n=e.sent;case 15:n.code==_["a"].OK||n.code==_["a"].isSame||n.code==_["a"].isSameSaveData?this.toast(function(){a.redirect("/user/list")}):this.errorCodeMsg(n.code,n.msg);case 16:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getUserGroupList",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.userAPI.getList();case 2:t=e.sent,this.dxSelectBox1.option({dataSource:t.data});case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"onClickBackHandler",value:function(){this.redirect("/user/list")}},{key:"getUserModel",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.userAPI.getUserModel(t);case 2:r=e.sent,this.dxFormData1=r.data;case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"testAlert",value:function(){this.alert("我是测试信息!")}}]),t}(g["a"]);C=p["a"]([Object(d["a"])({components:{DxDataGrid:f["DxDataGrid"],DxForm:f["DxForm"],DxTreeView:f["DxTreeView"]}})],C);var F=C,B=F,j=B,M=n("17cc"),T=Object(M["a"])(j,a,i,!1,null,null,null);r["default"]=T.exports},e202:function(e,t,r){"use strict";r.d(t,"a",function(){return h});r("4453");var n=r("ee95"),a=r("eb12"),i=r("ba94"),s=r("5ee8"),o=r("4e86"),u=r("5bc3"),c=r("f322"),h=function(e){function t(){return Object(a["a"])(this,t),Object(s["a"])(this,Object(o["a"])(t).apply(this,arguments))}return Object(u["a"])(t,e),Object(i["a"])(t,[{key:"getListPager",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n,a,i,s=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:"",r=s.length>1&&void 0!==s[1]?s[1]:15,n=s.length>2&&void 0!==s[2]?s[2]:1,a="/staff/vip_level?account_token="+this.token+"&size="+r+"&page="+n+t,e.next=6,this.httpGet(a);case 6:return i=e.sent,e.abrupt("return",i);case 8:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,r,n=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.length>0&&void 0!==n[0]?n[0]:"",t="/staff/vip_level/lists?account_token="+this.token,e.next=4,this.httpGet(t);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"setAdd",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/vip_level",n=t,e.next=4,this.httpPost(r,n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"setUpdate",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n="/staff/vip_level/"+t,a=r,e.next=4,this.httpPut(n,a);case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}},e,this)}));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"setDelete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/vip_level/"+t,n="account_token="+this.token,e.next=4,this.httpDelete(r+"?"+n);case 4:e.sent;case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getModel",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(t){var r,n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r="/staff/vip_level/"+t,n="account_token="+this.token,e.next=4,this.httpGet(r+"?"+n);case 4:return a=e.sent,e.abrupt("return",a);case 6:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]),t}(c["a"])}}]);