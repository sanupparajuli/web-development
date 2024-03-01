import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;

const state = {
    CateGorisList:[
        
    ],
    non:''
}

const getters = {
    allCategories:(state)=> state.CateGorisList,
}

const actions = {
    async GetCategories({commit}){
        axios.get(`${URL_backend}/categories/CatByPage/${1}`)
        .then(res =>{
            commit('setCategories', res.data)
        })
    },
    async GetCatBYPageNumBer({commit}, PageNum){
        axios.get(`${URL_backend}/categories/CatByPage/${PageNum}`)
        .then(res =>{
            commit('setCategories', res.data)
        })

    },
    async ADD_NEW_CAT({commit}, data){

               let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

        axios.post(`${URL_backend}/categories`, {
            name:data.NewCatName
        }, {headers: {'x-auth-token':Tok}})
        .then(res =>{
            commit('NewCategories', res.data);
        })

    },
    async EditOneCat({commit}, data){

     let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

        axios.put(`${URL_backend}/categories/${data.ID}`, {
            name:data.NewCatName
        }, {headers: {'x-auth-token':Tok}})
        .then(() =>{
            let objIndex = state.CateGorisList
            .findIndex((obj => obj._id == data.ID));
            let name = data.NewCatName;
            let NewDatObj = {objIndex, name};
            commit('EditOneCategories', NewDatObj)
        })
        .catch((err)=>{
            console.log( err.response.data.msg )
        })


    },
    async DeleteOneCat({commit}, data){
        
       let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

      
        axios.delete(`${URL_backend}/categories/${data.ID}`, 
         {headers: {'x-auth-token':Tok}})
         .then(res =>{
             console.log('deleted cat successfully', res.data);

             let newArrDel = 
             state.CateGorisList.filter(x => {return x._id != data.ID});
             commit('ReSetAndDelete', newArrDel);
         })
         .catch((err)=>{
            console.log( err.response.data.msg )
        })


    },
    async GetCatByID({commit}, ID){
               let Tok = JSON.parse(localStorage.getItem('Auth')).Token;


        axios.get(`${URL_backend}/categories/${ID}`, 
        {headers: {'x-auth-token':Tok}})
        .then(res=>{
            commit('non');
            return res.data;
        })
    }
}


const mutations = {
    setCategories:
     (state, categories) => (state.CateGorisList = categories),
     NewCategories:
     (state, newData) => state.CateGorisList.unshift(newData),
     EditOneCategories:(state, NewDatObj) =>
      (state.CateGorisList[NewDatObj.objIndex].name = NewDatObj.name),
      ReSetAndDelete:
      (state, newArrDel) => (state.CateGorisList = newArrDel),
      
    non:
     (state)=>(state.non = '')
};

export default {
    state,
    getters,
    actions,
    mutations
}


