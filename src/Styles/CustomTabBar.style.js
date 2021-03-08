import {StyleSheet} from 'react-native';
import {defaultTheme} from '../data.source';
import {isIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: isIphoneX() ? 80 : 60,
    backgroundColor: defaultTheme.backgroundColor,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    paddingTop: 1,
  },
  iconButton: {
    flex: 0.3,
    width: '100%',
    height: '100%',
    borderWidth: 10,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: isIphoneX() ? '70%' : '75%',
    resizeMode: 'contain',
  },
});
