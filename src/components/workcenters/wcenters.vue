<template>
    <div class="mt-3">
        <warealist ></warealist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import warealist from './wcenterslist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'warealist': warealist, },
        created(){ 

            console.log('hehe')
        }
    }

</script>
<style>

</style>