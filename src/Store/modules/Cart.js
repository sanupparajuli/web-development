
const state = {
    OriginalCartListData:[]
    ,
    non:''
}

const getters = {
    AllCatItems: (state) => state.OriginalCartListData
}

// Get // let FavData = JSON.parse(localStorage.getItem('Fav'));

// Set // localStorage.setItem('Fav', JSON.stringify(data));

// Remove // localStorage.removeItem('Fav');



const actions = {
    async GetCartItem({ commit }){
        if(localStorage.getItem("Cart")){
            const CartDataONLStorage =
             JSON.parse(localStorage.getItem("Cart"));
            commit('SetNew', CartDataONLStorage)
        } else {
            let emptyArr = [];
            const CartDataONLStorage =  
            localStorage.setItem("Cart", JSON.stringify(emptyArr));
            commit('SetNew', CartDataONLStorage)
        }
    },
    async SetNewCartItem({commit}, ID){
        let defaultQuantity = 1;
        
        if(localStorage.getItem("Cart")){
            let newItem = {id:ID, quantity:defaultQuantity}
            let CartData =
             JSON.parse(localStorage.getItem("Cart"));
            let ItemDATA = 
            CartData.findIndex((obj => obj.id == ID));
            
            if(ItemDATA !==-1){
                let objIndex = 
                CartData.findIndex((obj => obj.id == ID));
                CartData[objIndex].quantity++;
                localStorage.setItem("Cart", 
                JSON.stringify(CartData))
            } else {
                CartData.push(newItem)
                localStorage.setItem("Cart", 
                JSON.stringify(CartData))
            }
            commit('SetNew', CartData);
        } else {
            let newItemDataArr = [{id:ID, 
                quantity:defaultQuantity}];
            localStorage.setItem("Cart", 
            JSON.stringify(newItemDataArr));
            commit('SetNew', newItemDataArr)
        }

    },
    async ChangeItemQuantity({commit}, data){
        if(localStorage.getItem("Cart")){
            let CartData = 
            JSON.parse(localStorage.getItem("Cart"));
            let itemDATA = 
            CartData.findIndex((obj => obj.id == data.ID));
            if(itemDATA !==-1){
                let objindex = 
                CartData.findIndex((obj => obj.id == data.ID));
                CartData[objindex].quantity = data.quantity;
                localStorage.setItem("Cart", 
                JSON.stringify(CartData));
                commit('SetNew', CartData);
            }
        }
    },
    async RemoveItemFromCart({commit}, ID) {
        if(localStorage.getItem("Cart")){
            let CartData = 
            JSON.parse(localStorage.getItem("Cart"));
            let itemDATA = 
            CartData.findIndex((obj => obj.id == ID));
            if(itemDATA !==-1){
                CartData = 
                CartData.filter(x => {return x.id !== ID})
                localStorage.setItem("Cart", 
                JSON.stringify(CartData));
                commit('SetNew', CartData);
            }
        }
    },
    async ChecIfINCart({commit}, ID){
        if(localStorage.getItem("Cart")){
            let CartData = 
            JSON.parse(localStorage.getItem("Cart"));
            let ItemDATA = 
            CartData.findIndex((obj => obj.id == ID));

            let IsInCart;
            
            if(ItemDATA !== -1){
                IsInCart = true;
            }
            if(ItemDATA ==-1){
                IsInCart = false;
            }
            commit('non');
            return IsInCart;

        }
    }
    
}


const mutations ={
    SetNew:
     (state, CartItems) => (state.OriginalCartListData = CartItems),
     non:
      (state) => (state.non = '')
}


export default {
    state,
    getters,
    actions,
    mutations
}


