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
    fontSize: 25,
    fontWeight: 'bold',
  },
  // 遊戲視窗
  GameView: {
    padding: 10,
    width: Dimensions.get('window').width,
    flex: 0.8,
  },
  //卡牌顯示
  ImgSort: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // 卡牌
  ImgView: {
    height: Dimensions.get('window').width * 0.3,
    width: Dimensions.get('window').width * 0.2,
    borderRadius: 10,
    margin: 5,
  },
  image: {
    height: Dimensions.get('window').width * 0.3,
    width: Dimensions.get('window').width * 0.2,
    resizeMode: 'cover',
    borderRadius: 10,
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
