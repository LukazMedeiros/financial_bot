const env = require("./env");
const knex = require("knex");
const dbConfig = require("../../knexfile");

const dbConnection = knex(dbConfig[env.environment || "development"]);

module.exports = dbConnection;
