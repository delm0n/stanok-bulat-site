export default {
  methods: {
    beforeEnter: function (el) {
      el.style.height = "0";
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + "px";
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave: function (el) {
      el.style.height = "0";
    },
  },
};

/* <transition
  name="expand"
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
></transition>; */
