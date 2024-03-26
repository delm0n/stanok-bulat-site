import store from "../store";

let Tinkoff = {
  store,
  data: function () {
    return {};
  },
  methods: {
    creditCart: function (bool) {
      store.commit("updateCredit", bool);
    },
  },
};

export default Tinkoff;
