require('dotenv').config({path: '../.env'});
const { knexSnakeCaseMappers } = require('objection');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  connection: {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user:     process.env.PGUSER,
      password: process.env.PGPASSWORD 
    },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  },
  debug:true,
    // utility which automatically converts camelCase to snake_case 
    // so we can use camelCase input feilds 
    ...knexSnakeCaseMappers,
};

