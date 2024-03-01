import axios from 'axios';
// const port = process.env.PORT || 5000;
const URL_backend = `https://olxvuemachinelearning.herokuapp.com/api`;

const state = {
    UsMovement:{
        Search:[],
        Cart:[],
        Items:[]
    }
};

const getters = {
    AllUserMovement:(state) => state.UsMovement,
}

const actions = {
    async SetUserMovemnetSearch({commit}){
        let Tok = JSON.parse(localStorage.getItem('Auth')).Token;
        axios.get(`${URL_backend}/machine_learning/SearchData`,
        {headers:{'x-auth-token': Tok}})
        .then(res =>{
            console.log('result', res.data),
            commit('SetUserMOvementSearch', '')
        })
    },
    async SetUserMovemnetCart({commit}, data){
        let Tok = JSON.parse(localStorage.getItem('Auth')).Token;
        axios.patch(`${URL_backend}/machine_learning/ml_cart/${data}`,
        {},
        {headers:{'x-auth-token': Tok}})
        .then(res =>{
            console.log('result', res.data),
            commit('SetUserMOvementCart', data)
        })
    },
    async SetUserMovemnetItem({commit}, data){
        let Tok = JSON.parse(localStorage.getItem('Auth')).Token;
        console.log("tok", Tok)
        axios.patch(`${URL_backend}/machine_learning/ml_products/${data}`,
        {},
        {headers:{'x-auth-token': Tok}})
        .then(res =>{
            console.log('result', res.data),
            commit('SetUserMOvementItem', data)
        })
    }
}

const mutations ={
    // Search
    SetUserMOvementSearch:(state, newusmovesearch) =>
    (state.UsMovement.Search.unshift(newusmovesearch)),
    // cart
    SetUserMOvementCart:(state, newusmovecart) => (state.UsMovement.cart = newusmovecart),
    // items
    SetUserMOvementItem:(state, newusmoveItems) =>
    (state.UsMovement.Items.unshift(newusmoveItems)),
}


export default {
    state,
    getters,
    actions,
    mutations
}


