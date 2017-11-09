const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  owner: String,
  name: String,
  createdAt: Date,
  starCount: Number,
  forksCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  let repository = new Repo(repo);
  repository.save((error, repo) => {
    console.log(repo);
    if (error) {
      console.log(error);
    }
  })
}



module.exports.save = save;