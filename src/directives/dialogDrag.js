// v-dialogDrag: 弹窗拖拽
export const dialogDrag = {
  // eslint-disable-next-line
  bind(el, binding, vnode, oldVnode) {
    // 是否可拖拽，默认为 true
    const { value = true } = binding;
    if (!value) return;

    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      // 获取到的值带px 正则匹配替换
      let styL;
      let styT;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      /* eslint-disable */
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      }
      /* eslint-enable */
      document.onmousemove = (event) => {
        // 通过事件委托，计算移动的距离
        const l = event.clientX - disX;
        const t = event.clientY - disY;
        // 移动当前元素
        // dragDom.style.left = `${Math.max(Math.min(l + styL, (window.outerWidth + dragDom.clientWidth / 2 - 100)), -dragDom.clientWidth / 2)}px`;
        // dragDom.style.top = `${Math.max(Math.min(t + styT, (window.outerHeight + dragDom.clientHeight / 2 - 50)), -dragDom.clientHeight / 2)}px`;
        dragDom.style.left = `${Math.min(l + styL, (window.outerWidth + dragDom.clientWidth / 2 - 100))}px`;
        dragDom.style.top = `${Math.min(t + styT, (window.outerHeight + dragDom.clientHeight / 2 - 50))}px`;

        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
};

// v-dialogDragWidth: 弹窗宽度拖大 拖小
export const dialogDragWidth = {
  // eslint-disable-next-line
  bind(el, binding, vnode, oldVnode) {
    // 是否可拖拽，默认为 true
    const { value = true } = binding;
    if (!value) {
      return;
    }

    const dragDom = el.querySelector('.el-dialog');
    dragDom.style.cursor = 'e-resize';

    dragDom.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dragDom.offsetLeft;
      document.onmousemove = (event) => {
        event.preventDefault(); // 移动时禁用默认事件
        // 通过事件委托，计算移动的距离
        const l = event.clientX - disX;
        dragDom.style.width = `${l}px`;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
};
