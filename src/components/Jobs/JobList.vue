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
            <v-toolbar-title>ALL ORDERS [salesOrdersForOrderHub]</v-toolbar-title>
             <v-divider class="mx-4" inset vertical ></v-divider>
           <v-toolbar-title class="pr-4" >ADMIN USER - {{user.name}} </v-toolbar-title>            
            <v-spacer></v-spacer>
            <v-text-field v-model="search" @input="searchit" append-icon="mdi-magnify" label="Search OrderNumber" single-line hide-details></v-text-field>

        </v-toolbar>
    </template>


    <template v-slot:item.t5="{ item }">
      <v-btn v-if="item.TAKE5STATUS==1" ripple x-small  color="teal" rounded dark @click.prevent="t5fn(item)"  >Tk5</v-btn>
       <v-btn v-else ripple x-small  color="red lighten-2" rounded dark @click.prevent="t5fn(item)"  >Tk5</v-btn>
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
             
              { text: 'BUName', align: 'left',  value: 'BusinessUnitName', width:"1%"},
               { text: 'OrderNumber', align: 'left',  value: 'OrderNumber', width:"1%"},
               { text: 'Buyer', align: 'left',  value: 'BuyingPartyName', width:"5%"},
              { text: 'BuyerContct', align: 'left',  value: 'BuyingPartyContactName', width:"1%"},
              { text: 'Contact', align: 'left',  value: 'BuyingPartyContactNumber', width:"1%"},
              { text: 'PrcSeg', align: 'left',  value: 'PricingSegment', width:"1%"},
              { text: 'OrdKey', align: 'left',  value: 'OrderKey', width:"1%"},
              //{ text: 'Postcd', align: 'left',  value: 'POSTCODE'},
              //{ text: 'Contact', align: 'left',  value: 'CONTACT'},
             // { text: 'Due Dt', align: 'left',  value: 'DELIVERY_DATE'},
             // { text: 'schedule_saw', align: 'left',  value: 'schedule_saw'},
              //{ text: 'BOM', align: 'left',  value: 'bom'},
              //{ text: 'Pics', value: 'pics',sortable: false },
              //{ text: 'PDF', value: 'pdfs',sortable: false },
              { text: 'Status', value: 'Status' ,sortable: false, width:"1%"},
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
            paginate1(e)
            { console.log('paginate-$event',e);
            //axios.get(`http://127.0.0.1:8000/api/saw/getsawschedules?page='+${e.page}`,{})
             if(this.search =='')
                {
            this.loading=true;
             //axios.get(`${axios.defaults.baseURL}/getjobs?page=${e.page}`,
             //axios.get(`${axios.defaults.baseURL}/take5/getjobs?offset=${e.pageStart}`,
             axios.get(`/take5/getjobs?offset=${e.pageStart}`,
             //{params:{'per_page':e.itemsPerPage}}
             )
                    .then((res) => { console.log('pagi-getjobs response',res.data.items)  
                                      this.sawflags=res.data; this.loading=false;   })
                    .catch(err=>{ console.log('paginate-err=', err) ; this.loading=false; })
                }
                else{
                console.log('search=',e)
              console.log('paginate-search=',this.search)
              let x=this.search;
              if(x.length>2){ this.loading=true;
                 //axios.get(`${axios.defaults.baseURL}/take5/getjobs?search=${x}`)
                  axios.get(`/take5/getjobs?search=${x}`)
                    .then((res) => { console.log('sawsc search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getjobs`)
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
                  axios.get(`/take5/getjobs?search=${x}`)
                    .then((res) => { console.log('sawsc search res1=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err1=', err); this.loading=false;  })
                }
              if(x.length<=0){ this.loading=true;
                 axios.get(`/take5/getjobs`)
                    .then((res) => { console.log('sawsc search res2=',res.data)  
                                      this.sawflags=res.data; this.loading=false;  })
                    .catch(err=>{ console.log('sawsc search err2=', err) ; this.loading=false; })
              }
            },

        
        editItem (item) 
        {  this.dialogDelete = false;
          console.log('edit-item',item)
          this.editedIndex = this.sawflags.indexOf(item); 
          console.log('editedIndex',this.editedIndex)
          this.editedItem = Object.assign({}, item); 
          //this.editedItem.field_user = item.fuser.name;
          console.log('editedItem',this.editedItem)
          //  this.editedItem=item;
          this.dialog = true
        },
         save () 
      {  console.log('save-item=',this.editedItem);
        if(this.$refs.form.validate())
        {
       if (this.editedIndex > -1) //save clicked when editing
                  {  console.log('edit',this.editedItem)
                    //edit api here
                    this.$store.dispatch('editjobs', this.editedItem) 
                        .then((response) => { 
                           this.$store.dispatch('getjobs')
                           .then((res) => { this.sawflags=res.data; })
                        })     
                        
                    } 
           //--------save clicked when adding new
        else {  console.log('add-item',this.editedItem)
                    //add new api here
                    this.$store.dispatch('addjobs', this.editedItem) 
                      .then((response) => {   this.$store.dispatch('getjobs')
                                                  .then((res) => { this.sawflags=res.data; })
                                          })     
              }
          this.close()
          } //validate loop
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                       // const index = this.desserts.indexOf(item)
                        this.dialogDelete = true;
                        this.editedIndex = this.sawflags.indexOf(item);
                        this.editedItem = Object.assign({}, item);
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove()- editedIndex', this.editedIndex)
                  // delete api here
                  this.$store.dispatch('deljobs', this.editedItem)  
                                .then((response) => {   this.$store.dispatch('getjobs')
                                                  .then((res) => { this.sawflags=res.data; })
                                          })
                             
                 // this.dialogDelete = false;
                  this.close(); 
                },
      //-------------------------------delete finish-----------------
      //------------------close modal---------------------------
      close () {  
                  this.dialog = false; 
                  setTimeout(() => {  
                    this.editedItem = Object.assign({}, this.defaultItem)
                          this.editedIndex = -1 
                          this.dialogDelete = false;}, 100)
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