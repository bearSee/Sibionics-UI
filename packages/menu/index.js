import Menu from './src/menu';

Menu.install = (Vue) => {
  Vue.component(Menu.name, Menu);
};

export default Menu;
