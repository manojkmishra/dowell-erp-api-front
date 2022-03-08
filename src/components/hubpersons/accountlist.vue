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
            <v-toolbar-title>hubPersons</v-toolbar-title>
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
               { text: 'PartyNumber', value: 'PartyNumber', sortable: false , width:"1%"},
               { text: 'FirstName', align: 'left',  value: 'FirstName', width:"3%"},
               { text: 'LastName', align: 'left',  value: 'LastName', width:"3%"},
               { text: 'EmailAddress', align: 'left',  value: 'EmailAddress', width:"1%"},
              { text: 'OrgPartyName', value: 'OrganizationPartyName', sortable: false , width:"1%"},
               { text: 'OrgPartyNumber', value: 'OrganizationPartyNumber', sortable: false , width:"1%"},
               { text: 'PartyUsageCode', align: 'left',  value: 'PartyUsageCode', width:"5%"},
                { text: 'CreatedByModule', align: 'left',  value: 'CreatedByModule', width:"5%"},
               //  { text: 'SupplierSite', align: 'left',  value: 'SupplierSite', width:"5%"},
             // { text: 'Ordered', align: 'left',  value: 'Ordered', width:"1%"},
             // { text: 'TotalTax', align: 'left',  value: 'TotalTax', width:"1%"},
             // { text: 'Total', align: 'left',  value: 'Total', width:"1%"},

             // { text: 'Status', value: 'Status' ,sortable: false, width:"1%"},
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

    //--------------------------------get one order--------------

        
            paginate1(e)
            { console.log('paginate-$event',e);
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
             if(this.search =='')
                {
            this.loading=true;
             //axios.get(`${axios.defaults.baseURL}/getjobs?page=${e.page}`,
             //axios.get(`${axios.defaults.baseURL}/take5/getjobs?offset=${e.pageStart}`,
             axios.get(`/take5/gethubpersons?offset=${e.pageStart}`,
             //{params:{'per_page':e.itemsPerPage}}
             )
                    .then((res) => { console.log('pagi-gethubpersons response',res.data.items)  
                                      this.sawflags=res.data; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
                }
                else{
                console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/gethubpersons?search=${x}`)
                    .then((res) => { console.log('gethubpersons search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('gethubpersons search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/gethubpersons`)
                    .then((res) => { console.log('gethubpersons search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('gethubpersons search err2=', err) ; this.loading=false; })
              }

                }
            },
        searchit(e){
              console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/gethubpersons?search=${x}`)
                    .then((res) => { console.log('gethubpersons search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('gethubpersons search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/gethubpersons`)
                    .then((res) => { console.log('gethubpersons search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('gethubpersons search err2=', err) ; this.loading=false; })
              }
            },

        
        
          },
  computed: { 
    ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          ...mapState({
        
            //jobtypeoptions:state => state.jobs.jobtypeoptions,
             useroptions:state => state.user.useroptions,
        }),
  }
}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>