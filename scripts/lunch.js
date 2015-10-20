require('dotenv').load();

var FB = require('fb');

var toDateString = function(date) {
  return new Date(date).toDateString();
};

var requestTodayFeed = function(callback) {
  FB.api('622844924478142/posts', { fields: ['full_picture', 'created_time'] }, function(res) {
    if (!res)
      return callback('Error');

    if (res.error)
      return callback(res.error);

    var currentDate = new Date();
    var images = [];

    res.data.forEach(function(post) {
      if (currentDate.toDateString() == toDateString(post.created_time))
        images.push(post.full_picture);
    });

    if (images.length > 0) {
      callback(images.join(' '));
    } else {
      callback("Sushi&Grill a favar. Parece que vai ser bocas hoje");
    }
  });
};

var requestAccessToken = function(callback) {
  FB.api('oauth/access_token', {
    client_id: process.env.FB_APP_ID,
    client_secret: process.env.FB_APP_SECRET,
    grant_type: 'client_credentials'
  }, function(res) {
    if (!res)
      return callback('Error');

    if (res.error)
      return callback(res.error);

    FB.setAccessToken(res.access_token);
    callback();
  });
};

module.exports = function(robot) {
  robot.respond(/^lunch$/i, function(response) {
    try {
      requestAccessToken(function(error) {
        if (error)
          return response.send(error);

        requestTodayFeed(function(message) {
          response.send(message);
        });
      });
    } catch (e) {
      response.send(e.message);
    }
  });
};
