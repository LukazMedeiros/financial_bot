const { loadEnvFile } = require("node:process");

loadEnvFile();

module.exports = {
    botToken: process.env.TOKEN,
    users: process.env.USERS,
    chatId: process.env.CHATID,
    environment: process.env.ENVIRONMENT,
    rule: process.env.RULE,
};
