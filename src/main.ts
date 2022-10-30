import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import './style.css'
import router from './router'
import App from './App.vue'
import Http from './Http'
import initFacebookSdk from './actions/Facebook/initFacebookSdk';
import facebookSdk from './actions/Facebook/facebookSdk'



initFacebookSdk().then(() => {
    facebookSdk.initialized.set(true);
    const app = createApp(App)
    app.use(router);
    app.mount('#app')
    Http.setJwtToken();
});