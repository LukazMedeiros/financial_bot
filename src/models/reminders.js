const dbConnection = require("../config/dbConnection");

module.exports = {
    create: async function ({ description, day }) {
        try {
            const result = await dbConnection("reminders").insert({
                description,
                day,
                active: true,
            });
            return result > 0;
        } catch (error) {
            return false;
        }
    },
};
