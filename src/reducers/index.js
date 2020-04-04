import switchTabReducer from "./switchTab";
import timerReducer from "./timer";
import projectSelectReducer from "./projectSelect";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    switchTab: switchTabReducer,
    timer: timerReducer,
    projectSelect: projectSelectReducer,
})

export default allReducers;