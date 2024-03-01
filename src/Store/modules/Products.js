import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;


const state ={
    ProductsList:[
    ],
   // ProdListByPageNum:[],
    non:''
};

const getters = {
    AllProducs: (state) => state.ProductsList,
};

const actions = {
    async GetProducts({ commit }){
      axios.get(`${URL_backend}/products/ProdByPage/${1}`)
      .then(res=>{
        commit('setProducts', res.data )
      })
    },
  async GetProdByID({commit}, ID){
    axios.get(`${URL_backend}/products/${ID}`)
    .then(res =>{
      commit('non');
      return res.data;
    })
  }, 
  async GetProdByPageNumber({commit}, pageNum){
    axios.get(`${URL_backend}/products/ProdByPage/${pageNum}`)
    .then(res =>{
      commit('SetProdByPageNum', res.data);
    })
  },
  async ADD_NEW_PRODUCT({commit}, data){

     let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios.post(`${URL_backend}/products`, data,
     {headers: {'x-auth-token':Tok}})
    .then(res =>{
        commit('NewProducts', res.data);
    })
    .catch((err)=>{
      alert(err.response.data)
    })

  },
  async EditOneProd({commit},data){
   let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios.put(`${URL_backend}/products/${data._id}`, data,
     {headers: {'x-auth-token':Tok}})
     .then(() =>{
         let objIndex = state.ProductsList
         .findIndex((obj=> obj._id == data._id));
    let name  = data.name;
    let prod_categories  = data.prod_categories;
    let desc  = data.desc;
    let price  = data.price;
    let product_img  = data.product_img;
    let NewDatObj = {objIndex, name, prod_categories, desc, price, product_img}

    commit('EditOneProduct', NewDatObj);
     })
  
    
  },
  async DeleteOneProd({commit}, data){

           let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios.delete(`${URL_backend}/products/${data._id}`, data,
     {headers: {'x-auth-token':Tok}})
     .then((res) =>{
       console.log('deleted prod success', res.data);
      let newArrDel = state.ProductsList.filter(x => {return x.id !=data.ID})
      commit('ReSetAndDelete', newArrDel);
     })


  }
  

};

const mutations = {
    // work with Products List
    setProducts:
     (state, newProdData) => (state.ProductsList = newProdData),
     // new prod
     NewProducts:(state, newprod) => state.ProductsList.unshift(newprod),
     // edit prod 
     EditOneProduct:(state, NewDatObj) =>(state.ProductsList[NewDatObj.objIndex].name = NewDatObj.name,
      state.ProductsList[NewDatObj.objIndex].prod_categories = NewDatObj.prod_categories,
      state.ProductsList[NewDatObj.objIndex].desc = NewDatObj.desc,
      state.ProductsList[NewDatObj.objIndex].price = NewDatObj.price,
      state.ProductsList[NewDatObj.objIndex].product_img = NewDatObj.product_img),
    // delete prod
    ReSetAndDelete:(state, newArrDel) =>(state.ProductsList = newArrDel),
      // set prod by page num
    SetProdByPageNum:
     (state, NewProdDataArr) => (state.ProductsList = NewProdDataArr),
    // donse not do any thing
    non:
     (state) => (state.non = '')
};

export default {
    state,
    getters,
    actions,
    mutations
}


