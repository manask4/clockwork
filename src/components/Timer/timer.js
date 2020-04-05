import React from "react";
import Button from "../Common/Button/button";
import "./timer.css";
import { timerRunning } from "../../actions/index";
import { connect } from "react-redux";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTimerButtonOperation = this.handleTimerButtonOperation.bind(
      this
    );
  }

  handleKeyPress(e) {}

  handleTimerButtonOperation(e) {
    const btnName = e.target.getAttribute("name");
    switch (btnName) {
      case "start":
        this.timerStart();
        this.props.startTimer();
        break;
      case "stop":
        this.timerStop();
        this.props.stopTimer();
        break;
      default:
        this.timerReset();
    }
  }

  timerStart() {
    if (!this.intervalRunning && this.props.projectIsSelected) {
      this.interval = setInterval(() => {
        return this.setState((prevState) => {
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
          document.title = `${currHours}h ${currMinutes}m ${currSeconds}s`;
          return {
            hours: currHours,
            minutes: currMinutes,
            seconds: currSeconds,
          };
        });
      }, 1000);
      this.intervalRunning = true;
      this.props.updateTimerStatus(true);

      this.updateProjectData();
    }
  }

  getCurrentDate() {
    const date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month.toString();
    let dateNum = date.getDate().toString();

    return year + month + dateNum;
  }

  updateWorkData() {
    const item = document.querySelector("#project-name").value;
    const workTime = this.convertTimeToSeconds();
    const d = this.getCurrentDate();
    let work = localStorage.getItem("work");
    if (work !== null) {
      work = JSON.parse(work);
      if (!work.hasOwnProperty(d)) {
        work[d] = {};
        work[d][item] = [workTime];
      } else {
        if (work[d].hasOwnProperty(item)) {
          work[d][item].push(workTime);
        } else {
          work[d][item] = [workTime];
        }
      }
      localStorage.setItem("work", JSON.stringify(work));
    } else {
      work = {};
      work[d] = {};
      work[d][item] = [workTime];
      localStorage.setItem("work", JSON.stringify(work));
    }
  }

  updateProjectData() {
    let item = document.querySelector("#project-name").value;
    let projects = localStorage.getItem("projects");
    if (projects !== null) {
      projects = JSON.parse(projects);
      if (!projects.includes(item)) {
        projects.push(item);
        localStorage.setItem("projects", JSON.stringify(projects));
      }
    } else {
      projects = [item];
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  convertTimeToSeconds() {
    let hours = this.state.hours / 3600;
    let minutes = this.state.minutes / 60;
    return hours + minutes + this.state.seconds;
  }

  timerStop() {
    clearInterval(this.interval);
    this.intervalRunning = false;
    this.props.updateTimerStatus();
    this.updateWorkData();
  }

  timerReset() {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    clearInterval(this.interval);
    this.intervalRunning = false;
    this.props.updateTimerStatus();
    document.title = "Clockwork | Home";
  }

  render() {
    const timerButtons = ["START", "STOP", "RESET"];
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyPress}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 id="time-spent">
          {this.state.hours}h {this.state.minutes}m {this.state.seconds}s
        </h1>

        <div className="timer-buttons">
          {timerButtons.map((name, index) => {
            const uniqueClassName = `btn-${name.toLowerCase()}`;
            const classNames = this.props.projectIsSelected
              ? uniqueClassName
              : "btn-disabled";
            return (
              <Button
                key={index}
                handleClick={this.handleTimerButtonOperation}
                classNames={`btn-timer ${classNames}`}
                name={name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    stopTimer: () => {
      dispatch(timerRunning(false));
    },
    startTimer: () => {
      dispatch(timerRunning(true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
