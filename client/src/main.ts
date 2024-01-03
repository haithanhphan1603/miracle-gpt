import './assets/index.css'
import App from './App.vue' // Add the missing import statement for './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faCalendar, faVenusMars } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faCalendar, faVenusMars)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(FloatingVue)

app.use(createPinia())
app.use(router)

app.mount('#app')
