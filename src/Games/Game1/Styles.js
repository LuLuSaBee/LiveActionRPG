import {StyleSheet, Dimensions} from 'react-native';

const Styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  // 標題視窗
  titleView: {
    justifyContent: 'center',
    flex: 0.08,
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
    padding: 10,
    flex: 0.8,
    width: Dimensions.get('window').width,
  },
  //卡牌顯示
  ImgSort: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  // 卡牌
  ImgView: {
    height: Dimensions.get('window').height * 0.24,
    width: Dimensions.get('window').width * 0.3,
    resizeMode: 'stretch',
    borderColor: 'white',
    borderWidth: 2,
  },
  backbtn: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    flex: 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Styles;
