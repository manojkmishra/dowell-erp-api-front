<template>
  <div>

    <dashboard1></dashboard1>
         <!--   Dashboard
             <template v-if="authenticated">
                <li> User={{user.name}} email={{user.email}}</li>
                <li> <router-link :to="{name:'dashboard'}">Dashboard</router-link> </li>
            </template>  -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dashboard1 from '@/components/dashboard/dashboard1.vue'

export default {
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                      user:'auth/user'
                      })
    },
    components: { 'dashboard1': dashboard1, },
     created(){ // this.$store.dispatch('getjobs');
               // this.$store.dispatch('getuserjobs')
                this.$store.dispatch('getuserlist')
                this.$store.dispatch('getjobtypes')
                
                },
    mounted(){
//this.$store.dispatch('getuserjobs')
    }

}
</script>
