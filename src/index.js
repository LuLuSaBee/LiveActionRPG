import React from 'react';
import {View} from 'react-native';
import Style from './Styles/index.css';

import MainRouter from './Routers/MainRouter';
import BeaconScaner from './BeaconTest';

export default function App() {
  return (
    <View style={Style.page}>
      <MainRouter />
    </View>
  );
}
