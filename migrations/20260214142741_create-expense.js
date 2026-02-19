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
        table.string("file");
        table.string("description").notNullable();
        table.decimal("amount", 10, 2).notNullable();
        table.date("paymentDate").notNullable();
        table.date("dueDate");
        table.string("category").notNullable();
        table.boolean("dueDateExceeded");
        table.string("user").notNullable();
        table.string("type").notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("expenses");
};
