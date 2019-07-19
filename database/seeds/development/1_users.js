exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Alice',
          last_name: 'Johnson',
          email: 'alice@granny.js',
          password: 'abcd1234',
        },
        {
          id: 2,
          first_name: 'Bob',
          last_name: 'Mayweather',
          email: 'bob@granny.js',
          password: 'abcd1234',
        },
        {
          id: 3,
          first_name: 'Carl',
          last_name: 'Smith',
          email: 'carl@granny.js',
          password: 'abcd1234',
        },
      ]);
    });
};
