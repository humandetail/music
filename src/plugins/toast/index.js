import Toast from './Index.vue';

export default {
  install (Vue, options = {}) {
    const VueToast = Vue.extend(Toast);
    let toast = null;

    Vue.prototype.$toast = function (options) {
      return new Promise((resolve, reject) => {
        if (!toast) {
          toast = new VueToast();

          toast.$mount();

          document.body.appendChild(toast.$el);
        }

        toast.showToast(options);
        resolve();
      });
    }
  }
}