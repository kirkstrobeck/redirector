'use strict';

module.exports.redirect = (event, context, callback) => {
  if (process.env.LOCAL) {
    const redirects = require(require('path').resolve(
      __dirname,
      '../test/redirects.json'
    ));
    callback(null, {
      statusCode: 301,
      headers: {
        Location: redirects[event.path] || redirects.__DEFAULT__,
      },
    });
  } else {
    var AWS = require('aws-sdk');
    new AWS.S3().getObject(
      {
        Bucket: process.env.BUCKET,
        Key: 'redirects.json',
      },
      function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          const redirects = JSON.parse(data.Body.toString('utf-8'));
          callback(null, {
            statusCode: 301,
            headers: {
              Location: redirects[event.path] || redirects.__DEFAULT__,
            },
          });
        }
      }
    );
  }
};
