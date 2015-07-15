// This file is the "entry point" for the application. When the application runs, Browserify creates
// app/js/bundle.js, which contains all the application code and points here for its initial
// instructions

var React = require('react');
var Actions = require('./Actions');
var TimeDisplay = require('./TimeDisplay');

// Send a message to anything listening that we want to start the application
Actions.appStartup();

// Render the TimeDisplay component inside the HTML element with ID 'container'
React.render(
  <TimeDisplay format="hh:MM:ss" />,
  document.getElementById('container')
);
