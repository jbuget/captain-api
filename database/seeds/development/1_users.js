exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          // id: 1,
          name: 'Alice Johnson',
          email: 'alice@granny.js',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          status: 'VALIDATED',
          updated_at: knex.fn.now(),
        },
        {
          // id: 2,
          name: 'Bob Mayweather',
          email: 'bob@granny.js',
          password: '$2b$10$TnN1dPAAb9vlO7NhB5KOgun6CsxcsxszKhPvGpWpzaSuZngEagnoS',
          status: 'VALIDATED',
          updated_at: knex.fn.now(),
        },
        {
          // id: 3,
          name: 'Carl Smith',
          email: 'carl@granny.js',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          status: 'VALIDATED',
          updated_at: knex.fn.now(),
        },
        {
          // id: 4,
          name: 'Created User',
          email: 'user4@example.net',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          status: 'CREATED',
        },
        {
          // id: 5,
          name: 'Disabled User',
          email: 'user5@example.net',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          status: 'DISABLED',
          updated_at: knex.fn.now(),
        },
        {
          // id: 6,
          name: 'Deleted User',
          email: 'user6@example.net',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          status: 'DELETED',
          updated_at: knex.fn.now(),
          deleted_at: knex.fn.now(),
        },
      ]);
    });
};
