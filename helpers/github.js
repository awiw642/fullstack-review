const request = require('request');
const config = require('../config.js');
const Promise = require('bluebird');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return new Promise((resolve, reject) => {
    request.get(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (body.message) {
        console.log(body.message);
        reject(new Error('Failed to get GitHub profile: ' + body.message));
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

module.exports.getReposByUsername = getReposByUsername;