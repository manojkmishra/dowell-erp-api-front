<template>
    <div class="mt-3">
        <joblist v-bind:bb="aa" :loading="loading"></joblist> 
            
    </div>
</template>
<script>
 import Vue from 'vue';
    import { mapGetters, mapState, mapActions} from 'vuex'
    import JobList from './JobList.vue'
    export default 
    {   data(){return{aa:[], loading:false}},
        components: { 'joblist': JobList, },
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