import React from "react";
import Header from "./components/Common/Header/header";
import Footer from "./components/Common/Footer/footer";
import FooterBanner from "./components/Common/Footer/footerBanner";
import Projects from "./components/ProjectSelector/projectSelector";
import Timer from "./components/Timer/timer";
import Navbar from "./components/Common/Navbar/navbar";
import Chart from "./components/Chart/chart";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      projectSelected: false,
      timerStarted: false,
      displayBanner: localStorage.getItem("banner_displayed") === null,
      dialogOpen: false,
      page: "Home",
      projectChanged: false,
    };
    this.projectUpdated = this.projectUpdated.bind(this);
    this.updateTimerStarted = this.updateTimerStarted.bind(this);
    this.hideBanner = this.hideBanner.bind(this);
    this.closeInputDialog = this.closeInputDialog.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }

  updatePage(page) {
    this.setState({
      page,
    });
  }

  componentDidMount() {
    document.title += " | Home";
  }

  closeInputDialog(e) {
    if (e.target.id !== "project-name") {
      this.setState({
        // inputDialogClosed: !this.state.inputDialogClosed,
        dialogOpen: false,
      });
    }
  }

  hideBanner() {
    localStorage.setItem("banner_displayed", 1);
    this.setState({
      displayBanner: false,
    });
  }

  projectUpdated(projectName, selectType) {
    this.setState({
      projectSelected: projectName.length > 0,
    });
    if (selectType === "changed") {
      this.setState({
        projectChanged: !this.state.projectChanged,
      });
    }
  }

  updateTimerStarted(started = false) {
    this.setState({
      timerStarted: started,
    });
  }

  render() {
    let contentPage;
    switch (this.state.page) {
      case "Activity":
        contentPage = "Activity Page";
        break;
      case "Analysis":
        contentPage = <Chart />;
        break;
      default:
        contentPage = (
          <React.Fragment>
            <Projects
              dialogOpen={this.state.dialogOpen}
              updateProject={this.projectUpdated}
            />
            <Timer
              updateTimerStatus={this.updateTimerStarted}
              projectIsSelected={this.state.projectSelected}
              projectChanged={this.state.projectChanged}
            />
          </React.Fragment>
        );
    }

    return (
      <div onClick={this.closeInputDialog} className="App">
        <Header timerStarted={this.state.timerStarted} />
        <Navbar updatePage={this.updatePage} />
        <div className="App-box">{contentPage}</div>
        <Footer />
        {this.state.displayBanner ? (
          <FooterBanner togglBanner={this.hideBanner} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
