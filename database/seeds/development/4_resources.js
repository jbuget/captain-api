exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(() => {
      // Inserts seed entries
      return knex('resources').insert([
        {
          team_id: 1,
          name: 'Get API data',
          method: 'GET',
          url: 'https://granny.netlify.com',
          headers: null,
          body: null,
        },
        {
          team_id: 1,
          name: 'Create an account',
          method: 'POST',
          url: 'http://localhost:3000/users',
          headers: JSON.stringify({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            "name": "Alice",
            "email": "alice@example.net",
            "password": "abcd1234"
          }),
        },
        {
          team_id: 1,
          name: 'Validate a created account',
          method: 'POST',
          url: 'http://localhost:3000/users/account-validation',
          headers: JSON.stringify({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            "userId": 4,
            "uuid": "630eb68f-e0fa-5ecc-887a-7c7a62614681"
          }),
        },
        {
          team_id: 1,
          name: 'Login',
          method: 'GET',
          url: 'http://localhost:3000/token',
          headers: JSON.stringify({
            "Content-Type": "application/x-www-form-urlencoded"
          }),
          body: JSON.stringify({
            "username": "alice@example.net",
            "password": "abcd1234"
          }),
        },
        {
          team_id: 1,
          name: 'Get account information',
          method: 'GET',
          url: 'http://localhost:3000/users/me',
          headers: JSON.stringify({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcmFubnkuanMiLCJzdWIiOjEsIm5hbWUiOiJBbGljZSBKb2huc29uIiwiZW1haWwiOiJhbGljZUBncmFubnkuanMiLCJpYXQiOjE1NjQ0NzU1MDF9.3VGPg-Zgb3XKaXUrcRTJYLjYFOQiB-axwahnvLXQMYs",
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            "userId": 4,
            "uuid": "630eb68f-e0fa-5ecc-887a-7c7a62614681"
          }),
        },
        {
          team_id: 1,
          name: 'Update an account',
          method: 'PATCH',
          url: 'http://localhost:3000/users/me',
          headers: JSON.stringify({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcmFubnkuanMiLCJzdWIiOjEsIm5hbWUiOiJBbGljZSBKb2huc29uIiwiZW1haWwiOiJhbGljZUBncmFubnkuanMiLCJpYXQiOjE1NjQ0NzU1MDF9.3VGPg-Zgb3XKaXUrcRTJYLjYFOQiB-axwahnvLXQMYs",
            "Content-Type": "application/json"
          }),
          body: {
            "name": "Alice Smith",
          },
        },
        {
          team_id: 1,
          name: 'Delete an account',
          method: 'DELETE',
          url: 'http://localhost:3000/users/me',
          headers: JSON.stringify({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcmFubnkuanMiLCJzdWIiOjEsIm5hbWUiOiJBbGljZSBKb2huc29uIiwiZW1haWwiOiJhbGljZUBncmFubnkuanMiLCJpYXQiOjE1NjQ0NzU1MDF9.3VGPg-Zgb3XKaXUrcRTJYLjYFOQiB-axwahnvLXQMYs",
            "Content-Type": "application/json"
          }),
          body: null,
        },
        {
          team_id: 1,
          name: 'Create a team',
          method: 'POST',
          url: 'http://localhost:3000/teams',
          headers: JSON.stringify({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcmFubnkuanMiLCJzdWIiOjEsIm5hbWUiOiJBbGljZSBKb2huc29uIiwiZW1haWwiOiJhbGljZUBncmFubnkuanMiLCJpYXQiOjE1NjQ0NzU1MDF9.3VGPg-Zgb3XKaXUrcRTJYLjYFOQiB-axwahnvLXQMYs",
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            "name": "Delta Corp"
          }),
        },
        {
          team_id: 1,
          name: 'Get user’s teams',
          method: 'GET',
          url: 'http://localhost:3000/me/teams',
          headers: JSON.stringify({
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJHcmFubnkuanMiLCJzdWIiOjEsIm5hbWUiOiJBbGljZSBKb2huc29uIiwiZW1haWwiOiJhbGljZUBncmFubnkuanMiLCJpYXQiOjE1NjQ0NzU1MDF9.3VGPg-Zgb3XKaXUrcRTJYLjYFOQiB-axwahnvLXQMYs",
            "Content-Type": "application/json"
          }),
          body: null,
        },
      ]);
    });
};
