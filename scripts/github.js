// Commands:
//    hubot prs - List all open pull requests for GB

require('dotenv').load();
var hq = require('../lib/headquarters');


module.exports = function(robot) {
  robot.respond(/prs/i, function(response) {
    hq.github.pullRequests('is:open').then(function(data) {
      var prs = data.items.map(function(item) {
        var repoName = item.html_url.match(/github.com\/(.*)\/pull/)[1];

        return "[" + repoName + "] " + item.title + "\n" +
              item.html_url + "\n";
      });
      response.send(prs.join("\n"));
    });
  });
};
