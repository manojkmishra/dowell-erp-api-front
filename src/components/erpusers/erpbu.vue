<template>
    <div class="mt-3">
        <erpuserlist ></erpuserlist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import erpuserlist from './erpbulist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'erpuserlist': erpuserlist, },
        created(){ 
           
           console.log('hehe')
        }
    }

</script>
<style>

</style>