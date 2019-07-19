const tableName = 'teams';

exports.up = function(knex) {

  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('name').notNull();
  });
};

exports.down = function(knex) {

  return knex.schema.dropTable(tableName);
};
