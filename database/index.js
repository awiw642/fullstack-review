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

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected');
});

module.exports.save = save;