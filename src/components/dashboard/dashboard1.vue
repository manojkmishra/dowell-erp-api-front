<template> 
<div>
<div v-if="user.admin==1" class="mt-10">
  <joblist/></div>
<div  class="mt-10" v-else>
        <v-progress-linear :active="loading" :indeterminate="loading" absolute   top  color="deep-purple accent-4"
      ></v-progress-linear>
  <v-data-table :headers="headers" :items="getuserjobs" dense  class="elevation-1" :search="search"
        :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [10,20,40,-1], }">
    <template v-slot:top >
        <v-toolbar flat dark dense color="blue darken-4">
            <v-toolbar-title>  USER-{{user.name}} </v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title class="pr-4" >ORDERS </v-toolbar-title>            
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

     
        </v-toolbar>
    </template>
     
    <template v-slot:item.bom="{ item }" >
       <v-btn ripple x-small  color="blue" rounded dark >BOM</v-btn>
     </template>

    <template v-slot:item.pics="{ item }">
       <v-btn ripple x-small  color="red lighten-2 " rounded dark >Pics</v-btn>
    </template>

    <template v-slot:item.c19="{ item }">
       <v-btn v-if="item.C19STATUS==1" ripple x-small  color="teal" rounded dark @click.prevent="c19fn(item)"  >C19</v-btn>
       <v-btn v-else ripple x-small  color="red lighten-2" rounded dark @click.prevent="c19fn(item)"  >C19</v-btn>
    </template>

    <template v-slot:item.t5="{ item }">
      <v-btn v-if="item.TAKE5STATUS==1" ripple x-small  color="teal" rounded dark @click.prevent="t5fn(item)"  >Tk5</v-btn>
       <v-btn v-else ripple x-small  color="red lighten-2" rounded dark @click.prevent="t5fn(item)"  >Tk5</v-btn>
    </template>

    <template v-slot:item.jc="{ item }">
       <v-btn ripple x-small  color="red lighten-2" rounded dark >SJC</v-btn>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-2" class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
      <v-icon medium color="red" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
    </template>
  </v-data-table>
 </div>
 </div>
</template>
<script>
import Vue from 'vue'
import joblist from '../Jobs/JobList.vue'
import { mapGetters, mapState, mapActions} from 'vuex';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import axios from "axios";
export default
{    components: { 'joblist': joblist, },
  computed: { 
              ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          ...mapState({
            //jobtypeoptions:state => state.jobs.jobtypeoptions,
           // getuserjobs:state => state.jobs.getuserjobs,
            useroptions:state => state.user.useroptions,
        }),
      formattedDate(){
                var today = new Date();
                var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                //var date1 = today.getDate()+'-'+(today.getMonth()+1);

                return date;
          }
  },
    //props:{bb:Array},
    data() { return {dialog: false,search: '',dialogDelete: false, loading:false, //jobtypeoptions1:[],
          editedItem: { name: '', DELIVERY_DATE: '', type:'', field_user:'',  comment: '', 
          V6_ORDER_NO:'', SJC_NO:'',SITE_ADDRESS:'' , type:''},
      editedIndex: -1, sawflags:[],// inputRules:[v=>v.length>=3||'Min len is 3 chars'],
      typeOptions: [ "saw_schedules",  "optimised_bars", "optimised_cuts", "Flag" ],
      getuserjobs:[],
          headers: [
             // { text: 'created_at', align: 'left', value: 'created_at'},
             // { text: 'updated_at', align: 'left',  value: 'updated_at'},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
             //  { text: 'updated_by', align: 'left',  value: 'updatedby.name'},
              { text: 'SJC No', align: 'left',  value: 'SJC_NO'},
              { text: 'V6 Ord', align: 'left',  value: 'V6_ORDER_NO'},
              { text: 'Type', align: 'left',  value: 'type1.type'},
              //{ text: 'User', align: 'left',  value: 'fuser.name'},
              { text: 'Cust Nam', align: 'left',  value: 'CLIENT_NAME'},
              { text: 'Address', align: 'left',  value: 'SITE_ADDRESS'},
              { text: 'Postcd', align: 'left',  value: 'POSTCODE'},
              { text: 'Contact', align: 'left',  value: 'CONTACT'},
              { text: 'Due Dt', align: 'left',  value: 'DELIVERY_DATE'},
             // { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              { text: 'BOM', align: 'left',  value: 'bom'},
              { text: 'Pics', value: 'pics',sortable: false },
              { text: 'C19', value: 'c19' ,sortable: false},
              { text: 'T5', value: 't5',sortable: false },
              { text: 'JC', value: 'jc', sortable: false },
             // { text: 'Action', value: 'actions', sortable: false },
            ],
            }
          },
  created(){ 

                        
                   
        },
  methods: {  
        c19fn(x)
          { console.log('c19fn-item=',x)
            this.$store.dispatch('selectedsjc', x);
            this.$store.dispatch('getc19', x);
            this.$router.push({name: 'covid19'});
          },
        t5fn(x)
          { console.log('t5fn-item=',x)
            this.$store.dispatch('selectedsjc', x);
            this.$router.push({name: 'take5'});
          },

        
          },

  watch: {     
            },
}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>