import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'
import { createPinia } from 'pinia'

import '@fortawesome/fontawesome-free/css/all.css'
import 'vue-toastification/dist/index.css'

const options = {
    position: POSITION.BOTTOM_RIGHT,
}

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast, options)
    .mount('#app')
