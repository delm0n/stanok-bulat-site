import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      credit: false,
      promocode: {
        message: "",
        status: "",
        coupon: "",
        id: 0,
        price: 0,
      },
    };
  },

  mutations: {
    setPromocode(state, json) {
      if (json.status === "success") {
        state.promocode.message = "Промокод применён";
        state.promocode.status = json.status;
        state.promocode.coupon = json.coupon;
        state.promocode.id = json.id;
        state.promocode.price = json.price;
      } else {
        state.promocode.message = "Промокод недействителен";
        state.promocode.status = json.status;
        state.promocode.coupon = "";
        state.promocode.id = 0;
        state.promocode.price = 0;
      }
    },
    updateCredit(state, credit) {
      state.credit = credit;
    },
  },

  getters: {
    // промокод
    getPromocode(state) {
      return state.promocode;
    },
  },
});
