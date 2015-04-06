// Commands:
//    hubot prs - List all open pull requests for GB

require('dotenv').load();
var Headquarters = require('headquarters-node');

var hq = Headquarters({
  clientID: process.env.HQ_APP_ID,
  clientSecret: process.env.HQ_APP_SECRET,
  callbackURL: 'https://gbot.groupbuddies.com/users/auth/headquarters/callback'
});

module.exports = function(robot) {
  robot.respond(/prs/i, function(response) {
    hq.github.pullRequests('is:open').then(function(data) {
      var prs = data.items.map(function(item) {
        var repoName = item.html_url.match(/github.com\/(.*)\/pull/)[1];

        return "[" + repoName + "] " + item.title + "\n" +
              item.url + "\n";
      });
      response.send(prs.join("\n"));
    });
  });
}
