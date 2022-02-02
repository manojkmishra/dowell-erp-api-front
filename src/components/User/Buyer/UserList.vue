<template>
  <v-data-table  :headers="headers" :items="adminuser"  class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <!--------------modal------------------->
        <v-dialog v-model="dialog" max-width="500px" >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark rounded class="mb-2" v-on="on">New User</v-btn>
          </template>
          <!----popup---------------->
          <v-card>
            <v-card-title><span class="headline" >{{ formTitle }}</span></v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="userform">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.name" label="Name" :rules="requiredRules"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.email" label="Email" 
                    :rules="emailRules" ></v-text-field>
                  </v-col>
                 
                    <v-col cols="12" sm="6" md="6" v-if="dialogDelete === false">
                      <v-text-field :rules="passwordRules"
                     v-model="editedItem.password" label="Password" type="password" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" v-if="dialogDelete === false">
                      <v-text-field  v-model="editedItem.confirm_password" label="Confirm Password" 
                      type="password" :rules="[(editedItem.confirm_password === editedItem.password) || 
                      'Passwords  not matching']" ></v-text-field>
                    </v-col>
                 
                   <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.mobile" label="Mobile"></v-text-field>
                  </v-col>

                </v-row>
                </v-form>
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
    <template v-slot:item.type1="{ item }">
        <span v-if="item.type ==1">Admin</span>
        <span v-if="item.type ==2" >Wholesaler</span>
        <span v-if="item.type ==3">Buyer</span>
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
                        { text: "NAME", align: "left", sortable: true, value: "name" },
                        { text: "EMAIL", align: "left", sortable: true, value: "email" },
                        { text: "MOBILE", align: "left", sortable: true, value: "mobile" },
                        { text: "TYPE", align: "left", sortable: true, value: "type1" },
                       // { text: "CREATEDBY", align: "left", sortable: true, value: "created_by.name" },
                       // { text: "UPDATEDBY", align: "left", sortable: true, value: "updated_by" },
                      //  { text: "UPDATEDAT", align: "left", sortable: true, value: "updated_at" },
                       // { text: "Actions", value: "action", sortable: false, width: "8%" },
                        { text: 'Actions', value: 'actions', sortable: false,width: "10%" },
      ],
      desserts: [],categories: [],
      editedItem: { name: '', email: '', type:'',   password: '', confirm_password: '', mobile:''},
      editedIndex: -1,
      typeOptions: [ "Admin",  "Wholesaler", "Buyer" ],
      requiredRules: [ v => !!v || 'This field is required'        ],
      emailRules:[ v => !!v || 'The Email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ],
      passwordRules:[  v => !!v || 'The Password is required',
                      v => (v && v.length > 5) || 'The Password must be atleast 6 chars'
                    ]
    }),
/*created(){ this.loading=true;
            this.$store.dispatch('getuserlist')
                    .then((res) => { //this.loading=false;
                                console.log('getstatus response',res.data)  
                                this.sawstatus=res.data;
                                this.loading=false;
                        }) 
        },
        */
    computed: {
      formTitle() {  if (this.dialogDelete) { return "Delete User";} 
                    else if (this.editedIndex === -1) { console.log('new--this.editindx',this.editedIndex);
                                        return "New User"; }
                    else if (this.editedIndex > -1) { console.log('edit--this.editindx',this.editedIndex);
                                return "Edit User";  }  
                              },
         ...mapState({  sawstatus:state => state.user.userlist}),
          adminuser(){let bb= this.sawstatus.filter( x => x.type ===  "3" );
          console.log('this.sawstatys=',this.sawstatus)
                      return bb;
                      },
          ...mapGetters({authenticated:'auth/authenticated',
                          user:'auth/user'
                        })

     },
    watch: { dialog (val) { console.log('inside watch- dialog- val=',val)
                          val || this.close()  },    
        },
    methods: { 
                  passwordValidator() 
                  { return (this.editedItem.confirm_password === this.editedItem.password) || 
                      'Password not matching';                    
                  },
      reseteditedItem(){
        this.editedItem= { name: '', email: '', type:'',   password: '', confirm_password: '', mobile:''}
      },

      editItem (item) { console.log('edit-item',item)
        this.dialogDelete = false;
        this.editedIndex = this.sawstatus.indexOf(item); console.log('editedIndex',this.editedIndex)
        this.editedItem = Object.assign({}, item); console.log('editedItem',this.editedItem)
      //  this.editedItem=item;
      this.editedItem.type==3

        this.dialog = true
        },
      save () 
      {  //console.log('save-item=',item);
        if (this.editedIndex > -1) //save clicked when editing
              {  console.log('edit',this.editedItem)
                    //edit api here
                      this.editedItem.type==3
                    if (!this.$refs.userform.validate()) 
                    {   
                      console.log('add-item- form validation wrong',this.editedItem)
                      return false; 
                    }
                    else
                    this.$store.dispatch('edituser', this.editedItem) 
                } 
           //--------save clicked when adding new
        else {  console.log('add-item',this.editedItem)
                    //adduser api here
                    this.editedItem.type=3;
                     if (!this.$refs.userform.validate()) 
                    {   
                      console.log('add-item- form validation wrong',this.editedItem)
                       return false; 
                     }
                    else
                        this.$store.dispatch('adduser', this.editedItem) 
            }
            //this.reseteditedItem();
            this.close()
        },
        //--------------delete start----------------------------------------------------------
      deleteItem (item) {console.log('delete-pressed-item',item)
                        //const index = this.desserts.indexOf(item)
                        if(this.user.email==item.email)
                        { 
                          return false;
                        }
                        //return false;
                        this.dialogDelete = true;
                        this.editedIndex = this.sawstatus.indexOf(item);
                        this.editedItem = Object.assign({}, item);
                        this.dialog = true;
               //after this now press delete on dialogue box to execure below fn
              },
      remove() { console.log('remove---function- editedIndex', this.editedIndex)
                  // delete api here
                    this.$store.dispatch('deleteuser', this.editedItem) 
                      .then((response) => {})     .catch((error) => {});
                  this.close();
                },
      //-------------------------------delete finish-----------------
      //------------------close modal---------------------------
      close () {  this.dialog = false
                  setTimeout(() => {  this.editedItem = Object.assign({}, this.defaultItem)
                          this.editedIndex = -1, this.dialogDelete = false; }, 100)
              },
    
    },
  }
</script>