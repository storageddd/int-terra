import Vue from 'vue'
import Vuex from 'vuex'
import global from './global';
import fieldOperations from './field-operations';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    fieldOperations
  }
});
