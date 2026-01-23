/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTableIfNotExists("expenses", (table) => {
        table
            .string("id")
            .notNullable()
            .unique()
            .primary()
            .defaultTo(knex.fn.uuid());
        table.string("description").notNullable();
        table.decimal("amount", 10, 2).notNullable();
        table.date("payment_date").notNullable();
        table.date("due_date");
        table.string("category");
        table.boolean("due_date_exceeded");
        table.string("user").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("expenses");
};
