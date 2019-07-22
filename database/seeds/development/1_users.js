exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@granny.js',
          password: 'abcd1234',
        },
        {
          id: 2,
          name: 'Bob Mayweather',
          email: 'bob@granny.js',
          password: 'abcd1234',
        },
        {
          id: 3,
          name: 'Carl Smith',
          email: 'carl@granny.js',
          password: 'abcd1234',
        },
      ]);
    });
};
