import store from "../store";
import { mapGetters } from "vuex";
import transitionHeight from "../mixins/transitionHeight";

let Promocode = {
  store,
  mixins: [transitionHeight],
  data: function () {
    return {
      coupon: "",
      wait: true,
      message: "Промокод недействителен",
      serverErrorVar: false,
    };
  },
  computed: {
    ...mapGetters(["getPromocode"]),

    // валидация с учётом ответа от сервера, длины купона и ожидания
    validateError() {
      return (
        this.getPromocode.status == "error" &&
        this.coupon / 1000 >= 1 &&
        this.wait
      );
    },

    serverError() {
      return this.serverErrorVar && this.coupon / 1000 >= 1 && this.wait;
    },

    validateSum() {
      return this.sum >= 6000;
    },

    ordered() {
      return !localStorage.getItem("ordered");
    },
  },
  props: {
    sum: {
      type: Number,
    },
    fashion: {
      type: String,
      default: "",
    },
  },
  watch: {
    coupon(val) {
      this.coupon = val.replace(/\D/g, "");
      this.checkPromocode();
    },
  },
  methods: {
    // отправка post-запроса
    postPromocode: function () {
      var data = new FormData();
      data.append("sum", this.sum);
      data.append("coupon", this.coupon);
      this.wait = false;

      var requestURL = "coupon.php";
      var request = new XMLHttpRequest();
      request.open("POST", requestURL, true);
      request.responseType = "json";

      request.send(data);
      request.addEventListener("load", () => {
        store.commit("setPromocode", request.response);
        this.wait = true;
        this.serverErrorVar = false;
      });

      request.addEventListener("error", () => {
        this.errorPromocode();
      });
    },

    checkPromocode: function (e) {
      if (this.coupon / 1000 >= 1) {
        if (this.validateSum) {
          this.postPromocode();
        }
      }
    },

    errorPromocode() {
      this.message = "Ошибка сервера, попробуйте позже...";
      this.wait = true;
      this.serverErrorVar = true;
    },
  },

  template: `
              <div class="coupon-container" v-if="validateSum && ordered">
                <input type="text" name="coupon"
                  v-bind:class="[{ 'input-error' : (validateError || serverError), 'input-success' : getPromocode.id}, fashion]"
                  placeholder="Введите купон"  autocomplete="off" 
                    v-model="coupon" maxlength="4"
                    v-bind:disabled="getPromocode.id ? true : false">
                    
                <transition name="hide" >
                  <span class='coupon-success' v-show="getPromocode.id" v-text=" 'Промокод на ' + getPromocode.price + ' применён'"></span>
                </transition>

                <transition name="expand" 
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:before-leave="beforeLeave"
                  v-on:leave="leave" >
                  <span class='coupon-error' v-show="(validateError || serverError)" v-text="message"></span>
                </transition>
              
                <!-- купон -->
                <template v-if="getPromocode.id">
                  <input type="hidden" v-bind:name="'quantity[4610]'" value="1">
                  <input type="hidden" class="costs" v-bind:name="'cost[4610]'" v-bind:value="'-' + getPromocode.price">
                  <input type="hidden" name="id[]" v-bind:value="'4610'"> 
                </template>
              </div>             
            `,
};

export default Promocode;
