const dbConnection = require("../config/dbConnection");

class Expense {
    #table = "expenses";

    #file;
    #description;
    #amount;
    #paymentDate;
    #dueDate;
    #category;
    #dueDateExceeded;
    #user;
    #type;

    //getters
    get table() {
        return this.#table;
    }

    get file() {
        return this.#file;
    }

    get description() {
        return this.#description;
    }

    get amount() {
        return this.#amount;
    }

    get paymentDate() {
        return this.#paymentDate;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get category() {
        return this.#category;
    }

    get dueDateExceeded() {
        return this.#dueDateExceeded;
    }

    get user() {
        return this.#user;
    }

    get type() {
        return this.#type;
    }

    //setters
    set file(value) {
        this.#file = value;
    }

    set description(value) {
        this.#description = value;
    }

    set amount(value) {
        value = value.replace(",", ".");
        this.#amount = parseFloat(value);
    }

    set paymentDate(value) {
        if (value.match(/hoje/gim)) {
            this.#paymentDate = new Date();
        } else {
            value = value.split("/")?.reverse();
            this.#paymentDate = new Date(value);
        }
    }

    set dueDate(value) {
        if (value.match(/hoje/gim)) {
            this.#dueDate = new Date();
        } else {
            value = value.split("/")?.reverse();
            this.#dueDate = new Date(value);
        }
    }

    set dueDateExceeded(value) {
        this.#dueDateExceeded = value;
    }

    set category(value) {
        this.#category = value;
    }

    set user(value) {
        this.#user = value;
    }

    set type(value) {
        this.#type = value;
    }

    //
    HasDueDateExceeded() {
        this.dueDateExceeded = this.paymentDate > this.dueDate;
    }

    clear() {
        this.#file = undefined;
        this.#description = undefined;
        this.#amount = undefined;
        this.#paymentDate = undefined;
        this.#dueDate = undefined;
        this.#category = undefined;
        this.#dueDateExceeded = undefined;
        this.#user = undefined;
        this.#type = undefined;
    }

    async create() {
        const obj = {
            file: this.file,
            description: this.description,
            amount: this.amount,
            paymentDate: this.paymentDate,
            category: this.category,
            dueDate: this.dueDate || null,
            dueDateExceeded: this.dueDateExceeded || null,
            user: this.user,
            type: this.type,
        };
        try {
            const result = await dbConnection(this.table).insert(obj);
            return result > 0 ? obj : false;
        } catch (error) {
            console.log(error.message); //substituir para funcionalidade de criação de logs
        }
    }
}

const expense = new Expense();

module.exports = expense;
