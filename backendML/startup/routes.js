const machine_learning = require('../routes/machine_learning');
const express = require('express');

const error = require('../middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/machine_learning', machine_learning); 
    
    // this error middleware
    app.use(error);
}



