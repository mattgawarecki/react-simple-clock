var keyMirror = require('keymirror');

// Just some constants used for identifying and responding to messages ("actions")
// within the application

// I don't suppose we NEED to use keyMirror to set up a simple dictionary, but this seems to be a
// convention for defining this sort of "constants class" in React
module.exports = keyMirror({
  APP_STARTUP: null,
  CLOCK_TICK: null,
  APP_SHUTDOWN: null
});
