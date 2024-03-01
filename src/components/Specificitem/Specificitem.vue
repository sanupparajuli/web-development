<template>
<div>
<center>
 <div class="card" v-if="isLoad">
  <img class="card-img-top" :src="Resultitems.imgSrc" alt="Card image cap">
   <div class="card-body">
     <h4 class="card-title">{{ Resultitems.name }}</h4>
     <p class="card-text">{{Resultitems.desc}} </p>
     <h4> Price : {{Resultitems.price}}</h4>
     <h4><i class="fas fa-tags"></i> : {{Resultitems.CatName}}</h4>
     <a 
     class="btn btn-primary"
     @click="ChangeItemStatus"
     v-if="!Resultitems.InCard" >
     Add To Card</a>
    <a 
     class="btn btn-danger" 
     @click="ChangeItemStatus"
     v-if="Resultitems.InCard">
     Remove From Card</a>
   </div>
  </div>
</center>

</div>

</template>

<script>

import { mapActions } from 'vuex';

import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;

export default {
    name:'Specificitem',
    data(){
      return {
          Resultitems:{
              id:'',
              imgSrc:'',
              name:'',
              price:null,
              desc:'',
              CatName:'',
              InCart:true
          },
          itemData:'',
          isLoad:Boolean
      }
    },
    created(){
 this.Getroutedata();
   },
   methods:{
    ...mapActions([
        'GetProdByID',
        'GetCatByID',
        'GetCategories',
        'ChecIfINCart',
        'SetNewCartItem',
        'RemoveItemFromCart',
        'SetUserMovemnetItem',
        'SetUserMovemnetCart'
    ]), 
    async Getroutedata(){
        let ProdID = this.$route.query.ID;
        await axios.get(`${URL_backend}/products/${ProdID}`)
        .then(res =>{
            this.ReSetDataAndGetCat(res.data)
        })
        
        // check if in card
        await this.ChecIfINCart(ProdID).then((res) =>{
            this.Resultitems.InCard = res;
            this.isLoad = true;
            this.AddToUserMovement();
        }) 
       },

        // re set data fun
        ReSetDataAndGetCat(data){
            // set item data
            this.Resultitems.id = data['_id'];
            this.Resultitems.imgSrc = data['product_img'];
            this.Resultitems.name = data['name'];
            this.Resultitems.price = data['price'];
            this.Resultitems.desc = data['desc'];
            // get set item cat
            let catid = data['prod_categories']._id;
            axios.get(`${URL_backend}/categories/${catid}`)
            .then(res =>{
                this.Resultitems.CatName = res.data.name;
            })
    
        },
        AddToUserMovement(){
            this.SetUserMovemnetItem(this.Resultitems.id);
        },
    

    async  ChangeItemStatus(){
        this.isLoad = false;
       this.Resultitems.InCard = !this.Resultitems.InCard;
       let ProdID = this.$route.query.ID;

       if(this.Resultitems.InCard){
           this.SetNewCartItem(ProdID);
           this.isLoad = true;
       } else {
           this.isLoad = true;
           this.RemoveItemFromCart(ProdID)
       }

       this.SetUserMovemnetCart(ProdID);
    }
   }

}
</script>

<style scoped>
.card{
    width: 40%;
    text-align: center;
}

.card>img{
    width: 70% !important;
    margin: 1px auto  !important;
    }
</style>
