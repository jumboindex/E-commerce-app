const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');

function setupDB() {
    const db = knex(knexfile);
    // plug db config into objection
    Model.knex(db);
};

module.exports = setupDB;