<template> 
<div class="mt-10">
        <v-progress-linear :active="loading" :indeterminate="loading" absolute   top  color="deep-purple accent-4"
      ></v-progress-linear>
  <v-data-table :headers="headers" :items="sawflags.Resources" dense  class="elevation-1"  :search="search"

        :footer-props="{showFirstLastPage: true, itemsPerPageOptions: [50,100,-1], }">

        >
    <template v-slot:top >

        <v-toolbar flat dark dense color="blue darken-4">
            <v-toolbar-title>ERP USERS [hcmRestApi/scim/Users]</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
         <!--  <v-toolbar-title class="pr-4" >ADMIN USER - {{user.name}} </v-toolbar-title>   -->         
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

        </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }"><!--1=qd,2-inpr,3-complt----->
     
       <v-btn ripple small :loading="loading" color="teal " rounded dark   @click.prevent="checkorder(item)"><v-icon >mdi-mouse-move-up</v-icon></v-btn>
       
    </template>
        <template v-slot:item.createdat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.meta.created).format('DD-MM-YYYY, HH:mm')}}</span>
    </template>
   
    <template v-slot:item.hehe="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{item['urn:scim:schemas:extension:fa:2.0:faUser'].workerInformation }}</span>
    </template>
    <template v-slot:item.updatedat="{ item }" ><!--8,0=qd,9-inpr,12-complt----->
       <span>{{moment(item.meta.lastModified).format('DD-MM-YYYY, HH:mm')}}</span>
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
               //{ text: 'displayName', align: 'left',  value: 'displayName', width:"1%"},
               { text: 'userName', align: 'left',  value: 'userName', width:"1%"},
               { text: 'Role', align: 'left',  value: 'roles[0].displayName', width:"5%",sortable: true},
              { text: 'Active', align: 'left',  value: 'active', width:"1%",sortable: true},
             
              { text: 'Info', align: 'left',  value: 'hehe', width:"20%"},
              //{ text: 'Contact', align: 'left',  value: 'CONTACT'},
             // { text: 'Due Dt', align: 'left',  value: 'DELIVERY_DATE'},
             // { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              //{ text: 'BOM', align: 'left',  value: 'bom'},
              //{ text: 'Pics', value: 'pics',sortable: false },
              //{ text: 'PDF', value: 'pdfs',sortable: false },
             // { text: 'Status', value: 'Status' ,sortable: false, width:"1%"},
              //{ text: 'T5', value: 't5',sortable: false },
              //{ text: 'JC', value: 'jc', sortable: false },
               { text: 'created_at', align: 'left', value: 'createdat',width:"5%",sortable: true},
               { text: 'updated_at', align: 'left',  value: 'updatedat', width:"5%",sortable: true},
             // { text: 'created_by', align: 'left',  value: 'createdby.name'},
               //{ text: 'updated_by', align: 'left',  value: 'LastUpdatedBy', width:"1%"},
               //{ text: 'Action', value: 'actions', sortable: false , width:"1%"},
            ],


    }
          },
  created(){ this.loading=true;
            axios.get(`/take5/geterpuserslist`,
             //{params:{'per_page':e.itemsPerPage}}
             )
                    .then((res) => { console.log('pagi-geterpuserslist response',res.data)  
                                      this.sawflags=res.data; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
        },
  methods: {  

        
          },
  computed: { 
    ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
          ...mapState({
        
            //jobtypeoptions:state => state.jobs.jobtypeoptions,
             useroptions:state => state.user.useroptions,
        }),
      formattedDate(){
        return this.editedItem.DELIVERY_DATE ? format(parseISO(this.editedItem.DELIVERY_DATE),'do MMM yyyy') : ''
        },
      formTitle() {  if (this.dialogDelete) { return "Delete Flag";} 
                     else if (this.editedIndex === -1) { console.log('formtitle()-this.editindx(-1=new)',this.editedIndex);
                                        return "New Job"; }
                    else if (this.editedIndex > -1) { console.log('formtitle()--this.editindx(>1=edit)',this.editedIndex);
                                return "Edit Flag";  }  
                   },
          },
  watch: { dialog (val) { console.log('inside watch- dialog- val=',val)
                          val || this.close()  },    
            },
}
</script>

<style scoped>
.headline{

  /*background-color: blue;*/
}
</style>