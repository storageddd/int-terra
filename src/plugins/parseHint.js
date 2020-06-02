import locales from '@/locales/RU.json';

export default {
  install(Vue) {
    Vue.prototype.$parseHint = value => (locales[value] || '');
  }
}
