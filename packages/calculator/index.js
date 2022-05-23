import Calculator from './src/index';

Calculator.install = (Vue) => {
  Vue.component(Calculator.name, Calculator);
};

export default Calculator;
