import React from "react";
import "./projects.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: ["FCC", "TEST1", "Symfony", "Drupal", "Laravel", "React", "Personal"],
      project: "",
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
    });
    this.props.updateProject(searchFor);
  }

  updateInput(e) {
    const projectName = e.target.innerText || e.target.textContent;
    this.setState({
      project: projectName,
      search: false
    });
    this.props.updateProject(projectName);
  }

  toggleDropdown() {
    this.setState({
      search: !this.state.search,
    });
    if (!this.state.search) {
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
            display: this.state.search ? "block" : "none",
            position: "fixed"
          }}
          className="projects-dropdown"
        >
          <ul>
            {this.state.projects
              .filter(project => project.indexOf(this.state.project) !== -1)
              .map((item, index) => (
                <li onClick={this.updateInput} key={index}>
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
