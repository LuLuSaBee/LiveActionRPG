import React from 'react';
import {View} from 'react-native';
import Styles from './Styles/index.style';

import MainRouter from './Routers/MainRouter';
import BeaconScaner from './BeaconTest';

export default function App() {
  return (
    <View style={Styles.page}>
      <MainRouter />
    </View>
  );
}
