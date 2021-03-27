import React from 'react';
import {View} from 'react-native';
import Styles from './Styles/index.style';

import MainRouter from './Routers/MainRouter';

import {playerBackgroundMusic} from './utils/musicPlayer';

import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const store = createStore(rootReducer);

import Video from 'react-native-video';
import {StyleSheet} from 'react-native';
export default function App() {
  playerBackgroundMusic();
  return (
    <Provider store={store}>
      <View style={Styles.page}>
        <MainRouter />
        {/* <Video
          source={require('./assets/video/first-half-interference.mp4')} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          controls={true}
          fullscreen={true}
          onFullscreenPlayerDidPresent={() => console.log('123456')}
          playWhenInactive={false}
          playInBackground={false}
          ignoreSilentSwitch={'ignore'}
          progressUpdateInterval={250.0}
        /> */}
      </View>
    </Provider>
  );
}

// Load the module

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
