const { knex } = require("knex");
const env = require("./env");

const dbConfig = require("../../knexfile")[env.environment || "development"];

const dbConnection = knex(dbConfig);

module.exports = dbConnection;
