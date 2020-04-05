import React from "react";
import "./projectSelector.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: JSON.parse(localStorage.getItem("projects")) || [],
      project: "",
      pid: 0,
      dialogOpen: false,
      search: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.removeProject = this.removeProject.bind(this);
  }

  handleChange(e) {
    const searchFor = e.target.value;
    this.setState({
      project: searchFor,
      search: searchFor.length > 0,
      pid: 0
    });
    this.props.updateProject(searchFor);
  }

  removeProject(e) {
    let project = e.target.closest("li").innerText;
    let projects = localStorage.getItem("projects");
    if (projects !== null) {
      projects = JSON.parse(projects);
      if (projects.includes(project)) {
        let index = projects.indexOf(project);
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
        this.setState({
          projects: projects,
        });
      }
    }
  }

  updateInput(e) {
    const pid = e.target.getAttribute("data-pid");
    const projectName = e.target.innerText || e.target.textContent;
    this.setState({
      project: projectName,
      search: false,
      pid
    });
    let selectType = this.state.project.length > 0 && this.state.project !== projectName ? 'changed' : 'init';
    this.props.updateProject(projectName, selectType);
  }

  toggleDropdown(e) {
    if (e.target.closest("#project-delete") === null) {
      this.setState({
        dialogOpen: !this.state.dialogOpen,
        projects: JSON.parse(localStorage.getItem("projects")) || []
      });
      if (!this.state.dialogOpen) {
        document.querySelector("input").focus();
      }
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
            display:
              this.state.dialogOpen && !this.props.dialogOpen ? "block" : "none"
          }}
          className="projects-dropdown"
        >
          <ul>
            {this.state.projects
              .filter(
                project =>
                  project
                    .toLowerCase()
                    .indexOf(this.state.project.toLowerCase()) !== -1 ||
                  !this.state.dialogOpen
              )
              .map((item, index) => (
                <li data-pid={index + 1} key={index}>
                  <span onClick={this.updateInput}>{item}</span>
                  <span
                    id="project-delete"
                    onClick={this.removeProject}
                    style={{ float: "right", color: "#FF5630" }}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} size="1x" />
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProjectSelector;
