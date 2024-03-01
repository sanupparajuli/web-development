<template>
  <div>
   <center>
        <h3 class="hS" v-if="BigData.length>0">Items that You may Like</h3>
   </center>
   <div class="container">
        <transition-group
         name="fade"
         tag="div" class="row" v-if="isLoad" >
          <div class="col" v-for="item in BigData" :key="item._id" >
           <div class="card" >
            <img class="card-img-top" :src="item.product_img">
              <div class="card-block">
                <router-link
                :to="{path:'/SpecificItem', query:{ID:item._id}}"
                class="card-title vx"
                tag="h6"
                >
                 {{ item.name | capitalize }}
                </router-link>

               <p class="card-text">Price $:{{item.price}}</p>
  
          </div>
          </div>
         </div>
        </transition-group>
      </div>
  </div>
  </template>
  
  
  
  <script>
  
  
import axios from 'axios';
// const port = process.env.PORT || 3000;
const URL_backend = `https://olxvue.herokuapp.com/api`;
  export default {
    data() {
      return {
        BigData:[],
        isLoad:Boolean
      }
    },
   created(){

    let Arr =[];
    const token = JSON.parse(localStorage.getItem("Auth")).Token;
    
    if(token){   
     axios.get(`${URL_backend}/machine_learning/All`,
            { headers: {'x-auth-token': token} })
      .then(res =>{
        //console.log('sug data sugprod', res.data)
         for (let index = 0; index < res.data.length; index++) {
           const element = res.data[index];
            Arr.push(element);
          }
        ///
        if(Arr.length > 4){
            const shuffled = Arr.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 5);
            this.BigData = selected;
            console.log('tt', this.BigData)  
            this.isLoad = true;
        } else {
              this.BigData = Arr;
              this.isLoad = true;
        }
        ////
        console.log('ar', Arr)
      })
      .catch((err) =>
      {
        console.log('er', err.response.data.msg);
      });
    }

  },

    filters:{
      capitalize:(value) =>{
     
         if(value.lenght > 8) return value;
         return value.substr(0,8) + '..';
       
      }
    }
  }
  </script>
  
  <style scoped>
      .card{
      width: 10rem;
      padding:20px;
      }
  
      .card>img{
          height: 100px;
      width: 100px;
      }
  
      .col {
          margin: 1%;
               margin-left: auto;
      margin-right: auto;
      width: 10em;
      }
  
   .vx:hover{
     cursor: pointer;
     color: darkred;
   }
  
   .hS{
     background: beige;
      padding: 3px;
      font-family: monospace;
      font-style: oblique;
   }
  </style>
  