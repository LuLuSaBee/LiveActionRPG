import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from '../Styles/InformationPage.style';
import InfoBox from '../Views/Elements/InfoBox';

export default class InformationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
    };
  }

  render() {
    return (
      <View style={Styles.page}>
        <View style={Styles.container}>
          <InfoBox boxStyle={[Styles.box, {flex: 0.1}]} />
          <InfoBox boxStyle={[Styles.box, {flex: 0.2}]} />
          <InfoBox boxStyle={[Styles.box, {flex: 0.7}]} />
        </View>
      </View>
    );
  }
}

/*
進度
時間
聊天室
*/
