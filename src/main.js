import './assets/main.css'
import './assets/iconfont.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {storePlugin} from "@/utils/StorePlugin.js";

const app = createApp(App)

app.use(storePlugin)
app.use(router)

app.mount('#app')
