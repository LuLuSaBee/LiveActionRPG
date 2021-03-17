import React from 'react';
import {Dimensions, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import NPCTitle from '../Views/NPCTitle';
import NPCImage from '../Views/NPCImage';
import NPCConversation from '../Views/NPCConversation';
import {defaultTheme} from '../data.source';
import {connect} from 'react-redux';
import BeaconScanner from '../utils/BeaconScanner';

const screenHeight = Dimensions.get('screen').height;
class NPCModal extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.beaconScanner = new BeaconScanner();
    this.state = {didUpdate: false, modalState: 'close'};

    const {openModal, closeModal} = props;
    this.openModal = openModal;
    this.closeModal = closeModal;
  }

  componentDidMount() {
    //set basic info
    this.isGame = false;
    const npcName = '蒙娜麗莎';
    const imgSource = {
      uri:
        'https://upload.wikimedia.org/wikipedia/commons/7/7e/Walters_Gallery.jpg',
    };
    const conversation = {
      line:
        '謝謝你，你幫了我一個大忙，這樣我就不用冒著風險去賣畫了，我把畫放在修復室裡，真的是太謝謝你了。',
      options: [
        '我是來找遺失的蒙娜麗莎的',
        '沒事，我就只是路過看看你好不好',
        'ㄌㄩㄝ~~鬼臉，打我啊打我啊',
      ],
    };

    //views
    this.dialogueView = [
      <NPCTitle key="title" name={npcName} />,
      <NPCImage key="image" img={imgSource} />,
      <NPCConversation key="option" conversation={conversation} />,
    ];
    this.gameView = <View />;
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
      return;
    } else {
      const {modalState} = this.state;
      const {distance} = beacon;
      if (distance === -1) {
        return;
      } else if (distance <= 0.45) {
        if (modalState !== 'open') {
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
          {this.isGame ? this.gameView : this.dialogueView}
        </View>
      </Modalize>
    );
  }
}

export default connect((store) => store)(NPCModal);
