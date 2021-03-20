import React from 'react';
import {Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {defaultTheme, npcData, checkPointDataList} from '../data.source';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import BeaconScanner from '../utils/BeaconScanner';
import {updateStoryRecord, updateCPPR} from '../utils/firebaseActions';
import firestore from '@react-native-firebase/firestore';
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';

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
        conversation={{lines: npcData.nothing.lines, options: []}}
      />,
    ];
    this.state = {
      didUpdate: false,
      modalState: 'close',
      visiableView: this.nothingView,
      beaconState: 'nothing', //避免掉短時間內一直更新state
    };

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
      this.state.beaconState !== 'nothing'
        ? this.setState({
            visiableView: this.nothingView,
            beaconState: 'nothing', //避免掉短時間內一直更新state
          })
        : console.log('beacon is nothing');
    } else {
      const {modalState} = this.state;
      const {distance, major, minor} = beacon;
      if (distance === -1) {
        return;
      } else if (distance <= 0.45) {
        // distance <= 0.45 then open
        if (major === 3 && minor === 1 && modalState !== 'open') {
          // 如果是館長室 就不開modal
          this.handleCPPRDataFlow(checkPointDataList[4]);
          console.log('--------------');
          console.log('給影片');
          console.log('--------------');
          this.setState({modalState: 'open', beaconState: 'room'});
        } else if (modalState !== 'open') {
          //為了不要重複開啟跟setState（會跳回去預設高度）
          this.handleNPCShowUp(major, minor);
          this.openModal();
          this.setState({modalState: 'open', beaconState: 'npc'});
        }
      } else if (modalState === 'open') {
        // distance > 0.45 then close
        console.log('beacon is too far');
        this.closeModal();
        this.setState({modalState: 'close', visiableView: this.nothingView});
      }
    }
  };

  handleNPCShowUp = (major, minor, isGameSuccess = false) => {
    const npcID = major * 10000 + minor;
    switch (major) {
      case 1: //normal NPC
        this.handleStoryRecordDataFlow(npcID, npcData[npcID].lines);
        if (this.props.progressRate < 10) {
          this.handleCPPRDataFlow(checkPointDataList[0]);
        }
        this.setNormalView(npcData[npcID], {lines: npcData[npcID].lines});

        break;
      case 2: // mission NPC
        const name = npcData[npcID].name;
        const img = npcData[npcID].img;
        if (
          minor === 1 &&
          this.props.progressRate >= 10 &&
          this.props.progressRate < 40
        ) {
          //雕像
          const {gameFail, afterGameFail} = npcData[npcID];
          const afterGameFailReact = () => {
            this.handleStoryRecordDataFlow(npcID, afterGameFail.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: afterGameFail.lines,
                options: afterGameFail.options,
                onPress: () => this.handleNPCShowUp(major, minor),
              },
            );
          };
          const gameFailReact = () => {
            this.handleStoryRecordDataFlow(npcID, gameFail.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: gameFail.lines,
                options: gameFail.options,
                onPress: afterGameFailReact,
              },
            );
          };
          const goToGame = () =>
            this.setOtherView(
              <Game1
                back={gameFailReact}
                start={() =>
                  this.props.progressRate === 20
                    ? {}
                    : this.handleCPPRDataFlow(checkPointDataList[1])
                }
                finish={() => {
                  this.handleCPPRDataFlow(checkPointDataList[2]);
                  this.handleNPCShowUp(major, minor, true);
                }}
              />,
            );

          if (this.props.progressRate === 10) {
            const {inProcess} = npcData[npcID];
            this.handleStoryRecordDataFlow(npcID, inProcess.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: inProcess.lines,
                options: inProcess.options,
                onPress: goToGame,
              },
            );
          } else if (this.props.progressRate === 20 && !isGameSuccess) {
            //bad condition
            //但因為目前對生命週期無解，若要改的話要改結構
            const {again} = npcData[npcID];
            this.handleStoryRecordDataFlow(npcID, again.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: again.lines,
                options: again.options,
                onPress: goToGame,
              },
            );
          } else if (this.props.progressRate === 30 || isGameSuccess) {
            const {gameSuccess} = npcData[npcID];
            this.handleStoryRecordDataFlow(npcID, gameSuccess.lines);
            this.handleCPPRDataFlow(checkPointDataList[3]);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: gameSuccess.lines,
                options: gameSuccess.options,
                onPress: () => {
                  this.handleNPCShowUp(major, minor);
                },
              },
            );
          }
        } else if (
          minor === 2 &&
          this.props.progressRate >= 60 &&
          this.props.progressRate < 75
        ) {
          const {gameFail} = npcData[npcID];
          const gameFailReact = () => {
            this.handleStoryRecordDataFlow(npcID, gameFail.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: gameFail.lines,
                options: gameFail.options,
                onPress: goToGame,
              },
            );
          };
          const goToGame = () =>
            this.setOtherView(
              <Game1
                back={gameFailReact}
                start={() =>
                  this.props.progressRate === 70
                    ? {}
                    : this.handleCPPRDataFlow(checkPointDataList[6])
                }
                finish={() => {
                  this.handleCPPRDataFlow(checkPointDataList[7]);
                  this.handleNPCShowUp(major, minor, true);
                }}
              />,
            );
          if (this.props.progressRate === 60) {
            const {inProcess} = npcData[npcID];
            const pickReply = (index) => {
              const data = inProcess[1];
              this.handleStoryRecordDataFlow(npcID, data.lines[index]);
              this.handleCPPRDataFlow(checkPointDataList[5]);
              this.setNormalView(
                {name: name, img: img},
                {
                  lines: data.lines[index],
                  options: data.options,
                  onPress: () => this.handleNPCShowUp(major, minor),
                },
              );
            };
            this.handleStoryRecordDataFlow(npcID, inProcess[0].lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: inProcess[0].lines,
                options: inProcess[0].options,
                onPress: (index) => pickReply(index),
              },
            );
          } else if (this.props.progressRate === 65) {
            const {onProtect} = npcData[npcID];
            const pickReply = () => {
              const data = onProtect[1];
              this.handleStoryRecordDataFlow(npcID, data.lines);
              this.setNormalView(
                {name: name, img: img},
                {
                  lines: data.lines,
                  options: data.options,
                  onPress: goToGame,
                },
              );
            };
            this.handleStoryRecordDataFlow(npcID, onProtect[0].lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: onProtect[0].lines,
                options: onProtect[0].options,
                onPress: pickReply,
              },
            );
          } else if (this.props.progressRate === 70 && !isGameSuccess) {
            this.handleStoryRecordDataFlow(npcID, gameFail.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: gameFail.lines,
                options: gameFail.options,
                onPress: goToGame,
              },
            );
          } else if (isGameSuccess) {
            const {gameSuccess} = npcData[npcID];
            this.handleStoryRecordDataFlow(npcID, gameSuccess.lines);
            this.setNormalView(
              {name: name, img: img},
              {
                lines: gameSuccess.lines,
                options: gameSuccess.options,
                onPress: () => this.handleNPCShowUp(major, minor),
              },
            );
          }
        } else {
          //通過兵馬俑或石像之後
          const npc = npcData[npcID];
          var data;
          if (
            this.props.progressRate < 10 ||
            (minor === 2 && this.props.progressRate < 60)
          ) {
            data = npc.notInProcess;
          } else {
            data = npc.finish;
          }
          this.handleStoryRecordDataFlow(npcID, data.lines);
          this.setNormalView(
            {name: name, img: img},
            {
              lines: data.lines,
              options: data.options,
              onPress: this.closeModal,
            },
          );
        }

        break;
      case 3: // room
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
   * @param {Map} conversation.lines
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
   * handle CheckPoint and ProgressRate DataFlow
   */
  handleCPPRDataFlow = (data) => {
    const {
      updateProgressRate,
      updateCheckPoint,
      userData,
      checkPoint,
    } = this.props;

    // redux
    var newRate = data.point === 11 ? 100 : this.props.progressRate + data.rate;
    var newPoint = {
      extraTime: '',
      point: data.point,
      name: data.name,
      time: firestore.Timestamp.fromDate(new Date()),
    };
    updateProgressRate(newRate);
    updateCheckPoint({
      extraTime: '',
      point: data.point,
      name: data.name,
      time: firestore.Timestamp.fromDate(new Date()),
    });

    // firebase
    updateCPPR(userData.uid, [newPoint, ...checkPoint], newRate);
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
