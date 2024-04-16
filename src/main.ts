import './assets/index.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCopy, faCircleCheck, faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCopy, faCircleCheck, faSun, faMoon, faSpinner, faGear)

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
