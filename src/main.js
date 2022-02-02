import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import vuetify from './plugins/vuetify';
//localStorage.removeItem('token')
require('@/store/subscriber')  //@ is for src folder
require ('@/plugins/Sweetalert');
import moment from 'moment'

Vue.prototype.moment = moment
//axios.defaults.baseURL=process.env.VUE_APP_API_URL
axios.defaults.baseURL='http://127.0.0.1:8000/api'
//axios.defaults.baseURL='http://54.79.50.225/api'
//axios.defaults.baseURL='/api/'

/*
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err));
}*/
//localStorage.removeItem('token')

Vue.config.productionTip = false
store.dispatch('auth/attempt',localStorage.getItem('token'))
.then(()=>{
      new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
      }).$mount('#app')
})

