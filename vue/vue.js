// import { createApp } from "vue";
import { createApp } from "vue/dist/vue.esm-bundler";

//хранилище
import store from "./store";

//компоненты
import OrderModal from "./components/OrderModal";
import OrderModel from "./components/OrderModel";
import CalcDelivery from "./components/CalcDelivery";
import Tinkoff from "./components/Tinkoff";

//регистрация компонента
createApp(OrderModal).use(store).mount("#order-modal");
createApp(OrderModel).use(store).mount("#order-model");
createApp(CalcDelivery).use(store).mount("#calc-delivery");
createApp(Tinkoff).use(store).mount("#tinkoff-block");
