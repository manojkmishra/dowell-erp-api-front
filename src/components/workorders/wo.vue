<template>
    <div class="mt-3">
        <pricelist ></pricelist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import PriceList from './WOList.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'pricelist': PriceList, },
        created(){ 
           
           console.log('hehe')
        }
    }

</script>
<style>

</style>