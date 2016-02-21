// include and initialize the rollbar library with your access token
var rollbar = require("rollbar");
rollbar.init(process.env.ROLLBAR_GULP_ACCESS_TOKEN||"570f8a2bb2cb45baa7ea9caff5c1ed0b");

// record a generic message and send to rollbar
// rollbar.reportMessage("Hello world!");

rollbar.handleUncaughtExceptions();

module.exports = rollbar;
