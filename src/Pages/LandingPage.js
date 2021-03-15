import React from 'react';
import {View} from 'react-native';
import Styles from '../Styles/landingPage.style';
import {landingPageData as PageData} from '../data.source';
import InputBox from '../Views/Elements/InputBox';
import Button from '../Views/Elements/Button';
import {replaceToTabs} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import {
  checkIsUser,
  initPlayerData,
  snapshotChatList,
} from '../utils/firebaseActions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: 'TestTeam1',
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
    } else {
      replaceToTabs();
      this.initReduxState(user);
      //add linster for chatList
      snapshotChatList(user.uid, this.props.initChatList);
    }
  };

  initReduxState = async (user) => {
    const {
      setUserData,
      initChatList,
      initStoryRecord,
      initCheckPoint,
      updateProgressRate,
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
    );
  };

  render() {
    const {teamNamePH} = PageData;
    const {teamName} = this.state;
    return (
      <View style={Styles.page}>
        <View style={Styles.inputContainer}>
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
            text={'進入'}
            onPress={this.onInToClick}
            style={{width: 80}}
          />
        </View>
      </View>
    );
  }
}

export default connect((store) => store, actionCreators)(LandingPage);
