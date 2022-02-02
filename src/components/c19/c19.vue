<template>
<v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOBS
         </v-btn> 
       </v-flex>
    <v-flex xs12 pt-0>
         <covid19 ></covid19>
    </v-flex>
  </v-layout>
 </v-container>
</template>
<script>
 import Vue from 'vue';
    import covid19 from './covid19.vue'
    export default 
    {   
        components: { 'covid19': covid19, },
    }

</script>
<style>

</style>