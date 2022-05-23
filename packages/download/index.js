import Download from './src/index';

Download.install = (Vue) => {
  Vue.prototype.$download = Download;
};

export default Download;
