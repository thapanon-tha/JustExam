/* eslint-disable */
import Vue from "vue";
import VuePortal from "@linusborg/vue-simple-portal";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store"
import VueQuillEditor from "vue-quill-editor";
import VueTimepicker from 'vue2-timepicker';
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'
import katex from 'katex';
import 'katex/dist/katex.min.css';

// require styles
import 'vue2-timepicker/dist/VueTimepicker.css';
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import './index.css'
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VuePortal, {
  name: "portal", // optional, use to rename component
});

Vue.use(katex);
Vue.use(VueClipboard)
Vue.use(VueCookies)
Vue.use(require('vue-moment'));

Vue.use(VueQuillEditor, VueTimepicker /* { default global options } */);
