import React from 'react';
import {Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import BeaconScanner from '../utils/BeaconScanner';
import firestore from '@react-native-firebase/firestore';
import Game1 from '../Games/Game1'; // 拼圖
import Game2 from '../Games/Game2'; // 翻牌
import {
  updateStoryRecord,
  updateCPPR,
  updateAchievement,
  updateBackpackItem,
} from '../utils/firebaseActions';
import {
  defaultTheme,
  npcData,
  checkPointDataList,
  NPCIDlist,
  achievementData,
  itemsData,
} from '../data.source';

const screenHeight = Dimensions.get('screen').height;
class NPCModal extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.beaconScanner = new BeaconScanner();
    this.nothingView = [
      <NPCTitle key="title" name={npcData.nothing.name} />,
      <NPCImage key="image" img={npcData.nothing.img} />,
      <NPCConversation
        key="option"
        conversation={{line: npcData.nothing.line}}
      />,
    ];
    this.state = {
      visiableView: this.nothingView,
    };
    this.didUpdate = false;
    this.modalState = 'close';
    this.beaconState = 'nothing'; //避免掉短時間內一直更新state

    const {openModal, closeModal} = props;
    this.openModal = openModal;
    this.closeModal = closeModal;

    // var tmp = [];
    // for (let index = 0; index < 17; index++) {
    //   tmp.push({id: index, lock: true});
    // }
    // firestore()
    //   .collection('player')
    //   .doc('tjkrdJLNtcgflAZEMnrT')
    //   .update({achievement: tmp, storyRecord: [], checkPoint: []});
  }

  componentDidUpdate() {
    if (this.state.didUpdate) {
      return;
    } else {
      // 因為redux在幫我initPlayerData的時候總共會跑五遍，再加上原本UserData的會有六遍
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({didUpdate: true});
      if (this.props.userData.type !== 'player') {
        return <View />;
      }
      this.beaconScanner.initBeacon();
      this.beaconScanner.startScan(this.beaconUpdate);
    }
  }

  beaconUpdate = (beacon) => {
    if (beacon === undefined) {
      this.beaconState !== 'nothing'
        ? this.setState({
            visiableView: this.nothingView,
          })
        : console.log('beacon is nothing');
      this.beaconState = 'nothing';
      this.modalState = 'close';
    } else {
      const {distance, major, minor} = beacon;
      if (distance === -1) {
        return;
      } else if (distance <= 0.6) {
        // distance <= 0.6m then open
        if (
          major === 3 &&
          minor === 1 &&
          this.beaconState !== 'room' &&
          this.props.progressRate === 55
        ) {
          // 如果是館長室就不開modal
          console.log('檢測到館長室');
          this.beaconState = 'room';
          this.addBackpackItem(itemsData.firstHalfInterference.key);
          this.addBackpackItem(itemsData.secondHalf.key);
          this.unLockAchievement(achievementData[8]);
          this.handlePoint(checkPointDataList[8]);
        } else if (this.modalState !== 'open') {
          //為了不要重複開啟跟setState（會跳回去預設高度）
          this.handleNPCShowUp(major, minor);
          this.openModal();
          this.modalState = 'open';
          this.beaconState = 'npc';
        }
      } else if (this.modalState === 'open') {
        // distance > 0.6m then close
        console.log('beacon is too far');
        this.closeModal();
        this.modalState = 'close';
        this.setState({visiableView: this.nothingView});
      }
    }
  };

  handleNPCShowUp = (major, minor) => {
    const npcID = major * 10000 + minor;
    const npc = npcData[npcID];
    var data = [];
    var dataNumber = 0;
    var extra = () => {};
    const handleFinish = () => {
      this.closeModal();
      //< 0 為不需檢查點與成就
      if (dataNumber > 0) {
        this.unLockAchievement(achievementData[dataNumber]);
        if (dataNumber < checkPointDataList.length) {
          // 有些只有成就，並無檢查點
          this.handlePoint(checkPointDataList[dataNumber]);
        }
      }
      extra();
      //reset extra
      extra = () => {};
    };
    const lineLoop = (index = 0) => {
      this.handleStoryRecordDataFlow(npcID, data[index].line);
      this.setNormalView(
        {name: npc.name, img: npc.img},
        {
          line: data[index].line,
          options: data[index].options,
          onPress: () =>
            index === data.length - 1 ? handleFinish() : lineLoop(index + 1),
        },
      );
    };
    switch (npcID) {
      case NPCIDlist[0]: // 神秘人
        this.handleStoryRecordDataFlow(npcID, npcData[npcID].line);
        this.setNormalView(npcData[npcID], {line: npcData[npcID].line});
        break;
      case NPCIDlist[1]: // 耶穌
        if (this.props.progressRate === 0) {
          data = npc.first;
          dataNumber = 0;
          lineLoop();
        } else if (this.props.progressRate === 35) {
          data = npc.wrongBook;
          dataNumber = 14;
          lineLoop();
        } else if (this.props.progressRate === 40) {
          data = npc.rightBook;
          dataNumber = 6;
          extra = () => {
            this.addBackpackItem(itemsData.lightning.key); // add lightning
          };
          this.reduceBackpackItem(itemsData.bible.key); // delete bible
          lineLoop();
        } else {
          this.handleStoryRecordDataFlow(npcID, npc.finish.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.finish.line,
              options: npc.finish.options,
              onPress: this.closeModal,
            },
          );
        }
        break;
      case NPCIDlist[2]: // 章魚哥
        if (this.props.progressRate === 5) {
          data = npc.first;
          dataNumber = 1;
          lineLoop();
        } else {
          this.handleStoryRecordDataFlow(npcID, npc.wait.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.wait.line,
              options: npc.wait.options,
              onPress: this.closeModal,
            },
          );
        }
        break;
      case NPCIDlist[3]: // 主席
        if (this.props.progressRate === 5) {
          // 還沒找章魚哥就來找他的話
          this.handleStoryRecordDataFlow(npcID, npc.first[0].line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {line: npc.first[0].line},
          );
        } else if (this.props.progressRate === 10) {
          data = npc.first;
          dataNumber = 2;
          const thisLineLoop = (index = 0) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: (option) => {
                  if (index === data.length - 1) {
                    data = npc.mission[option];
                    lineLoop();
                  } else {
                    thisLineLoop(index + 1);
                  }
                },
              },
            );
          };
          thisLineLoop();
        } else if (this.props.progressRate === 25) {
          this.reduceBackpackItem(itemsData.image.key); // delete image
          data = npc.afterMission;
          dataNumber = 4;
          extra = () => this.addBackpackItem(itemsData.history.key); // add history
          lineLoop();
        } else {
          this.handleStoryRecordDataFlow(npcID, npc.finish.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.finish.line,
              options: npc.finish.options,
              onPress: this.closeModal,
            },
          );
        }
        break;
      case NPCIDlist[4]: // 摩艾石像
        const handleAngry = () => {
          this.handleStoryRecordDataFlow(npcID, npc.angry.line);
          this.unLockAchievement(achievementData[12]);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {line: npc.angry.line},
          );
        };
        var handleInProcess = (next) => {
          this.handleStoryRecordDataFlow(npcID, npc.inProcess.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.inProcess.line,
              options: npc.inProcess.options,
              onPress: (index) => (index === 1 ? handleAngry() : next()),
            },
          );
        };
        if (this.props.progressRate === 15) {
          const {findPhoto, gameSuccess, gameFail, again} = npc;
          var data = findPhoto;
          const againReact = () => {
            this.handleStoryRecordDataFlow(npcID, again.line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: again.line,
                options: again.options,
                onPress: goToGame,
              },
            );
          };
          const onGameFail = () => {
            this.handleStoryRecordDataFlow(npcID, gameFail.line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: gameFail.line,
                options: gameFail.options,
                onPress: againReact,
              },
            );
          };
          const goToGame = () =>
            this.setOtherView(
              <Game1
                back={onGameFail}
                start={() => {
                  this.unLockAchievement(achievementData[13]);
                }}
                finish={() => onGameSuccess()}
              />,
            );
          const onGameSuccess = () => {
            data = gameSuccess;
            thisLineLoop(0, true);
          };
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[3]);
            this.unLockAchievement(achievementData[3]);
            this.addBackpackItem(itemsData.image.key); // add image
          };
          const thisLineLoop = (index = 0, isGameFinish = false) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? isGameFinish
                      ? handleThisFinish()
                      : goToGame()
                    : thisLineLoop(index + 1, isGameFinish),
              },
            );
          };
          handleInProcess(() => thisLineLoop());
        } else if (this.props.progressRate === 35) {
          this.reduceBackpackItem(itemsData.history.key); // delete history
          data = npc.changeBible;
          dataNumber = 5;
          extra = () => this.addBackpackItem(itemsData.bible.key); // add bible
          handleInProcess(() => lineLoop());
        } else if (
          this.props.progressRate === 75 &&
          this.props.achievement[16].progress % 2 === 0
        ) {
          const {initAchievement, achievement, userData} = this.props;
          const times = Math.floor(achievement[16].progress / 2);
          const newAchievement = achievement.map((element) =>
            element.id === 16
              ? {...element, progress: element.progress + 1}
              : element,
          );
          if (times !== 0) {
            this.reduceBackpackItem(itemsData.firstHalfInterference.key);
          }
          data = npc.clearVideo[times];
          //等於0是第一次來 不等於0為第二次來
          dataNumber = times === 0 ? -1 : 9;
          extra = () => {
            //redux
            initAchievement(newAchievement);
            //firebase
            updateAchievement(userData.uid, newAchievement);
            if (times !== 0) {
              this.addBackpackItem(itemsData.firstHalf.key);
              this.addBackpackItem(itemsData.paper.key);
            }
          };
          times === 0 ? handleInProcess(() => lineLoop()) : lineLoop();
        } else if (this.props.progressRate >= 80) {
          this.handleStoryRecordDataFlow(npcID, npc.finish.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.finish.line,
              options: npc.finish.options,
              onPress: this.closeModal,
            },
          );
        } else {
          this.handleStoryRecordDataFlow(npcID, npc.notInProcess.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.notInProcess.line,
              options: npc.notInProcess.options,
              onPress: (index) =>
                index === 1 ? handleAngry() : this.closeModal(),
            },
          );
        }
        break;
      case NPCIDlist[5]: // 兵馬俑
        if (this.props.progressRate === 45) {
          const {gameFail, inProcess, gameSuccess, answer} = npc;
          data = inProcess;
          var handleInProcess = (index = 0) => {
            this.handleStoryRecordDataFlow(npcID, inProcess[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: inProcess[index].line,
                options: inProcess[index].options,
                onPress: (choose) => {
                  if (index === data.length - 1) {
                    data = answer[choose];
                    thisLineLoop();
                  } else {
                    handleInProcess(index + 1);
                  }
                },
              },
            );
          };
          const onGameFail = () => {
            this.unLockAchievement(achievementData[15]);
            this.handleStoryRecordDataFlow(npcID, gameFail.line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: gameFail.line,
                options: gameFail.options,
                onPress: goToGame,
              },
            );
          };
          const goToGame = () =>
            this.setOtherView(
              <Game2
                back={onGameFail}
                start={() => {
                  this.unLockAchievement(achievementData[15]);
                }}
                finish={() => onGameSuccess()}
              />,
            );
          const onGameSuccess = () => {
            data = gameSuccess;
            thisLineLoop(0, true);
          };
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[7]);
            this.unLockAchievement(achievementData[7]);
            this.addBackpackItem(itemsData.cardGames.key); // add image
          };
          const thisLineLoop = (index = 0, isGameFinish = false) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? isGameFinish
                      ? handleThisFinish()
                      : goToGame()
                    : thisLineLoop(index + 1, isGameFinish),
              },
            );
          };
          handleInProcess();
        } else if (
          this.props.progressRate >= 75 &&
          this.props.achievement[16].progress % 2 === 1 &&
          this.props.achievement[16].progress < 4
        ) {
          const {initAchievement, achievement, userData} = this.props;
          const times = Math.floor(achievement[16].progress / 2);
          const newAchievement = achievement.map((element) =>
            element.id === 16
              ? {...element, progress: element.progress + 1}
              : element,
          );
          data = npc.fighting[times];
          dataNumber = times === 0 ? -1 : 16;
          extra = () => {
            //redux
            initAchievement(newAchievement);
            //firebase
            updateAchievement(userData.uid, newAchievement);
            if (times !== 0) {
              this.props.updateAchievement(achievementData[16].id);
            }
          };
          lineLoop();
        } else if (this.props.progressRate >= 80) {
          data = npc.finish;
          this.handleStoryRecordDataFlow(npcID, data.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: data.line,
              options: data.options,
              onPress: () => this.closeModal(),
            },
          );
        } else {
          data = npc.notInProcess;
          this.handleStoryRecordDataFlow(npcID, data.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: data.line,
              options: data.options,
              onPress: () => this.closeModal(),
            },
          );
        }
        break;
      default:
        // something wroung
        console.log('--------------');
        console.log(`沒有這號人物\nmajor: ${major}\nminor: ${minor}`);
        console.log('--------------');
        this.setState({
          visiableView: this.nothingView,
        });
        break;
    }
  };

  /**
   *
   * @param {Map} npc
   * @param {Map} conversation
   * @param {Map} conversation.line
   * @param {Map} conversation.options
   * @param {Map} conversation.onPress
   */
  setNormalView = (npc, conversation) => {
    this.setState({
      visiableView: [
        <NPCTitle key="title" name={npc.name} />,
        <NPCImage key="image" img={npc.img} />,
        <NPCConversation key="option" conversation={{...conversation}} />,
      ],
    });
  };

  setOtherView = (visiableView) => {
    this.setState({visiableView: visiableView});
  };

  handleStoryRecordDataFlow = (npcID, line) => {
    const {storyRecord} = this.props;
    const newRecord = {
      npcID: npcID,
      time: firestore.Timestamp.fromDate(new Date()),
      line: line,
    };
    // to redux
    this.props.addStoryRecord(newRecord);
    // to firebase
    updateStoryRecord(this.props.userData.uid, [newRecord, ...storyRecord]);
  };

  /**
   * handle CheckPoint, ProgressRate dataflow
   */
  handlePoint = (data) => {
    const {
      updateProgressRate,
      updateCheckPoint,
      userData,
      checkPoint,
      progressRate,
    } = this.props;

    // redux
    var newRate = progressRate + data.rate;
    var newPoint = {
      extraTime: '',
      id: data.id,
      name: data.name,
      time: firestore.Timestamp.fromDate(new Date()),
    };
    updateProgressRate(newRate);
    updateCheckPoint(newPoint);

    // firebase
    updateCPPR(userData.uid, [newPoint, ...checkPoint], newRate);
  };

  unLockAchievement = (data) => {
    const {achievement, userData} = this.props;
    //redux
    this.props.updateAchievement(data.id);
    //firebase
    updateAchievement(
      userData.uid,
      achievement.map((element) =>
        element.id === data.id ? {...element, lock: false} : element,
      ),
    );
  };

  addBackpackItem = (key) => {
    const {backpackItem, userData} = this.props;
    //redux
    this.props.addBackpackItem(key);
    //firebase
    updateBackpackItem(userData.uid, [...backpackItem, key]);
  };

  reduceBackpackItem = (key) => {
    const {backpackItem, userData} = this.props;
    //redux
    this.props.reduceBackpackItem(key);
    //firebase
    updateBackpackItem(
      userData.uid,
      backpackItem.filter((element) => element !== key),
    );
  };

  //render
  render() {
    const {visiableView} = this.state;
    return (
      <Modalize
        ref={this.props.modalizeRef}
        snapPoint={screenHeight * 0.52}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0],
        }}
        modalStyle={{
          backgroundColor: defaultTheme.backgroundColor,
        }}>
        <View style={{height: screenHeight, flex: 1}}>{visiableView}</View>
      </Modalize>
    );
  }
}

export default connect((store) => store, actionCreators)(NPCModal);
