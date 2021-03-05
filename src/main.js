require("bootstrap/dist/css/bootstrap-reboot.min.css");
require('video.js/dist/video-js.css')
require("./assets/css/style.less");
require("./assets/fonts/font.css");

import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
