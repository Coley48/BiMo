require("bootstrap/dist/css/bootstrap-reboot.min.css");
require('video.js/dist/video-js.css')
require("./assets/css/style.less");
require("./assets/fonts/font.css");

import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'

// if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
