const dbConnection = require("./config/dbConnection");
const bot = require("./bot/bot");
const job = require("./schedule/job");

(async (_) => {
    await dbConnection.migrate.up();
    bot;
    job;

    //   bot.telegram.sendMessage(-1003698788289, new Date().toISOString(), {
    //     message_thread_id: 3,
    //   });
})();
