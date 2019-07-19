const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
});

// 404
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

// 5XX
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
