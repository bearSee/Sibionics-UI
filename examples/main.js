import Vue from 'vue';
import App from './App';
import router from './router';
// 引入 Sibionics-UI
import sibUI from '../src';
// import sibUI from '../lib/sibionics.common';

// 引入插件集合
import './plugins';
// 引入国际化配置
import i18n from './locale';
// 引入样式表集合
import './assets/styles';

Vue.use(sibUI);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
