import React from "react";
import logo from "./hourglass.png";
import Projects from "./components/Projects/projects";
import Timer from "./components/Timer/timer";
import Navbar from "./components/Navbar/navbar";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      projectSelected: false,
      activeButton: "",
      timerStarted: false
    };
    this.projectUpdated = this.projectUpdated.bind(this);
    this.setActiveButton = this.setActiveButton.bind(this);
    this.updateTimerStarted = this.updateTimerStarted.bind(this);
  }

  componentDidMount() {
    document.title += ' | Home';
  }

  projectUpdated(projectName) {
    this.setState({
      projectSelected: projectName.length > 0
    });
  }

  setActiveButton(btnName) {
    this.setState({
      activeButton: btnName
    });
  }

  updateTimerStarted(started = false) {
    this.setState({
      timerStarted: started
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-brand">
          <h1 style={{ margin: 0, padding: 20 }}>Clockwork</h1>
          <img
            className={this.state.timerStarted ? "App-logo" : ""}
            height="30"
            src={logo}
            alt="clockwork"
          />
        </header>
        <Navbar setActiveButton={this.setActiveButton} />
        <div className="App-box">
          <Projects updateProject={this.projectUpdated} />
          <Timer
            timerStarted={this.updateTimerStarted}
            projectIsSelected={this.state.projectSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;
