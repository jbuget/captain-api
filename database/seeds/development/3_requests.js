exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then(() => {
      // Inserts seed entries
      return knex('requests').insert([
        {
          id: 1,
          collection_id: 1, // Alice #1
          name: 'Google',
          method: 'GET',
          url: 'https://google.com',
          headers: null,
          body: null,
        },
        {
          id: 2,
          collection_id: 4, // Bob
          name: 'Granny',
          method: 'GET',
          url: 'https://granny.netlify.com',
          headers: null,
          body: null,
        },
        {
          id: 3,
          collection_id: 5, // Alice & Bob
          name: 'Authenticate',
          method: 'POST',
          url: 'http://localhost:3000/token',
          headers: null,
          body: '',
        },
      ]);
    });
};
