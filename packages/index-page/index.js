import indexPage from './src/index';

indexPage.install = (Vue) => {
  Vue.component(indexPage.name, indexPage);
};

export default indexPage;
