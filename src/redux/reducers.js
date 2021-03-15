import {
  UPDATE_CHECKPOINT,
  INIT_CHECKPOINT,
  UPDATE_TIMELEFT,
  ADD_STORYRECORD,
  INIT_STORYRECORD,
  SET_USERDATA,
  UPDATE_CHATLIST,
  INIT_CHATLIST,
  UPDATE_PROGRESSRATE,
} from './actions';
import {combineReducers} from 'redux';

const checkPoint = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CHECKPOINT:
      return [{...action.checkPoint}, ...state];
    case INIT_CHECKPOINT:
      return action.checkPoint;
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

const userData = (state = {}, action) => {
  switch (action.type) {
    case SET_USERDATA:
      return action.userData;
    default:
      return state;
  }
};

const chatList = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CHATLIST:
      return [...state, {...action.chatList}];
    case INIT_CHATLIST:
      return action.chatList;
    default:
      return state;
  }
};

const progressRate = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_PROGRESSRATE:
      return action.progressRate;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  checkPoint,
  timeLeft,
  storyRecord,
  userData,
  chatList,
  progressRate,
});

export default rootReducer;
