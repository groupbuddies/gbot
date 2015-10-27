// Commands:
//    hubot trap - Choose a random Subvisual member
//    hubot trap [action] - Assign a trap to a random Subvisual member

var hq = require('../lib/headquarters');

module.exports = function(robot) {
  robot.respond(/trap ?(.*)?/i, function(msg) {
    to = msg.match[1] || '';
    hq.member.all().then(function(members) {
      var index = Math.floor(Math.random() * members.length);
      var name = members[index].name;
      var slack = members[index].slack_handler;
      msg.send(members[index].name + ", It's a trap!! " + to + "\n" + members[index].slack_handler);
    });
  });
};
