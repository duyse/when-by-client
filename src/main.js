import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { POSITION } from 'vue-toastification'

import '@fortawesome/fontawesome-free/css/all.css'
import 'vue-toastification/dist/index.css'

const options = {
    position: POSITION.BOTTOM_RIGHT,
};

createApp(App).use(router).use(Toast, options).mount('#app')
