exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('memberships').del()
    .then(() => {
      // Inserts seed entries
      return knex('memberships').insert([
        // ACME
        {
          user_id: 1,
          team_id: 1,
          role: 'ADMIN',
        },
        {
          user_id: 2,
          team_id: 1,
          role: 'READER',
        },

        // Business Corp.
        {
          user_id: 1,
          team_id: 2,
          role: 'WRITER',
        },
        {
          user_id: 2,
          team_id: 2,
          role: 'ADMIN',
        },
        {
          user_id: 3,
          team_id: 2,
          role: 'READER',
        },

        // C & Cie.
        {
          user_id: 3,
          team_id: 3,
          role: 'ADMIN',
        },
      ]);
    });
};
