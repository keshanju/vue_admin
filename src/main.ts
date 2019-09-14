//导入devextreme样式
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.compact.css";
//import "devextreme/dist/css/dx.light.css";
//import "devextreme/dist/css/ls.light.custom.css"

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store';
import 'babel-polyfill';

import 'devextreme-intl';
import zhMessages from 'devextreme/localization/messages/zh.json';
import enMessages from 'devextreme/localization/messages/en.json';

import {locale, loadMessages} from 'devextreme/localization';

loadMessages(zhMessages);
loadMessages(enMessages);
locale(navigator.language);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => {
        return h(App);
    }
}).$mount('#app');
