const dbConnection = require("../config/dbConnection");

class Reminder {
    _table = "reminders";
    #description;
    #day;

    //getters
    get description() {
        return this.#description;
    }

    get day() {
        return this.#day;
    }

    //setters
    set day(value) {
        this.#day = value;
    }

    set description(value) {
        this.#description = value;
    }

    async create() {
        const obj = {
            description: this.#description,
            day: this.#day,
            active: true,
        };

        try {
            const result = await dbConnection(this._table).insert(obj);
            return result > 0;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }

    async get(today) {
        try {
            const result = await dbConnection(this._table)
                .select("*")
                .where({ day: today, active: true });
            return result;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }
}

module.exports = Reminder;
