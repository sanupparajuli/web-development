import Vue from 'vue';
import Router from 'vue-router'

import Main from './components/home/main.vue';
import Specificitem from './components/Specificitem/Specificitem.vue';
import Cart from './components/Cart/Cart.vue'
import LoginRegister from './components/LoginRegister/LoginRegister.vue'
import UserProfile from './components/UserProfile/UserProfile.vue'
import SearchP from './components/Search/SearchP' 
import Admin from './components/Admin/Admin' 

import AuthGarud from './Garuds/AuthGarud'
import LoginRegGarud from './Garuds/LoginRegGarud'
import AdminGard from './Garuds/AdminGard';

Vue.use(Router);

export default new Router ({
    mode:'history',
    routes:[
        {
        path:'/',
        name:'Main',
        component:Main,
      },
      {
        path:'/Specificitem',
        name:'Specificitem',
        component:Specificitem
      },
      {
        path:'/Cart',
        name:'Cart',
        component:Cart
      },
      {  
        path:'/LoginRegister',
        name:'LoginRegister',
        component:LoginRegister,
        beforeEnter:(to, from, next) =>{
          LoginRegGarud(to, from, next);
        }
      }, 
      {
        path:'/UserProfile',
        name:'UserProfile',
        component:UserProfile,
        beforeEnter:(to, from, next) =>{
          AuthGarud(to, from, next);
        }
      },
      {
        path:'/SearchP',
        name:'SearchP',
        component:SearchP
      },
      {
        path:'/Admin',
        name:'Admin',
        component:Admin,
        beforeEnter:(to, from, next) =>{
          AdminGard(to, from, next);
        }
      }
 ]
}) 

