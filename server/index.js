require('dotenv').config({path: require('find-config')('.env')});
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const apiErrorHandler = require('./error/api-error-handler');
const setupDB = require('./db/index');


// setup DB with objection and knex
setupDB();

// setup express
const PORT = process.env.PORT;
const app = express();

// middleware 
app.use(bodyParser.json());
app.use('/', router);

app.use(apiErrorHandler);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));