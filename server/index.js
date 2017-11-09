const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

//Transform raw requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/repos', function (req, res) {
  let username = req.body.user;
  return github.getReposByUsername(username)
    .then((repos) => {
      repos.forEach((repo) => {
        db.save({
          id: repo.id,
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
  db.fetch((error, repos) => {
    if (error) {
      console.log(error);
    } else {
      console.log(repos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

