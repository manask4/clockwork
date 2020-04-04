const switchTabReducer = (state = 'Home', action) => {
  switch (action.type) {
    case "SWITCH_TAB":
      return action.payload;
    default:
      return state;
  }
};

export default switchTabReducer;