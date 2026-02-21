const bot = require("./bot/bot");
const dbConnection = require("./config/dbConnection");
const scheduledJobs = require("./schedule/job.schedule");

(async (_) => {
    process.env.TZ = "America/Sao_Paulo";
    await dbConnection.migrate.latest();
    bot;
    scheduledJobs;
})();
