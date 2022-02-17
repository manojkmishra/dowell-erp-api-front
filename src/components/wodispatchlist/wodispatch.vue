<template>
    <div class="mt-3">
        <presourcelist ></presourcelist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import presourcelist from './wodispatchlist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'presourcelist': presourcelist, },
        created(){ 

            console.log('hehe')
        }
    }

</script>
<style>

</style>