<template>
  <v-data-table  :headers="headers" :items="sawstatus"  class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>SAW Status</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!--------------modal------------------->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark rounded class="mb-2" v-on="on">New Status</v-btn>
          </template>
          <!----popup---------------->
          <v-card>
            <v-card-title><span class="headline" >{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.STATUS" label="Status name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select single-line bottom label="Type" 
                      v-model="editedItem.TYPE" :items="typeOptions"   
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.comment" label="Comments"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

           <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions> -->
            <v-card-actions>
              <div class="flex-grow-1"></div>
                <div v-if="dialogDelete === true">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="remove">Delete</v-btn>
                </div>
                <div v-else-if="dialogDelete === false">
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--------------modal--------------->
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon medium color="blue darken-2" class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
      <v-icon medium color="red" @click="deleteItem(item)" >mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <div></div> <!----show nothing when no data -->
    </template>
  </v-data-table>
</template>
<script>
    import { mapGetters, mapState, mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,dialogDelete: false,
      headers: [
       { text: "ID", value: "id", width: "6%" },
                        { text: "STATUS", align: "left", sortable: true, value: "STATUS" },
                        { text: "TYPE", value: "TYPE", sortable: true, width: "8%" },
                        { text: "COMMENTS", align: "left", sortable: false, value: "comment" },
                        { text: "CREATEDBY", align: "left", sortable: true, value: "createdby.name" },
                        { text: "UPDATEDBY", align: "left", sortable: true, value: "updatedby.name" },
                        { text: "UPDATEDAT", align: "left", sortable: true, value: "updated_at" },
                       // { text: "Actions", value: "action", sortable: false, width: "8%" },
                        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],categories: [],
      editedItem: { name: '', STATUS: '', TYPE:'',   comment: '', },
      editedIndex: -1,
      typeOptions: [ "saw_schedules",  "optimised_bars", "optimised_cuts", "Flag" ],
     // formData: {     id: '',     }
    }),
created(){ /*this.loading=true;
            this.$store.dispatch('getsawstatus')
                    .then((res) => { //this.loading=false;
                                console.log('getstatus response',res.data)  
                                this.categories=res.data;
                                this.loading=false;
                        }) */
        },
    computed: {
      formTitle() {  if (this.dialogDelete) { return "Delete Status";} 
                    else if (this.editedIndex === -1) { console.log('new--this.editindx',this.editedIndex);
                                        return "New Status"; }
                    else if (this.editedIndex > -1) { console.log('edit--this.editindx',this.editedIndex);
                                return "Edit Status";  }  
                              },
         ...mapState({  sawstatus:state => state.saw.sawstatus
        }),

     },
    watch: { dialog (val) { console.log('inside watch- dialog- val=',val)
      val || this.close()  },    },
    methods: { 
      editItem (item) { console.log('edit-item',item)
        this.dialogDelete = false;
        this.editedIndex = this.sawstatus.indexOf(item); console.log('editedIndex',this.editedIndex)
        this.editedItem = Object.assign({}, item); console.log('editedItem',this.editedItem)
      //  this.editedItem=item;
        this.dialog = true
        },
      save () 
      {  //console.log('save-item=',item);
        if (this.editedIndex > -1) //save clicked when editing
                  {  console.log('edit',this.editedItem)
                    //edit api here
                     this.$store.dispatch('editstatus', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
                    } 
           //--------save clicked when adding new
        else {  console.log('add-item',this.editedItem)
                    //add new api here
                     this.$store.dispatch('addstatus', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
            }
                this.close()
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                        const index = this.desserts.indexOf(item)
                        this.dialogDelete = true;
                        this.editedIndex = this.sawstatus.indexOf(item);
                        this.editedItem = Object.assign({}, item);
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove---function- editedIndex', this.editedIndex)
                  // delete api here
                   this.$store.dispatch('deletestatus', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
                  this.close();
                },
      //-------------------------------delete finish-----------------
      //------------------close modal---------------------------
      close () {  
                  this.dialog = false
                  setTimeout(() => {  this.editedItem = Object.assign({}, this.defaultItem)
                          this.editedIndex = -1, this.dialogDelete = false; }, 100)
              },
    
    },
  }
</script>