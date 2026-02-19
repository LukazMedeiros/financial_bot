/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTableIfNotExists("categories", (table) => {
        table
            .string("id")
            .notNullable()
            .unique()
            .primary()
            .defaultTo(knex.fn.uuid());
        table.string("topicTitle").notNullable();
        table.integer("topicId").notNullable();
        table.string("active").notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("categories");
};
