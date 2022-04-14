import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'  //不同网页显示效果保证一致
import './style/index.scss'
import Icon from './components/Icon.vue'
import './static/iconfont.js'

const app=createApp(App)
app.use(store).use(router).mount('#app')
app.component('icon-svg', Icon)