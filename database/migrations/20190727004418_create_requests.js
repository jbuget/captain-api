const tableName = 'requests';

exports.up = function(knex) {

  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('name').notNull();
    t.string('url').notNull();
    t.string('method').notNull();
    t.text('headers').nullable();
    t.text('body').nullable();

    t.integer('team_id').unsigned().notNullable();
    t.foreign('team_id').references('id').inTable('teams');
  });
};

exports.down = function(knex) {

  return knex.schema.dropTable(tableName);
};
