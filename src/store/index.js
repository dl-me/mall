import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addressList: [],
    userInfo: {},
    selectedAddress: undefined,
    pendingOrder: undefined,
    idList: []
  },
  mutations: {
    setPendingOrder(state, order) {
      state.pendingOrder = order;
    },
    apiSync(state, { key, value }) {
      state[key] = value;
    },
    setSelectedAddress(state, id) {
      state.selectedAddress = state.addressList.find(item => item.id === id);
    },
    nonSelectd(state, idList){
      state.idList = idList;
    }
  },
  getters: {
    defaultAddress: state => {
      return state.addressList.find(item => !!item.defaultStatus);
    },
    sendTo: (state, getters) => {
      return state.selectedAddress || getters.defaultAddress;
    }
  },
  actions: {},
  modules: {
    // pendingOrder: {
    //   state: {
    //     list: []
    //   },
    //   mutations: {
    //     setList(state, list) {
    //       state.list = list;
    //     }
    //   }
    // }
  }
});
