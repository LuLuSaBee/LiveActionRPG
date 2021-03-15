import React from 'react';
import {View} from 'react-native';
import Styles from '../Styles/landingPage.style';
import {landingPageData as PageData} from '../data.source';
import InputBox from '../Views/Elements/InputBox';
import Button from '../Views/Elements/Button';
import {replaceToTabs} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';
import {checkIsUser} from '../utils/firebaseActions';

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
      this.initReduxState(user);
      replaceToTabs();
    }
  };

  initReduxState = async (user) => {
    // console.log('--------------');
    // console.log(user);
    // console.log(this.props);
    // console.log('--------------');
    const {uid} = user;
    this.props.setUserID(uid);
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
