import Charts from './src/charts';

Charts.install = (Vue) => {
  Vue.component(Charts.name, Charts);
};

export default Charts;
