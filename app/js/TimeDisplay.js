var React = require('react');
var dateFormat = require('dateformat');
var Actions = require('./Actions');
var Clock = require('./Clock');

var TimeDisplay = React.createClass({
  // The state of the component whenever it renders for the first time; the current date will do
  getInitialState: function() {
    return { time: new Date() };
  },

  // Gets the current time from the Clock store whenever it gets a tick notification
  tick: function() {
    this.setState({ time: Clock.getCurrentTime() });
  },

  componentDidMount: function() {
    // Register to receive tick notifications from the clock
    Clock.addTickListener(this.tick);
  },
  componentWillUnmount: function() {
    // Stop receiving tick notifications and send a message to the Dispatcher to shut down the
    // application since we're the only component on the page (for now, anyway)
    Clock.removeTickListener(this.tick);
    Actions.appShutdown();
  },

  // Responsible for rendering the component each time it updates its state or has its properties
  // updated by its parent
  render: function() {
    // Format the date according to the properties of the component, which are defined by its parent
    var formatted = dateFormat(this.state.time, this.props.format);
    return (
      // Set a CSS class of "time-display"
      // NOTE: "className" is used here instead of "class" because React uses "className" to refer
      //       to HTML's "class" attribute and uses its own "class" attribute for something else
      //       internally
      <span className="time-display">
        {formatted}
      </span>
    )
  }
});

module.exports = TimeDisplay;
