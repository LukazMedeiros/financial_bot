const dbConnection = require("./config/dbConnection");
const bot = require("./bot/bot");
const job = require("./schedule/job");

(async (_) => {
    await dbConnection.migrate.latest();
    bot;
    job;
})();
