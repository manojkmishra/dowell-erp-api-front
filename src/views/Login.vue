<template>
  <v-container fill-height fluid >
    <v-row  align="center" justify="center">
      <v-col cols="12" sm="8" md="4" class="text-center">
        <h1 style="color: #5d7498;"> Login</h1> 
        <v-form ref="loginForm" :value="formValid">
                  <v-text-field label="Email" name="email" prepend-icon="mdi-email" :rules="emailRules" type="email" v-model="user.email"/>
                  <v-text-field id="password" label="Password" prepend-icon="mdi-lock" :rules="passwordRules" name="password" type="password" v-model="user.password"/>
        </v-form>
        <v-spacer />
        <v-btn color="primary" :loading="loading" large rounded @click="loginUser" >Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import axios from 'axios';

import {mapActions} from 'vuex';
export default 
{ components: { },
  data(){return {formValid:false, user:{email:'',password:''}, loading:false,
                  emailRules: [ v => !!v || 'The Email is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
                  passwordRules: [ v => !!v || 'The Password is required' ],
                }},
  methods: { 
        ...mapActions({signIn:'auth/signIn'}),
          loginUser(event)
                {console.log({event,$form:this.$refs.loginForm})
                    if(this.$refs.loginForm.validate())
                    { this.loading=true; 
                      console.log('validated');   
                    console.log('user=',this.user)
                      // this.$store.dispatch('user/loginUser',this.user)
                        this.signIn(this.user).then(()=>
                        { this.loading=false;
                          console.log('authenticated- forwarding to dashboard')
                          this.$router.replace({name:'dashboard'})
                          swal.fire({
                position: 'bottom-right',
                title:'<span style="color:white">Login Success!!</span>',
                  timer: 2000,toast: true, background: 'purple', color:'white'
                // customClass: 'swal2-popup',
                 });
                        }).catch(()=>{
                          swal.fire({
                position: 'bottom-right',
                title:'<span style="color:white">Login Failed!!</span>',
                  timer: 3000, toast: true, background: 'purple', color:'white'
                 });
                              this.loading=false;
                        })
                    }
                }    
    }
}
</script>
<style scoped>
    .frame {
      max-width: 520px;
      margin: auto;
    }
</style>
