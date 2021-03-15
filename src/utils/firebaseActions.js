import firestore from '@react-native-firebase/firestore';

const host = firestore().collection('host');
const player = firestore().collection('player');

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
 */
export function initPlayerData(
  uid,
  initChatList,
  initStoryRecord,
  initCheckPoint,
) {
  player
    .doc(uid)
    .get()
    .then((data) => {
      const {chatList, storyRecord, checkPoint} = data._data;
      initChatList(chatList);
      initStoryRecord(storyRecord);
      initCheckPoint(checkPoint);
    });
}

export function snapshotChatList(uid) {
  player.doc(uid).onSnapshot((data) => {
    const source = data.metadata.hasPendingWrites ? 'Local' : 'Server';
    if (source === 'Local') {
      return;
    }
    console.log(source, data);
  });
}

/**
 *
 * @param {String} uid -  Player UID
 * @param {Array} chatList
 * @param {String} chatList[].sendFrom - who send this message
 * @param {String} chatList[].message - message
 * @param {String} message - new message
 */
export async function addMessage(uid, chatList, message) {
  chatList.push(message);
  const result = await player
    .doc(uid)
    .update({chatList: chatList})
    .then(() => 'success')
    .catch((e) => {
      console.log('---addMessage Error-----');
      console.log(e);
      console.log('------------------------');
      return 'error';
    });

  return result;
}
