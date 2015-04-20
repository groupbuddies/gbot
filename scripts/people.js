// Commands:
//    hubot people - List all GB members
//    hubot people [query] - Search people by any field

var hq = require('../lib/headquarters');

module.exports = function(robot) {
  robot.respond(/people$/i, function(msg) {
    hq.member.all().then(function(members) {
      msg.send(parsedMembers(members));
    });
  });

  robot.respond(/people (.*)/i, function(msg) {
    var query = msg.match[1];
    var members = hq.member.search(query).then(function(members) {
      msg.send(parsedMembers(members));
    });
  })
};

function parsedMembers(members) {
  if (members.length == 0) {
    return "No results";
  }

  if (members.length == 1) {
    return parsedSingleMember(members[0]);
  }

  return members.map(function(member) {
    return member.name + " - " +
      member.email + ", " +
      (member.phone_no || "[no phone number]" + ", " +
      "@" + member.twitter_handle);
  }).join("\n");
}

function parsedSingleMember(member) {
  return Object.keys(member).map(function(attr) {
    return attr + ": " + member[attr];
  }).join("\n");
}
