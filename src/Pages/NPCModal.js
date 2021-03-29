import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import BeaconScanner from '../utils/BeaconScanner';
import firestore from '@react-native-firebase/firestore';
import Styles from '../Styles/NPCModal.style';
import Button from '../Views/Elements/Button';
import InfoBox from '../Views/Elements/InfoBox';
import Toast from 'react-native-toast-message';
import Game1 from '../Games/Game1'; // 拼圖
import Game2 from '../Games/Game2'; // 翻牌
import {playSuccess, playFail} from '../utils/musicPlayer';
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
  npcModalPageData as pageData,
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
      code: [' ', ' ', ' ', ' '],
    };
    this.didUpdate = false;
    this.modalState = 'close';
    this.beaconState = 'nothing'; //避免掉短時間內一直更新state

    const {openModal, closeModal, openAlert, closeAlert} = props;
    this.openModal = openModal;
    this.closeModal = closeModal;
    this.openAlert = openAlert;
    this.closeAlert = closeAlert;

    // var tmp = [];
    // for (let index = 0; index < 16; index++) {
    //   tmp.push({id: index, lock: true});
    // }
    // tmp.push({id: 16, lock: true, progress: 0});
    // firestore()
    //   .collection('player')
    //   .doc('tjkrdJLNtcgflAZEMnrT')
    //   .update({
    //     achievement: tmp,
    //     storyRecord: [],
    //     checkPoint: [],
    //     progressRate: 0,
    //     backpackItem: ['terms', 'checkList', 'achievement', 'book'],
    //     chatList: [],
    //   });
  }

  componentDidUpdate() {
    if (!this.state.didUpdate) {
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
      } else if (distance <= 1.5) {
        // distance <= 1.5m then open
        if (
          major === 3 &&
          minor === 1 &&
          this.beaconState !== 'room' &&
          this.props.progressRate === 55
        ) {
          // 如果是館長室就不開modal
          console.log('檢測到館長室');
          this.beaconState = 'room';
          this.modalState = 'open';
          this.addBackpackItem([
            itemsData.firstHalfInterference.key,
            itemsData.secondHalf.key,
          ]);
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
        // distance > 1.5m then close
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
    var dataNumber = -1;
    var extra = () => {};
    const handleFinish = () => {
      this.closeModal();
      //< 0 為不需檢查點與成就
      if (dataNumber >= 0) {
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
        } else if (this.props.progressRate < 40) {
          this.handleStoryRecordDataFlow(npcID, npc.beforeBook.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.beforeBook.line,
              options: npc.beforeBook.options,
              onPress: this.closeModal,
            },
          );
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
        } else if (this.props.progressRate === 80) {
          data = npc.final;
          this.handleStoryRecordDataFlow(npcID, data.line);
          this.setOtherView('final');
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
        if (this.props.progressRate <= 5) {
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
        } else if (this.props.progressRate < 25) {
          this.handleStoryRecordDataFlow(npcID, npc.wait.line);
          this.setNormalView(
            {name: npc.name, img: npc.img},
            {
              line: npc.wait.line,
              options: npc.wait.options,
              onPress: this.closeModal,
            },
          );
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
            if (this.props.progressRate !== checkPointDataList[3].point) {
              this.handlePoint(checkPointDataList[3]);
              this.unLockAchievement(achievementData[3]);
              this.addBackpackItem(itemsData.image.key); // add image
            }
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
              this.addBackpackItem([
                itemsData.firstHalf.key,
                itemsData.paper.key,
              ]);
            }
          };
          times === 0 ? handleInProcess(() => lineLoop()) : lineLoop();
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
        if (this.props.progressRate < 45) {
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
        } else if (this.props.progressRate === 45) {
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
                start={() => {}}
                finish={() => onGameSuccess()}
              />,
            );
          const onGameSuccess = () => {
            data = gameSuccess;
            thisLineLoop(0, true);
          };
          const handleThisFinish = () => {
            this.closeModal();
            if (this.props.progressRate !== checkPointDataList[7].point) {
              this.handlePoint(checkPointDataList[7]);
              this.unLockAchievement(achievementData[7]);
              this.addBackpackItem(itemsData.cardGames.key); // add cardGames
            }
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
              ? {
                  ...element,
                  progress: element.progress + 1,
                  lock: times === 0 ? true : false,
                }
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
        }
        break;
      case NPCIDlist[7]:
        this.setNormalView(
          {name: npc.name, img: npcData.nothing.img},
          {line: npc.tip},
        );
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

    var newRate = data.point;
    var newPoint = {
      extraTime: '',
      id: data.id,
      name: data.name,
      time: firestore.Timestamp.fromDate(new Date()),
    };
    if (progressRate !== data.point) {
      // redux
      updateCheckPoint(newPoint);
      // firebase
      updateCPPR(userData.uid, [newPoint, ...checkPoint], newRate);
    }
    // redux
    updateProgressRate(newRate);
  };

  unLockAchievement = (data) => {
    const {achievement, userData} = this.props;
    if (achievement[data.id].lock) {
      Toast.show({
        type: 'success',
        text2: data.name,
      });
      //redux
      this.props.updateAchievement(data.id);
      //firebase
      updateAchievement(
        userData.uid,
        achievement.map((element) =>
          element.id === data.id ? {...element, lock: false} : element,
        ),
      );
    }
  };

  addBackpackItem = (key) => {
    const {backpackItem, userData} = this.props;
    var itemsName = '';
    var itemsImage = <View />;
    if (Array.isArray(key)) {
      //redux
      this.props.addBackpackItem(key[0]);
      this.props.addBackpackItem(key[1]);
      //firebase
      updateBackpackItem(userData.uid, [...backpackItem, ...key]);
      //set
      itemsName = itemsData[key[0]].name + '與' + itemsData[key[1]].name;
      itemsImage = key.map((id) => (
        <Image
          key={id}
          style={Styles.alertMultipleItemImage}
          source={itemsData[id].img}
        />
      ));
    } else {
      //redux
      this.props.addBackpackItem(key);
      //firebase
      updateBackpackItem(userData.uid, [...backpackItem, key]);
      //set
      itemsName = itemsData[key].name;
      itemsImage = (
        <Image style={Styles.alertItemImage} source={itemsData[key].img} />
      );
    }
    //show alert
    this.openAlert({
      show: true,
      title: itemsName + '已放入背包',
      contentContainerStyle: Styles.alertContentContainer,
      contentStyle: Styles.alertContent,
      titleStyle: Styles.alertTitle,
      customView: <View style={Styles.alertCustomView}>{itemsImage}</View>,
    });
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

  handleInputCode = (number) => {
    const nowIndex = this.state.code.indexOf(' ');
    if (nowIndex > -1) {
      const newCode = this.state.code;
      newCode.splice(nowIndex, 1, number);
      this.setState({code: newCode});
    }
  };

  handleDeleteCode = () => {
    var nowIndex = this.state.code.indexOf(' ');
    nowIndex = nowIndex === -1 ? 4 : nowIndex;
    const newCode = this.state.code;
    newCode.splice(nowIndex - 1, 1, ' ');
    this.setState({code: newCode});
  };

  showConfirmAlert = (times = 0) => {
    const {code} = this.state;
    const {finalOption} = pageData;
    this.openAlert({
      key: times,
      show: true,
      title: '確認輸入',
      contentContainerStyle: Styles.alertContentContainer,
      contentStyle: Styles.alertContent_final,
      titleStyle: Styles.alertTitle,
      showCancelButton: true,
      message: finalOption[times].message + ' ' + code.join('') + ' ?',
      messageStyle: Styles.alertMessage_final,
      actionContainerStyle: Styles.alertActionContainer_final,
      cancelText: finalOption[times].cancel,
      cancelButtonColor: '#CB1B45',
      cancelButtonStyle: Styles.alertButton_final,
      cancelButtonTextStyle: Styles.alertButtonText_final,
      showConfirmButton: true,
      confirmText: finalOption[times].confirm,
      confirmButtonColor: '#1B813E',
      confirmButtonStyle: Styles.alertButton_final,
      confirmButtonTextStyle: Styles.alertButtonText_final,
      onConfirmPressed: () => {
        times === 2
          ? this.handleSubmmitCode()
          : this.showConfirmAlert(times + 1);
      },
    });
  };

  handleSubmmitCode = () => {
    this.closeAlert();
    const npc = npcData[10002];
    const playerAnswer = parseInt(this.state.code.join(''));
    if (playerAnswer === npc.final.code) {
      this.handleStoryRecordDataFlow(10002, npc.success.line);
      this.unLockAchievement(achievementData[11]);
      this.handlePoint(checkPointDataList[11]);
      this.setNormalView(
        {name: npc.name, img: npc.img},
        {line: npc.success.line},
      );
      playSuccess();
    } else {
      this.handleStoryRecordDataFlow(10002, npc.fail.line);
      this.unLockAchievement(achievementData[10]);
      this.handlePoint(checkPointDataList[10]);
      this.setNormalView({name: npc.name, img: npc.img}, {line: npc.fail.line});
      playFail();
    }
  };

  //render
  render() {
    const {visiableView, code} = this.state;
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
        <View style={{height: screenHeight, flex: 1}}>
          {visiableView !== 'final'
            ? visiableView
            : [
                <NPCTitle key="title" name={npcData[NPCIDlist[2]].name} />,
                <NPCImage key="image" img={npcData[NPCIDlist[2]].img} />,
                <View key="options" style={Styles.container}>
                  <View style={Styles.lineView}>
                    <Text style={Styles.lineText}>
                      {npcData[NPCIDlist[2]].final.line}
                    </Text>
                  </View>
                  <View style={Styles.optionView}>
                    <View key="code" style={Styles.codeContainer}>
                      {code.map((element, index) => (
                        <InfoBox
                          key={index}
                          boxStyle={Styles.codeView}
                          content={
                            <Text style={Styles.codeText}>{element}</Text>
                          }
                        />
                      ))}
                    </View>
                    <View key="codeBtn1" style={Styles.codeBtnView}>
                      {[0, 1, 2, 3, 4].map((number) => (
                        <Button
                          key={number}
                          text={number}
                          style={Styles.codeButton}
                          textStyle={Styles.codeButtonText}
                          onPress={() => this.handleInputCode(number)}
                        />
                      ))}
                    </View>
                    <View key="codeBtn2" style={Styles.codeBtnView}>
                      {[5, 6, 7, 8, 9].map((number) => (
                        <Button
                          key={number}
                          text={number}
                          style={Styles.codeButton}
                          textStyle={Styles.codeButtonText}
                          onPress={() => this.handleInputCode(number)}
                        />
                      ))}
                    </View>
                    <View key="btn" style={Styles.btnView}>
                      <Button
                        text="刪除"
                        style={[
                          Styles.backSpace,
                          Styles.button,
                          code.indexOf(' ') === 0 ? Styles.opacity : {},
                        ]}
                        textStyle={Styles.backSpaceText}
                        onPress={() => this.handleDeleteCode()}
                        disabled={code.indexOf(' ') === 0 ? true : false}
                      />
                      <Button
                        text="確認"
                        style={[
                          Styles.enter,
                          Styles.button,
                          code.indexOf(' ') > -1 ? Styles.opacity : {},
                        ]}
                        textStyle={Styles.backSpaceText}
                        onPress={() => this.showConfirmAlert()}
                        disabled={code.indexOf(' ') > -1 ? true : false}
                      />
                    </View>
                  </View>
                </View>,
              ]}
        </View>
      </Modalize>
    );
  }
}

export default connect((store) => store, actionCreators)(NPCModal);
