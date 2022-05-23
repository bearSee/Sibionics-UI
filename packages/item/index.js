import Item from './src/item';

Item.install = (Vue) => {
  Vue.component(Item.name, Item);
};

export default Item;
