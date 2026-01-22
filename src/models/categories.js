const dbConnection = require("../config/dbConnection");

module.exports = {
    create: async function (name, value) {
        try {
            const result = await dbConnection("categories").insert({
                name,
                value,
                active: true,
            });
            return result > 0;
        } catch (error) {
            return false;
        }
    },

    delete: async function (name, value) {
        try {
            const result = await dbConnection("categories")
                .update({ active: false })
                .where({ name, value });
            return result > 0;
        } catch (error) {}
    },
};
