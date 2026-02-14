const { loadEnvFile } = require("node:process");

loadEnvFile();

const env = {
    token: process.env.TOKEN,
    getFileInfo: process.env.GETFILEINFO,
    getFileUrl: process.env.GETFILEURL,
    environment: process.env.ENVIRONMENT,
    chatId: process.env.CHATID,
};

module.exports = env;
