export const UPDATE_CHECKPOINT = 'UPDATE_CHECKPOINT';
export const UPDATE_TIMELEFT = 'UPDATE_TIMELEFT';
export const ADD_STORYRECORD = 'ADD_STORYRECORD';
export const INIT_STORYRECORD = 'INIT_STORYRECORD';
export const SET_USERID = 'SET_USERID';

export const updateCheckPoint = (checkPoint) => ({
  type: UPDATE_CHECKPOINT,
  checkPoint,
});

export const updateTimeLeft = (timeLeft) => ({
  type: UPDATE_TIMELEFT,
  timeLeft,
});

export const addStoryRecord = (storyRecord) => ({
  type: ADD_STORYRECORD,
  storyRecord,
});

export const initStoryRecord = (storyRecord) => ({
  type: INIT_STORYRECORD,
  storyRecord,
});

export const setUserID = (userID) => ({
  type: SET_USERID,
  userID,
});
