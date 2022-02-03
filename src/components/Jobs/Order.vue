<template>
 <v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <!--<v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon id="return-btn" ml-2>mdi-keyboard-backspace</v-icon>RETURN
         </v-btn> -->
          <v-btn  text  color="grey" @click="backToJob">
            <v-icon  mr-3>mdi-keyboard-backspace</v-icon>RETURN
        </v-btn>
       </v-flex>
    <v-flex xs12 pt-0>
         <test-list-view ></test-list-view>
    </v-flex>
  </v-layout>
 </v-container>
    
</template>
<script>
 import TestListView from './ord.vue'
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  // props: ['data1'],
   components: { 
        'test-list-view': TestListView,  },
   computed:{
  ...mapState({
            order: state => state.jobs.getorder,
          
        }),
        hehe(){
            console.log('this.order-',this.order)
        }
   },
   methods:{
       backToJob(){
                this.$store.dispatch('clearorder')
                .then((response) => { 

                  this.$router.push({name: 'dashboard'});
                 // this.$store.commit({type:types.GET_FLAGGED_JOB ,  flaggedjob: ""} ); 
                                    })
       }
   }
  
 
}
</script>
