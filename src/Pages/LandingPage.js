import React from 'react';
import {Image, View, ImageBackground} from 'react-native';
import Styles from '../Styles/landingPage.style';
import {landingPageData as pageData} from '../data.source';
import InputBox from '../Views/Elements/InputBox';
import Button from '../Views/Elements/Button';
import {replaceToTabs, pushToHostHomePage} from '../utils/routerAction';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actionCreators from '../redux/actions';
import {
  checkIsUser,
  initPlayerData,
  snapshotChatList,
  snapshotPlayer,
} from '../utils/firebaseActions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '測試',
    };
  }

  onChangeTeamName = (text) => {
    this.setState({
      teamName: text,
    });
  };

  onInToClick = async () => {
    const {teamName} = this.state;
    const user = await checkIsUser(teamName);
    if (user.type === undefined) {
      console.log('--------------');
      console.log('用戶不存在');
      console.log('--------------');
    } else if (user.type === 'player') {
      const {updateTimeLeft, initChatList} = this.props;
      replaceToTabs();
      this.initReduxState(user);
      //add linster for chatList
      snapshotChatList(user.uid, initChatList, updateTimeLeft);
    } else if (user.type === 'host') {
      const {
        initChatList,
        initStoryRecord,
        updateProgressRate,
        updateTimeLeft,
      } = this.props;
      const uid = 'YKSVnfNDDNOQETh6P8eq';
      pushToHostHomePage();
      this.initReduxState({type: 'host', uid: uid});
      snapshotPlayer(
        uid,
        initChatList,
        initStoryRecord,
        updateProgressRate,
        updateTimeLeft,
      );
    }
  };

  initReduxState = async (user) => {
    const {
      setUserData,
      initChatList,
      initStoryRecord,
      initCheckPoint,
      updateProgressRate,
      updateTimeLeft,
      initAchievement,
      initBackpackItem,
      initStartTime,
    } = this.props;

    //at reducer
    setUserData(user);

    //at firbase
    initPlayerData(
      user.uid,
      initChatList,
      initStoryRecord,
      initCheckPoint,
      updateProgressRate,
      updateTimeLeft,
      initAchievement,
      initBackpackItem,
      initStartTime,
    );
  };

  render() {
    const {teamNamePH} = pageData;
    const {teamName} = this.state;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={Styles.page}
        scrollEnabled={false}>
        <ImageBackground
          source={pageData.background}
          style={Styles.page}
          imageStyle={Styles.backgroundImage}>
          <View style={Styles.inputContainer}>
            <Image style={Styles.image} source={pageData.img} />
            <InputBox
              containerStyle={Styles.inputView}
              inputData={{
                style: Styles.inputBox,
                value: teamName,
                placeholder: teamNamePH,
                placeholderTextColor: 'gray',
                textAlign: 'center',
                onChangeText: (text) => this.onChangeTeamName(text),
              }}
            />
            <Button
              text={'開始遊戲'}
              onPress={this.onInToClick}
              style={Styles.button}
              textStyle={Styles.buttonText}
              disabled={teamName === ''}
            />
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect((store) => store, actionCreators)(LandingPage);
