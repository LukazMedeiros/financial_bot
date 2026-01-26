const moment = require("moment");

const formatDate = (date) => {
    const formatedDate = date.match(/hoje/i)
        ? new Date()
        : new Date(
              moment(date, "DD/MM/YYYY")
                  .format("YYYY-MM-DD")
                  .split("-")
                  .toString(),
          );

    return formatedDate;
};

module.exports = formatDate;
