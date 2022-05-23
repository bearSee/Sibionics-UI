import { dialogDrag, dialogDragWidth } from './dialogDrag';
import watermark from './watermark';

export default {
  install(Vue) {
    Vue.directive('dialogDrag', dialogDrag);
    Vue.directive('dialogDragWidth', dialogDragWidth);
    Vue.directive('watermark', watermark);
  },
};
