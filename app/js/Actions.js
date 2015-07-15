var AppDispatcher = require ('./AppDispatcher');
var Constants = require('./Constants');

// Defines messages ("actions") that will be passed by the application's Dispatcher to anything
// that subscribes to those message types; data can be passed in these messages, as well, by adding
// more keys to the object passed in AppDispatcher.dispatch()
var Actions = {
  // Should be called whenever the clock ticks
  tick: function() {
    AppDispatcher.dispatch({
      actionType: Constants.CLOCK_TICK
    });
  },
  // Should be called once at application startup
  appStartup: function() {
    AppDispatcher.dispatch({
      actionType: Constants.APP_STARTUP
    });
  },
  // Should be called once at application shutdown (?? - when does this happen, exactly?)
  appShutdown: function() {
    AppDispatcher.dispatch({
      actionType: Constants.APP_SHUTDOWN
    });
  }
};

module.exports = Actions;
