import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  page: {
    height: '100%',
  },
  toast: {
    borderLeftColor: '#4F6D7A',
    marginTop: isIphoneX() ? 10 : 0,
  },
  toastIconContainer: {
    width: '20%',
  },
  toastIcon: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
  },
  text1Style: {
    fontSize: 10,
    fontWeight: '400',
    color: 'gray',
  },
  text2Style: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },
});
