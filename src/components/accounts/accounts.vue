<template>
    <div class="mt-3">
        <polist :loading="loading"></polist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import polist from './accountlist.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'polist': polist, },
        created(){ this.loading=true;
           /*  this.$store.dispatch('getjobs')
                    .then((res) => { //this.loading=false;
                                console.log('getjobs response',res.data)  
                                this.aa=res.data;
                                this.loading=false;
                        })
                        */
        }
    }

</script>
<style>

</style>