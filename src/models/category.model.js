const dbConnection = require("../config/dbConnection");

class Category {
    #table = "categories";
    topicTitle;
    topicId;
    active;

    constructor(title, id) {
        this.topicTitle = title;
        this.topicId = parseInt(id);
    }

    //getter
    get topicTitle() {
        return this.topicTitle;
    }

    get topicId() {
        return this.topicId;
    }

    //
    async create() {
        this.active = true;
        try {
            const result = await dbConnection(this.#table).insert(this);
            return result > 0;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }

    async delete() {
        this.active = false;

        try {
            const result = await dbConnection(this.#table)
                .update({
                    active: this.active,
                })
                .where({ topicTitle: this.topicTitle, topicId: this.topicId });
            return result > 0;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }

    async list() {
        try {
            const result = await dbConnection(this.#table)
                .select("*")
                .where({ active: true });
            return result;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }
}

module.exports = Category;
