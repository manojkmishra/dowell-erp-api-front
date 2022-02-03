<template>
<div>
<v-simple-table dense>
     <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>Order</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>{{order.OrderNumber}} </v-toolbar-title>
          <v-spacer/>
         <v-btn  id="btn-cutselected" small  color="blue darken-4" rounded dark   @click.prevent="edit">Save</v-btn>
        </v-toolbar>
         </template>   
      

<div>
  <tree-view  :data="order" :options="{maxDepth: 3 ,modifiable: true,rootObjectKey:'data'}" @change-data="onChangeData"></tree-view>
</div>
   </v-simple-table> 
</div>


 <!-- <v-treeview :items="order"></v-treeview>
        <pre>{{ JSON.stringify(order, null, 2) }}</pre> -->
   
</template>
<script>

import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  // props: ['data1'],
data(){return{loading:'',changedobj:{}}},
   computed:{
  ...mapState({
            order: state => state.jobs.getorder.data,
        }),
   },
   methods: {
    onChangeData: function(data) {
        console.log(data)
        this.changedobj=data;
     
    },
    edit(){
console.log('edit-changedobj=',this.changedobj)
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
