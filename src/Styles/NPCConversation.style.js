import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 0.42,
    padding: 10,
    paddingTop: 20,
  },
  lineView: {
    flex: 0.25,
    alignItems: 'center',
  },
  lineText: {
    fontSize: isIphoneX() ? 20 : 18,
    fontWeight: '600',
  },
  optionView: {
    flex: 0.75,
    alignItems: 'center',
    marginTop: 10,
  },
  optionButton: {
    borderRadius: 50,
    borderWidth: 1,
    width: '90%',
    margin: 5,
    marginTop: 10,
  },
  optionText: {
    fontSize: isIphoneX() ? 18 : 15,
    textAlign: 'center',
    margin: 10,
  },
});
