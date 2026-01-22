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
    table.integer("day");
    table.boolean("active").defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reminders");
};
