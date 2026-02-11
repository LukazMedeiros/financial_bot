class Expense {
    file;
    description;
    amount;
    paymentDate;
    dueDate;
    category;
    dueDateExceeded;
    user;
    type;

    //getters
    get file() {
        return this.file;
    }

    get description() {
        return this.description;
    }

    get amount() {
        return this.amount;
    }

    get paymentDate() {
        return this.paymentDate;
    }

    get dueDate() {
        return this.dueDate;
    }

    get category() {
        return this.category;
    }

    get dueDateExceeded() {
        return this.dueDateExceeded;
    }

    get user() {
        return this.user;
    }

    get type() {
        return this.type;
    }

    //setters
    set file(value) {
        this.file = value;
    }

    set description(value) {
        this.description = value;
    }

    set amount(value) {
        this.amount = value;
    }

    set paymentDate(value) {
        this.paymentDate = value;
    }

    set dueDate(value) {
        this.dueDate = value;
    }

    set category(value) {
        this.category = value;
    }

    set dueDateExceeded(value) {
        this.dueDateExceeded = value;
    }

    set user(value) {
        this.user = value;
    }

    set type(value) {
        this.type = value;
    }
}

const expense = new Expense();

module.exports = expense;
