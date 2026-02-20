// Update with your config settings.

const env = require("./src/config/env");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./dev.sqlite3",
            useNullAsDefault: true,
            migrations: {
                tableName: "knex_migrations",
                directory: "./migrations",
            },
        },
    },

    staging: {
        client: "pg",
        connection: {
            connectionString: env.databaseUrl,
            database: env.database,
            user: env.dbUser,
            password: env.dbPassword,
            port: env.dbPort,
            host: env.dbHost,
            ssl: false,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "pg",
        connection: {
            connectionString: env.databaseUrl,
            database: env.database,
            user: env.dbUser,
            password: env.dbPassword,
            port: env.dbPort,
            host: env.dbHost,
            ssl: false,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
