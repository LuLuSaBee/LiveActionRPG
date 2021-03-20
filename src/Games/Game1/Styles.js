import {StyleSheet, Dimensions} from 'react-native';

const Styles = StyleSheet.create({
  // 標題視窗
  titleView: {
    borderWidth: 1,
    justifyContent: 'center',
  },
  // 標題
  title: {
    lineHeight: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  // 遊戲視窗
  GameView: {
    backgroundColor: 'red',
    padding: 20,
    width: Dimensions.get('window').width,
  },
  //卡牌顯示
  ImgSort: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // 卡牌
  ImgView: {
    height: Dimensions.get('window').height * 0.24,
    width: Dimensions.get('window').width * 0.3,
    resizeMode: 'stretch',
    borderColor: 'white',
    borderWidth: 2,
  },
});
export default Styles;
