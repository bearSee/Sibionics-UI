import Vue from 'vue';

import sibUI from '../src';
// import sibUI from '../lib/sibionics.common';

import App from './App';
import router from './router';

// 引入插件集合
import './plugins';

// 引入样式表集合
import './assets/styles';

import example from './views/example';
import configTable from './views/config-table';

import en from './locale/lang/en';
import cn from './locale/lang/cn';

Vue.use({
  install: (V) => {
    V.component(example.name, example);
    V.component(configTable.name, configTable);
  },
});

Vue.use(sibUI, {
    languages: { en, cn },
    lang: window.localStorage.getItem('lang'),
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
