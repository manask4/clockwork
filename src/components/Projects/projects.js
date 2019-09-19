import React from "react";
import "./projects.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      project: "",
      pid: 0,
      dialogOpen: false,
      search: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleChange(e) {
    const searchFor = e.target.value;
    this.setState({
      project: searchFor,
      search: searchFor.length > 0,
      pid: 0,
    });
    // this.props.updateProject(searchFor);
  }

  updateInput(e) {
    const pid = e.target.getAttribute('data-pid');
    const projectName = e.target.innerText || e.target.textContent;
    this.setState({
      project: projectName,
      search: false,
      pid
    });
    this.props.updateProject(projectName);
  }

  toggleDropdown() {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    });
    if (!this.state.dialogOpen) {
      document.querySelector('input').focus();
    }
  }

  render() {
    return (
      <div onClick={this.toggleDropdown} style={{ width: "20rem" }}>
        <div className="projects-select">
          <input
            onChange={this.handleChange}
            placeholder="What are you working on?"
            id="project-name"
            type="text"
            value={this.state.project}
          />
          <span>
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
        <div
          style={{
            display: this.state.dialogOpen ? "block" : "none",
          }}
          className="projects-dropdown"
        >
          <ul>
            {this.state.projects
              .filter(project => project.toLowerCase().indexOf(this.state.project.toLowerCase()) !== -1 || !this.state.dialogOpen)
              .map((item, index) => (
                <li onClick={this.updateInput} data-pid={index + 1} key={index}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
