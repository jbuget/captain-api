const tableName = 'account-validation-tokens';

exports.up = function(knex) {

  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').nullable();

    t.string('uuid').notNull();
    t.boolean('used').notNull().defaultTo(false);

    t.integer('user_id').unsigned().notNullable();
    t.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {

  return knex.schema.dropTable(tableName);
};
