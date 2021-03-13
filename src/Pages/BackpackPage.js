import React from 'react';
import {View} from 'react-native';
import Styles from '../Styles/BackpackPage.style';
import InfoBox from '../Views/Elements/InfoBox';

export default class BackpackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.page}>
        <View style={Styles.container}>
          <InfoBox />
        </View>
      </View>
    );
  }
}
