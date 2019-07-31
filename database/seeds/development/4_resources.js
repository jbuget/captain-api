exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(() => {
      // Inserts seed entries
      return knex('resources').insert([
        {
          team_id: 1,
          name: 'Google',
          method: 'GET',
          url: 'https://google.com',
          headers: null,
          body: null,
        },
        {
          team_id: 1,
          name: 'Granny',
          method: 'GET',
          url: 'https://granny.netlify.com',
          headers: null,
          body: null,
        },
        {
          team_id: 1,
          name: 'Authenticate',
          method: 'POST',
          url: 'http://localhost:3000/token',
          headers: null,
          body: '',
        },
      ]);
    });
};
