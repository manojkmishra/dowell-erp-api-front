<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex  xs12 md8>
        <v-card color="grey lighten-4" title="Edit Profile" text="Complete your profile">
            <v-app-bar  dark  color="blue darken-4" text-center >
                <v-avatar  color=""><img src="@/assets/img/coronavirus.svg"></v-avatar>
                <v-icon class="mr-2">mdi-coronavirus</v-icon>
                <v-toolbar-title >COVID-19 CLIENT / VISITOR FORM</v-toolbar-title>
            </v-app-bar>
            <p class="mt-10 mx-4">
                We value the safety of our staff, customers and all whom visit our site. Dowell is obligated the follow the Australian Government guidelines, assessing any exposure to the Covid-19 virus.
            </p><p class="mb-10 mx-4">Could you please kindly complete the declaration below.
                </p>
<!----------    main form            ----------->
          <v-form ref="loginForm" :value="formValid">
            <v-container py-0>
    <!-------table  ----->
<v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Please read the statements & tick the appropriate response <span class="star">*</span> </th>
          <th class="text-left">Yes</th>
          <th class="text-left">No</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Have you knowingly come into CLOSE contact with anyone who has travelled overseas in the last 14 days?</td>
          <td><v-radio-group v-model="rad.rad1" :rules="rad1Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad1" :rules="rad1Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td class="pr-5">Have you or anyone that resides at the same address been tested for COVID-19 in the last 5 days?</td>
          <td><v-radio-group v-model="rad.rad2" :rules="rad2Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad2" :rules="rad2Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address currently under any form of self-isolation as the result of an order of any government authority or as the result of a recommendation of a health professional?</td>
          <td><v-radio-group v-model="rad.rad3" :rules="rad3Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad3" :rules="rad3Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have you knowingly come into CLOSE contact with anyone who has travelled overseas in the last 14 days?</td>
          <td><v-radio-group v-model="rad.rad4" :rules="rad4Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad4" :rules="rad4Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Within the last 30 days have you or anyone that resides at the same address been diagnosed with COVID-19 and/or been in hospital with pneumonia?</td>
          <td><v-radio-group v-model="rad.rad5" :rules="rad5Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad5" :rules="rad5Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Are you or anyone that resides at the same address experiencing fever, respiratory or flu like symptoms?</td>
          <td><v-radio-group v-model="rad.rad6" :rules="rad6Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad6" :rules="rad6Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Do you reside in an area which is part of a mandated government lockdown?</td>
          <td><v-radio-group v-model="rad.rad7" :rules="rad7Rules" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="rad.rad7" :rules="rad7Rules" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <!------   ----->
        <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Site Details</v-toolbar-title>
    </v-toolbar>
