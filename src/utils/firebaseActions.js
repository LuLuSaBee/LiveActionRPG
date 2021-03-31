import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const host = firestore().collection('host');
const player = firestore().collection('player');

export function initUser(id) {
  var achievement = [];
  for (let index = 0; index < 16; index++) {
    achievement.push({id: index, lock: true});
  }
  achievement.push({id: 16, lock: true, progress: 0});
  const nowTime = new Date();
  const endTime = new Date();
  endTime.setHours(endTime.getHours(), endTime.getMinutes() + 48);
  player.doc(id).update({
    achievement,
    storyRecord: [],
    checkPoint: [],
    progressRate: 0,
    backpackItem: ['terms', 'checkList', 'achievement', 'book'],
    chatList: [],
    endTime: firestore.Timestamp.fromDate(endTime),
    startTime: firestore.Timestamp.fromDate(nowTime),
  });
}

/**
 *
 * @param {String} text - host name or player name
 */
export async function checkIsUser(text) {
  const result = await host
    .doc('h54G6QPbCpHwrNLo8Op7')
    .get()
    .then((data) => {
      const {name, playerList} = data._data;
      if (name === text) {
        return {type: 'host', uid: 'h54G6QPbCpHwrNLo8Op7'};
      } else {
        const isPlayer = playerList.find((list) => list.name === text);
        return isPlayer === undefined
          ? {type: undefined, uid: ''}
          : {type: 'player', uid: isPlayer.id};
      }
    })
    .catch((e) => console.log(e));

  return result;
}

/**
 *
 * @param {String} uid - Player UID
 * @param {Function} initChatList - function that init ChatList
 * @param {Function} initStoryRecord  - function that init StoryRecord
 * @param {Function} initCheckPoint  - function that init CheckPoint
 * @param {Function} initProgressRate  - function that init ProgressRate
 * @param {Function} updateTimeLeft  - function that init TimeLeft
 * @param {Function} initAchievement - function that init Achievement
 * @param {Function} initBackpackItem -function that init BackpackItem
 * @param {Function} initStartTime -function that init StartTime
 */
export function initPlayerData(
  uid,
  initChatList,
  initStoryRecord,
  initCheckPoint,
  initProgressRate,
  updateTimeLeft,
  initAchievement,
  initBackpackItem,
  initStartTime,
) {
  player
    .doc(uid)
    .get()
    .then((data) => {
      const {
        achievement,
        backpackItem,
        chatList,
        checkPoint,
        endTime,
        progressRate,
        storyRecord,
        startTime,
      } = data._data;
      initChatList(chatList);
      initStoryRecord(storyRecord);
      initCheckPoint(checkPoint);
      initProgressRate(progressRate);
      initAchievement(achievement);
      initBackpackItem(backpackItem);
      initStartTime(startTime.seconds * 1000 + startTime.nanoseconds / 1000000);

      var time =
        endTime.seconds * 1000 + endTime.nanoseconds / 1000000 - moment();
      time = time < 0 ? 0 : time;
      updateTimeLeft(time);
    });
}

/**
 *
 * @param {String} uid - Player UID
 * @param {function} initChatList - to reload ChatList
 */
export function snapshotChatList(uid, initChatList, updateTimeLeft) {
  player.doc(uid).onSnapshot((data) => {
    const source = data.metadata.hasPendingWrites ? 'Local' : 'Server';
    if (source === 'Local') {
      const {endTime} = data._data;
      var time =
        endTime.seconds * 1000 + endTime.nanoseconds / 1000000 - moment();
      time = time < 0 ? 0 : time;
      updateTimeLeft(time);
    } else {
      const {chatList} = data._data;
      initChatList(chatList);
    }
  });
}

/**
 *
 * @param {String} uid - Player UID
 * @param {Function} initChatList - function that init ChatList
 * @param {Function} initStoryRecord  - function that init StoryRecord
 * @param {Function} initProgressRate  - function that init ProgressRate
 * @param {Function} updateTimeLeft  - function that init TimeLeft
 */
export function snapshotPlayer(
  uid,
  initChatList,
  initStoryRecord,
  initProgressRate,
  updateTimeLeft,
) {
  player.doc(uid).onSnapshot((data) => {
    const source = data.metadata.hasPendingWrites ? 'Local' : 'Server';
    if (source === 'Server') {
      const {endTime, chatList, storyRecord, progressRate} = data._data;
      var time =
        endTime.seconds * 1000 + endTime.nanoseconds / 1000000 - moment();
      time = time < 0 ? 0 : time;
      updateTimeLeft(time);
      initChatList(chatList);
      initStoryRecord(storyRecord);
      initProgressRate(progressRate);
    }
  });
}

/**
 *
 * @param {String} uid - Player UID
 * @param {Array} chatList
 * @param {String} chatList[].sendFrom - who send this message
 * @param {String} chatList[].message - message
 * @param {String} message - new message
 */
export function addMessage(uid, chatList, message) {
  player
    .doc(uid)
    .update({chatList: [...chatList, message]})
    .then(() => 'success')
    .catch((e) => {
      console.log('---addMessage Error-----');
      console.log(e);
      console.log('------------------------');
    });
}

/**
 *
 * @param {String} uid - Player UID
 * @param {Array} storyRecord - old recordlist
 * @param {Array} newRecord - new record
 */
export function updateStoryRecord(uid, storyRecord) {
  player
    .doc(uid)
    .update({storyRecord: storyRecord})
    .then(() => 'success')
    .catch((e) => {
      console.log('---updateStoryRecord Error-----');
      console.log(e);
      console.log('-------------------------------');
    });
}

/**
 * update checkPoint and progressRate into firebase
 * @param {*} uid
 * @param {*} checkPoint
 * @param {*} progressRate
 */
export function updateCPPR(uid, checkPoint, progressRate) {
  player
    .doc(uid)
    .update({checkPoint: checkPoint, progressRate: progressRate})
    .then(() => 'success')
    .catch((e) => {
      console.log('---updateCPPR Error-----');
      console.log(e);
      console.log('------------------------');
    });
}

/**
 *
 * @param {*} uid
 * @param {Array<Map<Number,Boolean>>} achievement
 * @param {Number} achievement[].id
 * @param {Boolean} achievement[].lock
 */
export function updateAchievement(uid, achievement) {
  player
    .doc(uid)
    .update({achievement: achievement})
    .then(() => 'success')
    .catch((e) => {
      console.log('---updateAchievement Error-----');
      console.log(e);
      console.log('-------------------------------');
    });
}

/**
 *
 * @param {*} uid
 * @param {Array<String>} backpackItem
 */
export function updateBackpackItem(uid, backpackItem) {
  player
    .doc(uid)
    .update({backpackItem: backpackItem})
    .then(() => 'success')
    .catch((e) => {
      console.log('---updateAchievement Error-----');
      console.log(e);
      console.log('-------------------------------');
    });
}
