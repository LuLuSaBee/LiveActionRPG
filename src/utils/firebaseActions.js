import firestore from '@react-native-firebase/firestore';

const host = firestore().collection('host'); //onSnapshot 監聽
const player = firestore().collection('player');

export async function checkIsUser(text) {
  const result = await host
    .doc('h54G6QPbCpHwrNLo8Op7')
    .get()
    .then((data) => {
      const {name, playerList} = data._data;
      if (name === text) return {type: 'host', uid: 'h54G6QPbCpHwrNLo8Op7'};
      else {
        const isPlayer = playerList.find((list) => list.name === text);
        return isPlayer === undefined
          ? {type: undefined, uid: ''}
          : {type: 'player', uid: isPlayer.id};
      }
    })
    .catch((e) => console.log(e));

  return result;
}
