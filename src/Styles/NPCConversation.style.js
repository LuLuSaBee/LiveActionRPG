import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const centerVH = {justifyContent: 'center', alignItems: 'center'};
export default StyleSheet.create({
  container: {
    flex: 0.42,
    padding: 10,
    paddingTop: 20,
    height: '100%',
  },
  lineView: {
    flex: 0.3,
    ...centerVH,
  },
  lineText: {
    fontSize: isIphoneX() ? 20 : 16,
    fontWeight: '600',
  },
  optionView: {
    flex: 0.7,
    ...centerVH,
    marginTop: 5,
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
    marginHorizontal: 20,
  },
});
