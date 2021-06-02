import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebookF, faLinkedinIn, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'

library.add(faFacebookF)
library.add(faLinkedinIn)
library.add(faGooglePlusG)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
