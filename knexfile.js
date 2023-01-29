// Update with your config settings.
const path = require("path");


module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: './dev.pg'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'movedb',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'movedb',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

};
