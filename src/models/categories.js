const dbConnection = require("../config/dbConnection");

module.exports = {
    create: async function ({ topicTitle, topicId }) {
        try {
            const result = await dbConnection("categories").insert({
                topicTitle,
                topicId,
                active: true,
            });
            return result > 0;
        } catch (error) {
            return false;
        }
    },

    delete: async function ({ topicTitle, topicId }) {
        try {
            const result = await dbConnection("categories")
                .update({ active: false })
                .where({ topicTitle, topicId });
            return result > 0;
        } catch (error) {
            console.log(error.message);

            return false;
        }
    },
};
