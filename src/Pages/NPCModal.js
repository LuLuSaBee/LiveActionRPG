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
    } else {
      const {distance, major, minor} = beacon;
      if (distance === -1) {
        return;
      } else if (distance <= 0.6) {
        // distance <= 0.6m then open
        if (major === 3) {
          // 如果是館長室、修復室就不開modal
          this.beaconState = 'room';
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
    switch (npcID) {
      case NPCIDlist[0]: // 神秘人
        this.setNormalView(npcData[npcID], {line: npcData[npcID].line});
        break;
      case NPCIDlist[1]: // 耶穌
        if (this.props.progressRate === 0) {
          const data = npc.first;
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[0]);
            this.unLockAchievement(achievementData[0]);
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? handleThisFinish()
                    : lineLoop(index + 1),
              },
            );
          };
          lineLoop(0);
        } else if (this.props.progressRate === 35) {
          const data = npc.wrongBook;
          const handleThisFinish = () => {
            this.closeModal();
            this.unLockAchievement(achievementData[14]);
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? handleThisFinish()
                    : lineLoop(index + 1),
              },
            );
          };
          lineLoop(0);
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
          const data = npc.first;
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[1]);
            this.unLockAchievement(achievementData[1]);
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? handleThisFinish()
                    : lineLoop(index + 1),
              },
            );
          };
          lineLoop(0);
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
          var data = npc.first;
          const handleThisFinish = (index) => {
            if (data === npc.first) {
              data = npc.mission[index];
              lineLoop(0);
            } else {
              this.closeModal();
              this.handlePoint(checkPointDataList[2]);
              this.unLockAchievement(achievementData[2]);
            }
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: (option) =>
                  index === data.length - 1
                    ? handleThisFinish(option)
                    : lineLoop(index + 1),
              },
            );
          };
          lineLoop(0);
        } else if (this.props.progressRate === 25) {
          this.reduceBackpackItem(itemsData.image.key); // delete image
          var data = npc.afterMission;
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[4]);
            this.unLockAchievement(achievementData[4]);
            this.addBackpackItem(itemsData.history.key); // add history
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? handleThisFinish()
                    : lineLoop(index + 1),
              },
            );
          };
          lineLoop(0);
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
        const handleInProcess = (next) => {
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
            lineLoop(0, true);
          };
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[3]);
            this.unLockAchievement(achievementData[3]);
            this.addBackpackItem(itemsData.image.key); // add image
          };
          const lineLoop = (index, isGameFinish = false) => {
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
                    : lineLoop(index + 1, isGameFinish),
              },
            );
          };
          handleInProcess(() => lineLoop(0));
        } else if (this.props.progressRate === 35) {
          this.reduceBackpackItem(itemsData.history.key); // delete history
          var data = npc.changeBible;
          const handleThisFinish = () => {
            this.closeModal();
            this.handlePoint(checkPointDataList[5]);
            this.unLockAchievement(achievementData[5]);
            this.addBackpackItem(itemsData.bible.key); // add bible
          };
          const lineLoop = (index) => {
            this.handleStoryRecordDataFlow(npcID, data[index].line);
            this.setNormalView(
              {name: npc.name, img: npc.img},
              {
                line: data[index].line,
                options: data[index].options,
                onPress: () =>
                  index === data.length - 1
                    ? handleThisFinish()
                    : lineLoop(index + 1),
              },
            );
          };
          handleInProcess(() => lineLoop(0));
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
        break;
      default:
        // something roung
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
        element.id === data.id ? {id: data.id, lock: false} : element,
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
