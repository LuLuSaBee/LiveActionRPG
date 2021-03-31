export const UPDATE_CHECKPOINT = 'UPDATE_CHECKPOINT';
export const INIT_CHECKPOINT = 'INIT_CHECKPOINT';
export const UPDATE_TIMELEFT = 'UPDATE_TIMELEFT';
export const ADD_STORYRECORD = 'ADD_STORYRECORD';
export const INIT_STORYRECORD = 'INIT_STORYRECORD';
export const SET_USERDATA = 'SET_USERDATA';
export const UPDATE_CHATLIST = 'UPDATE_CHATLIST';
export const INIT_CHATLIST = 'INIT_CHATLIST';
export const UPDATE_PROGRESSRATE = 'UPDATE_PROGRESSRATE';
export const INIT_ACHIEVEMENT = 'INIT_ACHIEVEMENT';
export const UPDATE_ACHIEVENENT = 'UPDATE_ACHIEVENENT';
export const INIT_BACKPACKITEM = 'INIT_BACKPACKITEM';
export const ADD_BACKPACKITEM = 'ADD_BACKPACKITEM';
export const REDUCE_BACKPACKITEM = 'REDUCE_BACKPACKITEM';
export const INIT_STARTTIME = 'INIT_STARTTIME';

export const updateCheckPoint = (checkPoint) => ({
  type: UPDATE_CHECKPOINT,
  checkPoint,
});

export const initCheckPoint = (checkPoint) => ({
  type: INIT_CHECKPOINT,
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

export const setUserData = (userData) => ({
  type: SET_USERDATA,
  userData,
});

/**
 * @param {List} chatList - chatroom data
 * @param {String} chatList[].message - message
 * @param {String} chatList[].sendFrom - who send this message
 */
export const updateChatList = (chatList) => ({
  type: UPDATE_CHATLIST,
  chatList,
});

export const initChatList = (chatList) => ({
  type: INIT_CHATLIST,
  chatList,
});

export const updateProgressRate = (progressRate) => ({
  type: UPDATE_PROGRESSRATE,
  progressRate,
});

export const initAchievement = (achievement) => ({
  type: INIT_ACHIEVEMENT,
  achievement,
});

export const updateAchievement = (id) => ({
  type: UPDATE_ACHIEVENENT,
  id: id,
});

export const initBackpackItem = (backpackItem) => ({
  type: INIT_BACKPACKITEM,
  backpackItem,
});

export const addBackpackItem = (backpackItem) => ({
  type: ADD_BACKPACKITEM,
  backpackItem,
});

export const reduceBackpackItem = (backpackItem) => ({
  type: REDUCE_BACKPACKITEM,
  backpackItem,
});

export const initStartTime = (startTime) => ({
  type: INIT_STARTTIME,
  startTime,
});
