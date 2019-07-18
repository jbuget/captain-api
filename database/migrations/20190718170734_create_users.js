exports.up = function(knex) {

  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').nullable();
    t.dateTime('deletedAt').nullable();

    t.string('first_name').notNull();
    t.string('last_name').notNull();
    t.string('email').notNull();
    t.string('password').notNull();
  });

};

exports.down = function(knex) {

  return knex.schema.dropTable('users');
};
