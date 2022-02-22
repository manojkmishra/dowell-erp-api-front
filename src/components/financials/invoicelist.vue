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
            <v-toolbar-title>Invoices</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
         <!--  <v-toolbar-title class="pr-4" >ADMIN USER - {{user.name}} </v-toolbar-title>   -->         
            <v-spacer></v-spacer>
            <v-text-field v-model="search" @input="searchit" append-icon="mdi-magnify" label="Search OrderNumber" single-line hide-details></v-text-field>

        </v-toolbar>
    </template>
    <template v-slot:item.action1="{ item }"><!--1=qd,2-inpr,3-complt----->
       <v-btn ripple small :loading="loading" color="teal " rounded dark   @click.prevent="getonewo(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
    </template>
    <template v-slot:item.action="{ item }"><!--1=qd,2-inpr,3-complt----->
       <v-btn ripple small :loading="loading" color="blue " rounded dark   @click.prevent="getwomaterial(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
    </template>
     <template v-slot:item.action2="{ item }"><!--1=qd,2-inpr,3-complt----->
       <v-btn ripple small :loading="loading" color="green" rounded dark   @click.prevent="getwoOperation(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
    </template>
         <template v-slot:item.action3="{ item }"><!--1=qd,2-inpr,3-complt----->
       <v-btn ripple small :loading="loading" color="purple" rounded dark   @click.prevent="getworeservation(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
    </template>
        <template v-slot:item.createdat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.CreationDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
    <template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.LastUpdateDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>

     <template v-slot:item.wodate="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.WorkOrderDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
     <template v-slot:item.plnstrtdate="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.PlannedStartDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
     <template v-slot:item.plncompltdate="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.PlannedCompletionDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>

    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
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
             
              // { text: 'Select', value: 'action', sortable: false , width:"1%"},
               { text: 'Details', value: 'action1', sortable: false , width:"1%"},
                { text: 'InvoiceId', align: 'left',  value: 'InvoiceId', width:"5%"},
              // { text: 'WOId', align: 'left',  value: 'WorkOrderId', width:"1%"},
                
               { text: 'InvNumber', align: 'left',  value: 'InvoiceNumber', width:"1%"},
               { text: 'Amount', align: 'left',  value: 'InvoiceAmount', width:"5%"},
               { text: 'InvDate', value: 'InvoiceDate', sortable: false , width:"1%"},
               { text: 'Supplier', value: 'Supplier', sortable: false , width:"1%"},
                { text: 'SupplierSite', value: 'SupplierSite', sortable: false , width:"1%"},
              
               //{ text: 'PaymentMethodCode', align: 'left',  value: 'PaymentMethodCode', width:"1%"},
              { text: 'AcctgDate', align: 'left',  value: 'AccountingDate', width:"1%"},
              
              //{ text: 'PaymentTerms', align: 'left',  value: 'PaymentTerms', width:"1%"},
              { text: 'PaidStatus', align: 'left',  value: 'PaidStatus', width:"1%"},
               { text: 'AcctgStatus', align: 'left',  value: 'AccountingStatus', width:"1%"},
                { text: 'ValidationStatus', align: 'left',  value: 'ValidationStatus', width:"1%"},
                 { text: 'BusinessUnit', align: 'left',  value: 'BusinessUnit', width:"1%"},

               //{ text: 'ReferenceKeyTwo', align: 'left', value: 'ReferenceKeyTwo',width:"3%"},
               { text: 'updated_at', align: 'left',  value: 'updatedat', width:"3%"},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
               { text: 'updated_by', align: 'left',  value: 'LastUpdatedBy', width:"1%"},
               //{ text: 'Action', value: 'actions', sortable: false , width:"1%"},
            ],


    }
          },
  created(){ 
        },
  methods: {  
    //--------------------------------get one order--------------

    getonewo(x){
              console.log('getonewo-',x)
               this.$router.push({   name: 'wodetails',params: {data1: x }  
                               });
 
          },
 
       
        getworeservation(x){
              console.log('getworeservation-',x)
              this.loading=true;
              this.$store.dispatch('getworeservation', x.WorkOrderId)
                        .then((response) =>  { //console.log('order-response=',response);  
                                this.loading=false;   
                               this.$router.push({   name: 'woreservation'     });
                                })     
                        .catch((error) => {   this.loading=false; 
                        console.log('error-',error)     
                        });
        },
          //----------------------------------
            paginate1(e)
            { console.log('paginate-$event',e);
              if(this.search =='')
                {
                    this.loading=true;
                    axios.get(`/take5/getinvoices?offset=${e.pageStart}`,    )
                    .then((res) => { console.log('pagi-getinvoices response',res.data.items)  
                                      this.sawflags=res.data; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
                }
                else{
                console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/getinvoices?search=${x}`)
                    .then((res) => { console.log('getinvoices search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('getinvoices search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getinvoices`)
                    .then((res) => { console.log('sawsc search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err2=', err) ; this.loading=false; })
              }

                }
            },
        searchit(e){
              console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/getinvoices?search=${x}`)
                    .then((res) => { console.log('sawsc search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getinvoices`)
                    .then((res) => { console.log('sawsc search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err2=', err) ; this.loading=false; })
              }
            }, },
  computed: { 
    ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          ...mapState({
        
            //jobtypeoptions:state => state.jobs.jobtypeoptions,
             useroptions:state => state.user.useroptions,
        }),


          },

}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>