<v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr><td>Client</td> <td>{{selectedsjc.CLIENT_NAME }}</td> </tr>
        <tr><td>Address</td> <td>{{selectedsjc.SITE_ADDRESS }}</td>  </tr>
        <tr><td>SJC No</td> <td>{{selectedsjc.SJC_NO }}</td>  </tr>
        <tr><td>V6 Order No</td> <td>{{selectedsjc.V6_ORDER_NO }}</td>  </tr>
        <tr><td>Date</td> <td>{{selectedsjc.DELIVERY_DATE }}</td>  </tr>
      </tbody>
    </template>
  </v-simple-table>
             <v-layout wrap mt-10>
               
              <!--  <v-flex xs12 md4> <v-text-field  label="Company (disabled)" disabled/> </v-flex>
                <v-flex xs12 md4> <v-text-field class="purple-input" label="User Name"/> </v-flex>
                <v-flex xs12 md4> <v-text-field label="Email Address" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md6> <v-text-field v-model="formc.FNAME" :rules="fieldRules" label="First Name (Occupant/Tenant)" class="purple-input"></v-text-field>
                </v-flex>
                <v-flex xs12 md6> <v-text-field v-model="formc.LNAME" :rules="fieldRules" label="Last Name" class="purple-input"/> </v-flex>
                
                <v-flex xs12 md6> <v-text-field v-model="formc.CNAME" :rules="fieldRules" label="Company" class="purple-input"/> </v-flex>
                <v-flex xs12 md6> <v-text-field v-model="formc.PHONE" :rules="phoneRules" class="purple-input" label="Phone No" type="number"/> </v-flex>
              <!--  <v-flex xs12 md4> <v-text-field label="City" class="purple-input"/> </v-flex>
                <v-flex xs12 md4><v-text-field label="Country" class="purple-input"/> </v-flex> -->
                <v-flex xs12 md8><v-text-field v-model="formc.ADDRESS" :rules="fieldRules" label="Address" class="purple-input"/></v-flex>
                <v-flex xs12 md4><v-text-field v-model="formc.POST_CODE" :rules="postRules" class="purple-input" label="Postal Code" type="number"/></v-flex>

               <!-- <v-flex xs12> <v-textarea class="purple-input" label="About Me"   value="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> </v-flex> -->
                <v-flex xs12 text-center >
                  <v-btn v-if="resubmit==true" rounded class="mx-0 mr-2 font-weight-light" color="primary" @click="editsubmit">Re-Submit</v-btn>
                  <v-btn v-if="resubmit==true" rounded class="mx-0 font-weight-light" color="warning" @click="delete1">Delete</v-btn>
                  <v-btn v-else rounded class="mx-0 font-weight-light" color="success" @click="submit">Submit</v-btn>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  computed: {
    ...mapState({ selectedsjc: state => state.jobs.selectedsjc, 
                  getc19: state => state.jobs.getc19,     
              }),
    rad1Rules() { return [this.rad.rad1 !=null || "Pls select one"  ]; },
    rad2Rules() { return [this.rad.rad2 !=null || "Pls select one"  ]; },
    rad3Rules() { return [this.rad.rad3 !=null || "Pls select one"  ]; },
    rad4Rules() { return [this.rad.rad4 !=null || "Pls select one"  ]; },
    rad5Rules() { return [this.rad.rad5 !=null || "Pls select one"  ]; },
    rad6Rules() { return [this.rad.rad6 !=null || "Pls select one"  ]; },
    rad7Rules() { return [this.rad.rad7 !=null || "Pls select one"  ]; },
    resub(){

    },
    formc(){
              if(this.getc19 && this.getc19.SJC_NO==this.selectedsjc.SJC_NO )
              {
                console.log('formc present-this.getc19',this.getc19)
                    this.formd.ADDRESS=this.getc19.ADDRESS
                    this.formd.FNAME=this.getc19.FNAME
                    this.formd.LNAME=this.getc19.LNAME
                    this.formd.CNAME=this.getc19.CNAME
                    this.formd.PHONE=this.getc19.PHONE
                    this.formd.POST_CODE=this.getc19.POST_CODE
                    this.formd.id=this.getc19.id
                    this.resubmit=true;
                    console.log('form present-',this.formd)
                    return this.formd;
                    
                  }
                  else {  console.log('formc not present-this.getc19',this.getc19)
                    this.formd.ADDRESS=''
                    this.formd.FNAME=''
                    this.formd.LNAME=''
                    this.formd.CNAME=''
                    this.formd.PHONE=''
                    this.formd.POST_CODE=''
                    this.formd.id=''
                    this.resubmit=false;
                    console.log('form not present-',this.formd)
                    return this.formd
                  }
          },
      rad(){
     // get: function () {
            
              if(this.getc19 && this.getc19.SJC_NO==this.selectedsjc.SJC_NO ){
                console.log('rad present-this.getc19',this.getc19)
                    if(this.getc19.rad1==1) {this.radf.rad1=true } else { this.radf.rad1=false}
                    if(this.getc19.rad2==1) {this.radf.rad2=true } else { this.radf.rad2=false}
                    if(this.getc19.rad3==1) {this.radf.rad3=true } else { this.radf.rad3=false}
                    if(this.getc19.rad4==1) {this.radf.rad4=true } else { this.radf.rad4=false}
                    if(this.getc19.rad5==1) {this.radf.rad5=true } else { this.radf.rad5=false}
                    if(this.getc19.rad6==1) {this.radf.rad6=true } else { this.radf.rad6=false}
                    if(this.getc19.rad7==1) {this.radf.rad7=true } else { this.radf.rad7=false}
                    console.log('rad present-',this.radf)
                    return this.radf;
                  }
                  else { 
                    console.log('first time- no save in db-rad not present-this.getc19',this.getc19)
              this.radf.rad1=null;this.radf.rad2=null;this.radf.rad3=null;this.radf.rad4=null;this.radf.rad5=null;
              this.radf.rad6=null;this.radf.rad7=null;
              console.log('rad not present-',this.radf)
              return this.radf 
              }
          },
          
    },

 // },
    data () {
      return {
        formd:{FNAME:'',LNAME:'',CNAME:'',PHONE:'',POST_CODE:'',ADDRESS:'',rad:'',id:''},
          formValid:false, resubmit:false,
          radf:{rad1:null,rad2:null,rad3:null,rad4:null,rad5:null,rad6:null,rad7:null},
          fieldRules: [ (v) => (v && v.length >2)|| 'Required & should be more than 2 chars ' ],
           phoneRules:[
            (v) => /^\d+$/.test(v)||'Required and must be a positive number',
            (v) => (v && v.length >8) || 'Must be more than 8 digits '
         ],
          postRules:[
            (v) => /^\d+$/.test(v)||'Required and must be in numbers',
            (v) => (v && v.length >2) || 'Must be more than 2 digits '
         ],

        }
    },
    methods: {
        inputChange(){
            console.log('this.rad=',this.rad)
            console.log('selectedsjc=',this.selectedsjc)
        },
        submit(event)
        {  // console.log({event,$form:this.$refs.loginForm})
          if(this.$refs.loginForm.validate())
            { console.log('validated-this.rad',this.rad)
              this.formd.rad=this.rad
              this.formd.sjcid=this.selectedsjc.id
              this.formd.V6_ORDER_NO=this.selectedsjc.V6_ORDER_NO
              this.formd.SJC_NO=this.selectedsjc.SJC_NO
              console.log('addc19--this.formd',this.formd)
              this.$store.dispatch('addc19', this.formd) 
            }
        },
        editsubmit(event)
        {  // console.log({event,$form:this.$refs.loginForm})
          if(this.$refs.loginForm.validate())
            { console.log('validated-this.rad',this.rad)
              this.formd.rad=this.rad
              this.formd.sjcid=this.selectedsjc.id
              this.formd.V6_ORDER_NO=this.selectedsjc.V6_ORDER_NO
              this.formd.SJC_NO=this.selectedsjc.SJC_NO
              console.log('editc19-this.formd',this.formd)
              this.$store.dispatch('editc19', this.formd) 
            }
        },
        delete1(){
              this.$store.dispatch('delc19', this.formd) 
        }
    },
    
 
 
}
</script>
<style scoped>
.star{
    color:red
}
</style>
