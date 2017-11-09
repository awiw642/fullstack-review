const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

//Transform raw requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  let username = req.body.user;
  return github.getReposByUsername(username)
    .then((repos) => {
      repos.forEach((repo) => {
        db.save({
          owner: repo.owner.login,
          name: repo.name,
          createdAt: repo.created_at,
          starCount: repo.stargazers_count,
          forksCount: repo.forks_count
        });
      });
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

