import Vue from 'vue';
import axios from 'axios';
import * as types from '../types';
import * as api from '../config';
export default
{
  state: {getjobs:null,getjobtypes:null, jobtypeoptions:[],selectedsjc:null, 
      getc19:null,getuserjobs:null,gettk5:null,getpic:null,getpdf:null,getorder:null,getwomaterial:null,
      getwooperation:null,getwomaterial:null,getopresources:null,getworeservation:null,getorderlines:null
        },
  getters:{
  },
  mutations: 
  {
    [types.GET_JOBS ] (state, payload) 
    { state.getjobs = payload.getjobs;
     console.log('/store/saw.js-types.GET_JOBS state=', state);
    },
    [types.GET_WOMATERIAL ] (state, payload) 
    { state.getwomaterial = payload.getwomaterial;
     console.log('/store/saw.js-types.GET_WOMATERIAL state=', state);
    },
      [types.GET_ORDERLINES ] (state, payload) 
    { state.getorderlines = payload.getorderlines;
     console.log('/store/saw.js-types.GET_ORDERLINES state=', state);
    },
    [types.GET_OPMATERIAL ] (state, payload) 
    {  state.getopmaterial=null;
          state.getopmaterial = payload.getopmaterial;
     console.log('/store/saw.js-types.GET_OPMATERIAL state=', state);
    },
    [types.GET_OPRESOURCES ] (state, payload) 
    {  state.getopresources=null;
          state.getopresources = payload.getopresources;
     console.log('/store/saw.js-types.GET_OPRESOURCES state=', state);
    },
    [types.GET_WOOPERATION ] (state, payload) 
    { state.getwooperation = payload.getwooperation;
     console.log('/store/saw.js-types.GET_WOOPERATION state=', state);
    },
    [types.GET_WORESERVATION ] (state, payload) 
    { state.getworeservation = payload.getworeservation;
     console.log('/store/saw.js-types.GET_WORESERVATION state=', state);
    },
    [types.GET_ORDER ] (state, payload) 
    { state.getorder = payload.getorder;
     console.log('/store/saw.js-types.GET_ORDER state=', state);
    },
    [types.GET_USER_JOBS ] (state, payload) 
    { state.getuserjobs = payload.getuserjobs;
     console.log('/store/saw.js-types.GET_USER_JOBS state=', state);
    },
    [types.GET_C19 ] (state, payload) 
    { state.getc19 = payload.getc19;
     console.log('/store/saw.js-types.GET_C19 state=', state);
    },
    [types.GET_PIC ] (state, payload) 
    { state.getpic = payload.getpic;
     console.log('/store/saw.js-types.GET_PIC state=', state);
    },
    [types.GET_PDF ] (state, payload) 
    { state.getpdf = payload.getpdf;
     console.log('/store/saw.js-types.GET_PDF state=', state);
    },
    [types.GET_TK5 ] (state, payload) 
    { state.gettk5 = payload.gettk5;
     console.log('/store/saw.js-types.GET_TK5 state=', state);
    },
    [types.GET_JOB_TYPES ] (state, payload) 
    { state.getjobtypes = payload.getjobtypes;
      let options = [];
      for (let status in payload.getjobtypes) 
         { options.push({value: payload.getjobtypes[status].id, label: payload.getjobtypes[status].type});  }
            state.jobtypeoptions = options;
            console.log('/store/saw.js-types.GET_JOB_TYPES state=', state);
    },
    [types.SET_SELECTED_SJC] (state, payload) 
    {   state.selectedsjc=payload.selectedsjc;
        console.log('/store/saw.js-types.SET_SELECTED_SJC state=', state);
       
    },
  },
  actions:{
      //get jobs --currently get used-thinking of getting just 500 jobs for admin so no post
      //in future post will be used to get jobs filtered based on field user logedin
    selectedsjc: ({commit}, data) => {
          console.log('set selectedjob',data)
          commit({  type: types.SET_SELECTED_SJC ,selectedsjc: data   });  
      },
    async getjobs ({commit,dispatch}) 
    { let res= await axios.get(api.getjobs);  
      //commit({type:types.GET_JOBS ,  getjobs: res.data} ); 
      return res;    
    },
    async clearorder ({commit,dispatch},formData) 
    {console.log('clear roder action')
          commit({type:types.GET_ORDER ,  getorder: null} )
    },
    async getorder ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getorder`,{params:{'orderkey':formData}})
    .then(res => {
          commit({type:types.GET_ORDER ,  getorder: res} )
      } )
      return res;    
    },
    async getwomaterial ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getwomaterial`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WOMATERIAL ,  getwomaterial: res} )
      } )
      return res;    
    },
      async getorderlines ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getorderlines`,{params:{'orderkey':formData}})
    .then(res => {
          commit({type:types.GET_ORDERLINES ,  getorderlines: res} )
      } )
      return res;    
    },
    async getopmaterial ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getopmaterial`,{params:{'WorkOrderId':formData.WorkOrderId, 'WorkOrderOperationId': formData.WorkOrderOperationId}})
    .then(res => { 
          commit({type:types.GET_OPMATERIAL ,  getopmaterial: res} )
      } )
      return res;    
    },
    async getopresources ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getopresources`,{params:{'WorkOrderId':formData.WorkOrderId, 'WorkOrderOperationId': formData.WorkOrderOperationId}})
    .then(res => { 
          commit({type:types.GET_OPRESOURCES ,  getopresources: res} )
      } )
      return res;    
    },
    async getwooperation ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getwooperation`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WOOPERATION ,  getwooperation: res} )
      } )
      return res;    
    },
    async getworeservation ({commit,dispatch},formData) 
    { //let res= await axios.get(api.getorder,{params:{'orderkey':formData}});  
    let res=axios.get(`/take5/getworeservation`,{params:{'WorkOrderId':formData}})
    .then(res => {
          commit({type:types.GET_WORESERVATION ,  getworeservation: res} )
      } )
      return res;    
    },
    async getuserjobs ({commit,dispatch}) 
    { let res= await axios.get(api.getuserjobs)
     // .then(res => { console.log('store getuserjobs res',res);
     //       commit({type:types.GET_USER_JOBS ,  getuserjobs: res.data} );   })
      return res;    
    },
    async addjobs ({dispatch}, formData)
    {   console.log('addjobs-- formData=', formData);
          let res= await axios.post(api.addjobs, formData)  
                .then(response => { dispatch('getjobs');  })
                .catch(response => {    });
            return res;
    },
    async editjobs ({dispatch}, formData)
    {   console.log('editjobs-- formData=', formData);
          let res= await axios.post(api.editjobs, formData)  
                .then(response => { //dispatch('getjobs'); 
             })
                .catch(response => {    });
            return res;
    },
    async deljobs ({dispatch}, formData)
    {   console.log('delete-- formData=', formData);
          let res= await axios.post(api.deljobs, formData)  
                .then(response => { dispatch('getjobs');  })
                .catch(response => {    });
            return res;
    },
    async getjobtypes ({commit,dispatch}) 
    { let res= await axios.get(api.getjobtypes);  
      commit({type:types.GET_JOB_TYPES ,  getjobtypes: res.data} ); 
      return res;    
    },
    async addjobtypes ({dispatch}, formData)
    {   console.log('addtype-- formData=', formData);
          let res= await axios.post(api.addjobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
    async editjobtypes ({dispatch}, formData)
    {   console.log('edittype-- formData=', formData);
          let res= await axios.post(api.editjobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
    async deljobtypes ({dispatch}, formData)
    {   console.log('delete-- formData=', formData);
          let res= await axios.post(api.deljobtypes, formData)  
                .then(response => { dispatch('getjobtypes');  })
                .catch(response => {    });
            return res;
    },
    async addc19 ({dispatch}, formData)
    {   console.log('addc19-- formData=', formData);
          let res= await axios.post(api.addc19, formData)  
                .then(response => { dispatch('getc19',formData);  
                                    })
                .catch(response => {    });
            return res;
    },
    async getc19 ({commit,dispatch}, formData)
    {   let res= await axios.post(api.getc19, formData)
      .then(res => { commit({type: types.GET_C19, getc19: res.data} ); })
      return res;
    },
    async getpic ({commit,dispatch}, formData)
    {   let res= await axios.post(api.getpic, formData)
      .then(res => { commit({type: types.GET_PIC, getpic: res.data} ); })
      return res;
    },
    async delpic ({commit,dispatch}, formData)
    {    console.log('delpic-- formData=', formData);
          let res= await axios.post(api.delpic, formData)
                  .then(res => { dispatch('getpic',formData); })
            return res;
    },
    async getpdf ({commit,dispatch}, formData)
    {   let res= await axios.post(api.getpdf, formData)
      .then(res => { commit({type: types.GET_PDF, getpdf: res.data} ); })
      return res;
    },
    async delpdf ({commit,dispatch}, formData)
    {    console.log('delpdf-- formData=', formData);
          let res= await axios.post(api.delpdf, formData)
                  .then(res => { dispatch('getpdf',formData); })
            return res;
    },
    async editc19 ({dispatch}, formData)
    {   console.log('editc19-- formData=', formData);
          let res= await axios.post(api.editc19, formData)  
                .then(response => { dispatch('getc19',formData); })
            return res;
    },
    async delc19 ({dispatch}, formData)
    {   console.log('delc19-- formData=', formData);
          let res= await axios.post(api.delc19, formData)  
                .then(response => { dispatch('getc19',formData); })
            return res;
    },
    //-------------------------------
    async addtk5 ({dispatch}, formData)
    {   console.log('addtk5-- formData=', formData);
          let res= await axios.post(api.addtk5, formData)  
                .then(response => { dispatch('gettk5',response.data);  
                                    })
            return res;
    },
    async gettk5 ({commit,dispatch}, formData)
    {   let res= await axios.post(api.gettk5, formData)
      .then(res => { commit({type: types.GET_TK5, gettk5: res.data} ); 
                        })
      return res;
    },
    async edittk5 ({dispatch}, formData)
    {   console.log('edittk5-- formData=', formData);
          let res= await axios.post(api.edittk5, formData)  
                .then(response => { dispatch('gettk5',formData); })
            return res;
    },
    async deltk5 ({dispatch}, formData)
    {   console.log('deltk5-- formData=', formData);
          let res= await axios.post(api.deltk5, formData)  
                .then(response => { dispatch('gettk5',formData); })
            return res;
    },
  }

}