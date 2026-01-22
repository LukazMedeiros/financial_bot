const bot = require("./bot/bot");
const dbConnection = require("./config/dbConnection");

(async (_) => {
    await dbConnection.migrate.up();
    bot;

    //   bot.telegram.sendMessage(-1003698788289, new Date().toISOString(), {
    //     message_thread_id: 3,
    //   });
})();
