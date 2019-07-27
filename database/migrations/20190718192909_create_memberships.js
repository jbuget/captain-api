const tableName = 'memberships';

exports.up = function(knex) {

  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull().defaultTo(knex.fn.now());
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('role').notNull();

    t.integer('user_id').unsigned().notNullable();
    t.foreign('user_id').references('id').inTable('users');

    t.integer('team_id').unsigned().notNullable();
    t.foreign('team_id').references('id').inTable('teams');

    t.unique(['user_id', 'team_id']);
  });
};

exports.down = function(knex) {

  return knex.schema.dropTable(tableName);
};
