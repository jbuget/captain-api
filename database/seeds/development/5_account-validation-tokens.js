exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('account-validation-tokens').del()
    .then(() => {
      // Inserts seed entries
      return knex('account-validation-tokens').insert([
        {
          user_id: 1,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 2,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 3,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 4,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: false,
        },
        {
          user_id: 5,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: true,
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          token: '$2b$10$DSL7yjxaomO9o/oCovP0/OdB9wKzNCPVPjroP3F.H/cwDOjktDmWK',
          used: true,
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
