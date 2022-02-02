<template>
 <v-app class="grey lighten-4">
    <TheNavigation/>
    <v-content class="mx-4 mb-4"><router-view/> </v-content>
 </v-app>
</template>

<script>
import TheNavigation from '@/views/Navigation'
export default {
  components:{TheNavigation}
}
</script>
<style lang="scss">

</style>