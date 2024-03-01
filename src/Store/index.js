import Vuex from 'vuex';
import Vue from 'vue';

import Products from './modules/Products';
import Categories from './modules/Categories'
import Cart from './modules/Cart'
import Authentication from './modules/Authentication'
import UserMovemnet from './modules/UserMovemnet'
import Users from './modules/Users'
// load vuex
Vue.use(Vuex);

// Create Store
export default new Vuex.Store({
    modules:{
        Products,
        Categories,
        Cart,
        UserMovemnet,
        Authentication,
        Users
    }
})

