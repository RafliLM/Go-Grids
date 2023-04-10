/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


loadFonts()
const app = createApp(App)
app.config.globalProperties.APIURI = 'http://103.172.204.236:5000/api/'

app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)
app.mount('#app')

