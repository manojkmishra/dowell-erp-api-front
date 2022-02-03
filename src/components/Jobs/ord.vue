<template>
<div>
<v-simple-table dense>
     <template v-slot:top>
        <v-toolbar  color="light-blue darken-3" dark dense>
          <v-toolbar-title>Order</v-toolbar-title>
          <v-divider class="mx-4" inset vertical ></v-divider>
          <v-toolbar-title>{{order.OrderNumber}} </v-toolbar-title>
        
        </v-toolbar>
         </template>   
      

<div>
  <tree-view :data="order" :options="{maxDepth: 3}"></tree-view>
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

   computed:{
  ...mapState({
            order: state => state.jobs.getorder.data,
        }),
   },
}
</script>
<style scoped>
.tree-view-item-key {
    color: red;
}
</style>
