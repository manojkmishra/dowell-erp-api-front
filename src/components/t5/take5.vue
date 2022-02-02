<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex  xs12 md8>
        <v-card color="grey lighten-4">
            <v-app-bar  dark  color="blue darken-4" text-center >
                <v-avatar  color=""><img src="@/assets/img/Take5-2.png"></v-avatar>
                <v-icon class="mr-2">mdi-coronavirus</v-icon>
                <v-toolbar-title >TAKE 5 - FOR SAFETY</v-toolbar-title>
            </v-app-bar>

            <!--
            <p class="mt-10 mx-4">
                We value the safety of our staff, customers and all whom visit our site. Dowell is obligated the follow the Australian Government guidelines, assessing any exposure to the Covid-19 virus.
            </p>-->
            <p class="my-5 mx-4">Please complete take 5 safety checklist below.  </p> 

<!----------    main form  =========================          ----------->
<v-form ref="take5Form" :value="formValid">
    <v-container py-0>
<!-------- task details table======  ------->
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Task Details</v-toolbar-title>
    </v-toolbar>
<v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr><td>Client</td> <td>{{selectedsjc.CLIENT_NAME }}</td> </tr>
        <tr><td>Address</td> <td>{{selectedsjc.SITE_ADDRESS }}</td>  </tr>
        <tr><td>Date</td> <td>{{selectedsjc.DELIVERY_DATE }}</td>  </tr>
        <tr><td>Task</td> <td><v-text-field v-model="formc.DESCRIPTION" class="purple-input" label="Describe Task... "/> </td>  </tr>
      </tbody>
    </template>
  </v-simple-table>
  <!-------pre-task checks table  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Pre-Task Cheks</v-toolbar-title>
    </v-toolbar>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Please read the statements & tick the appropriate response <span class="star">*</span> </th>
          <th class="text-left">Yes</th> <th class="text-left">No</th>  <th class="text-left">NA</th>
        </tr>
      </thead>
      <tbody>
        <tr class="rowht">
          <td>Am I fit to do the task?</td>
          <td><v-radio-group :rules="prerad1Rules" v-model="prerad.rad1" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad1Rules" v-model="prerad.rad1" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad1Rules" v-model="prerad.rad1" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td class="pr-5">Do I clearly understand the task?</td>
          <td><v-radio-group :rules="prerad2Rules" v-model="prerad.rad2" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad2Rules" v-model="prerad.rad2" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad2Rules" v-model="prerad.rad2" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Am I authorised/ competent to do the task? </td>
          <td><v-radio-group :rules="prerad3Rules" v-model="prerad.rad3" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad3Rules" v-model="prerad.rad3" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad3Rules" v-model="prerad.rad3" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Do I have the correct PPE & tools for the task? </td>
          <td><v-radio-group :rules="prerad4Rules" v-model="prerad.rad4" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad4Rules" v-model="prerad.rad4" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad4Rules" v-model="prerad.rad4" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I done all pre-start checks on equipment </td>
          <td><v-radio-group :rules="prerad5Rules" v-model="prerad.rad5" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad5Rules" v-model="prerad.rad5" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad5Rules" v-model="prerad.rad5" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I identified, isolated & tagged out all energy sources </td>
          <td><v-radio-group :rules="prerad6Rules" v-model="prerad.rad6" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad6Rules" v-model="prerad.rad6" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad6Rules" v-model="prerad.rad6" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I done the required High Risk or Authority to Work Permits for the task? </td>
          <td><v-radio-group :rules="prerad7Rules" v-model="prerad.rad7" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad7Rules" v-model="prerad.rad7" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad7Rules" v-model="prerad.rad7" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I told others that may be affected by my work? </td>
          <td><v-radio-group :rules="prerad8Rules" v-model="prerad.rad8" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad8Rules" v-model="prerad.rad8" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
          <td><v-radio-group :rules="prerad8Rules" v-model="prerad.rad8" @change="inputChange()"><v-radio :value="2" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table> 
     <!-------hazards identification  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Hazard Identifcation</v-toolbar-title>
    </v-toolbar>
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
          <td>Have I used the check list to identify hazards</td>
          <td><v-radio-group v-model="hazrad.rad1" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="hazrad.rad1" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>Have I identified, risk ranked and managed the hazards in my work area </td>
          <td><v-radio-group v-model="hazrad.rad2" @change="inputChange()"><v-radio :value="true"  ></v-radio> </v-radio-group></td>
          <td><v-radio-group v-model="hazrad.rad2" @change="inputChange()"><v-radio :value="false" ></v-radio> </v-radio-group></td>
        </tr>

      </tbody>
    </template>
  </v-simple-table>
    <div class="aaa"></div>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">What is the highest residential risk identified (please select)  
            <span class="star">*</span> </th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
                <td>HIGH - STOP WORK AND SEE YOU MANAGER/ SUPERVISOR</td>
                <td><v-radio-group v-model="hazresrad.rad" @change="inputChange()"><v-radio :value="true" label="HIGH"   ></v-radio> </v-radio-group></td>
         </tr>
        <tr>    <td>MEDIUM - Prepare Risk Assessment/SWMS/JSEA – Must be controlled before work starts</td>
                <td><v-radio-group v-model="hazresrad.rad" @change="inputChange()"><v-radio :value="false" label="MEDIUM"   ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
                <td>LOW - Begin Task </td>
                <td><v-radio-group v-model="hazresrad.rad" @change="inputChange()"><v-radio :value="2" label="LOW"  ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

    <!-------hazards table  ----->
  <div class="aaa"></div>
    <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Hazards</v-toolbar-title>
    </v-toolbar>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr><th class="text-left">SNo</th>
        <th class="text-left">Hazards</th>
          <th class="text-left">Please select appropriate hazards <span class="star">*</span> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td> <td>Atmosphere</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz1.one" class="mx-2" label="Flammable" @change="inputChange()"></v-checkbox>
                    <v-checkbox v-model="haz1.two" class="mx-2" label="Contaminated" @change="inputChange()"></v-checkbox>
                    <v-checkbox v-model="haz1.three" class="mx-2" label="Dusty" @change="inputChange()"></v-checkbox>
                </v-row>
            </td>
          </tr>
        <tr>
          <td>2</td> <td>Chemical</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz2.one" class="mx-2" label="Reaction" @change="inputChange()"></v-checkbox>
                    <v-checkbox v-model="haz2.two" class="mx-2" label="Absorb/Ingest/Inhale" @change="inputChange()"></v-checkbox>
                    <v-checkbox v-model="haz2.three" class="mx-2" label="Spill" @change="inputChange()"></v-checkbox>
                    <v-checkbox v-model="haz2.four" class="mx-2" label="Burn" @change="inputChange()"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>3</td> <td>Electrical</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz3.one" class="mx-2" label="High Voltage"></v-checkbox>
                    <v-checkbox v-model="haz3.two" class="mx-2" label="Overhead"></v-checkbox>
                    <v-checkbox v-model="haz3.three" class="mx-2" label="Underground"></v-checkbox>
                    <v-checkbox v-model="haz3.four" class="mx-2" label="Leads"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>4</td> <td>Environment</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz4.one" class="mx-2" label="Wind"></v-checkbox>
                    <v-checkbox v-model="haz4.two" class="mx-2" label="Rain"></v-checkbox>
                    <v-checkbox v-model="haz4.three" class="mx-2" label="Hail/Snow"></v-checkbox>
                    <v-checkbox v-model="haz4.four" class="mx-2" label="Fog"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>5</td> <td>General</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz5.one" class="mx-2" label="Bites/Stings"></v-checkbox>
                    <v-checkbox v-model="haz5.two" class="mx-2" label="Sharp Edges"></v-checkbox>
                    <v-checkbox v-model="haz5.three" class="mx-2" label="Vibration"></v-checkbox>
                    <v-checkbox v-model="haz5.four" class="mx-2" label="Body of Water"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>6</td> <td>Gravity</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz6.one" class="mx-2" label="Slip/Trip"></v-checkbox>
                    <v-checkbox v-model="haz6.two" class="mx-2" label="Fall from height"></v-checkbox>
                    <v-checkbox v-model="haz6.three" class="mx-2" label="Falling Object"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>7</td> <td>Manual Handling</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz7.one" class="mx-2" label="Twisting/Grip"></v-checkbox>
                    <v-checkbox v-model="haz7.two" class="mx-2" label="Lifting/Lowering"></v-checkbox>
                    <v-checkbox v-model="haz7.three" class="mx-2" label="Pushing/Pulling"></v-checkbox>
                    <v-checkbox v-model="haz7.four" class="mx-2" label="Weight/Shape"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>8</td> <td>Light</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz8.one" class="mx-2" label="Too Dark"></v-checkbox>
                    <v-checkbox v-model="haz8.two" class="mx-2" label="Too Bright"></v-checkbox>
                    <v-checkbox v-model="haz8.three" class="mx-2" label="Poor Visibility"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>9</td> <td>Mechanics</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz9.one" class="mx-2" label="Struck by"></v-checkbox>
                    <v-checkbox v-model="haz9.two" class="mx-2" label="Strike Against"></v-checkbox>
                    <v-checkbox v-model="haz9.three" class="mx-2" label="Caught Between"></v-checkbox>
                    <v-checkbox v-model="haz9.four" class="mx-2" label="Caught in"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>10</td> <td>Noise</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz10.one" class="mx-2" label="Continous"></v-checkbox>
                    <v-checkbox v-model="haz10.two" class="mx-2" label="Intermittent"></v-checkbox>
                    <v-checkbox v-model="haz10.three" class="mx-2" label="Impact"></v-checkbox>
                    <v-checkbox v-model="haz10.four" class="mx-2" label="Environmental"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>11</td> <td>Pressure</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz11.one" class="mx-2" label="Air"></v-checkbox>
                    <v-checkbox v-model="haz11.two" class="mx-2" label="Fluid"></v-checkbox>
                    <v-checkbox v-model="haz11.three" class="mx-2" label="Gas"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>12</td> <td>Propulsion</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz12.one" class="mx-2" label="Flying object"></v-checkbox>
                    <v-checkbox v-model="haz12.two" class="mx-2" label="Ejected object"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>13</td> <td>Radiation</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz13.one" class="mx-2" label="UV"></v-checkbox>
                    <v-checkbox v-model="haz13.two" class="mx-2" label="Radioactive source"></v-checkbox>
                    <v-checkbox v-model="haz13.three" class="mx-2" label="Laser"></v-checkbox>
                    <v-checkbox v-model="haz13.four" class="mx-2" label="Infrared"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>14</td> <td>Thermal</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz14.one" class="mx-2" label="Hot environment"></v-checkbox>
                    <v-checkbox v-model="haz14.two" class="mx-2" label="Cold environment"></v-checkbox>
                    <v-checkbox v-model="haz14.three" class="mx-2" label="Cold surfaces"></v-checkbox>
                    <v-checkbox v-model="haz14.four" class="mx-2" label="Hot surfaces"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>15</td> <td>Traffic</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz15.one" class="mx-2" label="Pedestrians"></v-checkbox>
                    <v-checkbox v-model="haz15.two" class="mx-2" label="Vehicles"></v-checkbox>
                    <v-checkbox v-model="haz15.three" class="mx-2" label="Mobile plant"></v-checkbox>
                    <v-checkbox v-model="haz15.four" class="mx-2" label="Speeding"></v-checkbox>
                </v-row>
            </td>
        </tr>
        <tr>
          <td>16</td> <td>Other</td>
            <td> 
                <v-row justify="space-around">
                    <v-checkbox v-model="haz16.one" class="mx-2" label="Other"></v-checkbox>
                </v-row>
            </td>
        </tr>

       </tbody>
    </template>
  </v-simple-table> 

       <!-------hazards identification  ----->
    <div class="aaa"></div>
        <v-toolbar color="purple darken-2" dark dense>
          <v-toolbar-title>Residual Risk</v-toolbar-title>
    </v-toolbar>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">What is the highest residual risk (left over) risk after the controls are in place<span class="star">*</span> </th>
        <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HIGH - STOP WORK AND SEE YOU MANAGER/ SUPERVISOR</td>
          <td><v-radio-group v-model="resrad.rad" @change="inputChange()"><v-radio :value="true" label="HIGH" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>    
          <td>MEDIUM - Prepare Risk Assessment/SWMS/JSEA – Must be controlled before work starts</td>
          <td><v-radio-group v-model="resrad.rad" @change="inputChange()"><v-radio :value="false" label="MEDIUM" ></v-radio> </v-radio-group></td>
        </tr>
        <tr>
          <td>LOW - Begin Task </td>
          <td><v-radio-group v-model="resrad.rad" @change="inputChange()" ><v-radio :value="2" label="LOW" ></v-radio> </v-radio-group></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <!------- ------>
  <v-layout wrap mt-10>
               <!-- <v-flex xs12> <v-textarea class="purple-input" label="About Me"   value="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> </v-flex> -->
            <!--    <v-flex xs12 text-center >
                <v-btn rounded class="mx-0 mr-2 font-weight-light" color="success" @click="submit">Submit</v-btn>
                <v-btn rounded class="mx-0 mr-2 font-weight-light" color="primary" @click="resubmit">Re-Submit</v-btn>
                <v-btn rounded class="mx-0 font-weight-light" color="warning" @click="delete1">Delete</v-btn></v-flex>
               -->
                <v-flex xs12 text-center >
                  <v-btn v-if="resubmit==true" disabled rounded class="mx-0 mr-2 font-weight-light" color="success" @click="submit">Submit</v-btn>
                  <v-btn v-if="resubmit==true && user.admin =='1'" rounded class="mx-0 mr-2 font-weight-light" color="primary" @click="editsubmit">Re-Submit</v-btn>
                  <v-btn v-if="resubmit==true && user.admin =='1'" rounded class="mx-0 font-weight-light" color="warning" @click="delete1">Delete</v-btn>
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
    computed: 
      { 
        ...mapState({ selectedsjc: state => state.jobs.selectedsjc, 
                        gettk5: state => state.jobs.gettk5, 
                        user: state => state.auth.user,    
                    }),
        formc(){
             if(this.gettk5  && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO)
              {
                this.formd.DESCRIPTION=this.gettk5.DESCRIPTION;
                console.log('desc=',this.formd)
                return this.formd;
              }
              else{
                this.formd.DESCRIPTION='';
                console.log('desc=',this.formd.DESCRIPTION)
                return this.formd;
              }
        },
        prerad1Rules() { return [this.prerad.rad1 !=null || "Pls select one"  ]; },
        prerad2Rules() { return [this.prerad.rad2 !=null || "Pls select one"  ]; },
        prerad3Rules() { return [this.prerad.rad3 !=null || "Pls select one"  ]; },
        prerad4Rules() { return [this.prerad.rad4 !=null || "Pls select one"  ]; },
        prerad5Rules() { return [this.prerad.rad5 !=null || "Pls select one"  ]; },
        prerad6Rules() { return [this.prerad.rad6 !=null || "Pls select one"  ]; },
        prerad7Rules() { return [this.prerad.rad7 !=null || "Pls select one"  ]; },
        prerad8Rules() { return [this.prerad.rad8 !=null || "Pls select one"  ]; },
        hazradRules() { return [this.rad.rad2 !=null || "Pls select one"  ]; },
        resradRules() { return [this.rad.rad3 !=null || "Pls select one"  ]; },
        rad4Rules() { return [this.rad.rad4 !=null || "Pls select one"  ]; },
        rad5Rules() { return [this.rad.rad5 !=null || "Pls select one"  ]; },
        rad6Rules() { return [this.rad.rad6 !=null || "Pls select one"  ]; },
        rad7Rules() { return [this.rad.rad7 !=null || "Pls select one"  ]; },
        prerad()
        {
              if(this.gettk5  && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.prerad1!=null ) //form values present
                {  console.log('prerad present-this.gettk5',this.gettk5)
                  this.prerad2=JSON.parse(this.gettk5.prerad1); 
                  console.log('asembled prerad2=',this.prerad2)
                  this.formd.id=this.gettk5.id
                  this.resubmit=true;
                  return this.prerad2;
                }
                  else { 
                    console.log('first time- no save in db-rad not present-this.gettk5',this.gettk5)
                    this.prerad2.rad1=null;this.prerad2.rad2=null;this.prerad2.rad3=null;this.prerad2.rad4=null;
                    this.prerad2.rad5=null;
                    this.prerad2.rad6=null;this.prerad2.rad7=null;this.prerad2.rad8=null;
                    console.log('prerad not present-',this.prerad2)
                    this.resubmit=false;
                    return this.prerad2 
                }
        },
        resrad()
        { //console.log('resrad-',tis.resrad) 
          if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.resrad1!=null )
                { console.log('yes value-resrad-',this.gettk5.resrad1)
                  //this.resrad2.rad=JSON.parse(this.gettk5.resrad1); 
                  if(this.gettk5.resrad1==1)  this.resrad2.rad=true
                  else if  (this.gettk5.resrad1==0) this.resrad2.rad=false
                  else this.resrad2.rad=2
                    return this.resrad2
                  }
              else { console.log('no value-resrad-')
                    this.resrad2.rad=null;  
                    return this.resrad2 
                 }
        },
        hazresrad()
        { //console.log('resrad-',tis.resrad) 
          if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.hazresrad1!=null)
                { console.log('yes value-hazresrad-',this.gettk5.hazresrad1)
                  if(this.gettk5.hazresrad1==1)  this.hazresrad2.rad=true
                  else if  (this.gettk5.hazresrad1==0) this.hazresrad2.rad=false
                  else this.hazresrad2.rad=2
                  }
              else { console.log('no value-hazresrad-',this.hazresrad2)
                    this.hazresrad2.rad=null;  
                 }
                 return this.hazresrad2 
        },
        hazrad()
        { //console.log('resrad-',tis.resrad) 
          if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.hazrad1!=null )
                { console.log('yes value-hazrad-',this.gettk5.hazrad1)
                  this.hazrad2=JSON.parse(this.gettk5.hazrad1);
                   return this.hazrad2 
                  }
              else { console.log('no value-hazrad-')
                    this.hazrad2.rad1=null;  this.hazrad2.rad2=null; 
                    return this.hazrad2 
                 }
        },
        haz1(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz1db != "null" )
                 { console.log('yes value-haz1db-',this.gettk5.haz1db)
                  this.haz1d=JSON.parse(this.gettk5.haz1db);
                  }
              else {  console.log('no value-haz1db-')
                    this.haz1d.one=null;  this.haz1d.two=null; this.haz1d.three=null;
                  }
                  return this.haz1d 
              },
        haz2(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz2db != "null" )
                 { console.log('yes value-haz2db-',this.gettk5.haz2db)
                  this.haz2d=JSON.parse(this.gettk5.haz2db);
                  }
              else {  console.log('no value-haz2db-')
                    this.haz2d.one=null;  this.haz2d.two=null; this.haz2d.three=null;this.haz2d.four=null;
                  }
                  return this.haz2d 
              },
          haz3(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz3db != "null" )
                 { console.log('yes value-haz3db-',this.gettk5.haz3db)
                  this.haz3d=JSON.parse(this.gettk5.haz3db);
                  }
              else {  console.log('no value-haz3db-')
                    this.haz3d.one=null;  this.haz3d.two=null; this.haz3d.three=null;this.haz3d.four=null;
                  }
                  return this.haz3d 
              },
          haz4(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz4db != "null" )
                 { console.log('yes value-haz4db-',this.gettk5.haz4db)
                  this.haz4d=JSON.parse(this.gettk5.haz4db);
                  }
              else {  console.log('no value-haz4db-')
                    this.haz4d.one=null;  this.haz4d.two=null; this.haz4d.three=null;this.haz4d.four=null;
                  }
                  return this.haz4d 
              },
        haz5(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz5db != "null" )
                 { console.log('yes value-haz5db-',this.gettk5.haz5db)
                  this.haz5d=JSON.parse(this.gettk5.haz5db);
                  }
              else {  console.log('no value-haz5db-')
                    this.haz5d.one=null;  this.haz5d.two=null; this.haz5d.three=null;this.haz5d.four=null;
                  }
                  return this.haz5d 
              },
        haz6(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz6db != "null" )
                 { console.log('yes value-haz6db-',this.gettk5.haz6db)
                  this.haz6d=JSON.parse(this.gettk5.haz6db);
                  }
              else {  console.log('no value-haz6db-')
                    this.haz6d.one=null;  this.haz6d.two=null; this.haz6d.three=null;this.haz6d.four=null;
                  }
                  return this.haz6d 
              },
          haz7(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz7db != "null" )
                 { console.log('yes value-haz7db-',this.gettk5.haz7db)
                  this.haz7d=JSON.parse(this.gettk5.haz7db);
                  }
              else {  console.log('no value-haz7db-')
                    this.haz7d.one=null;  this.haz7d.two=null; this.haz7d.three=null;this.haz7d.four=null;
                  }
                  return this.haz7d 
              },
          haz8(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz8db != "null" )
                 { console.log('yes value-haz8db-',this.gettk5.haz8db)
                  this.haz8d=JSON.parse(this.gettk5.haz8db);
                  }
              else {  console.log('no value-haz8db-')
                    this.haz8d.one=null;  this.haz8d.two=null; this.haz8d.three=null;this.haz8d.four=null;
                  }
                  return this.haz8d 
              },
          haz9(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz9db != "null" )
                 { console.log('yes value-haz9db-',this.gettk5.haz9db)
                  this.haz9d=JSON.parse(this.gettk5.haz9db);
                  }
              else {  console.log('no value-haz9db-')
                    this.haz9d.one=null;  this.haz9d.two=null; this.haz9d.three=null;this.haz9d.four=null;
                  }
                  return this.haz9d 
              },
            haz10(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz10db != "null" )
                 { console.log('yes value-haz10db-',this.gettk5.haz10db) //varchar- null ="null", bool null=null
                  this.haz10d=JSON.parse(this.gettk5.haz10db);
                  }
              else {  console.log('no value-haz10db-')
                    this.haz10d.one=null;  this.haz10d.two=null; this.haz10d.three=null;this.haz10d.four=null;
                  }
                  return this.haz10d 
              },
            haz11(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz11db != "null" )
                 { console.log('yes value-haz10db-',this.gettk5.haz11db) //varchar- null ="null", bool null=null
                  this.haz11d=JSON.parse(this.gettk5.haz11db);
                  }
              else {  console.log('no value-haz11db-')
                    this.haz11d.one=null;  this.haz11d.two=null; this.haz11d.three=null;this.haz11d.four=null;
                  }
                  return this.haz11d 
              },
            haz12(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz12db != "null" )
                 { console.log('yes value-haz12db-',this.gettk5.haz12db) //varchar- null ="null", bool null=null
                  this.haz12d=JSON.parse(this.gettk5.haz12db);
                  }
              else {  console.log('no value-haz12db-')
                    this.haz12d.one=null;  this.haz12d.two=null; 
                  }
                  return this.haz12d 
              },
            haz13(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz13db != "null" )
                 { console.log('yes value-haz13db-',this.gettk5.haz13db) //varchar- null ="null", bool null=null
                  this.haz13d=JSON.parse(this.gettk5.haz13db);
                  }
              else {  console.log('no value-haz13db-')
                    this.haz13d.one=null;  this.haz13d.two=null; this.haz13d.three=null;this.haz13d.four=null;
                  }
                  return this.haz13d 
              },
            haz14(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz14db != "null" )
                 { console.log('yes value-haz14db-',this.gettk5.haz14db) //varchar- null ="null", bool null=null
                  this.haz14d=JSON.parse(this.gettk5.haz14db);
                  }
              else {  console.log('no value-haz14db-')
                    this.haz14d.one=null;  this.haz14d.two=null; this.haz14d.three=null;this.haz14d.four=null;
                  }
                  return this.haz14d 
              },
            haz15(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz15db != "null" )
                 { console.log('yes value-haz15db-',this.gettk5.haz15db) //varchar- null ="null", bool null=null
                  this.haz15d=JSON.parse(this.gettk5.haz15db);
                  }
              else {  console.log('no value-haz10db-')
                    this.haz15d.one=null;  this.haz15d.two=null; this.haz15d.three=null;this.haz15d.four=null;
                  }
                  return this.haz15d 
              },
             haz16(){  if(this.gettk5 && this.gettk5.SJC_NO==this.selectedsjc.SJC_NO && this.gettk5.haz16db != "null" )
                 { console.log('yes value-haz16db-',this.gettk5.haz16db) //varchar- null ="null", bool null=null
                  this.haz16d=JSON.parse(this.gettk5.haz16db);
                  }
              else {  console.log('no value-haz16db-')
                    this.haz16d.one=null; 
                  }
                  return this.haz16d 
              },

      },
    data () {
      return {
          formValid:false,resubmit:false,
          prerad2:{rad1:null,rad2:null,rad3:null,rad4:null,rad5:null,rad6:null,rad7:null, rad8:null},
          hazrad2:{rad1:null,rad2:null},
          hazresrad2:{rad:null},
          resrad2:{rad:null},
          haz1d:{one:null,two:null,three:null},
          haz2d:{one:null,two:null,three:null,four:null},
          haz3d:{one:null,two:null,three:null,four:null},
          haz4d:{one:null,two:null,three:null,four:null},
          haz5d:{one:null,two:null,three:null,four:null},
          haz6d:{one:null,two:null,three:null,four:null},
          haz7d:{one:null,two:null,three:null,four:null},
          haz8d:{one:null,two:null,three:null,four:null},
          haz9d:{one:null,two:null,three:null,four:null},
          haz10d:{one:null,two:null,three:null,four:null},
          haz11d:{one:null,two:null,three:null,four:null},
          haz12d:{one:null,two:null},
          haz13d:{one:null,two:null,three:null,four:null},
          haz14d:{one:null,two:null,three:null,four:null},
          haz15d:{one:null,two:null,three:null,four:null},
          haz16d:{one:null},

          formd:{FNAME:'',LNAME:'',CNAME:'',PHONE:'',POST_CODE:'',ADDRESS:'',rad:'',id:'',DESCRIPTION:null,},
                 
        }
    },
    methods: {
        inputChange(){ console.log('this.haz2=',this.haz2);
           // console.log('this.prerad=',this.prerad);
           //  console.log('this.resrad=',this.resrad);
           //  console.log('this.hazresrad=',this.hazresrad);
           // this.one.yes = !this.one.no
           // this.one.no = !this.one.yes
            //console.log(this.one)
        },
        submit(event)
        { console.log({event,$form:this.$refs.take5Form})
          if(this.$refs.take5Form.validate())
            { this.formd.sjcid=this.selectedsjc.id
              this.formd.V6_ORDER_NO=this.selectedsjc.V6_ORDER_NO
              this.formd.SJC_NO=this.selectedsjc.SJC_NO
              //this.formd.DESCRIPTION=this.desc;
              this.formd.prerad1=this.prerad;
              this.formd.resrad1=this.resrad.rad;
              this.formd.hazresrad1=this.hazresrad.rad;
              this.formd.hazrad1=this.hazrad;

              this.formd.haz1f=this.haz1;
              this.formd.haz2f=this.haz2;
              this.formd.haz3f=this.haz3;
              this.formd.haz4f=this.haz4;
              this.formd.haz5f=this.haz5;
              this.formd.haz6f=this.haz6;
              this.formd.haz7f=this.haz7;
              this.formd.haz8f=this.haz8;
              this.formd.haz9f=this.haz9;
              this.formd.haz10f=this.haz10;
              this.formd.haz11f=this.haz11;
              this.formd.haz12f=this.haz12;
              this.formd.haz13f=this.haz13;
              this.formd.haz14f=this.haz14;
              this.formd.haz15f=this.haz15;
              this.formd.haz16f=this.haz16;
              console.log('submit---this.formd',this.formd)
              this.$store.dispatch('addtk5', this.formd) 
            }
        },
    editsubmit(){
      if(this.$refs.take5Form.validate())
            { //console.log('edit-this.rad',this.rad)
              this.formd.sjcid=this.selectedsjc.id
              this.formd.V6_ORDER_NO=this.selectedsjc.V6_ORDER_NO
              this.formd.SJC_NO=this.selectedsjc.SJC_NO
              //this.formd.DESCRIPTION=this.formc.DESCRIPTION;
              this.formd.prerad1=this.prerad;
              this.formd.hazrad1=this.hazrad;
              this.formd.resrad1=this.resrad.rad;
              this.formd.hazresrad1=this.hazresrad.rad;

              this.formd.haz1f=this.haz1;
              this.formd.haz2f=this.haz2;
              this.formd.haz3f=this.haz3;
              this.formd.haz4f=this.haz4;
              this.formd.haz5f=this.haz5;
              this.formd.haz6f=this.haz6;
              this.formd.haz7f=this.haz7;
              this.formd.haz8f=this.haz8;
              this.formd.haz9f=this.haz9;
              this.formd.haz10f=this.haz10;
              this.formd.haz11f=this.haz11;
              this.formd.haz12f=this.haz12;
              this.formd.haz13f=this.haz13;
              this.formd.haz14f=this.haz14;
              this.formd.haz15f=this.haz15;
              this.formd.haz16f=this.haz16;
              console.log('edit-this.formc',this.formc)
              console.log('edit-this.formd',this.formd)
              this.$store.dispatch('edittk5', this.formd) 
            }
    },
    delete1(){
      this.$refs.loginForm.reset()
    }
    }
 
 
}
</script>
<style scoped>
.star{
    color:red
}
.aaa{
    padding-bottom:10px;
}
.my-toolbar {
        height: 40px !important;
    }
   table.cell-height tbody td, table tbody th {
        margin-top: -5%;
    } 
table.v-table tbody tr td, table.v-table tbody tr {
    height: 10px !important;
}
.rowht{
    height: 10px !important;
}
table.v-table thead tr {height: 10px !important; }

</style>
