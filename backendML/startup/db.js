const mongoose  = require('mongoose');
let winston = require('winston')

module.exports = function (){


  mongoose.connect('mongodb+srv://sanup:<S!anuP12>@cluster0.m7j7cgc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser:true,
  useUnifiedTopology:true, useCreateIndex:true})
.then(()=>winston.info('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB...'))
}


