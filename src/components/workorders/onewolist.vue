<template>
<div>
<v-simple-table dense>
     <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>Work Order ItemNumber</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>{{data2.ItemNumber}} </v-toolbar-title>
          <v-spacer/>
         <v-btn  id="btn-cutselected" small disabled color="blue darken-4" rounded dark   @click.prevent="edit">Save</v-btn>
        </v-toolbar>
         </template>   
      

<div>
  <tree-view  :data="data2" :options="{maxDepth: 3 ,modifiable: true,rootObjectKey:'data'}" @change-data="onChangeData"></tree-view>
</div>
   </v-simple-table> 
</div>


 <!-- <v-treeview :items="order"></v-treeview>
        <pre>{{ JSON.stringify(order, null, 2) }}</pre> -->
   
</template>
<script>

import { mapGetters, mapState, mapActions} from 'vuex';
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
import axios from "axios";
export default {
  props: ['data2'],
data(){return{loading:'',changedobj:{} }},
   computed:{
  ...mapState({
           // order: state => state.jobs.getorder.data,
        }),
   },
   methods: {
    onChangeData: function(data) {
        console.log(data)
        this.changedobj=data;
     
    },
    //----------------------------------edit order-------
    edit(){
console.log('edit-changedobj=',this.changedobj)
//console.log('diff',diff(this.order, this.changedobj));

    let difference=diff(this.order, this.changedobj);
//console.log('diff=',difference,'key',Object.keys(difference))
if(Object.keys(difference)=="Comments")
    {  console.log('comments changed')  
        /*axios.post(`/take5/editorder`,{params:{'orderkey':this.changedobj}})
          .then((res) => { console.log('one order response',res)  
                                     
                          })
            .catch(err=>{ console.log('one order-err=', err) ;  }) */

            this.$store.dispatch('editjobs', this.changedobj) 
                        .then((response) => { 
                           //this.$store.dispatch('getjobs')
                           //.then((res) => { this.sawflags=res.data; })
                           console.log('editjobs-res=',response)
                        }) 
    }
    else{
        if((this.order.Comments !=this.changedobj.Comments) && Object.keys(this.changedobj).length === 0){
                console.log('nothing changed')
                swal.fire({
                position: 'top-right',
                title:'<span style="color:white">Nothing changed</span>',
                  timer: 5000, toast: true, background: 'red', color:'white'
                 });

        }
        else{
         swal.fire({
                position: 'top-right',
                title:'<span style="color:white">At present only Comments can be edited</span>',
                  timer: 5000, toast: true, background: 'red', color:'white'
                 });
                 }
                              
    }
    }//edit
   }//methods
}//export default


</script>
<style lang="scss" scoped>
.tree-view-wrapper::v-deep .tree-view-item-key{
    color:rgb(10, 113, 248) !important;
}

.tree-view-wrapper::v-deep .tree-view-item-value {
    //background-color: burlywood;
}

</style>
