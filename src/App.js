import React from "react";
// import logo from "./logo.svg";
import Projects from "./components/Projects/projects";
import Timer from "./components/Timer/timer";
import "./App.css";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      projectSelected: false,
    }
    this.projectUpdated = this.projectUpdated.bind(this);
  }

  projectUpdated(projectName) {
    this.setState({
      projectSelected: projectName.length > 0,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Projects updateProject={this.projectUpdated} />
          <Timer projectIsSelected={this.state.projectSelected} />
        </header>
      </div>
    );
  }
}

export default App;
