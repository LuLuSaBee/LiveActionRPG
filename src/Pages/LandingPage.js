import React from 'react';
import {View} from 'react-native';
import Styles from '../Styles/landingPage.style';
import {landingPageData as PageData} from '../data.source';
import InputBox from '../Views/Elements/InputBox';
import Button from '../Views/Elements/Button';
import {replaceToTabs} from '../utils/routerAction';

export default class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      teamName: '',
    };
  }

  onChangeTeamName = (text) => {
    this.setState({
      teamName: text,
    });
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
          <Button text={'進入'} onPress={replaceToTabs} style={{width: 80}} />
        </View>
      </View>
    );
  }
}
