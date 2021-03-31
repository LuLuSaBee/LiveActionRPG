import React from 'react';
import {View} from 'react-native';
import Styles from './Styles/index.style';
import Toast, {BaseToast} from 'react-native-toast-message';
import MainRouter from './Routers/MainRouter';
import {initUser} from './utils/firebaseActions';
import {playerBackgroundMusic} from './utils/musicPlayer';
import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const store = createStore(rootReducer);

export default function App() {
  //initUser('YKSVnfNDDNOQETh6P8eq');
  playerBackgroundMusic();
  return (
    <Provider store={store}>
      <View style={Styles.page}>
        <MainRouter />
      </View>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}

const toastConfig = {
  success: ({text, ...props}) => (
    <BaseToast
      {...props}
      leadingIcon={require('./assets/reward.png')}
      style={Styles.toast}
      leadingIconContainerStyle={Styles.toastIconContainer}
      leadingIconStyle={Styles.toastIcon}
      text1Style={Styles.text1Style}
      text2Style={Styles.text2Style}
      text1={'獲得成就'}
    />
  ),
};
