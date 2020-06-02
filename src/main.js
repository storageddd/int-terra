import cssVars from 'css-vars-ponyfill';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugins from './plugins';
import filters from './filters';

Vue.config.productionTip = false;

plugins.forEach(plugin => Vue.use(plugin));
filters.forEach(filter => Vue.filter(filter.name, filter.value));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// Для браузеров не умеющих CSS vars. Например, IE 11.
cssVars({
  onlyLegacy: true
});
