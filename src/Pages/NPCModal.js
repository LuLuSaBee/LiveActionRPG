import React from 'react';
import {Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {defaultTheme, npcData} from '../data.source';
import {connect} from 'react-redux';
import BeaconScanner from '../utils/BeaconScanner';

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

  componentDidMount() {}

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
      const npcID = major + minor * 10000;
      if (distance === -1) {
        return;
      } else if (distance <= 0.45) {
        if (modalState !== 'open') {
          //為了不要重複開啟（會跳回去預設高度）
          this.openModal();
          this.setState({modalState: 'open'});
        }
      } else if (modalState === 'open') {
        this.closeModal();
        this.setState({modalState: 'close'});
      }
    }
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

export default connect((store) => store)(NPCModal);
