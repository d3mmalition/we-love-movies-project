// Update with your config settings.

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
      tableName: 'knex_migrations'
    }
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
      tableName: 'knex_migrations'
    }
  }

};
