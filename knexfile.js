// Update with your config settings.

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

    production: {
        client: "sqlite3",
        connection: {
            filename: "./prod.sqlite3",
            useNullAsDefault: true,
            migrations: {
                tableName: "knex_migrations",
                directory: "./migrations",
            },
        },
    },
};
