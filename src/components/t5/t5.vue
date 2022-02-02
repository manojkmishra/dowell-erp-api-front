<template>
<v-container grid-list-lg pa-0 mt-2>
    <v-layout wrap>
       <v-flex xs12>
         <v-btn  text  color="grey" @click="$router.go(-1)">
            <v-icon id="return-btn">mdi-keyboard-backspace</v-icon>RETURN TO JOBS
         </v-btn> 
       </v-flex>
    <v-flex xs12 pt-0>
         <take5 ></take5>
    </v-flex>
  </v-layout>
 </v-container>
</template>
<script>
 import Vue from 'vue';
    import take5 from './take5.vue'
    export default 
    {   
        components: { 'take5': take5, },
    }

</script>
<style>

</style>