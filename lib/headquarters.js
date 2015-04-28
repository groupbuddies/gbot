require('dotenv').load();
var Headquarters = require('headquarters-node');

module.exports = Headquarters({
  clientID: process.env.HQ_APP_ID,
  clientSecret: process.env.HQ_APP_SECRET,
  type: "clientCredentials"
});
