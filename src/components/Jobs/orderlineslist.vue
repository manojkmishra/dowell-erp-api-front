<template> 
<div class="mt-10">
        <v-progress-linear :active="loading" :indeterminate="loading" absolute   top  color="deep-purple accent-4"
      ></v-progress-linear>
  <v-data-table :headers="headers" :items="wom.items" dense  class="elevation-1"  :search="search"

        :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [50,100,-1], }">

        >
    <template v-slot:top >

        <v-toolbar flat dark dense color="blue darken-4">
            <v-toolbar-title>Order Lines</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
         <!--  <v-toolbar-title class="pr-4" >ADMIN USER - {{user.name}} </v-toolbar-title>   -->         
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

        </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }"><!--1=qd,2-inpr,3-complt----->
     
       <v-btn ripple small :loading="loading" color="teal " rounded dark   @click.prevent="getonewomaterial(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
       
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
     <template v-slot:item.RequiredDate="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.RequiredDate).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
     <template v-slot:item.plncompltdate="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.PlannedCompletionDate).format('DD-MM-YYYY, HH:mm')}}</span>
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
               { text: 'Details', value: 'action', sortable: false , width:"1%"},
                { text: 'ProductNumber', align: 'left',  value: 'ProductNumber', width:"10%"},
               { text: 'ProductDescription', align: 'left',  value: 'ProductDescription', width:"10%"},
               { text: 'Status', align: 'left',  value: 'Status', width:"5%"},
               { text: 'OrderedQuantity', value: 'OrderedQuantity', sortable: false , width:"1%"},
              // { text: 'ItemNumber', align: 'left',  value: 'ItemNumber', width:"1%"},
             // { text: 'ItemDescription', align: 'left',  value: 'ItemDescription', width:"1%"},
             
              { text: 'UnitListPrice', align: 'left',  value: 'UnitListPrice', width:"1%"},
              { text: 'UnitSellingPrice', align: 'left',  value: 'UnitSellingPrice', width:"1%"},
             // { text: 'PlanCompltDt', align: 'left',  value: 'plncompltdate', width:"1%"},
               //{ text: 'created_at', align: 'left', value: 'createdat',width:"3%"},
               { text: 'updated_at', align: 'left',  value: 'updatedat', width:"3%"},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
               { text: 'updated_by', align: 'left',  value: 'LastUpdatedBy', width:"1%"},
               //{ text: 'Action', value: 'actions', sortable: false , width:"1%"},
            ],
    }
          },
          computed: { 
          ...mapState({
             wom:state => state.jobs.getorderlines.data,
        }),
          },
  created(){ 
        },
      methods: {  
    //--------------------------------get one order--------------

    getonewomaterial(x){
              console.log('orderlinesdetail-',x)
               this.$router.push({   name: 'orderlinesdetail',params: {data1: x }  
                               });
    }
      }


}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>