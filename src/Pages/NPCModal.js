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
        if (modalState !== 'open' && !(major === 3 && minor === 1)) {
          // 如果是館長室 就不開modal
          //為了不要重複開啟跟setState（會跳回去預設高度）
          this.handleNPCShowUp(major, minor);
          this.openModal();
          this.setState({modalState: 'open', beaconState: 'npc'});
        }
      } else if (modalState === 'open') {
        // distance > 0.45 then close
        this.closeModal();
        this.setState({modalState: 'close', visiableView: this.nothingView});
      }
    }
  };

  handleNPCShowUp = (major, minor) => {
    const npcID = major * 10000 + minor;
    switch (major) {
      case 1: //normal NPC
        this.handleStoryRecordDataFlow(npcID, npcData[npcID].lines);
        if (this.props.progressRate < 10) {
          this.handleCPPRDataFlow(checkPointDataList[0]);
        }
        this.setNormalView(npcData[npcID]);

        break;
      case 2: // mission NPC
        const {progressRate} = this.props;
        if (progressRate < 10) {
          this.handleStoryRecordDataFlow(
            npcID,
            npcData[npcID].notInProcess.lines,
          );
          this.setNormalView({
            name: npcData[npcID].name,
            img: npcData[npcID].img,
            ...npcData[npcID].notInProcess,
          });
        } else if (minor === 1 && progressRate < 40) {
          if (progressRate === 10) {
            const npc = npcData[npcID].inProcess;
            this.handleStoryRecordDataFlow(npcID, npc.lines);
            this.setState({
              visiableView: [
                <NPCTitle key="title" name={npcData[npcID].name} />,
                <NPCImage key="image" img={npcData[npcID].img} />,
                <NPCConversation
                  key="option"
                  conversation={{lines: npc.lines, options: npc.options}}
                />,
              ],
            });
          }
        } else if (minor === 2 && progressRate >= 60 && progressRate < 70) {
        } else {
          this.setNormalView({
            name: npcData[npcID].name,
            img: npcData[npcID].img,
            ...npcData[npcID].after,
          });
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

  setNormalView = (npc) => {
    this.setState({
      visiableView: [
        <NPCTitle key="title" name={npc.name} />,
        <NPCImage key="image" img={npc.img} />,
        <NPCConversation
          key="option"
          conversation={{lines: npc.lines, options: []}}
        />,
      ],
    });
  };

  handleStoryRecordDataFlow = (npcID, line) => {
    // to redux
    this.props.addStoryRecord({
      npcID: npcID,
      time: firestore.Timestamp.fromDate(new Date()),
      line: line,
    });
    // to firebase
    updateStoryRecord(this.props.userData.uid, this.props.storyRecord);
  };

  /**
   * handle CheckPoint and ProgressRate DataFlow
   */
  handleCPPRDataFlow = (data) => {
    const {updateProgressRate, updateCheckPoint, userData} = this.props;

    // redux
    var newRate = data.point === 11 ? 100 : this.props.progressRate + data.rate;
    updateProgressRate(newRate);
    updateCheckPoint({
      extraTime: '',
      point: data.point,
      name: data.name,
      time: firestore.Timestamp.fromDate(new Date()),
    });

    // firebase
    // 不解構是因為要讓reudx的結果直接進firebase
    updateCPPR(userData.uid, this.props.checkPoint, this.props.progressRate);
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
