import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UserList from '../components/User/UserList/UserList.vue'
import wholesaleruser from '../components/User/Wholesaler/UserList.vue'
import buyeruser from '../components/User/Buyer/UserList.vue'

import Jobs from '../components/Jobs/Jobs.vue'
import Order from '../components/Jobs/Order.vue'
import Pricelist from '../components/pricelist/price.vue'
import WorkOrders from '../components/workorders/wo.vue'
import womaterial from '../components/workorders/womaterial.vue'
import womaterialdetails from '../components/workorders/onematerial.vue'

import wodetails from '../components/workorders/onewo.vue'
import erpusers from '../components/erpusers/erpusers.vue'
import purchaseorders from '../components/purchaseorders/po.vue'
import poschedules from '../components/poschedules/po.vue'
import accounts from '../components/accounts/accounts.vue'
import workareas from '../components/workareas/wareas.vue'
import workcenters from '../components/workcenters/wcenters.vue'
import presources from '../components/productionresources/presources.vue'
import stndoprn from '../components/stndoprn/stndoprn.vue'
import wodispatchlist from '../components/wodispatchlist/wodispatch.vue'

import Jobtype from '../components/Jobtype/Jobtype.vue'
import status from '@/components/status/status.vue'
import flags from '@/components/flags/flags.vue'
import covid19 from '@/components/c19/c19.vue'
import take5 from '@/components/t5/t5.vue'
import picupload from '@/components/img/img.vue'
import pdfupload from '@/components/pdf/pdf.vue'
import Middlewares from "../middlewares/";

Vue.use(VueRouter)
const routes = [
  {path:'/index.html',name:'home',component: Home, alias:'/',meta: {middleware: [Middlewares.auth]},
    redirect: '/dashboard' } , 
  {path:'/login',name:'login',component: Login,meta: {middleware: [Middlewares.guest]}  } ,
  {path:'/dashboard',name:'dashboard',component: Dashboard,meta: {middleware: [Middlewares.auth]}  },
  {path:'/userlist',name:'userlist',component: UserList,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wholesalerusers',name:'wholesaleruser',component: wholesaleruser,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/buyerusers',name:'buyeruser',component: buyeruser,meta: {middleware: [Middlewares.auth]}  } ,

  {path:'/orderlist',name:'orderlist',component: Jobs,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/order',name:'order',component: Order,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/pricelists',name:'pricelists',component: Pricelist,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/workorders',name:'workorders',component: WorkOrders,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/womaterial',name:'womaterial',component: womaterial,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wodetails',name:'wodetails',component: wodetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/womaterialdetails',name:'womaterialdetails',component: womaterialdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/erpusers',name:'erpusers',component: erpusers,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/purchaseorders',name:'purchaseorders',component: purchaseorders,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/poschedules',name:'poschedules',component: poschedules,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/accounts',name:'accounts',component: accounts,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/workareas',name:'workareas',component: workareas,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/productionresources',name:'presources',component: presources,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/standardoperations',name:'stndoprn',component: stndoprn,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wodispatchlist',name:'wodispatchlist',component: wodispatchlist,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/workcenters',name:'workcenters',component: workcenters,meta: {middleware: [Middlewares.auth]}  } ,
  //{path:'/jobtype',name:'jobtype',component: Jobtype,meta: {middleware: [Middlewares.auth]}  } ,
  //{path:'/status',name:'status',component: status,meta: {middleware: [Middlewares.auth]}  } ,
  //{path:'/flags',name:'flags',component: flags,meta: {middleware: [Middlewares.auth]}  } , 
  //{path:'/covid19',name:'covid19',component: covid19,meta: {middleware: [Middlewares.auth]}  } , 
  //{path:'/take5',name:'take5',component: take5 ,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/picupload',name:'picupload',component: picupload ,meta: {middleware: [Middlewares.auth]}  } , 
  {path:'/pdfupload',name:'pdfupload',component: pdfupload ,meta: {middleware: [Middlewares.auth]}  } ,   
]
const router = new VueRouter({
  mode: 'history', base: process.env.BASE_URL, routes
})


function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;
  return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);
      nextMiddleware({...context, next: nextMidd});
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {//if meta tag exist on route do this else return next
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
      const ctx = { from,next,router,to};
      const nextMiddleware = nextCheck(ctx, middleware, 1);
      return middleware[0]({...ctx, next: nextMiddleware});
  }
  return next();
});
export default router
