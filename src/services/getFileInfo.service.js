const axios = require("axios");
const env = require("../config/env");

async function getFileInfo(fileId) {
    const info = env.getFileInfo
        ?.replace("TELEGRAM_TOKEN", env.token)
        ?.replace("FILEID", fileId);

    const { data } = await axios.get(info);

    const url = env.getFileUrl
        ?.replace("TELEGRAM_TOKEN", env.token)
        ?.replace("PATH", data.result.file_path);

    const { config } = await axios.get(url);

    // console.log(config);
    return config.url;
}

module.exports = getFileInfo;
