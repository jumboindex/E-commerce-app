require('dotenv').config({path: require('find-config')('.env')});
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const setupDB = require('./db/index');


// setup DB with objection and knex
setupDB();

// setup express
const PORT = process.env.PORT;
const app = express();

// middleware 
app.use(bodyParser.json());
app.use('/', router);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));