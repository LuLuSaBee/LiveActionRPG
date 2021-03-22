import React from 'react';
import {View} from 'react-native';
import Styles from './Styles/index.style';

import MainRouter from './Routers/MainRouter';

import Sound from 'react-native-sound';
import {musicData} from './data.source';

import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const store = createStore(rootReducer);

export default function App() {
  Sound.setCategory('Playback');
  var backgroundMusic = new Sound(musicData.background, (error) => {
    if (error) {
      console.log('failed to load the background music\n', error);
      return;
    }
    // loaded successfully
    console.log('Background music loaded successfully.');

    // backgroundMusic.play();
    // // Play the sound with an onEnd callback
    // backgroundMusic.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //     backgroundMusic.play();
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
  });
  backgroundMusic.play();
  // Loop indefinitely until stop() is called
  backgroundMusic.setNumberOfLoops(-1);

  return (
    <Provider store={store}>
      <View style={Styles.page}>
        <MainRouter />
      </View>
    </Provider>
  );
}
