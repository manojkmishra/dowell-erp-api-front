<template>
<div class="mt-3">
       
         <!--<v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon id="return-btn" ml-2>mdi-keyboard-backspace</v-icon>RETURN
         </v-btn> -->
          <v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon  mr-3>mdi-keyboard-backspace</v-icon>RETURN
        </v-btn>
       
    
         <test-list-view ></test-list-view>
   
</div>
    
</template>
<script>
 import TestListView from './wooperationlist.vue'
import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  // props: ['data1'],
   components: { 
        'test-list-view': TestListView,  },

   methods:{
       backToJob(){
               // this.$store.dispatch('clearorder')
                //.then((response) => { console.log('going back')
                  this.$router.push({name: 'workorders'});
                 // this.$store.commit({type:types.GET_FLAGGED_JOB ,  flaggedjob: ""} ); 
                                   // })
       }
   }
  
 
}
</script>
