// These two packages seem to be used a lot in creating what are called "stores" in React
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('./AppDispatcher');
var Actions = require('./Actions');
var Constants = require('./Constants');

// The name of the event subscribed to by components that want to know when the clock ticks
var TICK_EVENT = "tick";

// Holds a reference to the periodic method call that causes the clock to tick
var _tickInterval;

// This is an event-emitting object that manages a sort of state within the application;
// the React jargon for this seems to be "store."
var Clock = assign({}, EventEmitter.prototype, {
  init: function() {
    // Set up a periodic call every 500 milliseconds to cause the clock to tick.
    // I think this may violate the Flux architecture by having a "store" call an "action," but
    // right now it seems like the most elegant path.
    _tickInterval = setInterval(Actions.tick, 500);
  },
  destroy: function() {
    // Avoid memory leaks by getting rid of this interval when we're done with it
    clearInterval(_tickInterval);
  },

  getCurrentTime: function() {
    return new Date();
  },

  // Handles behavior for when a TICK_EVENT is detected
  _onTick: function() {
    this.emit(TICK_EVENT);
  },
  // Allows components to subscribe to TICK_EVENT
  addTickListener: function(callback) {
    this.on(TICK_EVENT, callback);
  },
  // Avoid memory leaks by removing event listeners when their parent components die off
  removeTickListener: function(callback) {
    this.removeListener(TICK_EVENT, callback);
  }
});

// Register this store with the application's Dispatcher so it can handle events
AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case Constants.APP_STARTUP:
      // Make the clock start ticking when the application starts
      Clock.init();
      break;
    case Constants.CLOCK_TICK:
      // Send out an event notification to components when the clock ticks
      Clock._onTick();
      break;
    case Constants.APP_SHUTDOWN:
      // Clean up resources when the application shuts down
      Clock.destroy();
      break;
  }
});

module.exports = Clock;
