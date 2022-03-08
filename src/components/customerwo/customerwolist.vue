<template> 
<div class="mt-10">
        <v-progress-linear :active="loading" :indeterminate="loading" absolute   top  color="deep-purple accent-4"
      ></v-progress-linear>
  <v-data-table :headers="headers" :items="sawflags.items" dense  class="elevation-1"  :search="search"

        :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [25]}"
         @pagination="paginate1" 
       :server-items-length="sawflags.totalResults"
       :items-per-page=25

        >
    <template v-slot:top >

        <v-toolbar flat dark dense color="blue darken-4">
            <v-toolbar-title>CustomerWO Field Services</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
                     
            <v-spacer></v-spacer>
            <v-text-field v-model="search" @input="searchit" append-icon="mdi-magnify" label="Search OrderNumber" single-line hide-details></v-text-field>

        </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }"><!--1=qd,2-inpr,3-complt----->
     
       <v-btn ripple small :loading="loading" color="teal " rounded dark   @click.prevent="checkorder(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
       
    </template>
        <template v-slot:item.createdat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.CreationDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
    <template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.LastUpdateDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-2" class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
      <v-icon medium color="red" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
    </template>
     <template v-slot:item.action1="{ item }"><!--1=qd,2-inpr,3-complt----->
       <v-btn ripple small :loading="loading" color="teal " rounded dark   @click.prevent="getoneaccount(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
    </template>
  </v-data-table>
 </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import axios from "axios";
export default
{ 
    //props:{bb:Array},
    data() { return {dialog: false,search: '',dialogDelete: false, loading:false, //jobtypeoptions1:[],
          editedItem: { name: '', DELIVERY_DATE: '', type:'', field_user:'',  comment: '', 
          V6_ORDER_NO:'', SJC_NO:'',SITE_ADDRESS:'' , type:''},
      editedIndex: -1, sawflags:[],// inputRules:[v=>v.length>=3||'Min len is 3 chars'],
              headers: [
              { text: 'Details', value: 'action1', sortable: false , width:"1%"},
               { text: 'WoNumber', value: 'WoNumber', sortable: false , width:"1%"},
               { text: 'WoTypeCd', align: 'left',  value: 'WoTypeCd', width:"1%"},
               { text: 'WoStatusCdMeaning', align: 'left',  value: 'WoStatusCdMeaning', width:"1%"},
              // { text: 'WoIntegrationCdMeaning', align: 'left',  value: 'WoIntegrationCdMeaning', width:"1%"},
             // { text: 'RequestURI', value: 'action1', sortable: false , width:"1%"},
             //  { text: 'Profile', value: 'action1', sortable: false , width:"1%"},
               { text: 'AccountPartyName', align: 'left',  value: 'AccountPartyName', width:"1%"},
                { text: 'AssigneeEmail', align: 'left',  value: 'AssigneeEmail', width:"1%"},
                 { text: 'ContactEmail', align: 'left',  value: 'ContactEmail', width:"1%"},
              { text: 'ContactPhoneNumber', align: 'left',  value: 'ContactPhoneNumber', width:"1%"},
              { text: 'CaseNote', align: 'left',  value: 'CaseNote', width:"20%"},
              { text: 'Duration', align: 'left',  value: 'Duration', width:"1%"},

              { text: 'State', value: 'State' ,sortable: false, width:"1%"},
              //{ text: 'T5', value: 't5',sortable: false },
              //{ text: 'JC', value: 'jc', sortable: false },
               { text: 'created_at', align: 'left', value: 'createdat',width:"3%"},
               { text: 'updated_at', align: 'left',  value: 'updatedat', width:"3%"},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
               { text: 'updated_by', align: 'left',  value: 'LastUpdatedBy', width:"1%"},
               //{ text: 'Action', value: 'actions', sortable: false , width:"1%"},
            ],

        phoneRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >8) || 'Must be more than 8 digits '
         ],
         fieldRules: [ (v) => (v && v.length >2)|| 'Required & should be more than 2 chars ' ],
         postRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >2) || 'Must be more than 2 digits '
         ],
         fieldRules: [ (v) => (v && v.length >2)|| 'Required & should be more than 2 chars ' ],
        // formx:{sjcid:'',v},

    }
          },
  created(){ //this.loading=true;
            /* this.$store.dispatch('getjobs')
                    .then((res) => { //this.loading=false;
                                console.log('create-getjobs response',res.data)  
                                this.sawflags=res.data;
                                this.loading=false;
                        })*/
        },
  methods: {  
    getoneaccount(x){
              console.log('getonewo-',x)
               this.$router.push({   name: 'accountdetails',params: {data1: x }  
                               });
     },
    //--------------------------------get one order--------------
    checkorder(x){
console.log('checkorder-',x)
this.loading=true;
 this.$store.dispatch('getorder', x.OrderKey)
                        .then((response) =>  { //console.log('order-response=',response);  
                                this.loading=false;   
                               this.$router.push({   name: 'order'//,params: {data1: res }  
                               });
                                })     
                        .catch((error) => {   this.loading=false; 
                        console.log('error-',error)     
                        });

//------------------------------------
        /*  axios.get(`/take5/getorder/`,{params:{'orderkey':x.OrderKey}})
          .then((res) => { console.log('one order response',res.data)  
                                       this.loading=false; 
                     this.$router.push({   name: 'order'//,params: {data1: res } 
                      });
                                       })
                    .catch(err=>{ console.log('one order-err=', err) ; this.loading=false; }) */
                    //--------------
          },
            paginate1(e)
            { console.log('paginate-$event',e);
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
             if(this.search =='')
                {
            this.loading=true;
             //axios.get(`${axios.defaults.baseURL}/getjobs?page=${e.page}`,
             //axios.get(`${axios.defaults.baseURL}/take5/getjobs?offset=${e.pageStart}`,
             axios.get(`/take5/getcustomerwo?offset=${e.pageStart}`,
             //{params:{'per_page':e.itemsPerPage}}
             )
                    .then((res) => { console.log('pagi-getaccounts response',res.data.items)  
                                      this.sawflags=res.data; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
                }
                else{
                console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/getcustomerwo?search=${x}`)
                    .then((res) => { console.log('getaccounts search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('getaccounts search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getcustomerwo`)
                    .then((res) => { console.log('getaccounts search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('getaccounts search err2=', err) ; this.loading=false; })
              }

                }
            },
        searchit(e){
              console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/getcustomerwo?search=${x}`)
                    .then((res) => { console.log('getpurchaseorders search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('getpurchaseorders search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getcustomerwo`)
                    .then((res) => { console.log('getaccounts search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('getaccounts search err2=', err) ; this.loading=false; })
              }
            },        
          },
  computed: { 
    ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          },
}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>