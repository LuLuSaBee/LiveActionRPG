import {StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

const centerVH = {justifyContent: 'center', alignItems: 'center'};
export default StyleSheet.create({
  codeContainer: {
    flex: 0.3,
    flexDirection: 'row',
    marginBottom: '5%',
  },
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
  codeView: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    height: 55,
  },
  codeText: {
    fontSize: 25,
    fontWeight: '900',
    fontFamily: 'Menlo',
  },
  codeBtnView: {
    flex: 0.25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '3%',
  },
  codeButton: {
    flex: 0.2,
    borderRadius: 10,
    backgroundColor: 'white',
    ...centerVH,
    marginHorizontal: 10,
  },
  codeButtonText: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Menlo',
  },
  btnView: {
    flex: 0.3,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    ...centerVH,
  },
  button: {
    borderRadius: 10,
    width: '40%',
    height: isIphoneX() ? '80%' : '100%',
    marginHorizontal: 10,
    ...centerVH,
    marginBottom: isIphoneX() ? 30 : 0,
  },
  backSpace: {
    backgroundColor: '#CB1B45',
  },
  backSpaceText: {
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
  },
  enter: {
    backgroundColor: '#1B813E',
  },
  opacity: {
    opacity: 0.1,
  },
  positiveButtonText: {
    color: '#1B813E',
    fontWeight: '600',
    fontSize: 18,
  },
  negativeButtonText: {
    color: '#CB1B45',
    fontWeight: '600',
    fontSize: 18,
  },
  alertContentContainer: {
    height: isIphoneX() ? '30%' : '40%',
    width: '80%',
  },
  alertContent: {
    height: '100%',
  },
  alertTitle: {
    flex: 0.2,
  },
  alertCustomView: {
    flex: 0.8,
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  alertItemImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  alertMultipleItemImage: {
    flex: 0.5,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
