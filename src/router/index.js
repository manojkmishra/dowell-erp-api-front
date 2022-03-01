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
import orderlines from '../components/Jobs/orderlines.vue'
import orderlinesdetail from '../components/Jobs/oneorderlines.vue'


import Pricelist from '../components/pricelist/price.vue'
import WorkOrders from '../components/workorders/wo.vue'
import womaterial from '../components/workorders/womaterial.vue'
import opmaterial from '../components/workorders/opmaterial.vue'
import opresource from '../components/workorders/opresource.vue'
import wooperation from '../components/workorders/wooperation.vue'
import woreservation from '../components/workorders/woreservation.vue'

import womaterialdetails from '../components/workorders/onematerial.vue'
import woreservationdetails from '../components/workorders/onereservation.vue'
import opmaterialdetails from '../components/workorders/oneopmaterial.vue'
import wooperationdetails from '../components/workorders/oneoperation.vue'
import opresourcedetails from '../components/workorders/oneopresource.vue'

import invoices from '../components/financials/invoice.vue'
import invoiceholds from '../components/financials/invoiceholds.vue'
import invoiceapprovals from '../components/financials/invoiceapprovals.vue'

import wodispatchlistdetails from '../components/wodispatchlist/onewodispatchlist.vue'

import wodetails from '../components/workorders/onewo.vue'
import erpusers from '../components/erpusers/erpusers.vue'
import erproles from '../components/erpusers/erproles.vue'
import erpbu from '../components/erpusers/erpbu.vue'
import purchaseorders from '../components/purchaseorders/po.vue'
import poschedules from '../components/poschedules/po.vue'
import accounts from '../components/accounts/accounts.vue'
import workareas from '../components/workareas/wareas.vue'
import workcenters from '../components/workcenters/wcenters.vue'
import presources from '../components/productionresources/presources.vue'
import stndoprn from '../components/stndoprn/stndoprn.vue'
import wodispatchlist from '../components/wodispatchlist/wodispatch.vue'


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
  {path:'/orderlines',name:'orderlines',component: orderlines,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/pricelists',name:'pricelists',component: Pricelist,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/orderlinesdetail',name:'orderlinesdetail',component: orderlinesdetail,props: true,meta: {middleware: [Middlewares.auth]}  } ,

  {path:'/invoices',name:'invoices',component: invoices,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/invoiceholds',name:'invoiceholds',component: invoiceholds,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/invoiceapprovals',name:'invoiceapprovals',component: invoiceapprovals,meta: {middleware: [Middlewares.auth]}  } ,

  {path:'/workorders',name:'workorders',component: WorkOrders,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/womaterial',name:'womaterial',component: womaterial,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/opmaterial',name:'opmaterial',component: opmaterial,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/opresource',name:'opresource',component: opresource,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wooperation',name:'wooperation',component: wooperation,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/woreservation',name:'woreservation',component: woreservation,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wodetails',name:'wodetails',component: wodetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/womaterialdetails',name:'womaterialdetails',component: womaterialdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/woreservationdetails',name:'woreservationdetails',component: woreservationdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/opmaterialdetails',name:'opmaterialdetails',component: opmaterialdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wooperationdetails',name:'wooperationdetails',component: wooperationdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/opresourcedetails',name:'opresourcedetails',component: opresourcedetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/erpusers',name:'erpusers',component: erpusers,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/erpbu',name:'erpbu',component: erpbu,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/erproles',name:'erproles',component: erproles,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/purchaseorders',name:'purchaseorders',component: purchaseorders,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/poschedules',name:'poschedules',component: poschedules,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/accounts',name:'accounts',component: accounts,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/workareas',name:'workareas',component: workareas,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/productionresources',name:'presources',component: presources,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/standardoperations',name:'stndoprn',component: stndoprn,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wodispatchlist',name:'wodispatchlist',component: wodispatchlist,meta: {middleware: [Middlewares.auth]}  } ,
  {path:'/wodispatchlistdetails',name:'wodispatchlistdetails',component: wodispatchlistdetails,props: true,meta: {middleware: [Middlewares.auth]}  } ,
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
