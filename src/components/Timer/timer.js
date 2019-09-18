import React from "react";
import "./timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {}

  timerStart() {
    if (!this.intervalRunning && this.props.projectIsSelected) {
      this.interval = setInterval(
        () =>
          this.setState(prevState => {
            let currSeconds = prevState.seconds + 1;
            let currMinutes = prevState.minutes;
            let currHours = prevState.hours;
            if (currSeconds > 60) {
              currSeconds = 0;
              currMinutes += 1;
            }
            if (currMinutes > 60) {
              currMinutes = 0;
              currHours += 1;
            }

            return {
              hours: currHours,
              minutes: currMinutes,
              seconds: currSeconds
            };
          }),
        1000
      );
      this.intervalRunning = true;
    }
  }

  timerStop() {
    clearInterval(this.interval);
    this.intervalRunning = false;
  }

  timerReset() {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    clearInterval(this.interval);
    this.intervalRunning = false;
  }

  render() {
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyPress}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 id="time-spent">
          {this.state.hours}h {this.state.minutes}m {this.state.seconds}s
        </h1>

        <div className="buttons">
          <button className={this.props.projectIsSelected ? 'success' : 'disabled'} onClick={this.timerStart}>Start</button>
          <button onClick={this.timerStop}>Stop</button>
          <button onClick={this.timerReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Timer;
