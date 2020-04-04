const timerReducer = (state = false, action) => {
  switch (action.type) {
    case "TIMER_RUNNING":
      return action.payload;
    default:
      return state;
  }
};

export default timerReducer;
