import React from 'react';
import {View} from 'react-native';
import Styles from './Styles/index.style';

import MainRouter from './Routers/MainRouter';
import BeaconScaner from './BeaconTest';

import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <View style={Styles.page}>
        <MainRouter />
      </View>
    </Provider>
  );
}
