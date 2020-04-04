const projectSelectReducer = (state = null, action) => {
    switch (action.type) {
      case "SELECT_PROJECT":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default projectSelectReducer;