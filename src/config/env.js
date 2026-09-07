const { loadEnvFile } = require("node:process");

loadEnvFile();

const env = {
    token: process.env.TOKEN,
    getFileInfo: process.env.GETFILEINFO,
    getFileUrl: process.env.GETFILEURL,
    environment: process.env.ENVIRONMENT,
    chatId: process.env.CHATID,
    rule: process.env.RULE,
    users: process.env.USERS,
    databaseUrl: process.env.DATABASEURL,
    database: process.env.DATABASE,
    dbUser: process.env.DBUSER,
    dbPassword: process.env.DBPASSWORD,
    dbPort: process.env.DBPORT,
    dbHost: process.env.DBHOST,
};

module.exports = env;
