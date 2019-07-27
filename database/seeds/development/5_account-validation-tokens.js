exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('account-validation-tokens').del()
    .then(() => {
      // Inserts seed entries
      return knex('account-validation-tokens').insert([
        {
          user_id: 1,
          uuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 2,
          uuid: '3bbcee75-cecc-5b56-8031-b6641c1ed1f1',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 3,
          uuid: '1b671a64-40d5-491e-99b0-da01ff1f3341',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 4,
          uuid: '630eb68f-e0fa-5ecc-887a-7c7a62614681',
          used: false,
        },
        {
          user_id: 5,
          uuid: '9f282611-e0fd-5650-8953-89c8e342da0b',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          uuid: 'ddeb27fb-d9a0-4624-be4d-4615062daed4',
          used: true,
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
