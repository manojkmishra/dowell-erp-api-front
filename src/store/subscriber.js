import store from '@/store'
import axios from 'axios'

store.subscribe((mutation)=>{ 
    console.log('/store/sbscriber-mutation=',mutation);
    switch(mutation.type){
        case 'auth/SET_TOKEN':
                 console.log('subscriber- token', mutation.payload)
                 if(mutation.payload)  //if not null
                 {  axios.defaults.headers.common['Authorization']=`Bearer ${mutation.payload}` 
                    localStorage.setItem('token',mutation.payload) 
                 }
                 else { axios.defaults.headers.common['Authorization']=null 
                        localStorage.removeItem('token')
                      }
        break;
    }
})

axios.interceptors.request.use(function (config) 
{  console.log('req=',config)
   return config;
 });
axios.interceptors.response.use(function (response) {
console.log('res=',response)
   return response;
 }, function (error) { return Promise.reject(error); });
 