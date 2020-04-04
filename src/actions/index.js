export const switchTab = tab => {
  return {
    type: "SWITCH_TAB",
    payload: tab
  };
};

export const timerRunning = (isRunning) => {
  return {
    type: "TIMER_RUNNING",
    payload: isRunning
  };
};

export const selectProject = (projectID) => {
  return {
    type: "SELECT_PROJECT",
    payload: projectID
  };
};
