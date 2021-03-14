import React from 'react';
import {Text, View} from 'react-native';
import Styles from '../Styles/landingPage.style';
import {landingPageData as PageData} from '../data.source';
import InputBox from '../Views/Elements/InputBox';
import Button from '../Views/Elements/Button';
import {replaceToTabs} from '../utils/routerAction';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
    };
  }

  onChangeTeamName = (text) => {
    this.setState({
      teamName: text,
    });
  };

  onInToClick = () => {
    const {teamName} = this.state;
    this.initReduxState();
    replaceToTabs();
  };

  initReduxState = () => {};

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
