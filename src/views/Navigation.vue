<template>
    <nav >
        <v-app-bar flat app dense ><!--toolbar  -->
            <div v-if="authenticated && user">
                <v-app-bar-nav-icon class="grey--text" @click="drwr = !drwr"></v-app-bar-nav-icon>
            </div>
            <!--  <router-link class="logoimg" to="/"> -->
            <img src="../assets/img/dowell.png" class="logoimg" alt="Dowell Windows and Doors">
            <!--  </router-link> -->
            <v-toolbar-title class="transparent"> 
                <span >ERP</span><span class="font-weight-light"> APIs</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="authenticated">
                <v-btn text color="grey" @click.prevent="signOut"> Sign Out
                <v-icon >mdi-logout-variant</v-icon>  </v-btn>
            </div>
        </v-app-bar><!-- toolbar finish --drawer start-->
     <div v-if="authenticated">
            <div snackbar="true" > </div>
            <v-navigation-drawer v-model="drwr" app dark  
              id="sidebar">
               <v-layout column align-center>
                    <v-flex class="mt-5" >
                         <v-avatar size="120" class=""><img src="@/assets/img/user.png"></v-avatar>
                         <p class="subheading mt-1" style="text-align: center; color:white;"
                         >{{user.name}}</p>
                         <p class="subheading mt-1" style="text-align: center; color:white;"
                         >{{usertype}}</p>
                    </v-flex> <!--popup to add projects below -->
               </v-layout>            
      <!---multi leve finish ---------->
    <v-list dense >
  
     <!--- -->
       <template v-for="(item, index) in items">
		      <template v-if="item.hasMulSub">
			       <v-list-group :value="false" :prepend-icon="item.action"  :key="index"  no-action
              color="white" >
                <template v-slot:activator >
                  <v-list-item-content  >
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>             

              <v-list-item v-for="subItem in item.items" :key="subItem.title"
               router-link :to="subItem.route" color="white"> 
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title" ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          
          </v-list-group>
          </template>
		     <template v-else>
          <v-list-item  router-link :to="item.route" :key="index" no-action color="white">
            <v-list-item-action><v-icon>{{item.action}}</v-icon></v-list-item-action>
            <v-list-item-content> <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
	    </template>
       <!---- -->          
    </v-list>
           </v-navigation-drawer>
      </div>
    </nav>
 </template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  created(){
//this.$store.dispatch('getuserjobs')
  },
    data(){return{ drwr:false, 
     
      items: [
          { action: 'mdi-view-dashboard', title: 'Dashboard', route:'/',hasMulSub: false },
          // { action: 'mdi-account', title: 'User Profile',route:'/user', hasMulSub: false },
          // { action:'mdi-brightness-7', title: 'Settings',hasMulSub: true,items: [
           // { title: 'Profile', route:'/profile' },
            //  { title: 'Users', route:'/userlist' },
            //  { title: 'Wholesalers', route:'/wholesalerusers' },
            //  { title: 'Buyers', route:'/buyerusers' },
            //  { title: 'Bin Type', route:'/bintype' },
             //  { title: 'User Rights', route:'/userrights' },

           //  ],
          //},
          { action: 'mdi-api', title: 'APIs',hasMulSub: true,items: [
              { title: 'salesOrdersForOrderHub', route:'/orderlist' },
              // { title: 'User Jobs', route:'/sawbars' },
             //  { title: 'Job Type', route:'/jobtype' },
             //  { title: 'Status', route:'/status' },
             //  { title: 'Flags', route:'/flags' },
             ],
          },
          /*  { action: 'mdi-chart-bar', title: 'Charts',hasMulSub: true, items: [ { title: 'Bayswater', route:'test' }, ], },
         { action: 'mdi-folder', title: 'NSW',hasMulSub: true,items: [
              { title: 'Smithfield' },
              { title: 'Nowra' },
              { title: 'Beresfield' },
            ],
          },
          { action: 'mdi-folder', title: 'SA', hasMulSub: true,items: [ { title: 'Elizabeth', route:'eli' }, ], },
          { action: 'mdi-folder', title: 'VIC', hasMulSub: true,items: [{ title: 'Bayswater' },], },
          */
          
        ],
     
         } //return complete
    },
    computed:{
        ...mapGetters({authenticated:'auth/authenticated',
                       user:'auth/user'
                      }),
                      usertype(){
                        if(this.user.admin==1){
                          return "Admin User";
                        }
                        else{ return "Take5 User"}
                      }
    },
    methods:{
        ...mapActions({signOut1:'auth/signOut'}),
        signOut(){
            this.signOut1().then(()=>{
                this.$router.replace({name:'login'})
            })
        }
    },
    
}
</script>
<style scoped>
.logoimg{
padding-right:10px;

}
  #sidebar{
    background-color:#0747A6 !important;
  }
</style>