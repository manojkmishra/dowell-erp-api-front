import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default{
 // namespaced:true,
  state: {userlist:null, useroptions:[],  },
  getters:{ },
  mutations: 
  { 
   
    [types.GET_USER_LIST ] (state, payload) 
        {
          state.userlist = payload.userlist;   
          let options = [];
         for (let status in payload.userlist) 
         { options.push({value: payload.userlist[status].id, label: payload.userlist[status].name});  }
            state.useroptions = options;
          console.log('/store---types.GET_USER_LIST state=', state);
         },
  
  },
  actions: 
  { //actions take first option as dispatch(action) or commit(mutation)
      async getuserlist({commit})
      { let resp= await axios.post(api.getuserlist);
        commit({type:types.GET_USER_LIST ,  userlist: resp.data} );
      },
      adduser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.adduser, payload)
                .then((response) => 
                {  console.log('actions-adduser-res=',response);
                    ctx.dispatch('getuserlist');
                }).catch((error) => { console.log('actions-adduser-res=',error);
                  reject(error);  })
        })
      },
      deleteuser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.deleteuser, payload)
                .then((response) => 
                {  console.log('actions-deleteuser-res=',response);
                    ctx.dispatch('getuserlist');
                }).catch((error) => { reject(error);  })
        })
      },
      edituser(ctx, payload) 
      {  return new Promise((resolve, reject) => 
        {  axios.post(api.edituser, payload)
                .then((response) => 
                { ctx.dispatch('getuserlist');
                }).catch((error) => { reject(error);  })
        })
      },
      
  }
}
