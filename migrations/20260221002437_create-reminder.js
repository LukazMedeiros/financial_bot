/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTableIfNotExists("reminders", (table) => {
        table
            .string("id")
            .notNullable()
            .unique()
            .primary()
            .defaultTo(knex.fn.uuid());
        table.string("description").notNullable();
        table.integer("day").notNullable();
        table.boolean("active").defaultTo(true);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("reminders");
};
