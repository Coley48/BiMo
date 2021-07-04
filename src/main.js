require("bootstrap/dist/css/bootstrap-reboot.min.css");
require('video.js/dist/video-js.css')
require("./assets/css/style.less");
require("./assets/font/font.css");
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
// 全局提示
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')