import formatMoney from './formatMoney';
import formatDate from './formatDate';

export default {
  install(Vue) {
    Vue.filter('formatMoney', formatMoney);
    Vue.filter('formatDate', formatDate);
  },
};
