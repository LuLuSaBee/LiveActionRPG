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
import Game1 from '../Games/Game1';
import Game2 from '../Games/Game2';
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
        conversation={{line: npcData.nothing.line, options: []}}
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

  handleNPCShowUp = (major, minor, isGameSuccess = false) => {
    const npcID = major * 10000 + minor;
    switch (npcID) {
      case NPCIDlist[0]: // 神秘人
        this.handleStoryRecordDataFlow(npcID, npcData[npcID].line);
        this.setNormalView(npcData[npcID], {line: npcData[npcID].line});
        break;
      case NPCIDlist[1]: // 耶穌
        break;
      case NPCIDlist[2]: // 章魚哥
        break;
      case NPCIDlist[3]: // 主席
        break;
      case NPCIDlist[4]: // 摩艾石像
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

  unLockAchievement = (id) => {
    const {achievement, userData} = this.props;
    //redux
    this.props.updateAchievement(id);
    //firebase
    updateAchievement(
      userData.uid,
      achievement.map((element) =>
        element.id === id ? {id: id, lock: false} : element,
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
