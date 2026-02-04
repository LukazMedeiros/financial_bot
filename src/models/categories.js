const dbConnection = require("../config/dbConnection");

module.exports = {
    table: "categories",

    create: async function ({ topicTitle, topicId }) {
        try {
            const result = await dbConnection(this.table).insert({
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
            const result = await dbConnection(this.table)
                .update({ active: false })
                .where({ topicTitle, topicId });
            return result > 0;
        } catch (error) {
            return false;
        }
    },

    list: async function () {
        try {
            const result = await dbConnection(this.table)
                .select("*")
                .where({ active: true });
            return result;
        } catch (error) {
            return false;
        }
    },

    getCategory: async function (topicId) {
        try {
            const { topicTitle } = await dbConnection(this.table)
                .first("topicTitle")
                .where({ topicId });
            return topicTitle;
        } catch (error) {
            return false;
        }
    },
};
