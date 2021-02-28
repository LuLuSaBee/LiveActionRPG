import React from 'react';
import {View} from 'react-native';
import Style from './Styles/index.css';

import MainRouter from './Routers/MainRouter';

export default function App() {
  return (
    <View style={Style.page}>
      <MainRouter />
    </View>
  );
}
