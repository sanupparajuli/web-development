import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;

const state = {
    UsersList:[    ]
}


const getters ={
    AllUsers:(state) => state.UsersList
}


const actions = {
    async GetUserList({commit}){
    let Tok = JSON.parse(localStorage.getItem('Auth')).Token;


        axios.get(`${URL_backend}/users/${1}`,
        {headers:{'x-auth-token': Tok}})
        .then(res =>{
            console.log('userlist ', res.data);
            commit('SetUserList', res.data);
        })

    },
    async GetUsByPNum({commit} , PageNum){
     let Tok = JSON.parse(localStorage.getItem('Auth')).Token;


        axios.get(`${URL_backend}/users/${PageNum}`,
        {headers:{'x-auth-token': Tok}})
        .then(res =>{
            console.log('userlist by pn ', res.data);
            commit('SetUserList', res.data);
        })
    },
    async EditOneUser({commit}, data){

     let Tok = JSON.parse(localStorage.getItem('Auth')).Token;


        axios.put(`${URL_backend}/users/Role`,
        { _id: data.ID, isAdmin:data.isAdmin },
        {headers:{'x-auth-token': Tok}})
        .then(() =>{
            let objIndex = state.UsersList
            .findIndex((obj)=> obj._id == data.ID);
            let isAdmin = data.isAdmin;
            let NewDatOBJ = {objIndex, isAdmin};
            commit('EditOneUser', NewDatOBJ);
        }).catch((err)=>{
            console.log( err.response.data.msg )
        })



    }
}


const mutations = {
    SetUserList:
     (state, data) => (state.UsersList = data),
     EditOneUser:
     (state, newData) =>( state.UsersList[newData.objIndex].isAdmin = newData.isAdmin )
}

export default {
    state,
    getters,
    actions,
    mutations
}
