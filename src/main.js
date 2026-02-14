const bot = require("./bot/bot");
const dbConnection = require("./config/dbConnection");

(async (_) => {
    await dbConnection.migrate.latest();
    bot;
})();
