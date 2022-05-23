const throttle = (fn, wait = 50, isDebounce, ctx, immediate) => {
  let timer;
  let lastCall = 0;
  return (...params) => {
    if (isDebounce) {
      if (timer) clearTimeout(timer);
      if (immediate) {
        const doNow = !timer;
        timer = setTimeout(() => {
          timer = null;
        }, wait);
        if (doNow) {
          fn.apply(ctx, params);
        }
      } else {
        timer = setTimeout(() => {
          fn.apply(ctx, params);
        }, wait);
      }
    } else {
      const now = new Date().getTime();
      if (now - lastCall < wait) return;
      lastCall = now;
      fn.apply(ctx, params);
    }
  };
};

export default {
  name: 'SibThrottle',
  abstract: true,
  props: {
    time: {
      type: Number,
      default: 300,
    },
    events: {
      type: String,
      default: 'click',
    },
    isDebounce: {
      type: Boolean,
      default: true,
    },
    isImmediate: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.eventKeys = this.events.split(',');
    this.originMap = {};
    this.throttledMap = {};
  },
  render() {
    if (!this.$slots.default) return null;
    const vnode = this.$slots.default[0];
    this.eventKeys.forEach((key) => {
      const targetListener = (vnode.componentOptions && vnode.componentOptions.listeners) || (vnode.data && vnode.data.on);
      const target = targetListener[key];
      if (target === this.originMap[key] && this.throttledMap[key]) {
        targetListener[key] = this.throttledMap[key];
      } else if (target) {
        this.originMap[key] = target;
        this.throttledMap[key] = throttle(target, this.time, this.isDebounce, vnode, this.isImmediate);
        targetListener[key] = this.throttledMap[key];
      }
    });
    return vnode;
  },
};
