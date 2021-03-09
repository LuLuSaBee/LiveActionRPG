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
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIconView: {
    borderWidth: isIphoneX() ? 8 : 5,
    borderColor: defaultTheme.backgroundColor,
    borderRadius: 100,
    maxWidth: (isIphoneX() ? 80 : 60) * 1.2,
    marginHorizontal: '5%',
    minHeight: '120%',
    marginTop: -5,
  },
  iconStyle: {
    height: isIphoneX() ? '55%' : '65%',
    width: isIphoneX() ? '55%' : '65%',
    resizeMode: 'contain',
  },
});
