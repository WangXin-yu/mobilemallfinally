import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_state:false,
    user:{birthday: "1970年1月1日"},
    index: 0, //0->商城首页高亮， 1->分类高亮，2->购物车高亮，3->my高亮
    checked_shops:[], //存储购物车界面选中的商品的数组
  },
  mutations: {},
  actions: {},
  modules: {}
});
