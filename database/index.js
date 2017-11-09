const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  owner: String,
  name: String,
  createdAt: Date,
  starCount: Number,
  forksCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

exports.save = (repo) => {
  let repository = new Repo(repo);
  repository.save((error, repo) => {
    console.log(repo);
    if (error) {
      console.log(error);
    }
  })
};

exports.fetch = (next) => {
  Repo.
    find({}).
    limit(25).
    sort('-createdAt').
    exec(next)
};

