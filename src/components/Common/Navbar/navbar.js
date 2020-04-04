import React from "react";
import Button from "../Button/button";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { switchTab } from "../../../actions/index";

// class Navbar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       activeBtn: "Home"
//     };

//     this.handleBtnClick = this.handleBtnClick.bind(this);
//   }

//   handleBtnClick(e) {
//     const btnName = e.target.innerText;
//     this.setState({
//       activeBtn: btnName
//     });
//     this.props.setActiveButton(btnName);
//   }

//   render() {
//     const buttons = ["Home", "Activity", "Analysis"];
//     const dispatch = useDispatch();
//     const activeB = useSelector(state => state.switchTab);
//     return (
//       <div className="navbar">
//         {buttons.map((name, index) => {
//           return (
//             // <Button key={index} classNames={'btn-nav'} name={name} handleClick={this.handleBtnClick} isActive={this.state.activeBtn === name} />
//             <Button
//               key={index}
//               classNames={"btn-nav"}
//               name={name}
//               handleClick={name => dispatch(switchTab(name))}
//               isActive={activeB === name}
//             />
//             // <button onClick={this.handleBtnClick}>{name}</button>
//           );
//         })}
//       </div>
//     );
//   }
// }

const Navbar = ({ updatePage }) => {
  const buttons = ["Home", "Analysis", "Activity"];
  const dispatch = useDispatch();
  const activeB = useSelector((state) => state.switchTab);
  return (
    <div className="navbar">
      {buttons.map((name, index) => {
        return (
          <Button
            key={index}
            classNames={"btn-nav"}
            name={name}
            handleClick={() => {
              dispatch(switchTab(name));
              updatePage(name);
            }}
            isActive={activeB === name}
            // isActive={this.state.activeBtn === name}
          />
        );
      })}
    </div>
  );
};
export default Navbar;
