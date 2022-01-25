/* eslint-disable */
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import VuePortal from "@linusborg/vue-simple-portal";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VuePortal, {
  name: "portal", // optional, use to rename component
});

Vue.use(VueQuillEditor /* { default global options } */);