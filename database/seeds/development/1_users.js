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
        },
        {
          // id: 2,
          name: 'Bob Mayweather',
          email: 'bob@granny.js',
          password: '$2b$10$TnN1dPAAb9vlO7NhB5KOgun6CsxcsxszKhPvGpWpzaSuZngEagnoS',
        },
        {
          // id: 3,
          name: 'Carl Smith',
          email: 'carl@granny.js',
          password: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
        },
      ]);
    });
};
