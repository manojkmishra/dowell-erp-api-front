<template>
    <div>
        

<div>
  <tree-view :data="order" :options="{maxDepth: 3}"></tree-view>
</div>



 <!-- <v-treeview :items="order"></v-treeview>
        <pre>{{ JSON.stringify(order, null, 2) }}</pre> -->
    </div>
</template>
<script>

import { mapGetters, mapState, mapActions} from 'vuex';
export default {
  // props: ['data1'],

   computed:{
  ...mapState({
            order: state => state.jobs.getorder.data,
          
        }),
        hehe(){
            console.log('this.order-',this.order)
            //return Object.entries(this.order);
            var myData = Object.keys(this.order).map(key => {
    return this.order[key];
})
return myData;
        }
   },
  
  
  
 
}
</script>
<style scoped>
.tree-view-item-key {
    color: red;
}
</style>
