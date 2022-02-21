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
           <v-simple-table dense>
     <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>One Operation Resource</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>{{data1.ResourceName}} </v-toolbar-title>
          <v-spacer/>
         <v-btn  id="btn-cutselected" small disabled color="blue darken-4" rounded dark   >Save</v-btn>
        </v-toolbar>
         </template>   
      

<div>
  <tree-view  :data="data1" :options="{maxDepth: 3 ,modifiable: true,rootObjectKey:'data'}" ></tree-view>
</div>
   </v-simple-table> 
    </v-flex>
  </v-layout>
     </v-container>
</template>
<script>

export default {

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
   
}
</script>
<style lang="scss" scoped>
.tree-view-wrapper::v-deep .tree-view-item-key{
    color:rgb(10, 113, 248) !important;
}

.tree-view-wrapper::v-deep .tree-view-item-value {
    //background-color: burlywood;
}

</style>