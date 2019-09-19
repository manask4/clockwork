import React from "react";
import "./navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: 'Home',
    }

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick(e) {
    const btnName = e.target.innerText;
    this.setState({
      activeBtn: btnName
    });
    this.props.setActiveButton(btnName);
  }

  render() {
    const buttons = ['Home', 'Tasks', 'Analysis'];
    return (
      <div className="navbar" >
        {
          buttons.map((name, index) => {
            return (
              <button className={this.state.activeBtn === name ? 'active' : ''} onClick={this.handleBtnClick}>{name}</button>
            )
          })
        }
      </div>
    );
  }
}

export default Navbar;