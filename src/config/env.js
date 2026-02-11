const { loadEnvFile } = require("node:process");

loadEnvFile();

const env = {
    token: process.env.TOKEN,
};

module.exports = env;
