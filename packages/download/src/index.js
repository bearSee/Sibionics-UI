import Vue from 'vue';
import downloadVue from './main';

const DownloadConstructor = Vue.extend(downloadVue);

let instance;

const Download = (options = {}) => {
  if (!instance) {
    instance = new DownloadConstructor({
      data: options,
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  }
  Object.keys(options).forEach((key) => {
    instance[key] = options[key];
  });
  Vue.nextTick(() => {
    instance.download();
  });
  return instance;
};

export default Download;
