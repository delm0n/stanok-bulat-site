import Promocode from "../components/Promocode";

let CalcDelivery = {
  data: function () {
    return {
      price: 0,
      elemQuery: "#calc-delivery",
    };
  },
  mounted() {
    var target = document.querySelector(this.elemQuery + " .priceWatcher");
    this.price = Number(target.innerText.replace(/ /g, ""));

    var context = this;

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        context.price = Number(
          document
            .querySelector(context.elemQuery + " .priceWatcher")
            .innerText.replace(/ /g, "")
        );
      });
    });

    observer.observe(target, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  },

  components: {
    Promocode,
  },
};
export default CalcDelivery;
