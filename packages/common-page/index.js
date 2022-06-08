import commonPage from './src/index';

commonPage.install = (Vue) => {
  Vue.component(commonPage.name, commonPage);
};

export default commonPage;
