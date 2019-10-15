exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(() => {
      // Inserts seed entries
      return knex('teams').insert([
        {
          // id: 1,
          name: 'ACME',
          description: '',
        },
        {
          // id: 2,
          name: 'Business Corp.',
          description: '',
        },
        {
          // id: 3,
          name: 'C. & cie.',
          description: '',
        },
      ]);
    });
};
