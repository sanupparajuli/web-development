<template>
<div>


 <div v-if="!EDIT">

  <div v-for="data in ProductsList" :key="data.id">
  

<div class="card d" >
  <img class="card-img-top" :src="data.product_img" :alt="data.name" >
  <div class="card-body">
    <h5 class="card-title">Name :{{ data.name }}</h5>
    <p class="card-text">Desc :{{ data.desc }} </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Price:${{ data.price }}</li>
    <li v class="list-group-item danger">Category :
     {{ data.prod_categories.name }}
      </li>
  </ul>
  <div class="card-body">
    <a @click="EditProd(data._id)"
     class="card-link btn btn-danger">Edit</a>
  </div>
</div>
</div>


<hr>
<PageNationStore 
 v-on:new-ProductsData="changingPagenation"
 ComponentName="ProductComponent" />


 </div>

<EditProd 
 key="EditProd"
 v-if="EDIT"
 v-bind:ProdID="EditProdID"
 v-on:SaveDone="SaveDoneFunc"
 />



</div>
</template>


<script>
import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;

import EditProd from './EditProd.vue';
import PageNationStore from '../PageNationStore.vue';

export default {
    naem:'ProdList',
    components:{
        PageNationStore,
        EditProd
    },
    data() {
        return {
            ProductsList:[], // main data arr
            EDIT:false,
            EditProdID:'',
        }
    },
    created() {
        this.GetTheProdListFromStore()
    },
    methods: {
        GetTheProdListFromStore:function(){
            axios.get(`${URL_backend}/products/ProdByPage/${1}`)
             .then(res => {
                 this.ProductsList = res.data;
             })
        },
        changingPagenation(non, page){
            console.log('non', non);
          axios.get(`${URL_backend}/products/ProdByPage/${page}`)
             .then(res => {
                 this.ProductsList = res.data;
             })
        },
        EditProd(prodID){
            this.EditProdID = prodID;
            this.EDIT = ! this.EDIT;
        },
        SaveDoneFunc(){
            this.GetTheProdListFromStore();
            this.EDIT = ! this.EDIT;
        }
    },
}
</script>



<style scoped>

.d {
    font-family: cursive;
    border: 1px solid #2f4f4f1f;
    margin: 3% 1%;
    padding: 2%;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}


.card>img{
    /* width: 100px; */
         margin-left: auto;
    margin-right: auto;
    width: 10em;
}

</style>



