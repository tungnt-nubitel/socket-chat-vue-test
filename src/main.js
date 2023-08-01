import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

const options = { path: "/socket.chat" }; //Options object to pass into SocketIO

Vue.use(
  new VueSocketIO({
    debug: true,
    // connection: SocketIO("http://localhost:3000", options), //options object is Optional
    connection: SocketIO("https://cxdev-capi.nubitel.io", options), //options object is Optional
  })
);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
