var Dispatcher = require('flux').Dispatcher;

// Just a standard Dispatcher from the Flux project; handles event propagation from
// message-passing/"actions" as long as the application is running
module.exports = new Dispatcher();
