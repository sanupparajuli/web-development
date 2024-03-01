const express = require('express');
const app = express();
let winston = require('winston')
const path = require('path');

const cors = require('cors');
app.use(cors({ origin:'*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'dist')))



require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
//
 

 
 

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=> winston.info(`listening on port ${port}...`));

module.exports = server;

