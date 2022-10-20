import qs from 'qs';

// 注册Element
import Element from 'element-ui';
// 进度条控件
import NProgress from 'nprogress';

// 引入 element-ui 及当前ui库样式
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import '../packages/theme-chalk/src/index.scss';

// 引入挂载到基础数据类型原型上的方法
import './utils/common/prototype';

// 模块级组件
import Download from '../packages/download';
import Formula from '../packages/formula';
import Calculator from '../packages/calculator';
import Charts from '../packages/charts';
import Form from '../packages/form';
import Item from '../packages/item';
import Menu from '../packages/menu';
import Dropdown from '../packages/dropdown';
import Table from '../packages/table';
import TablePicker from '../packages/table-picker';
import Throttle from '../packages/throttle';
import Tree from '../packages/tree';
import TreePicker from '../packages/tree-picker';

// 页面级组件
import indexPage from '../packages/index-page';
import commonPage from '../packages/common-page';

import directives from './directives';
import filters from './filters';
import { initMathjaxConfig, MathQueue } from './utils/common/variable';

const components = [
  Download,
  Formula,
  Calculator,
  Charts,
  Form,
  Item,
  Menu,
  Dropdown,
  Table,
  TablePicker,
  Throttle,
  Tree,
  TreePicker,
  indexPage,
  commonPage,
];

function install(Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.use(directives);
  Vue.use(filters);
  Vue.use(Element, {
      size: opts.size || 'small',
  });

  Object.assign(Vue.prototype, {
    $download: Download,
    $qs: qs,
    $t: Vue.prototype.$t || ((key) => key),
    $globalVariable: {
      initMathjaxConfig,
      MathQueue,
    },
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

if (window && document) {
  document.documentElement.style.fontSize = '100px';
  window.NProgress = NProgress;
}

const version = require('../package.json').version;

export default {
  version,
  install,
};
