<template>

     <v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <!--<v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon id="return-btn" ml-2>mdi-keyboard-backspace</v-icon>RETURN
         </v-btn> -->
          <v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon  mr-3>mdi-keyboard-backspace</v-icon>RETURN
        </v-btn>
       </v-flex>
    <v-flex xs12 pt-0>
           <test-list-view :data2='data1'></test-list-view> 
    </v-flex>
  </v-layout>
     </v-container>
</template>
<script>
 import TestListView from './onewolist.vue'
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  // props: ['data1'],
   components: { 'test-list-view': TestListView,  },
props: ['data1'],
created(){
console.log('wodetails created',this.data1)
},
   methods:{
       backToJob(){
               // this.$store.dispatch('clearorder')
                //.then((response) => { console.log('going back')
                  this.$router.push({name: 'workorders'});
                 // this.$store.commit({type:types.GET_FLAGGED_JOB ,  flaggedjob: ""} ); 
                                   // })
       }
   },
   watch: {
        data(newVal, oldVal) {
          // watch it
          console.log("Prop changed: ", newVal, " | was: ", oldVal);
        },
      },
}
</script>
