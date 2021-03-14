import {
  UPDATE_CHECKPOINT,
  UPDATE_TIMELEFT,
  ADD_STORYRECORD,
  INIT_STORYRECORD,
  SET_USERID,
} from './actions';
import {combineReducers} from 'redux';

const checkPoint = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_CHECKPOINT:
      return action.checkPoint + 5;
    default:
      return state;
  }
};

const timeLeft = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_TIMELEFT:
      return action.timeLeft;
    default:
      return state;
  }
};

const storyRecord = (state = [], action) => {
  switch (action.type) {
    case ADD_STORYRECORD:
      return [{...action.storyRecord}, ...state];
    case INIT_STORYRECORD:
      return action.storyRecord;
    default:
      return state;
  }
};

const userID = (state = '', action) => {
  switch (action.type) {
    case SET_USERID:
      return action.userID;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  checkPoint,
  timeLeft,
  storyRecord,
  userID,
});

export default rootReducer;
