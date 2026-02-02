const dbConnection = require("../config/dbConnection");

module.exports = {
    table: "reminders",

    create: async function ({ description, day }) {
        try {
            const result = await dbConnection(this.table).insert({
                description,
                day,
                active: true,
            });
            return result > 0;
        } catch (error) {
            return false;
        }
    },

    get: async function (today) {
        try {
            const result = await dbConnection(this.table)
                .select("*")
                .where({ day: today, active: true });

            return result;
        } catch (error) {
            return [];
        }
    },
};
