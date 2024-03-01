const express = require('express');
const app = express();
let winston = require('winston')
const path = require('path');

const cors = require('cors');
app.use(cors({ origin:'*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//app.use('/images', express.static(path.join(__dirname, 'images')))


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
//
 

 
 

const port = process.env.PORT || 5000;
app.listen(port, ()=> winston.info(`listening on port ${port}...`));


