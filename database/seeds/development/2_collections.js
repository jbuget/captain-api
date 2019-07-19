exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('collections').del()
    .then(() => {
      // Inserts seed entries
      return knex('collections').insert([
        {
          id: 1,
          name: 'Alice’s collection #1',
        },
        {
          id: 2,
          name: 'Alice’s collection #2',
        },
        {
          id: 3,
          name: 'Alice’s collection #3',
        },
        {
          id: 4,
          name: 'Bob’s collection',
        },
        {
          id: 5,
          name: 'Alice & Bob’s collection',
        },
      ]);
    });
};
